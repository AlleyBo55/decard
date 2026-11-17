import type { Strings } from "../en";
import type { Translation } from "../types";
// Typed against the English shape: Translation<> reads any object with an `other` key as a plural,
// so an inline literal here fails the excess-property check although the runtime overlay merges it key by key.
const battle: Strings["ui"]["gameBoy"]["battle"] = {
  "sale": "จับได้แล้ว! {card} ถูกจับไปในราคา {price}!",
  "saleNoPrice": "จับได้แล้ว! {card} ถูกจับแล้ว!",
  "bidTaken": "{card} รับข้อเสนอ {price}!",
  "bidTakenNoPrice": "{card} รับข้อเสนอแล้ว!",
  "listed": "{card} ป่าปรากฏตัวในตลาด!",
  "reprice": "{card} เปลี่ยนราคา!",
  "delist": "{card} หนีออกจากตลาด!",
  "newBid": "เทรนเนอร์ {trainer} ขว้างข้อเสนอใส่ {card}!",
  "bidEdit": "เทรนเนอร์ {trainer} ปรับข้อเสนอของ {card}",
  "bidPulled": "เทรนเนอร์ {trainer} เรียกข้อเสนอของ {card} กลับคืน",
  "other": "มีบางอย่างเกิดขึ้นกับ {card}..."
};
export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "ขายแล้ว",
    "BID TAKEN": "รับข้อเสนอ",
    "REPRICE": "ปรับราคา",
    "DELIST": "ยกเลิกขาย",
    "LISTED": "ลงขาย",
    "NEW BID": "บิดใหม่",
    "BID EDIT": "แก้บิด",
    "BID PULLED": "ถอนบิด"
  },
  "ripTiers": {
    "common": { "label": "คอมมอน", "ballName": "มอนสเตอร์บอล", "cry": "จับได้แล้ว!" },
    "rare": { "label": "แรร์", "ballName": "ซูเปอร์บอล", "cry": "จับได้สวย!" },
    "epic": { "label": "เอพิก", "ballName": "ไฮเปอร์บอล", "cry": "จับได้สุดยอด!" },
    "legendary": { "label": "เลเจนดารี", "ballName": "มาสเตอร์บอล", "cry": "ตัวในตำนานปรากฏตัว!" }
  },
  "gachaTiers": {
    "common": "คอมมอน",
    "uncommon": "อันคอมมอน",
    "rare": "แรร์",
    "epic": "เอพิก"
  },
  "primitives": {
    "otherCategory": "อื่น ๆ",
    "deal": "ดีล",
    "dealScore": "คะแนนดีล {score}/100",
    "loading": "กำลังโหลด"
  },
  "unknownCard": "การ์ดไม่ทราบชื่อ",
  "cardTile": {
    "unlisted": "ยังไม่ลงขาย",
    "insured": "ประกัน {value}"
  },
  "activity": {
    "unresolvedCard": "การ์ดที่ยังระบุไม่ได้",
    "fromWallet": "จาก {wallet}",
    "byWallet": "โดย {wallet}",
    "currentHolder": "ผู้ถือปัจจุบัน · {address}",
    "bot": "บอต ×{n}",
    "botOffers": { "other": "{n} ข้อเสนอในธุรกรรมเดียว" }
  },
  "search": {
    "placeholderCompact": "ค้นหาการ์ดหรือวอลเล็ต",
    "placeholder": "ค้นหาการ์ด หรือวางที่อยู่วอลเล็ต",
    "label": "ค้นหาการ์ดหรือวอลเล็ต",
    "button": "ค้นหา",
    "searching": "กำลังค้นหา...",
    "empty": "ไม่พบการ์ด",
    "seeAll": { "other": "ดูผลลัพธ์ทั้งหมด {n} รายการ" }
  },
  "rail": { "left": "เลื่อนไปทางซ้าย", "right": "เลื่อนไปทางขวา" },
  "konami": { "on": "เปิดโหมด DMG แล้ว! ยินดีต้อนรับกลับสู่ปี 1996", "off": "กลับสู่โหมดสีเต็ม" },
  "gameBoy": {
    "modes": { "all": "ทั้งหมด", "trainers": "ไม่มีบอต", "sales": "การขาย" },
    "booting": "กำลังบูต DEX...",
    "empty": "ไม่มีเทรนเนอร์อยู่แถวนี้ รอความเคลื่อนไหวถัดไป...",
    "live": "สด",
    "device": {
      "power": "◀ OFF · ON ▶",
      "stripe": "LIVE ON-CHAIN · DOT MATRIX",
      "battery": "BATTERY",
      "model": "POCKET · {mode}",
      "select": "SELECT",
      "start": "START"
    },
    "aria": {
      "device": "Game Boy ตลาดสด ใช้ปุ่มลูกศรเพื่อดูเหตุการณ์ และกด Enter เพื่อเปิดการ์ด",
      "previous": "เหตุการณ์ก่อนหน้า",
      "next": "เหตุการณ์ถัดไป",
      "b": "B: เหตุการณ์ก่อนหน้า",
      "a": "A: เหตุการณ์ถัดไป",
      "select": "Select: ตัวกรองคือ {mode}",
      "start": "Start: เปิดฟีดซื้อขายเต็ม"
    },
    "battle": battle
  }
};
