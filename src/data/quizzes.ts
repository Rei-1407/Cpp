// Multiple-choice quizzes shown in each lesson's "Luyện tập" (Practice) tab.
// Keyed by section id. Extend freely — add a `sectionId: [...questions]` entry.

export interface QuizQuestion {
  id: string;
  q: string;
  /** optional C++ snippet shown above the choices */
  code?: string;
  choices: string[];
  answer: number; // index of the correct choice
  explain?: string;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  "1": [
    {
      id: "q1-1",
      q: "Lỗi 'unresolved external symbol' thuộc giai đoạn nào?",
      choices: ["Preprocessor", "Compiler", "Linker", "Runtime"],
      answer: 2,
      explain: "Đây là lỗi khi Linker không tìm thấy định nghĩa của một symbol đã khai báo.",
    },
    {
      id: "q1-2",
      q: "Một 'translation unit' là gì?",
      choices: [
        "Một dòng code sau khi dịch",
        "Một file .cpp sau khi preprocess",
        "Một file .exe cuối cùng",
        "Một thư viện .lib",
      ],
      answer: 1,
      explain: "Compiler dịch từng translation unit (file .cpp đã expand) độc lập thành object file.",
    },
    {
      id: "q1-3",
      q: "'Zero-overhead abstraction' nghĩa là gì?",
      choices: [
        "Không có abstraction nào cả",
        "Abstraction luôn miễn phí bộ nhớ",
        "Bạn không trả giá runtime cho thứ bạn không dùng",
        "Compiler bỏ qua mọi class",
      ],
      answer: 2,
    },
  ],
  "6": [
    {
      id: "q6-1",
      q: "Phát biểu nào ĐÚNG về reference?",
      choices: [
        "Có thể để null",
        "Phải khởi tạo ngay và không đổi target",
        "Cần toán tử * để truy cập giá trị",
        "Có thể tái gán trỏ sang biến khác",
      ],
      answer: 1,
    },
    {
      id: "q6-2",
      q: "Đoạn code sau in ra gì?",
      code: "int x = 5;\nint* p = &x;\n*p = 42;\nstd::cout << x;",
      choices: ["5", "42", "Địa chỉ của x", "Lỗi compile"],
      answer: 1,
      explain: "`*p = 42` ghi vào ô nhớ của x thông qua con trỏ, nên x = 42.",
    },
    {
      id: "q6-3",
      q: "Nên dùng gì thay cho `NULL` trong C++ hiện đại?",
      choices: ["0", "nullptr", "void*", "NIL"],
      answer: 1,
    },
  ],
  "9": [
    {
      id: "q9-1",
      q: "RAII gắn vòng đời tài nguyên vào đâu?",
      choices: [
        "Vào biến toàn cục",
        "Vào vòng đời của object (constructor/destructor)",
        "Vào garbage collector",
        "Vào hàm main()",
      ],
      answer: 1,
    },
    {
      id: "q9-2",
      q: "Ưu điểm lớn nhất của RAII khi có exception là gì?",
      choices: [
        "Chạy nhanh hơn",
        "Tài nguyên vẫn được giải phóng tự động khi stack unwinding",
        "Không cần destructor",
        "Tự động bắt mọi exception",
      ],
      answer: 1,
    },
  ],
  "10": [
    {
      id: "q10-1",
      q: "Mặc định nên chọn smart pointer nào cho sở hữu đơn?",
      choices: ["shared_ptr", "unique_ptr", "weak_ptr", "raw pointer"],
      answer: 1,
      explain: "unique_ptr là zero-overhead và diễn đạt đúng ý 'một owner'.",
    },
    {
      id: "q10-2",
      q: "`weak_ptr` chủ yếu dùng để?",
      choices: [
        "Tăng tốc độ truy cập",
        "Phá vỡ vòng tham chiếu của shared_ptr",
        "Thay thế unique_ptr",
        "Cấp phát trên stack",
      ],
      answer: 1,
    },
    {
      id: "q10-3",
      q: "Cách tạo unique_ptr được khuyến nghị?",
      code: "// ?",
      choices: [
        "new unique_ptr<T>()",
        "std::make_unique<T>(args)",
        "malloc(sizeof(T))",
        "unique_ptr<T> = T()",
      ],
      answer: 1,
    },
  ],
  "11": [
    {
      id: "q11-1",
      q: "`std::move(x)` thực chất làm gì?",
      choices: [
        "Sao chép x sang chỗ mới",
        "Xóa x khỏi bộ nhớ",
        "Ép x thành rvalue để chọn move ctor/assign",
        "Đổi kiểu x thành pointer",
      ],
      answer: 2,
    },
    {
      id: "q11-2",
      q: "Sau khi bị move, object nguồn ở trạng thái nào?",
      choices: [
        "Bị hủy hoàn toàn, không dùng được",
        "Giữ nguyên giá trị cũ",
        "Valid nhưng unspecified (nên chỉ gán lại hoặc hủy)",
        "Null pointer",
      ],
      answer: 2,
    },
  ],
  "13": [
    {
      id: "q13-1",
      q: "Rule of Three gồm ba hàm nào?",
      choices: [
        "Constructor, Getter, Setter",
        "Destructor, Copy constructor, Copy assignment",
        "Move ctor, Move assign, Destructor",
        "main, init, shutdown",
      ],
      answer: 1,
    },
    {
      id: "q13-2",
      q: "Cách tiếp cận được khuyến khích nhất là?",
      choices: [
        "Rule of Five luôn luôn",
        "Rule of Zero — để compiler tự sinh khi có thể",
        "Tự viết mọi thứ bằng tay",
        "Không dùng destructor",
      ],
      answer: 1,
    },
  ],
  "15": [
    {
      id: "q15-1",
      q: "Vì sao base class đa hình cần virtual destructor?",
      choices: [
        "Để chạy nhanh hơn",
        "Để delete qua con trỏ base gọi đúng destructor derived",
        "Để tiết kiệm bộ nhớ",
        "Vì compiler bắt buộc",
      ],
      answer: 1,
    },
    {
      id: "q15-2",
      q: "`= 0` sau một hàm virtual nghĩa là?",
      code: "virtual void Draw() = 0;",
      choices: [
        "Hàm trả về 0",
        "Pure virtual — class trở thành abstract",
        "Hàm bị vô hiệu hóa",
        "Hàm inline",
      ],
      answer: 1,
    },
    {
      id: "q15-3",
      q: "Từ khóa `override` giúp gì?",
      choices: [
        "Tăng tốc dispatch",
        "Bắt compiler kiểm tra đúng chữ ký hàm virtual của base",
        "Biến hàm thành static",
        "Ẩn hàm base",
      ],
      answer: 1,
    },
  ],
  "18": [
    {
      id: "q18-1",
      q: "`[&]` trong lambda nghĩa là?",
      choices: [
        "Capture mọi biến by value",
        "Capture mọi biến by reference",
        "Không capture gì",
        "Chỉ capture this",
      ],
      answer: 1,
      explain: "Cẩn thận dangling nếu lambda sống lâu hơn biến được capture.",
    },
  ],
  "20": [
    {
      id: "q20-1",
      q: "Container mặc định nên chọn trong hầu hết trường hợp?",
      choices: ["std::list", "std::vector", "std::map", "std::deque"],
      answer: 1,
      explain: "vector liền kề trong bộ nhớ → cache-friendly, truy cập O(1).",
    },
    {
      id: "q20-2",
      q: "Cần tra cứu key nhanh nhất, không cần thứ tự — chọn?",
      choices: ["std::map", "std::unordered_map", "std::vector", "std::set"],
      answer: 1,
    },
  ],
  "22": [
    {
      id: "q22-1",
      q: "Khác biệt chính giữa `const` và `constexpr`?",
      choices: [
        "Không có khác biệt",
        "constexpr tính được lúc compile-time",
        "const nhanh hơn constexpr",
        "constexpr chỉ dùng cho hàm",
      ],
      answer: 1,
    },
    {
      id: "q22-2",
      q: "`void GetHealth() const` — `const` ở đây nghĩa là?",
      choices: [
        "Trả về hằng số",
        "Method không sửa đổi trạng thái object",
        "Không thể gọi method này",
        "Method là static",
      ],
      answer: 1,
    },
  ],
  "25": [
    {
      id: "q25-1",
      q: "Thứ tự đúng của một game loop cơ bản?",
      choices: [
        "Render → Update → Input",
        "Input → Render → Update",
        "Process Input → Update → Render",
        "Update → Input → Render",
      ],
      answer: 2,
    },
    {
      id: "q25-2",
      q: "Vì sao physics nên dùng fixed timestep?",
      choices: [
        "Để tiết kiệm pin",
        "Cho kết quả ổn định, không phụ thuộc framerate",
        "Để render nhanh hơn",
        "Vì CPU yêu cầu",
      ],
      answer: 1,
    },
  ],
  "26": [
    {
      id: "q26-1",
      q: "Trong ECS, 'Component' nên chứa gì?",
      choices: [
        "Cả dữ liệu và logic phức tạp",
        "Chủ yếu dữ liệu thuần (data)",
        "Con trỏ tới System",
        "Vòng lặp game",
      ],
      answer: 1,
    },
  ],
  "27": [
    {
      id: "q27-1",
      q: "Nguyên tắc vàng khi tối ưu hiệu năng?",
      choices: [
        "Tối ưu mọi dòng ngay từ đầu",
        "Đo (profile) trước khi tối ưu",
        "Luôn dùng con trỏ thô",
        "Viết assembly bằng tay",
      ],
      answer: 1,
    },
    {
      id: "q27-2",
      q: "'Cache miss' gây chậm vì?",
      choices: [
        "CPU phải lấy dữ liệu từ RAM (chậm hơn cache nhiều lần)",
        "Ổ cứng bị đầy",
        "GPU quá tải",
        "Thiếu RAM",
      ],
      answer: 0,
    },
  ],
  "31": [
    {
      id: "q31-1",
      q: "`UPROPERTY()` trên một con trỏ UObject có tác dụng quan trọng nào?",
      choices: [
        "Làm biến chạy nhanh hơn",
        "Giữ object khỏi bị Garbage Collector thu hồi",
        "Ẩn biến khỏi editor",
        "Biến nó thành const",
      ],
      answer: 1,
    },
  ],
  "35": [
    {
      id: "q35-1",
      q: "Trong Unreal, tương đương của `std::vector<T>` là?",
      choices: ["TList<T>", "TArray<T>", "FVector", "TMap<T>"],
      answer: 1,
    },
    {
      id: "q35-2",
      q: "Chuỗi có thể sửa đổi trong UE dùng kiểu nào?",
      choices: ["FName", "FText", "FString", "std::string"],
      answer: 2,
    },
  ],
  "44": [
    {
      id: "q44-1",
      q: "Đâu KHÔNG phải undefined behavior?",
      choices: [
        "Truy cập phần tử ngoài kích thước mảng",
        "Dùng con trỏ đã delete (dangling)",
        "Chia một số cho 2",
        "Đọc biến chưa khởi tạo",
      ],
      answer: 2,
    },
  ],
};

export function quizFor(sectionId: string): QuizQuestion[] {
  return quizzes[sectionId] ?? [];
}
