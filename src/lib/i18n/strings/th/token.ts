import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "คัดลอกที่อยู่สัญญา CARDS",
    "idle": "คัดลอก",
    "copied": "คัดลอกแล้ว ✓",
    "selected": "เลือกแล้ว"
  },
  "ticker": {
    "price": "ราคา",
    "srPrice": "ราคา CARDS",
    "unavailable": "ไม่มีข้อมูล",
    "unit": "24 ชม.",
    "updated": "อัปเดต {time}"
  },
  "countdown": {
    "label": "เวลาที่เหลือก่อนการปลดล็อก",
    "units": { "days": "วัน", "hours": "ชม.", "minutes": "นาที", "seconds": "วิ" },
    "words": {
      "days": { "other": "วัน" },
      "hours": { "other": "ชั่วโมง" },
      "minutes": { "other": "นาที" },
      "seconds": { "other": "วินาที" }
    },
    "done": "ปลดล็อกแล้ว!"
  },
  "live": {
    "packs": "แพ็กที่เปิด",
    "inLastSeconds": { "other": "ใน {n} วินาทีที่ผ่านมา" },
    "inLastMinutes": { "other": "ใน {n} นาทีที่ผ่านมา" },
    "noWindow": "ในช่วงเวลาของฟีด",
    "dollars": "ยอดเงินที่เปิด",
    "dollarsNote": "ราคาแพ็ก ไม่รวมการสุ่มฟรี",
    "pace": "ความเร็ว",
    "paceValue": "{n}/นาที",
    "paceNote": "แพ็กต่อนาที",
    "buybacks": "สมทบการซื้อคืน",
    "buybacksNote": "ตามอัตรา 30 วัน (ประมาณการ)",
    "list": "การสุ่มล่าสุด",
    "free": "ฟรี",
    "error": "ฟีดสดใช้งานไม่ได้ในตอนนี้",
    "waiting": "รอแพ็กถัดไป…"
  }
};
