import type { Strings } from "../en";
import type { Translation } from "../types";
export const card: Translation<Strings["card"]> = {
  "meta": {
    "notFound": "ไม่พบการ์ด",
    "title": "ราคา {name} · {set}",
    "titleNoSet": "ราคา {name}",
    "description": "{name} มูลค่าประกัน {insured} ดูราคาสด Pop Report ข้อเสนอซื้อ และประวัติบนเชนได้ที่ Decard",
    "imageAlt": "{name}: มูลค่าประกัน รายการขาย ข้อเสนอซื้อสูงสุด และยอด Pop",
    "pullImageAlt": "{name} เปิดได้จากแพ็ก {pack} มูลค่าประกัน {insured}",
    "pullTitle": "เปิดได้ {name} จากแพ็ก {pack}",
    "pullDescription": "มูลค่าประกัน {insured} คิดเป็น {multiple} ของราคาแพ็ก ราคาแพ็กกำหนดโดยผู้แชร์ ดูราคาสด Pop Report และข้อเสนอซื้อได้ที่ Decard",
    "pullDescriptionNoValue": "ราคาแพ็กกำหนดโดยผู้แชร์ ดูราคาสด Pop Report และข้อเสนอซื้อได้ที่ Decard"
  },
  "jsonLd": {
    "gradingCompany": "บริษัทเกรด",
    "grade": "เกรด",
    "set": "ชุด",
    "year": "ปี",
    "cardNumber": "หมายเลขการ์ด",
    "parallel": "พาราเรล",
    "certNumber": "เลขใบรับรอง",
    "gradePopulation": "ยอด Pop ของเกรดนี้",
    "populationHigher": "ยอด Pop ที่เกรดสูงกว่า",
    "totalPopulation": "ยอด Pop ที่เกรดแล้วทั้งหมด",
    "identifier": "เลขใบรับรอง {company} {cert}",
    "anyGrader": "การเกรด"
  },
  "loading": "กำลังโหลดการ์ด",
  "breadcrumb": {
    "label": "เส้นทางนำทาง",
    "scanner": "สแกนเนอร์"
  },
  "sharedPull": {
    "label": "ผลการเปิดที่แชร์มา",
    "kicker": "ผลเปิดที่แชร์มา",
    "pulled": "เปิดได้จากแพ็ก {pack}",
    "pulledWithValue": "เปิดได้จากแพ็ก {pack} มูลค่าประกันคิดเป็น {multiple} ของราคาแพ็ก",
    "note": "ราคาแพ็กมาจากผู้ที่แชร์ลิงก์นี้",
    "cta": "ให้คะแนนการสุ่มของคุณเอง →"
  },
  "actions": {
    "viewOnCollectorCrypt": "ดูบน Collector Crypt ↗",
    "buyOnSlabz": "ซื้อบน Slabz · {price} ↗"
  },
  "authenticated": "✓ ยืนยันของแท้แล้ว",
  "rarity": {
    "LEGENDARY": "เลเจนดารี",
    "RARE": "แรร์",
    "UNCOMMON": "อันคอมมอน",
    "COMMON": "คอมมอน"
  },
  "price": {
    "listed": "ราคาตั้งขาย",
    "notListed": "ยังไม่ลงขาย",
    "listedOn": "บน {venue} · อัปเดต {ago}",
    "insured": "มูลค่าประกัน",
    "bestBid": "ข้อเสนอสูงสุด",
    "underInsured": "ต่ำกว่ามูลค่าประกัน {pct}%",
    "overInsured": "สูงกว่ามูลค่าประกัน {pct}%"
  },
  "facts": {
    "title": "ข้อมูลโปเกเด็กซ์",
    "set": "ชุด",
    "year": "ปี",
    "number": "หมายเลข",
    "parallel": "พาราเรล",
    "grader": "บริษัทเกรด",
    "grade": "เกรด",
    "cert": "เลขเซอร์",
    "vault": "ห้องนิรภัย",
    "token": "โทเคน"
  },
  "pop": {
    "title": "ค่าพลังพื้นฐาน · Pop Report ของ {company}",
    "fullReport": "Pop Report ฉบับเต็ม ↗",
    "grade": "Pop เกรด {grade}",
    "plain": "ยอด Pop",
    "higher": "สูงกว่า",
    "total": "ทั้งหมด",
    "gemRate": "อัตรา Gem",
    "summary": "เกรดนี้มี {pop} ใบ จากทั้งหมด {total} ใบ และเกรดสูงกว่านี้ {higher} ใบ",
    "summaryNoneHigher": "เกรดนี้มี {pop} ใบ จากทั้งหมด {total} ใบ และไม่มีใบไหนเกรดสูงกว่า",
    "lastGem": "เกรดได้ Gem ล่าสุดเมื่อ {date}"
  },
  "bids": {
    "title": "ข้อเสนอซื้อสด",
    "count": "ข้อเสนอซื้อสด ({n})",
    "unavailable": "ตอนนี้ดูข้อเสนอซื้อสดไม่ได้ ลองกลับมาใหม่ในอีกสักครู่",
    "none": "ยังไม่มีข้อเสนอซื้อ มาเป็นเทรนเนอร์คนแรกที่ยื่นข้อเสนอสิ",
    "ofInsured": "{pct}% ของประกัน"
  },
  "trainer": {
    "title": "เทรนเนอร์",
    "collectorCryptName": "ชื่อบน Collector Crypt: {name}",
    "open": "เปิดบัตรเทรนเนอร์ →",
    "unknown": "ไม่ทราบเจ้าของ"
  },
  "history": {
    "title": "ประวัติบนเชน",
    "error": "อ่านประวัติของการ์ดใบนี้ไม่ได้ในตอนนี้",
    "empty": "ยังไม่มีประวัติในมาร์เก็ตเพลสบนเชน"
  },
  "slab": {
    "showFront": "แสดงด้านหน้าสแลบ",
    "showBack": "แสดงด้านหลังสแลบ",
    "backAlt": "{name} ด้านหลังสแลบ",
    "flip": "↻ พลิกสแลบ"
  },
  "related": {
    "sameKicker": "เทียบเกรด",
    "sameTitle": "สแลบ {name} อื่น ๆ ที่วางขายตอนนี้",
    "sameSub": "ราคาตั้งขายปัจจุบัน ถูกสุดขึ้นก่อน",
    "sameLabel": "รายการขาย {name} อื่น ๆ",
    "hubLink": "ราคาการ์ด {name} แยกตามเกรด",
    "scannerLink": "ทุกรายการขาย {name} ในสแกนเนอร์",
    "setKicker": "ชุดเดียวกัน",
    "setTitle": "เพิ่มเติมจาก {set}",
    "setSub": "รายการใหม่ล่าสุดขึ้นก่อน",
    "setLabel": "รายการขายเพิ่มเติมจาก {set}"
  },
  "receipt": {
    "button": "แชร์ผลการเปิด",
    "close": "ปิด",
    "slabLabel": "สแลบของคุณ",
    "title": "ใบเสร็จการเปิดแพ็ก",
    "heading": "แชร์การ์ดที่คุณเปิดได้",
    "statsLabel": "ค่าสถานะสแลบ",
    "insured": "ประกัน",
    "bestBid": "ข้อเสนอสูงสุด",
    "listedAt": "ตั้งขาย {price} บน {venue}",
    "notListed": "ตอนนี้ยังไม่ลงขาย",
    "checking": "กำลังเช็ครายการขาย…",
    "packQuestion": "แพ็กนี้ราคาเท่าไร?",
    "optional": "ไม่บังคับ",
    "otherAmount": "จำนวนอื่น",
    "otherAmountLabel": "ราคาแพ็กอื่นเป็นดอลลาร์",
    "noPack": "ไม่มีแพ็ก",
    "invalidPack": "ใส่ $1 ถึง $100,000",
    "meter": "ประกัน ÷ แพ็ก",
    "exp": "EXP",
    "noteMultiple": "มูลค่าประกันคิดเป็น {multiple} ของราคาแพ็ก {pack}",
    "notePick": "เลือกราคาแพ็กเพื่อดูว่าได้กี่เท่า",
    "noteNoValue": "สแลบนี้ไม่มีข้อมูลมูลค่าประกัน",
    "shareIt": "แชร์เลย",
    "postOnX": "โพสต์บน X",
    "saveImage": "บันทึกรูปภาพ",
    "more": "เพิ่มเติม",
    "copy": "คัดลอก",
    "preview": "ตัวอย่างลิงก์",
    "previewNote": "สิ่งที่ X และ Discord จะแสดง",
    "previewAlt": "รูปสำหรับแชร์ของ {name}",
    "rendering": "กำลังสร้างภาพ…",
    "fine": "คุณกำหนดราคาแพ็กเอง และไม่มีอะไรตรวจสอบตัวเลขนี้ มูลค่าประกันเป็นตัวเลขของ Collector Crypt ไม่ใช่ราคาขาย ตัวเลขในรูปสำหรับแชร์รีเฟรชวันละครั้ง",
    "lidTag": "ใบเสร็จการเปิด",
    "share": "แชร์",
    "copyLink": "คัดลอกลิงก์",
    "toast": {
      "discord": "คัดลอกแล้ว วางใน Discord แล้วใบเสร็จจะแสดงขึ้นมา",
      "copied": "คัดลอกลิงก์แล้ว",
      "copyFailed": "คัดลอกไม่ได้ กดค้างที่ลิงก์แทน",
      "shareFailed": "เมนูแชร์ไม่เปิด คัดลอกลิงก์แทน"
    },
    "say": {
      "throw": "DECARD ใช้มอนสเตอร์บอล!",
      "click": "แกร๊ก!",
      "multiple": "มูลค่าประกัน: {multiple} ของแพ็ก {pack}!",
      "caught": "จับได้แล้ว! จับ {name} สำเร็จ!"
    },
    "post": {
      "pulled": "เปิดได้ {name} จากแพ็ก {pack}",
      "pulledWithValue": "เปิดได้ {name} จากแพ็ก {pack} มูลค่าประกัน {insured} ({multiple} ของราคาแพ็ก)",
      "insured": "มูลค่าประกัน {insured}",
      "pop": "ยอด Pop {pop}"
    }
  },
  "stage": {
    "showFront": "แสดงด้านหน้าของสแลบ",
    "showBack": "แสดงด้านหลังของสแลบ",
    "flip": "↻ พลิก",
    "tilt": "◎ เอียง",
    "skip": "ข้าม ▸▸"
  }
};
