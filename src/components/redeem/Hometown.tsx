"use client";
import { useId, useRef, useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import type { AddressBook } from "@/hooks/pages/Redeem/useAddresses";
import { fmt, plural } from "@/lib/i18n/format";
import type { ClientStrings } from "@/lib/i18n/strings/types";
import type { Country } from "@/lib/redeem/countries";
import { causeOf, codeOf } from "@/lib/redeem/errors";
import { countryByName } from "@/lib/redeem/names";
import type { Address } from "@/lib/redeem/types";
import { checkDraft, checkField, EMPTY_DRAFT, LIMITS, toInput, type AddressDraft, type AddressErrors, type AddressField } from "@/lib/redeem/validate";
import { clsx } from "@/lib/clsx";
import { flagOf } from "./CountryPicker";
import { LazyCountryMap } from "./maps";
import { causeText, noteText, slots, useCountryName } from "./text";

// Stop 4: the address the slabs go to, in the country picked on the globe. Saved addresses live
// with the shipping provider and are read live with the pass; nothing personal is kept here.

/** Labels and hints are t.redeem.home.labels[f] and .hints[f]. */
const FIELDS: { f: AddressField; auto: string; type?: string; mode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; wide?: boolean }[] = [
  { f: "name", auto: "name", wide: true },
  { f: "line1", auto: "address-line1", wide: true },
  { f: "line2", auto: "address-line2", wide: true },
  { f: "city", auto: "address-level2" },
  { f: "state", auto: "address-level1" },
  { f: "postalCode", auto: "postal-code" },
  { f: "phoneNumber", auto: "tel", type: "tel", mode: "tel" },
  { f: "email", auto: "email", type: "email", mode: "email", wide: true },
];

const draftOf = (a: Address): AddressDraft => ({
  name: a.name,
  line1: a.line1,
  line2: a.line2 ?? "",
  city: a.city,
  state: a.state,
  postalCode: a.postalCode,
  phoneNumber: a.phoneNumber,
  email: a.email,
});

function saveError(e: unknown, t: ClientStrings["redeem"]): string {
  const code = codeOf(e);
  const said = causeText(t.errors, causeOf(e));
  if (code === "REDEEM_ADDRESS_REJECTED") return said ? fmt(t.home.rejected, { detail: said }) : t.home.rejectedAny;
  if (code === "PASS_DECLINED") return t.home.savePass;
  if (code === "UNAUTHENTICATED") return t.home.saveAuth;
  return said ?? t.home.saveFailed;
}

export function Hometown({
  country,
  book,
  passActive,
  onRenewPass,
  selectedId,
  onSelect,
  onNext,
  onBack,
  onRegion,
}: {
  country: Country;
  book: AddressBook;
  passActive: boolean;
  onRenewPass: () => void;
  selectedId: string | null;
  onSelect: (a: Address | null) => void;
  onNext: () => void;
  onBack: () => void;
  onRegion: () => void;
}) {
  const t = useT();
  const { locale } = useLocale();
  const name = useCountryName();
  const s = t.redeem.home;
  const hints: Partial<Record<AddressField, string>> = s.hints;
  const here = (book.list ?? []).filter((a) => a.country === country.name);
  const elsewhere = (book.list ?? []).filter((a) => a.country !== country.name);
  const [formOpen, setFormOpen] = useState<boolean | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<AddressDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const id = useId();
  // With no saved address here, the form is the way in.
  const showForm = formOpen ?? (book.list !== null && here.length === 0);
  const selected = (book.list ?? []).find((a) => a.id === selectedId) ?? null;
  const ready = selected !== null && selected.country === country.name && !showForm;
  const city = showForm ? draft.city : (selected?.city ?? "");

  const openForm = (a: Address | null) => {
    setEditing(a?.id ?? null);
    setDraft(a ? draftOf(a) : EMPTY_DRAFT);
    setErrors({});
    setServerError(null);
    setNotice(null);
    setFormOpen(true);
  };

  const set = (f: AddressField, v: string) => {
    setDraft((d) => ({ ...d, [f]: v }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: checkField(f, v) }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    const errs = checkDraft(draft);
    setErrors(errs);
    const first = FIELDS.find((x) => errs[x.f]);
    if (first) {
      form.current?.querySelector<HTMLInputElement>(`[name="${first.f}"]`)?.focus();
      return;
    }
    setSaving(true);
    setServerError(null);
    try {
      const saved = await book.save(toInput(draft, country.name, editing !== null), editing ?? undefined);
      onSelect(saved);
      setFormOpen(false);
      setEditing(null);
      setNotice(fmt(s.saved, { city: saved.city }));
    } catch (err) {
      setServerError(saveError(err, t.redeem));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (a: Address) => {
    setDeleting(a.id);
    setServerError(null);
    try {
      await book.remove(a.id);
      if (a.id === selectedId) onSelect(null);
      setNotice(s.deleted);
    } catch (err) {
      setServerError(causeText(t.redeem.errors, causeOf(err)) ?? s.deleteFailed);
    } finally {
      setDeleting(null);
      setConfirmDel(null);
    }
  };

  const card = (a: Address, other: boolean) => {
    const c = countryByName(a.country);
    const on = a.id === selectedId;
    return (
      <li key={a.id} className={clsx("rd-addr", on && "is-on")}>
        <label className="rd-addr-pick">
          <input
            type="radio"
            name={`${id}-addr`}
            checked={on}
            disabled={!c}
            onChange={() => {
              setNotice(null);
              onSelect(a);
            }}
          />
          <span className="min-w-0">
            <b className="block truncate">{a.name}</b>
            <span className="block text-sm font-semibold text-[var(--rd-mute)]">
              {a.line1}
              {a.line2 ? `, ${a.line2}` : ""}
            </span>
            <span className="block text-sm font-semibold text-[var(--rd-mute)]">
              {a.city}, {a.state} {a.postalCode}
            </span>
            {other && (
              <span className="mt-1 block text-xs font-black text-[var(--rd-gold)]">
                {c ? `${flagOf(c.a2)} ${fmt(s.moveTrip, { country: name(c) })}` : fmt(s.notListed, { country: a.country })}
              </span>
            )}
          </span>
        </label>
        <div className="rd-addr-tools">
          {confirmDel === a.id ? (
            <>
              <span className="text-xs font-black">{s.deleteConfirm}</span>
              <button type="button" className="rd-chip is-danger" onClick={() => void remove(a)} disabled={deleting === a.id}>
                {deleting === a.id ? s.deleting : s.delete}
              </button>
              <button type="button" className="rd-chip" onClick={() => setConfirmDel(null)} disabled={deleting === a.id}>
                {s.keep}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="rd-chip" onClick={() => openForm(a)} disabled={other && !c} aria-label={fmt(s.editLabel, { name: a.name, city: a.city })}>
                {s.edit}
              </button>
              <button type="button" className="rd-chip" onClick={() => setConfirmDel(a.id)} aria-label={fmt(s.deleteLabel, { name: a.name, city: a.city })}>
                {s.delete}
              </button>
            </>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="rd-home">
      <div className="rd-home-map">
        <LazyCountryMap num={country.num} city={city} />
        <p className="rd-country-chip">
          <span aria-hidden>{flagOf(country.a2)}</span>
          <span>{slots(s.shippingTo, { country: <b>{name(country)}</b> })}</span>
          <button type="button" className="rd-link" onClick={onRegion}>
            {t.redeem.actions.change}
          </button>
        </p>
      </div>
      <div className="rd-home-main">
        {!passActive && book.list === null ? (
          <div className="rd-note">
            <b>{s.passLead}</b>{" "}
            {slots(s.passText, {
              renew: (
                <button type="button" className="rd-link" onClick={onRenewPass}>
                  {t.redeem.actions.renewTheLink}
                </button>
              ),
            })}
          </div>
        ) : book.loading ? (
          <ul className="rd-addr-list" aria-busy="true" aria-label={s.loading}>
            <li className="rd-addr rd-skel h-[92px]" />
            <li className="rd-addr rd-skel h-[92px]" />
          </ul>
        ) : book.error ? (
          <p className="rd-alert" role="alert">
            {noteText(t.redeem.errors, book.error)}{" "}
            <button type="button" className="rd-link" onClick={book.reload}>
              {t.redeem.actions.tryAgain}
            </button>
          </p>
        ) : null}

        {!showForm && book.list === null && !book.loading && (
          <button type="button" className="rd-btn rd-btn-ghost self-start" onClick={() => openForm(null)}>
            {fmt(s.add, { country: name(country) })}
          </button>
        )}
        {!showForm && book.list !== null && (
          <fieldset className="flex flex-col gap-3">
            <legend className="rd-label mb-2">{fmt(s.savedIn, { country: name(country) })}</legend>
            {here.length > 0 ? (
              <ul className="rd-addr-list">{here.map((a) => card(a, false))}</ul>
            ) : (
              <p className="text-sm font-bold text-[var(--rd-mute)]">{fmt(s.noneIn, { country: name(country) })}</p>
            )}
            {elsewhere.length > 0 && (
              <details className="rd-elsewhere">
                <summary>
                  {plural(locale, elsewhere.length, s.elsewhere)} <span aria-hidden>▾</span>
                </summary>
                <ul className="rd-addr-list mt-3">{elsewhere.map((a) => card(a, true))}</ul>
              </details>
            )}
            <button type="button" className="rd-btn rd-btn-ghost self-start" onClick={() => openForm(null)}>
              {fmt(s.add, { country: name(country) })}
            </button>
          </fieldset>
        )}

        {showForm && (
          <form ref={form} className="rd-form" onSubmit={submit} noValidate aria-labelledby={`${id}-title`}>
            <div className="flex items-baseline justify-between gap-3">
              <h3 id={`${id}-title`} className="rd-display text-2xl">
                {editing ? s.formEdit : s.formNew}
              </h3>
              {(here.length > 0 || editing) && (
                <button
                  type="button"
                  className="rd-link"
                  onClick={() => {
                    setFormOpen(false);
                    setEditing(null);
                  }}
                >
                  {s.cancel}
                </button>
              )}
            </div>
            <div className="rd-form-grid">
              {FIELDS.map((x) => {
                const err = errors[x.f];
                const hint = hints[x.f];
                const fid = `${id}-${x.f}`;
                return (
                  <div key={x.f} className={clsx("rd-field", x.wide && "is-wide", err && "is-bad")}>
                    <label htmlFor={fid}>{s.labels[x.f]}</label>
                    <input
                      id={fid}
                      name={x.f}
                      type={x.type ?? "text"}
                      inputMode={x.mode}
                      autoComplete={`shipping ${x.auto}`}
                      value={draft[x.f]}
                      onChange={(e) => set(x.f, e.target.value)}
                      onBlur={(e) => {
                        const v = e.target.value;
                        if (v || errors[x.f]) setErrors((m) => ({ ...m, [x.f]: checkField(x.f, v) }));
                      }}
                      aria-invalid={err ? true : undefined}
                      aria-describedby={err ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
                      required={x.f !== "line2"}
                    />
                    {err ? (
                      <span id={`${fid}-err`} className="rd-field-err">
                        {fmt(s.errors[err], { max: LIMITS[x.f] })}
                      </span>
                    ) : (
                      hint && (
                        <span id={`${fid}-hint`} className="rd-field-hint">
                          {hint}
                        </span>
                      )
                    )}
                  </div>
                );
              })}
              <div className="rd-field is-wide">
                <span className="rd-field-k">{s.country}</span>
                <p className="rd-field-fixed">
                  <span aria-hidden>{flagOf(country.a2)}</span> {name(country)}
                  <button type="button" className="rd-link ml-auto" onClick={onRegion}>
                    {s.changeOnGlobe}
                  </button>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="rd-btn rd-btn-gold" disabled={saving}>
                {saving ? s.saving : editing ? s.saveChanges : s.saveShip}
              </button>
              <span className="text-xs font-bold text-[var(--rd-mute)]">{s.keptBy}</span>
            </div>
          </form>
        )}

        {serverError && (
          <p className="rd-alert" role="alert">
            {serverError}
          </p>
        )}
        {notice && !serverError && (
          <p className="rd-ok" role="status">
            {notice}
          </p>
        )}

        <div className="rd-actions">
          <button type="button" className="rd-btn rd-btn-ghost" onClick={onBack}>
            {t.redeem.actions.back}
          </button>
          <button type="button" className="rd-btn rd-btn-red" onClick={onNext} disabled={!ready}>
            {ready ? fmt(s.next, { city: selected.city }) : showForm ? s.saveFirst : s.pickAddress} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
