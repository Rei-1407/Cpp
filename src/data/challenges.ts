// Hands-on practice: "predict the output" puzzles and open coding challenges.
// No backend/compiler is required — challenges are self-checked, with a reference
// solution you reveal on demand, plus a one-click "open in Compiler Explorer" link
// so you can actually run/experiment with the code.

export interface Challenge {
  id: string;
  sectionId: string;
  type: "predict" | "code";
  title: string;
  prompt: string;
  /** code shown to the user (the puzzle, or starter for a coding task) */
  code: string;
  /** for `predict`: the exact expected stdout */
  expected?: string;
  /** for `code`: a reference solution revealed on demand */
  solution?: string;
  hints?: string[];
}

export const challenges: Record<string, Challenge[]> = {
  "6": [
    {
      id: "ch6-1",
      sectionId: "6",
      type: "predict",
      title: "Con trỏ thay đổi giá trị",
      prompt: "Chương trình in ra gì?",
      code: `#include <iostream>
int main() {
    int a = 10, b = 20;
    int* p = &a;
    *p = 15;
    p = &b;
    *p = 25;
    std::cout << a << " " << b;
}`,
      expected: "15 25",
      hints: ["`p` trỏ tới a trước, rồi được trỏ lại sang b.", "Mỗi `*p = ...` ghi vào biến mà p đang trỏ."],
    },
  ],
  "10": [
    {
      id: "ch10-1",
      sectionId: "10",
      type: "code",
      title: "Chuyển raw pointer sang smart pointer",
      prompt:
        "Đoạn code dưới rò rỉ bộ nhớ nếu `mightThrow()` ném exception. Viết lại dùng smart pointer để an toàn (RAII).",
      code: `void spawn() {
    Enemy* e = new Enemy();
    mightThrow();        // nếu ném -> rò rỉ e!
    world.add(e);
    delete e;
}`,
      solution: `void spawn() {
    auto e = std::make_unique<Enemy>();
    mightThrow();               // exception -> e tự giải phóng
    world.add(std::move(e));    // chuyển ownership vào world
}`,
      hints: ["Dùng `std::make_unique`.", "Chuyển quyền sở hữu bằng `std::move`."],
    },
  ],
  "15": [
    {
      id: "ch15-1",
      sectionId: "15",
      type: "predict",
      title: "Đa hình runtime",
      prompt: "Chương trình in ra gì?",
      code: `#include <iostream>
struct Shape { virtual void name() { std::cout << "Shape "; } };
struct Circle : Shape { void name() override { std::cout << "Circle "; } };
int main() {
    Shape* s = new Circle();
    s->name();
    delete s;
}`,
      expected: "Circle ",
      hints: ["`name()` là virtual → dynamic dispatch.", "Con trỏ base trỏ tới Circle → gọi override của Circle."],
    },
  ],
  "20": [
    {
      id: "ch20-1",
      sectionId: "20",
      type: "predict",
      title: "vector và range-based for",
      prompt: "Chương trình in ra gì?",
      code: `#include <iostream>
#include <vector>
int main() {
    std::vector<int> v{1, 2, 3};
    v.push_back(4);
    int sum = 0;
    for (int x : v) sum += x;
    std::cout << v.size() << " " << sum;
}`,
      expected: "4 10",
      hints: ["push_back thêm phần tử thứ 4.", "Tổng 1+2+3+4."],
    },
  ],
  "21": [
    {
      id: "ch21-1",
      sectionId: "21",
      type: "code",
      title: "Sắp xếp giảm dần bằng STL",
      prompt:
        "Cho `std::vector<int> v`. Hãy sắp xếp `v` theo thứ tự GIẢM DẦN chỉ bằng một lời gọi `std::sort` với lambda.",
      code: `std::vector<int> v{3, 1, 4, 1, 5, 9, 2, 6};
// sắp xếp giảm dần ...`,
      solution: `std::sort(v.begin(), v.end(),
          [](int a, int b) { return a > b; });`,
      hints: ["Comparator trả về `a > b` cho thứ tự giảm dần.", "Đừng quên `#include <algorithm>`."],
    },
  ],
  "46": [
    {
      id: "ch46-1",
      sectionId: "46",
      type: "predict",
      title: "Narrowing khi ép kiểu",
      prompt: "Chương trình in ra gì?",
      code: `#include <iostream>
int main() {
    int   j = 3.7f;      // narrowing: cắt phần thập phân
    float f = 5;         // 5 -> 5.0
    std::cout << j << " " << f;
}`,
      expected: "3 5",
      hints: ["`int j = 3.7f` cắt phần thập phân → 3.", "`std::cout` in float 5.0 là \"5\"."],
    },
  ],
  "25": [
    {
      id: "ch25-1",
      sectionId: "25",
      type: "code",
      title: "Viết khung game loop",
      prompt:
        "Viết một game loop tối thiểu chạy khi `running == true`, gọi ProcessInput, Update(dt) và Render mỗi frame.",
      code: `bool running = true;
float dt = 0.016f;
// game loop ...`,
      solution: `while (running) {
    ProcessInput();
    Update(dt);
    Render();
}`,
      hints: ["Thứ tự: Input → Update → Render.", "Update nhận deltaTime để độc lập framerate."],
    },
  ],
};

export function challengesFor(sectionId: string): Challenge[] {
  return challenges[sectionId] ?? [];
}

/** Base Compiler Explorer editor. The UI copies the snippet to the clipboard
 *  and opens this so you can paste + run it reliably (no fragile URL encoding). */
export const COMPILER_EXPLORER_URL = "https://godbolt.org/";
