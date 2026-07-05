# C++ Dojo — Web học &amp; luyện tập C++ cho Game Dev

Nền tảng học C++ nội bộ: đọc bài học có hệ thống, luyện tập ngay trong từng mục, và **ôn tập hàng ngày** kiểu spaced-repetition (giống Anki) để kiến thức không rơi rụng.

🔗 **Bản deploy:** https://rei-1407.github.io/Cpp/

---

## Tính năng

- **Bài học** tự sinh từ file tài liệu `Cpp_Game_Dev_Reference.md` — đổi tài liệu là cả web đổi theo. Phụ lục tách sang khu **Tra cứu**.
- **Luyện tập** tách riêng khỏi phần đọc (tab riêng): trắc nghiệm, "đoán output", thử thách code (mở thẳng trong Compiler Explorer để chạy thử).
- **Ôn tập hàng ngày** — thuật toán SM-2 lên lịch nhắc lại đúng lúc bạn sắp quên. Nội dung "xào đi xào lại" để nhớ lâu.
- **Bài tập thực hành** — đọc từ Phụ lục F, đánh dấu hoàn thành + lưu link PR/commit của bạn (cục bộ).
- **Tạo động lực:** hệ thống **cấp độ + XP**, **huy hiệu (achievements)**, **lịch hoạt động** kiểu GitHub, chuỗi ngày 🔥, mục tiêu ngày, thanh tiến độ theo từng phần.
- **Tìm kiếm** nhanh toàn bộ tài liệu, cheat sheet &amp; glossary.
- **Sáng/tối**, tối ưu cho desktop.
- Toàn bộ tiến độ lưu trên trình duyệt (localStorage) — không cần server, không cần đăng nhập.

## Chạy tại máy

```bash
npm install
npm run dev       # mở http://localhost:5173
npm run build     # build production vào dist/
npm run preview   # xem thử bản build
```

Yêu cầu Node 18+ (khuyến nghị 20+).

---

## Cách bổ sung / thay nội dung

### 1. Thay tài liệu học (quan trọng nhất)

Toàn bộ bài học được sinh từ **`Cpp_Game_Dev_Reference.md`** ở thư mục gốc. Chỉ cần giữ đúng cấu trúc heading:

```md
# C++ ...              ← H1 đầu tiên = tiêu đề tài liệu (bỏ qua)
# PHẦN I — ...         ← H1 = một "Phần" (nhóm bài)
## 1. Tên bài          ← H2 = một "Bài học"
...nội dung markdown...
## 2. ...
# PHẦN II — ...
```

Sửa/thay file này rồi commit — web sẽ tự cập nhật navigation, nội dung và mục lục. Không cần đụng vào code.

> Heading nằm trong khối code ```` ``` ```` sẽ được bỏ qua, nên code mẫu có `#include` không bị nhầm thành mục.

### 2. Thêm câu hỏi trắc nghiệm

Sửa [`src/data/quizzes.ts`](src/data/quizzes.ts). Key là **id của bài** (số mục, ví dụ `"10"`):

```ts
"10": [
  { id: "q10-1", q: "Câu hỏi?", choices: ["A", "B"], answer: 1, explain: "..." },
],
```

### 3. Thêm thẻ ôn tập (daily review)

Sửa [`src/data/cards.ts`](src/data/cards.ts):

```ts
{ id: "c-xyz", sectionId: "10", tag: "Smart pointer",
  front: "Câu hỏi?", back: "Đáp án (có thể dùng `markdown`).",
  code: "auto p = std::make_unique<T>();" },
```

### 4. Thêm thử thách code / đoán output

Sửa [`src/data/challenges.ts`](src/data/challenges.ts). Loại `predict` (đoán output) hoặc `code` (viết code + lời giải tham khảo).

---

## Deploy (GitHub Pages)

Đã cấu hình sẵn CI ở [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Vào **Settings → Pages** của repo, mục **Build and deployment → Source** chọn **GitHub Actions**.
2. Mỗi lần `push` lên nhánh `main`, Actions sẽ tự build &amp; deploy.

> Nếu đổi tên repo (khác `Cpp`), sửa `base` trong [`vite.config.ts`](vite.config.ts) cho khớp (`/<tên-repo>/`).

---

## Cấu trúc mã nguồn

```
Cpp_Game_Dev_Reference.md   ← nguồn nội dung (thay tài liệu ở đây)
src/
  content/parse.ts          ← parser markdown → Phần/Bài
  lib/srs.ts                ← thuật toán spaced-repetition (SM-2)
  lib/store.ts              ← state + localStorage (XP, streak, tiến độ)
  data/                     ← quizzes / cards / challenges (nội dung luyện tập)
  components/               ← Sidebar, Topbar, Markdown, Quiz, Flashcard...
  pages/                    ← Dashboard, Lesson, Review, Reference
```

*Sản phẩm nội bộ phục vụ học tập.*
