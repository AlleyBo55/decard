"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/components/LocaleProvider";
import { RipProvider, useRipWallet } from "@/components/rip/RipProvider";
import { useAddresses } from "@/hooks/pages/Redeem/useAddresses";
import { useEstimate } from "@/hooks/pages/Redeem/useEstimate";
import { useSavedShipments, useShipment, useShipmentSummaries } from "@/hooks/pages/Redeem/useJourney";
import { useRedeemKit, type RedeemKit } from "@/hooks/pages/Redeem/useRedeemKit";
import { useRelease, type ReleasePhase } from "@/hooks/pages/Redeem/useRelease";
import { useShippingPass } from "@/hooks/pages/Redeem/useShippingPass";
import type { Country } from "@/lib/redeem/countries";
import { codeOf } from "@/lib/redeem/errors";
import { countryByName } from "@/lib/redeem/names";
import { insuredCents } from "@/lib/redeem/rates";
import { readShipments, rememberShipment } from "@/lib/redeem/shipments";
import { MAX_CARDS, type Burned, type RedeemApi } from "@/lib/redeem/types";
import { cardImage } from "@/lib/constants";
import { fmt } from "@/lib/i18n/format";
import type { CardRow } from "@/lib/types";
import { Badge } from "./art";
import { CheckIn, WalletPickerModal } from "./CheckIn";
import type { GlobeFocus } from "./Globe";
import { Hometown } from "./Hometown";
import { Journey, type Destination } from "./Journey";
import { Party } from "./Party";
import { RedeemSkeleton } from "./RedeemSkeleton";
import { Region } from "./Region";
import { Release, type NavKind } from "./Release";
import { Review } from "./Review";
import { RouteNav } from "./RouteNav";
import { STEP_IDS, STEPS, isStepId, stepIndex, type StepId } from "./steps";
import { slots } from "./text";
import { PassTimer, TravelPass } from "./TravelPass";
import "@/components/rip/rip.css";
import "./redeem.css";

// The /redeem page's live part: a trainer's journey from the vault to their hometown, one stop
// per step. The URL carries the stop (?step=) for back and forward, but only ever shows a stop
// whose requirements are met, and never starts or resumes a release by itself.

const RUNNING: ReadonlySet<ReleasePhase["step"]> = new Set(["preparing", "signing", "burning", "recovering"]);
/** Stopped states a changed party or address may discard: nothing was sent for them yet. */
const SAFE_NEXT = new Set(["prepare", "sign", "review", "address", "none"]);
const SHIPMENT_ID = /^[A-Za-z0-9_-]{1,64}$/;

/** Flags a lapsed Decard session on any call, so the page can offer a fresh sign-in. */
function watchAuth(api: RedeemApi, onLost: () => void): RedeemApi {
  const out = {} as Record<string, unknown>;
  for (const [k, fn] of Object.entries(api) as [string, (...a: unknown[]) => Promise<unknown>][]) {
    out[k] = (...args: unknown[]) =>
      fn(...args).catch((e: unknown) => {
        if (codeOf(e) === "UNAUTHENTICATED") onLost();
        throw e;
      });
  }
  return out as unknown as RedeemApi;
}

export function RedeemLab() {
  return (
    <RipProvider>
      <Shell />
    </RipProvider>
  );
}

function Shell() {
  const params = useSearchParams();
  const kit = useRedeemKit(params);
  return (
    <>
      {kit.preview && (
        <p className="rd-preview-pill" role="note">
          Preview: simulated shipping desk and wallet. Nothing is signed or sent. Try &fail=burn,unknown,expired,notpaid,reject,address or &issue=1
        </p>
      )}
      {kit.ready ? <Flow key={kit.holder ?? "nobody"} kit={kit} /> : <RedeemSkeleton />}
      {!kit.preview && <WalletPickerModal />}
    </>
  );
}

function Flow({ kit }: { kit: RedeemKit }) {
  const params = useSearchParams();
  const w = useRipWallet();
  const t = useT();
  const lab = t.redeem.lab;
  const { signer, preview } = kit;
  const [authLost, setAuthLost] = useState(false);
  const api = useMemo(() => watchAuth(kit.api, () => setAuthLost(true)), [kit.api]);
  const pass = useShippingPass(api, signer);
  const book = useAddresses(api, pass);
  const wallet = signer?.address ?? null;
  const saved = useSavedShipments(wallet);

  const [selected, setSelected] = useState<string[]>([]);
  const [gone, setGone] = useState<ReadonlySet<string>>(new Set());
  const [country, setCountry] = useState<Country | null>(null);
  const [focus, setFocus] = useState<GlobeFocus | null>(null);
  const [addressId, setAddressId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [finishing, setFinishing] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Record<string, Destination>>({});
  const startLock = useRef(false);

  const cards = useMemo(() => kit.cards.filter((c) => !gone.has(c.nftAddress)), [kit.cards, gone]);
  const byMint = useMemo(() => new Map(cards.map((c) => [c.nftAddress, c])), [cards]);
  const party = useMemo(() => selected.map((m) => byMint.get(m)).filter((c): c is CardRow => c !== undefined), [selected, byMint]);
  const declared = party.reduce((s, c) => s + insuredCents(c.insuredValue), 0);
  const address = (book.list ?? []).find((a) => a.id === addressId) ?? null;
  const addressOk = address !== null && country !== null && address.country === country.name;

  // The URL's stop, held to what the trip so far allows.
  const shipParam = params.get("shipment");
  const trackId = shipParam && SHIPMENT_ID.test(shipParam) ? shipParam : null;
  const rawStep = params.get("step");
  const urlStep: StepId = isStepId(rawStep) ? rawStep : "checkin";

  const onDone = useCallback(
    (b: Burned) => {
      // A finished saved shipment wasn't this party's: only a fresh release clears the party.
      if (!finishing) {
        if (country && address) setDestinations((d) => ({ ...d, [b.shipmentId]: { country, city: address.city, declaredCents: declared } }));
        setGone((g) => new Set([...g, ...selected]));
        setSelected([]);
        setComment("");
      }
      setFinishing(null);
      navigate("journey", "push", b.shipmentId);
    },
    [country, address, selected, declared, finishing],
  );
  const release = useRelease(api, pass, signer, onDone);
  const { phase } = release;
  const running = RUNNING.has(phase.step);
  const holdRelease = running || phase.step === "repriced";

  const quote = useEstimate(api, pass, selected, addressOk ? addressId : null, (urlStep === "review" || urlStep === "release") && pass.status === "active" && addressOk, address ? JSON.stringify(address) : "");
  const problems = useMemo(() => ({ ...quote.problems, ...(phase.step === "stopped" ? phase.problems : undefined) }), [quote.problems, phase]);

  const checkedIn = signer !== null && pass.expiresAt !== null && !authLost;
  const journeyIds = useMemo(() => (trackId && !saved.includes(trackId) ? [trackId, ...saved] : saved), [saved, trackId]);

  const enabled = useMemo(() => {
    const s = new Set<StepId>(["checkin"]);
    if (checkedIn) s.add("party");
    if (checkedIn && selected.length > 0) s.add("region");
    if (s.has("region") && country) s.add("home");
    if (s.has("home") && addressOk) s.add("review");
    if (s.has("review") && (quote.estimate !== null || phase.step !== "idle")) s.add("release");
    // A release under way (or a saved one being finished) keeps its stop, whatever else lapsed.
    if (holdRelease || finishing || (checkedIn && phase.step !== "idle")) s.add("release");
    if (signer && journeyIds.length > 0) s.add("journey");
    return s;
  }, [checkedIn, selected.length, country, addressOk, quote.estimate, phase.step, holdRelease, finishing, signer, journeyIds.length]);

  let step: StepId = holdRelease ? "release" : urlStep;
  while (!enabled.has(step)) step = STEP_IDS[Math.max(0, stepIndex(step) - 1)];
  const summaries = useShipmentSummaries(api, journeyIds, pass.status === "active" && (step === "journey" || step === "checkin"));
  const shownTrack = step === "journey" ? (trackId ?? journeyIds[0] ?? null) : null;
  const tracked = useShipment(api, shownTrack, pass.status === "active");
  const allByMint = useMemo(() => new Map(kit.cards.map((c) => [c.nftAddress, c])), [kit.cards]);
  const imageOf = useCallback((m: string) => cardImage(m, "front", 240, { images: allByMint.get(m)?.images }), [allByMint]);

  const done = useMemo(() => {
    const s = new Set<StepId>();
    if (checkedIn) s.add("checkin");
    if (selected.length > 0) s.add("party");
    if (country) s.add("region");
    if (addressOk) s.add("home");
    if (quote.estimate) s.add("review");
    if (phase.step === "done") s.add("release");
    return s;
  }, [checkedIn, selected.length, country, addressOk, quote.estimate, phase.step]);

  // Keep the address bar honest: it names the stop on screen.
  useEffect(() => {
    if (urlStep !== step) navigate(step, "replace", step === "journey" ? trackId : null);
  }, [urlStep, step, trackId]);

  // Bring the new stop into view and give its heading focus, for keyboards and screen readers.
  const stage = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const shown = useRef<StepId | null>(null);
  useEffect(() => {
    if (shown.current === null) {
      shown.current = step;
      return;
    }
    if (shown.current === step) return;
    shown.current = step;
    const el = stage.current;
    if (el && el.getBoundingClientRect().top < 0) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    heading.current?.focus({ preventScroll: true });
  }, [step]);

  // A release in flight shouldn't be lost to a closed tab by accident.
  useEffect(() => {
    if (!running) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [running]);

  // Preview: two past journeys, so the returning-trainer path can be reviewed too.
  useEffect(() => {
    if (!preview || !wallet || kit.seedShipments.length === 0) return;
    const have = readShipments(wallet);
    for (const id of [...kit.seedShipments].reverse()) if (!have.includes(id)) rememberShipment(wallet, id);
  }, [preview, wallet, kit.seedShipments]);

  const go = (s: StepId) => {
    if (holdRelease && s !== "release") return;
    if (!enabled.has(s)) return;
    navigate(s, "push", s === "journey" ? trackId : null);
  };

  /** A changed party or address makes an unsent release stale: drop it, never one in motion. */
  const settle = () => {
    if (phase.step === "repriced" || phase.step === "done" || (phase.step === "stopped" && SAFE_NEXT.has(phase.next.kind))) {
      release.reset();
      setFinishing(null);
    }
  };

  const toggle = (mint: string) => {
    settle();
    setSelected((s) => (s.includes(mint) ? s.filter((m) => m !== mint) : s.length >= MAX_CARDS ? s : [...s, mint]));
  };

  const pickCountry = (c: Country, fromList: boolean) => {
    settle();
    setCountry(c);
    setFocus((f) => ({ num: c.num, seq: (f?.seq ?? 0) + 1, fit: fromList }));
  };

  const startRelease = async () => {
    const e = quote.estimate;
    if (startLock.current || phase.step !== "idle" || !e || !address || !addressOk || selected.length === 0) return;
    startLock.current = true;
    try {
      // A pass about to lapse renews first, so the release doesn't stop halfway for one.
      if (pass.status !== "active" || !pass.expiresAt || pass.expiresAt - Date.now() < 180_000) {
        if (!(await pass.open())) return;
      }
      const note = comment.trim();
      await release.release({ body: { nftAddresses: selected, shippingAddressId: address.id, ...(note ? { comment: note } : {}) }, confirmedCents: e.totalCents });
    } finally {
      startLock.current = false;
    }
  };

  const finishSaved = async (id: string) => {
    if (startLock.current || running) return;
    startLock.current = true;
    setFinishing(id);
    navigate("release", "push", null);
    try {
      // No known total: whatever the rest costs is shown and confirmed before signing.
      await release.finishSaved(id, null);
    } finally {
      startLock.current = false;
    }
  };

  const resign = async () => {
    if (await kit.resignIn()) {
      setAuthLost(false);
      if (phase.step === "stopped") void release.retry();
    }
  };

  const nav = (k: NavKind) => {
    if (k === "review") return go("review");
    if (k === "address") return go("home");
    if (k === "journey") {
      if (phase.step === "stopped" && !SAFE_NEXT.has(phase.next.kind)) {
        // The journey picks a shipment in motion back up from here on.
        release.reset();
        setFinishing(null);
      }
      return go("journey");
    }
    return go("party");
  };

  const meta = STEPS[stepIndex(step)];
  const renewPass = () => void pass.open();
  const city = addressOk ? address.city : null;
  const dest = shownTrack ? destinations[shownTrack] : undefined;

  return (
    <div className="rd-app">
      <RouteNav current={step} done={done} enabled={holdRelease ? new Set<StepId>(["release"]) : enabled} onGo={go} />
      <div className="rd-board">
        <section ref={stage} className="rd-stage" aria-labelledby="rd-step-h" data-step={step}>
          <header className="rd-stage-head">
            <Badge kind={meta.badge} size={52} className="rd-stage-badge" />
            <div className="min-w-0">
              <span className="rd-label">
                {fmt(t.redeem.stopOf, { n: meta.n, total: STEPS[STEPS.length - 1].n })}
                {preview ? " · preview" : ""}
              </span>
              <h2 id="rd-step-h" ref={heading} tabIndex={-1} className="rd-display rd-stage-title">
                {t.redeem.steps[step].title}
              </h2>
              <p className="rd-stage-lede">{fmt(t.redeem.steps[step].lede, { max: MAX_CARDS })}</p>
            </div>
          </header>

          {authLost && step !== "checkin" && (
            <div className="rd-banner" role="alert">
              <span>{lab.authLost}</span>
              <button type="button" className="rd-btn rd-btn-gold" onClick={() => void resign()}>
                {t.redeem.actions.signInAgain}
              </button>
            </div>
          )}
          {!authLost && pass.status === "expired" && step !== "checkin" && step !== "release" && (
            <div className="rd-banner">
              <span>{lab.passExpired}</span>
              <button type="button" className="rd-btn rd-btn-gold" onClick={renewPass} disabled={pass.status !== "expired"}>
                {t.redeem.actions.renewPass}
              </button>
            </div>
          )}

          {step === "checkin" && (
            <CheckIn
              preview={preview}
              pass={pass}
              holder={kit.holder}
              savedCount={journeyIds.length}
              authLost={authLost}
              onResign={() => void resign()}
              onNext={() => go("party")}
              onJourney={() => navigate("journey", "push", trackId ?? journeyIds[0] ?? null)}
            />
          )}
          {step === "party" && (
            <Party
              cards={cards}
              loading={kit.cardsLoading}
              failed={kit.cardsFailed}
              selected={selected}
              problems={problems}
              onToggle={toggle}
              onSet={(m) => {
                settle();
                setSelected(m);
              }}
              onNext={() => go("region")}
              onBack={() => go("checkin")}
            />
          )}
          {step === "region" && <Region country={country} focus={focus} cards={selected.length} declaredCents={declared} onPick={pickCountry} onNext={() => go("home")} onBack={() => go("party")} />}
          {step === "home" && country && (
            <Hometown
              country={country}
              book={book}
              passActive={pass.status === "active"}
              onRenewPass={renewPass}
              selectedId={addressId}
              onSelect={(a) => {
                settle();
                setAddressId(a?.id ?? null);
                const c = a ? countryByName(a.country) : undefined;
                if (c && c.num !== country.num) pickCountry(c, true);
              }}
              onNext={() => go("review")}
              onBack={() => go("region")}
              onRegion={() => go("region")}
            />
          )}
          {step === "review" && country && address && (
            <Review
              cards={party}
              country={country}
              address={address}
              quote={quote}
              passActive={pass.status === "active"}
              onRenewPass={renewPass}
              comment={comment}
              onComment={setComment}
              onDrop={(mints) => {
                settle();
                setSelected((s) => s.filter((m) => !mints.includes(m)));
              }}
              onNext={() => go("release")}
              onBack={() => go("home")}
              onParty={() => go("party")}
              onAddress={() => go("home")}
            />
          )}
          {step === "release" && (
            <Release
              phase={phase}
              cards={party}
              country={country}
              address={address}
              totalCents={quote.estimate?.totalCents ?? null}
              finishing={finishing}
              pass={{ active: pass.status === "active", expiresAt: pass.expiresAt, onRenew: renewPass, signing: pass.status === "signing" }}
              onRelease={() => void startRelease()}
              onAccept={() => void release.acceptPrice()}
              onRetry={() => void release.retry()}
              onResign={() => void resign()}
              onNav={nav}
            />
          )}
          {step === "journey" && (
            <Journey
              tracked={tracked}
              passActive={pass.status === "active"}
              passSigning={pass.status === "signing"}
              onRenewPass={renewPass}
              trackId={shownTrack}
              onTrack={(id) => navigate("journey", "push", id)}
              saved={journeyIds}
              summaries={summaries}
              destinations={destinations}
              imageOf={imageOf}
              releaseBusy={running}
              onFinish={(id) => void finishSaved(id)}
              onNew={() => {
                if (running) return;
                release.reset();
                setFinishing(null);
                setSelected([]);
                setComment("");
                navigate("party", "push", null);
              }}
            />
          )}
        </section>

        <aside className="rd-side" aria-label={lab.summary}>
          {step === "journey" ? (
            <TravelPass
              holder={kit.holder}
              status={pass.status}
              expiresAt={pass.expiresAt}
              cards={tracked.shipment?.nftAddresses.length ?? 0}
              declaredCents={0}
              country={dest?.country ?? null}
              city={dest?.city ?? null}
              estimate={null}
              shipmentId={shownTrack}
              ticket={{
                cards: tracked.shipment?.nftAddresses.length ?? null,
                declaredCents: dest?.declaredCents ?? null,
                shippingCents: tracked.shipment?.shippingCents ?? null,
                totalCents: tracked.shipment?.totalCents ?? null,
              }}
            />
          ) : (
            <TravelPass
              holder={kit.holder}
              status={pass.status}
              expiresAt={pass.expiresAt}
              cards={selected.length}
              declaredCents={declared}
              country={country}
              city={city}
              estimate={quote.estimate}
              shipmentId={phase.step === "done" ? phase.burned.shipmentId : null}
            />
          )}
          <div className="rd-side-help">
            {pass.status === "active" && pass.expiresAt ? (
              <p>{slots(lab.passLeft, { timer: <PassTimer until={pass.expiresAt} /> })}</p>
            ) : (
              <p>{lab.passAbout}</p>
            )}
            {!preview && w.cluster === "devnet" && <p className="rd-dev">{lab.devnet}</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Moves to a stop with a history entry (or in place), carrying the tracked shipment on the journey. */
function navigate(step: StepId, mode: "push" | "replace", shipment: string | null) {
  const url = new URL(window.location.href);
  if (step === "checkin") url.searchParams.delete("step");
  else url.searchParams.set("step", step);
  if (step === "journey" && shipment) url.searchParams.set("shipment", shipment);
  else url.searchParams.delete("shipment");
  if (url.href === window.location.href) return;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
}
