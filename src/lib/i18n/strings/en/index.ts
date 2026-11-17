import { common } from "./common";
import { seo } from "./seo";
import { home } from "./home";
import { ui } from "./ui";
import { market } from "./market";
import { card } from "./card";
import { hubs } from "./hubs";
import { checker } from "./checker";
import { rip } from "./rip";
import { gym } from "./gym";
import { redeem } from "./redeem";
import { luck } from "./luck";
import { token } from "./token";
import { tokenPage } from "./tokenPage";
import { learn } from "./learn";
import { explainer } from "./explainer";

/** Every UI string on the site, English. Other languages translate any subset of these keys. */
export const en = { common, seo, home, ui, market, card, hubs, checker, rip, gym, redeem, luck, token, tokenPage, learn, explainer };

export type Strings = typeof en;
