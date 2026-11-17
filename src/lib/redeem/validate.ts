import type { Strings } from "@/lib/i18n/strings/types";
import type { AddressInput } from "./types";

// Inline checks for the address form. They catch typos before the provider does; the provider's
// own REDEEM_ADDRESS_REJECTED message still has the last word.

export type AddressField = "name" | "line1" | "line2" | "city" | "state" | "postalCode" | "phoneNumber" | "email";
export type AddressDraft = Record<AddressField, string>;
/** What's wrong with a field. The form words it: t.redeem.home.errors[error], with {max} from LIMITS. */
export type AddressError = keyof Strings["redeem"]["home"]["errors"];
export type AddressErrors = Partial<Record<AddressField, AddressError>>;

export const EMPTY_DRAFT: AddressDraft = { name: "", line1: "", line2: "", city: "", state: "", postalCode: "", phoneNumber: "", email: "" };

// The backend's own limits (decardbe usecase/redeem.go checkAddress), so nothing the form
// accepts comes back as INVALID_REQUEST.
export const LIMITS: Record<AddressField, number> = { name: 100, line1: 200, line2: 200, city: 100, state: 100, postalCode: 20, phoneNumber: 25, email: 254 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9 ()-]{6,24}$/;

export function checkField(field: AddressField, raw: string): AddressError | undefined {
  const v = raw.trim();
  if (v.length > LIMITS[field]) return "tooLong";
  switch (field) {
    case "line2":
      return undefined;
    case "name":
      return v ? undefined : "nameMissing";
    case "line1":
      return v ? undefined : "line1Missing";
    case "city":
      return v ? undefined : "cityMissing";
    case "state":
      return v ? undefined : "stateMissing";
    case "postalCode":
      return v ? (/^[A-Za-z0-9 -]{2,}$/.test(v) ? undefined : "postalCodeFormat") : "postalCodeMissing";
    case "phoneNumber": {
      if (!v) return "phoneMissing";
      const digits = v.replace(/\D/g, "").length;
      return PHONE.test(v) && digits >= 6 && digits <= 15 ? undefined : "phoneFormat";
    }
    case "email":
      return v ? (EMAIL.test(v) ? undefined : "emailFormat") : "emailMissing";
  }
}

export function checkDraft(d: AddressDraft): AddressErrors {
  const out: AddressErrors = {};
  for (const f of Object.keys(d) as AddressField[]) {
    const e = checkField(f, d[f]);
    if (e) out[f] = e;
  }
  return out;
}

/** `full` (an update) always sends line2, so clearing it clears it. */
export function toInput(d: AddressDraft, country: string, full = false): AddressInput {
  const t = (s: string) => s.trim().replace(/\s+/g, " ");
  const line2 = t(d.line2);
  return {
    name: t(d.name),
    line1: t(d.line1),
    ...(line2 || full ? { line2 } : {}),
    city: t(d.city),
    state: t(d.state),
    postalCode: t(d.postalCode),
    country,
    phoneNumber: t(d.phoneNumber),
    email: t(d.email),
  };
}
