// Lists what each language still reads in English: UI string keys missing from
// src/lib/i18n/strings/<locale>/, and glossary, topic and franchise-hub entries missing from
// src/lib/i18n/content/<locale>/. Missing text falls back to English on the site, so nothing
// breaks; this shows where. Usage: node scripts/i18n-gaps.mjs [locale ...] [--keys] [--same]
//   --keys  print every missing key, not just the counts
//   --same  also list translated strings that are word-for-word English (3+ words)
// "errors" are structural: unknown keys, wrong shapes, placeholder mismatches ({name}), changed
// content ids/slugs/hrefs. Exit code 1 when anything is missing or wrong.
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "node_modules", ".cache", `i18n-gaps-${process.pid}`);
const args = process.argv.slice(2);
const showKeys = args.includes("--keys");
const showSame = args.includes("--same");
const only = args.filter((a) => !a.startsWith("--"));

// Transpile the modules the strings import (and only those) into plain ESM under OUT.
const done = new Map();
function resolveFile(spec, from) {
  const base = spec.startsWith("@/") ? join(SRC, spec.slice(2)) : resolve(dirname(from), spec);
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, join(base, "index.ts")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  throw new Error(`cannot resolve ${spec} from ${relative(ROOT, from)}`);
}
function build(file) {
  if (done.has(file)) return done.get(file);
  const target = join(OUT, relative(SRC, file)).replace(/\.tsx?$/, ".mjs");
  done.set(file, target);
  let code = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  code = code.replace(/^import\s+["']server-only["'];?\s*$/m, "");
  code = code.replace(/(from\s+|import\s+)(["'])([^"']+)\2/g, (whole, kw, q, spec) => {
    if (!spec.startsWith(".") && !spec.startsWith("@/")) return whole;
    const dep = build(resolveFile(spec, file));
    let rel = relative(dirname(target), dep);
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return `${kw}${q}${rel}${q}`;
  });
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, code);
  return target;
}
const load = async (file) => import(pathToFileURL(build(join(SRC, file))).href);

const PLURAL = new Set(["zero", "one", "two", "few", "many", "other"]);
const isLeaf = (v) =>
  typeof v !== "object" || v === null || Array.isArray(v) || (Object.keys(v).includes("other") && Object.keys(v).every((k) => PLURAL.has(k)));

/** Paths of English leaves the translation lacks, plus translated leaves still word-for-word English. */
function diff(en, local, path, missing, same, extra) {
  if (isLeaf(en)) {
    if (local === undefined) missing.push(path);
    else if (typeof en === "string" && local === en && en.trim().split(/\s+/).length >= 3) same.push(path);
    else if (typeof en === "string" && typeof local !== "string") extra.push(`${path} (not a string)`);
    else if (typeof en === "string") {
      const allowed = new Set(OPTIONAL_VARS[path.split(".").slice(0, -1).join(".")] ?? []);
      const want = [...new Set(en.match(/\{\w+\}/g) ?? [])].sort().join();
      const got = [...new Set(local.match(/\{\w+\}/g) ?? [])].filter((v) => !allowed.has(v) || want.includes(v)).sort().join();
      if (want !== got) extra.push(`${path} (placeholders ${got || "none"}, English has ${want || "none"})`);
    }
    return;
  }
  if (local !== undefined && (typeof local !== "object" || local === null || Array.isArray(local))) {
    extra.push(`${path} (wrong shape)`);
    return;
  }
  for (const key of Object.keys(en)) diff(en[key], local?.[key], path ? `${path}.${key}` : key, missing, same, extra);
  // An empty English object is an open map (seo.pokemon): a translation may add any key to it.
  if (Object.keys(en).length === 0) return;
  for (const key of Object.keys(local ?? {})) if (!(key in en)) extra.push(path ? `${path}.${key}` : key);
}

/** Placeholders a call site passes on top of the English ones, by parent path. */
const OPTIONAL_VARS = { "seo.mon": ["{english}"] };

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
/** Structural fields a content translation must keep exactly (ids, slugs, hrefs, categories). */
function contentShape(kind, en, local, out) {
  if (kind === "guide") {
    if (local.category && local.category !== en.category) out.push(`guide:${en.id} category`);
    for (const term of local.terms ?? []) if (!en.terms.some((x) => x.id === term.id)) out.push(`guide:${en.id}#${term.id} (unknown term id)`);
  }
  if (kind === "topic") {
    if (!same(local.sections?.map((x) => x.id), en.sections.map((x) => x.id))) out.push(`topic:${en.slug} section ids`);
    if (!same(local.links?.map((x) => x.href), en.links.map((x) => x.href))) out.push(`topic:${en.slug} link hrefs`);
    if (local.faq?.length !== en.faq.length) out.push(`topic:${en.slug} faq count`);
  }
  if (kind === "hub") {
    for (const field of ["category", "related", "terms"]) if (!same(local[field], en[field])) out.push(`hub:${en.slug} ${field}`);
    if (local.faq?.length !== en.faq.length) out.push(`hub:${en.slug} faq count`);
  }
}

try {
  const { LOCALES } = await load("lib/i18n.ts");
  const codes = LOCALES.map((l) => l.code).filter((c) => c !== "en" && (!only.length || only.includes(c)));
  const { en } = await load("lib/i18n/strings/en/index.ts");
  const { GUIDE } = await load("lib/guide.ts");
  const { TOPICS } = await load("lib/topics.ts");
  const { CATEGORY_HUBS } = await load("lib/category-hubs.ts");
  const rows = [];
  let gaps = 0;
  for (const code of codes) {
    const t = (await load(`lib/i18n/strings/${code}/index.ts`))[code];
    const missing = [];
    const sameAsEn = [];
    const extra = [];
    diff(en, t, "", missing, sameAsEn, extra);
    const guide = (await load(`lib/i18n/content/${code}/guide.ts`)).guide;
    const topics = (await load(`lib/i18n/content/${code}/topics.ts`)).topics;
    const hubs = (await load(`lib/i18n/content/${code}/hubs.ts`)).hubs;
    const content = [];
    for (const section of GUIDE) {
      const hit = guide.find((s) => s.id === section.id);
      if (!hit) content.push(`guide:${section.id} (whole section)`);
      else {
        contentShape("guide", section, hit, extra);
        for (const term of section.terms) if (!hit.terms.some((x) => x.id === term.id)) content.push(`guide:${section.id}#${term.id}`);
      }
    }
    for (const s of guide) if (!GUIDE.some((x) => x.id === s.id)) extra.push(`guide:${s.id} (unknown section id)`);
    for (const topic of TOPICS) {
      const hit = topics.find((x) => x.slug === topic.slug);
      if (!hit) content.push(`topic:${topic.slug}`);
      else contentShape("topic", topic, hit, extra);
    }
    for (const x of topics) if (!TOPICS.some((y) => y.slug === x.slug)) extra.push(`topic:${x.slug} (unknown slug)`);
    for (const hub of CATEGORY_HUBS) {
      const hit = hubs.find((x) => x.slug === hub.slug);
      if (!hit) content.push(`hub:${hub.slug}`);
      else contentShape("hub", hub, hit, extra);
    }
    for (const x of hubs) if (!CATEGORY_HUBS.some((y) => y.slug === x.slug)) extra.push(`hub:${x.slug} (unknown slug)`);
    gaps += missing.length + content.length + extra.length;
    rows.push({ code, missing, same: sameAsEn, extra, content });
  }
  const pad = (s, n) => String(s).padEnd(n);
  console.log(`${pad("lang", 6)}${pad("missing keys", 14)}${pad("content", 10)}${pad("errors", 8)}same-as-English`);
  for (const r of rows) console.log(`${pad(r.code, 6)}${pad(r.missing.length, 14)}${pad(r.content.length, 10)}${pad(r.extra.length, 8)}${r.same.length}`);
  for (const r of rows) if (r.extra.length) console.log(`\n# ${r.code} errors (unknown keys, wrong shape, placeholders, content structure): ${r.extra.join(", ")}`);
  for (const r of rows) {
    if (showKeys && (r.missing.length || r.content.length)) {
      const byFeature = {};
      for (const p of r.missing) (byFeature[p.split(".")[0]] ??= []).push(p);
      console.log(`\n# ${r.code}`);
      for (const [feature, list] of Object.entries(byFeature)) console.log(`  ${feature} (${list.length}): ${list.slice(0, 40).join(", ")}${list.length > 40 ? ", …" : ""}`);
      if (r.content.length) console.log(`  content (${r.content.length}): ${r.content.join(", ")}`);
    }
    if (showSame && r.same.length) console.log(`\n# ${r.code} same as English: ${r.same.join(", ")}`);
  }
  process.exitCode = gaps ? 1 : 0;
} finally {
  rmSync(OUT, { recursive: true, force: true });
}
