import type { Strings } from "../en";
import type { Translation } from "../types";

export const token: Translation<Strings["token"]> = {
  copy: {
    label: "Sao chép địa chỉ hợp đồng CARDS",
    idle: "Sao chép",
    copied: "Đã chép ✓",
    selected: "Đã chọn"
  },
  ticker: {
    price: "GIÁ",
    srPrice: "Giá CARDS",
    unavailable: "Không có dữ liệu",
    unit: "24h",
    updated: "Cập nhật lúc {time}"
  },
  countdown: {
    label: "Thời gian còn lại đến đợt mở khóa",
    units: { days: "NGÀY", hours: "GIỜ", minutes: "PHÚT", seconds: "GIÂY" },
    words: {
      days: { other: "ngày" },
      hours: { other: "giờ" },
      minutes: { other: "phút" },
      seconds: { other: "giây" }
    },
    done: "ĐÃ MỞ KHÓA!"
  },
  live: {
    packs: "PACK ĐÃ MỞ",
    inLastSeconds: { other: "trong {n} giây qua" },
    inLastMinutes: { other: "trong {n} phút qua" },
    noWindow: "trong khung dữ liệu",
    dollars: "TIỀN ĐÃ CHI",
    dollarsNote: "giá pack, không tính lượt quay miễn phí",
    pace: "TỐC ĐỘ",
    paceValue: "{n}/phút",
    paceNote: "pack mỗi phút",
    buybacks: "CHO MUA LẠI",
    buybacksNote: "theo tỉ lệ 30 ngày (ước tính)",
    list: "Thẻ trúng mới nhất",
    free: "Miễn phí",
    error: "Dữ liệu trực tiếp hiện không khả dụng.",
    waiting: "Đang chờ pack tiếp theo…"
  }
};
