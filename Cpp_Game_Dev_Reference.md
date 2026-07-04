# C++ cho Game Development — Tài liệu Tham chiếu Toàn diện

> **Đối tượng:** Người mới tiếp cận C++, hoặc đã dùng nhưng chưa thành thạo.
> **Mục tiêu:** Hiểu C++ từ nền tảng đến chuyên sâu, áp dụng vào game (Standard C++ & Unreal Engine) và các dự án khác. Dùng như một bản *reference* tra cứu nhanh trong dự án.
> **Quy ước:** Giữ nguyên thuật ngữ tiếng Anh (term) để bạn quen với tài liệu/diễn đàn quốc tế. Code minh họa dùng `cpp` (C++ thật) hoặc mã giả (pseudo-code) khi cần làm rõ ý tưởng.

---

## 📑 Mục lục

### PHẦN I — NỀN TẢNG C++ (Foundations)
- [1. Giới thiệu C++ & mô hình biên dịch](#1-giới-thiệu-c--mô-hình-biên-dịch)
- [2. Toolchain & Build System](#2-toolchain--build-system)
- [3. Cú pháp cơ bản: biến, kiểu dữ liệu, toán tử](#3-cú-pháp-cơ-bản-biến-kiểu-dữ-liệu-toán-tử)
- [4. Control Flow (luồng điều khiển)](#4-control-flow-luồng-điều-khiển)
- [5. Functions (hàm)](#5-functions-hàm)
- [6. Pointers & References (con trỏ & tham chiếu)](#6-pointers--references-con-trỏ--tham-chiếu)

### PHẦN II — BỘ NHỚ & QUẢN LÝ TÀI NGUYÊN (Memory & Resource Management)
- [7. Memory Model: Stack vs Heap](#7-memory-model-stack-vs-heap)
- [8. Dynamic Allocation (new / delete)](#8-dynamic-allocation-new--delete)
- [9. RAII — nguyên lý vàng của C++](#9-raii--nguyên-lý-vàng-của-c)
- [10. Smart Pointers (con trỏ thông minh)](#10-smart-pointers-con-trỏ-thông-minh)
- [11. Move Semantics & Rvalue References](#11-move-semantics--rvalue-references)

### PHẦN III — LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG (OOP)
- [12. Classes & Objects](#12-classes--objects)
- [13. Constructor/Destructor & Rule of 0/3/5](#13-constructordestructor--rule-of-035)
- [14. Inheritance & Polymorphism](#14-inheritance--polymorphism)
- [15. Virtual Functions & Abstract Classes](#15-virtual-functions--abstract-classes)
- [16. Composition over Inheritance](#16-composition-over-inheritance)

### PHẦN IV — C++ HIỆN ĐẠI (Modern C++ 11/14/17/20)
- [17. auto, nullptr, range-based for](#17-auto-nullptr-range-based-for)
- [18. Lambda Expressions](#18-lambda-expressions)
- [19. Templates & Generic Programming](#19-templates--generic-programming)
- [20. STL Containers](#20-stl-containers)
- [21. STL Algorithms & Iterators](#21-stl-algorithms--iterators)
- [22. const correctness, constexpr, enum class](#22-const-correctness-constexpr-enum-class)
- [23. Error Handling (xử lý lỗi)](#23-error-handling-xử-lý-lỗi)

### PHẦN V — C++ CHO GAME (tổng quát, engine-agnostic)
- [24. Vì sao C++ thống trị game dev](#24-vì-sao-c-thống-trị-game-dev)
- [25. Game Loop](#25-game-loop)
- [26. Data-Oriented Design & ECS](#26-data-oriented-design--ecs)
- [27. Performance: Cache, Profiling, Tối ưu](#27-performance-cache-profiling-tối-ưu)
- [28. Math cho game (Vector, Matrix, Quaternion)](#28-math-cho-game-vector-matrix-quaternion)
- [29. Design Patterns thường gặp trong game](#29-design-patterns-thường-gặp-trong-game)

### PHẦN VI — UNREAL ENGINE C++
- [30. UE C++ khác Standard C++ thế nào](#30-ue-c-khác-standard-c-thế-nào)
- [31. UObject, Reflection & Macros (UCLASS/UPROPERTY/UFUNCTION)](#31-uobject-reflection--macros)
- [32. Garbage Collection trong UE](#32-garbage-collection-trong-ue)
- [33. Actor & Component](#33-actor--component)
- [34. Gameplay Framework](#34-gameplay-framework)
- [35. UE Containers vs STL](#35-ue-containers-vs-stl)
- [36. UE Smart Pointers & Object Handles](#36-ue-smart-pointers--object-handles)
- [37. Delegates & Events](#37-delegates--events)
- [38. C++ ↔ Blueprint Interaction](#38-c--blueprint-interaction)
- [39. Data-Driven Design (DataAsset, DataTable)](#39-data-driven-design-dataasset-datatable)
- [40. Gameplay Ability System (GAS) — tổng quan](#40-gameplay-ability-system-gas--tổng-quan)

### PHẦN VII — KỸ THUẬT & THỰC HÀNH (Engineering Practices)
- [41. Tổ chức code: Header/Source, Forward Declaration](#41-tổ-chức-code-headersource-forward-declaration)
- [42. Naming Conventions & Code Style](#42-naming-conventions--code-style)
- [43. Debugging](#43-debugging)
- [44. Undefined Behavior & các bẫy phổ biến](#44-undefined-behavior--các-bẫy-phổ-biến)
- [45. Best Practices Checklist](#45-best-practices-checklist)

### PHỤ LỤC (Appendices)
- [A. Cheat Sheet cú pháp](#a-cheat-sheet-cú-pháp)
- [B. STL vs UE — bảng đối chiếu nhanh](#b-stl-vs-ue--bảng-đối-chiếu-nhanh)
- [C. Glossary (thuật ngữ)](#c-glossary-thuật-ngữ)
- [D. Tài nguyên học tập](#d-tài-nguyên-học-tập)

---

# PHẦN I — NỀN TẢNG C++

## 1. Giới thiệu C++ & mô hình biên dịch

### C++ là gì
C++ là ngôn ngữ **compiled**, **statically-typed**, **multi-paradigm** (procedural, OOP, generic, functional). Triết lý cốt lõi:

- **Zero-overhead abstraction:** "Bạn không trả giá cho thứ bạn không dùng." Abstraction (class, template...) được compiler dịch ra code gần như tối ưu bằng tay.
- **Manual memory control:** Bạn kiểm soát bộ nhớ (khác Java/C# có GC). Đây là lý do C++ nhanh, nhưng cũng là nguồn gốc của hầu hết bug.
- **Direct hardware access:** Truy cập con trỏ, bit, memory layout — quan trọng cho engine/game.

### Mô hình biên dịch (Compilation Model)
Hiểu pipeline này giúp bạn debug lỗi build (vốn rất hay gặp):

```
file.cpp ──[Preprocessor]──> file đã expand ──[Compiler]──> file.o (object)
                                                                  │
file2.cpp ──> ... ──> file2.o ──┐                                 │
                                ├──[Linker]──> executable (.exe) / library
thư viện .lib/.a ───────────────┘
```

1. **Preprocessor:** Xử lý `#include`, `#define`, `#ifdef`. Chỉ là thao tác *text* — chép-dán nội dung.
2. **Compiler:** Dịch từng `.cpp` (gọi là **translation unit**) thành object file (mã máy). Mỗi file dịch độc lập.
3. **Linker:** Ghép các object file + thư viện thành file thực thi cuối. Đây là nơi sinh ra lỗi *"unresolved external symbol"* (khai báo hàm nhưng quên định nghĩa).

> **Lỗi compiler vs lỗi linker — phân biệt nhanh:**
> - *"undeclared identifier", "syntax error"* → lỗi **compiler** (sai trong 1 file).
> - *"unresolved external symbol", "duplicate symbol"* → lỗi **linker** (vấn đề khi ghép nhiều file).

### Chương trình tối thiểu
```cpp
#include <iostream>   // include thư viện I/O chuẩn

int main()            // entry point — mọi chương trình bắt đầu ở đây
{
    std::cout << "Hello, Game Dev!" << std::endl;
    return 0;         // 0 = thoát thành công
}
```

---

## 2. Toolchain & Build System

### Các thành phần
| Thành phần | Vai trò | Ví dụ |
|---|---|---|
| **Compiler** | Dịch code → object | MSVC (`cl`), GCC (`g++`), Clang (`clang++`) |
| **Linker** | Ghép object → executable | `link`, `ld` |
| **Build system** | Tự động hóa lệnh build | CMake, MSBuild, Make, UnrealBuildTool |
| **Debugger** | Dò bug runtime | Visual Studio Debugger, GDB, LLDB |

### Header & Source — vì sao tách đôi
C++ tách **interface** (`.h`/`.hpp`) khỏi **implementation** (`.cpp`):

```cpp
// Player.h — KHAI BÁO (interface), được include nhiều nơi
#pragma once               // chống include trùng (xem mục dưới)

class Player {
public:
    void TakeDamage(int amount);   // chỉ khai báo, không có thân hàm
private:
    int health = 100;
};
```

```cpp
// Player.cpp — ĐỊNH NGHĨA (implementation), chỉ biên dịch 1 lần
#include "Player.h"

void Player::TakeDamage(int amount) {   // dấu :: = "thuộc về class Player"
    health -= amount;
}
```

### Include Guard
Ngăn 1 header bị include 2 lần trong cùng translation unit (gây lỗi "redefinition"):

```cpp
// Cách 1 — hiện đại, gọn (mọi compiler lớn đều hỗ trợ):
#pragma once

// Cách 2 — truyền thống, chuẩn 100%:
#ifndef PLAYER_H
#define PLAYER_H
// ... nội dung header ...
#endif
```

### CMake — build system phổ biến nhất cho C++ thuần
```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(MyGame LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)          # dùng C++20
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(MyGame              # tạo executable tên MyGame
    src/main.cpp
    src/Player.cpp
)

target_include_directories(MyGame PRIVATE include)
# target_link_libraries(MyGame PRIVATE SDL2 glm)   # link thư viện ngoài
```

```bash
# Quy trình build với CMake:
cmake -B build          # cấu hình, sinh project vào thư mục build/
cmake --build build     # biên dịch
./build/MyGame          # chạy
```

> **Lưu ý cho UE:** Unreal **không** dùng CMake mà dùng **UnrealBuildTool (UBT)** với file `.Build.cs` (viết bằng C#). Sẽ nói ở Phần VI.

---

## 3. Cú pháp cơ bản: biến, kiểu dữ liệu, toán tử

### Khai báo biến
```cpp
int   score   = 0;        // số nguyên
float speed   = 5.5f;     // số thực (chú ý hậu tố 'f')
double mass   = 70.0;     // số thực độ chính xác kép
bool  isAlive = true;     // luận lý: true/false
char  grade   = 'A';      // 1 ký tự
```

### Fundamental Types & kích thước
| Kiểu | Ý nghĩa | Kích thước điển hình | Lưu ý cho game |
|---|---|---|---|
| `bool` | true/false | 1 byte | — |
| `char` | ký tự / byte | 1 byte | dùng cho text, raw data |
| `int` | số nguyên | 4 byte | mặc định cho đếm, loop |
| `float` | thực 32-bit | 4 byte | **chuẩn cho game** (position, vận tốc) |
| `double` | thực 64-bit | 8 byte | chính xác cao nhưng chậm/tốn hơn |
| `int8_t`...`int64_t` | nguyên kích thước cố định | 1–8 byte | dùng khi cần kiểm soát chính xác bộ nhớ |

> **Fixed-width types** (`<cstdint>`): trong game/engine nên ưu tiên `int32_t`, `uint8_t`... thay vì `int`/`unsigned` để layout bộ nhớ rõ ràng và cross-platform ổn định.

### `auto` — để compiler tự suy kiểu
```cpp
auto health = 100;        // suy ra int
auto ratio  = 1.5f;       // suy ra float
auto name   = "Knight";   // suy ra const char*
```

### Toán tử
```cpp
// Số học:      +  -  *  /  %        (% là chia lấy dư, chỉ cho số nguyên)
// So sánh:     ==  !=  <  >  <=  >=  (trả về bool)
// Luận lý:     &&  ||  !             (and, or, not)
// Gán gộp:     +=  -=  *=  /=        (x += 5 ⇔ x = x + 5)
// Tăng/giảm:   ++  --                (++i tăng trước, i++ tăng sau)
// Bitwise:     &  |  ^  ~  <<  >>    (thao tác trên từng bit — dùng cho flags)
```

**Bitwise cho flags** (rất hay dùng trong game để gói nhiều trạng thái vào 1 số):
```cpp
const int FLAG_POISONED = 1 << 0;   // 0001
const int FLAG_BURNING  = 1 << 1;   // 0010
const int FLAG_FROZEN   = 1 << 2;   // 0100

int status = 0;
status |= FLAG_POISONED;             // bật cờ poisoned
status |= FLAG_BURNING;              // bật thêm burning  → 0011
bool isPoisoned = (status & FLAG_POISONED) != 0;   // kiểm tra cờ
status &= ~FLAG_BURNING;             // tắt cờ burning
```

---

## 4. Control Flow (luồng điều khiển)

### if / else
```cpp
if (health <= 0) {
    Die();
} else if (health < 30) {
    PlayLowHealthWarning();
} else {
    RegenerateHealth();
}
```

### switch — chọn theo giá trị rời rạc
```cpp
switch (weaponType) {
    case WeaponType::Sword:
        damage = 10;
        break;                 // ĐỪNG QUÊN break (nếu không sẽ "rơi" xuống case dưới)
    case WeaponType::Bow:
        damage = 7;
        break;
    default:                   // trường hợp còn lại
        damage = 1;
        break;
}
```

### Loops (vòng lặp)
```cpp
// for — khi biết số lần lặp
for (int i = 0; i < enemyCount; ++i) {
    UpdateEnemy(i);
}

// while — lặp khi điều kiện còn đúng
while (!isGameOver) {
    Tick();
}

// do-while — chạy ít nhất 1 lần rồi mới kiểm tra
do {
    ShowMenu();
} while (userChoice != QUIT);

// range-based for (C++11) — duyệt collection, GỌN & AN TOÀN nhất
for (const Enemy& e : enemies) {   // const& = không copy, không sửa
    e.Render();
}
```

### break / continue
```cpp
for (int i = 0; i < items.size(); ++i) {
    if (items[i].isBroken) continue;   // bỏ qua phần còn lại, sang vòng kế
    if (items[i].isKey)    break;      // thoát hẳn vòng lặp
    Use(items[i]);
}
```

---

## 5. Functions (hàm)

### Khai báo & định nghĩa
```cpp
// Cú pháp: returnType functionName(parameters) { body }
int Add(int a, int b) {
    return a + b;
}

void PrintScore(int score) {   // void = không trả về gì
    std::cout << "Score: " << score;
}
```

### Truyền tham số: by value vs by reference vs by const-reference
Đây là **kiến thức cực kỳ quan trọng** ảnh hưởng cả tính đúng đắn lẫn hiệu năng:

```cpp
void ByValue(Vector3 v);          // COPY toàn bộ → tốn nếu object lớn
void ByReference(Vector3& v);     // tham chiếu → có thể SỬA bản gốc
void ByConstRef(const Vector3& v);// tham chiếu chỉ-đọc → KHÔNG copy, KHÔNG sửa
void ByPointer(Vector3* v);       // con trỏ → có thể null, có thể sửa
```

**Quy tắc thực hành:**
- Kiểu nhỏ (int, float, bool, con trỏ) → truyền **by value**.
- Object lớn mà **chỉ đọc** → truyền **`const T&`** (tránh copy đắt).
- Cần **sửa** đối số → truyền **`T&`** (hoặc `T*` nếu có thể là "không có gì").

```cpp
// Ví dụ minh họa khác biệt:
void Heal(Player& p, int amount) {   // p là tham chiếu → sửa được bản gốc
    p.health += amount;
}
Player hero;
Heal(hero, 20);                      // hero.health thực sự tăng
```

### Default arguments
```cpp
void SpawnEnemy(int level, float hp = 100.0f, bool isBoss = false);
SpawnEnemy(5);                 // dùng hp=100, isBoss=false
SpawnEnemy(5, 200.0f);         // dùng isBoss=false
SpawnEnemy(5, 500.0f, true);   // truyền đủ
```

### Function Overloading — cùng tên, khác tham số
```cpp
float Distance(float a, float b);
float Distance(const Vector2& a, const Vector2& b);
float Distance(const Vector3& a, const Vector3& b);
// Compiler chọn đúng hàm dựa trên kiểu đối số bạn truyền vào (overload resolution).
```

### `inline` & ý nghĩa thực tế
`inline` *gợi ý* compiler chèn thẳng thân hàm vào nơi gọi (bỏ chi phí gọi hàm). Ngày nay compiler tự quyết; ý nghĩa quan trọng hơn của `inline` là **cho phép định nghĩa hàm trong header** mà không gây lỗi linker "duplicate symbol".

```cpp
inline int Square(int x) { return x * x; }   // hợp lệ đặt trong .h
```

---

## 6. Pointers & References (con trỏ & tham chiếu)

Đây là phần *khó nhất với người mới* nhưng là **trái tim của C++**. Nắm chắc phần này, bạn nắm được 70% bug.

### Pointer (con trỏ) — biến lưu **địa chỉ** của biến khác
```cpp
int health = 100;
int* ptr = &health;     // & = "lấy địa chỉ của". ptr lưu địa chỉ của health
std::cout << *ptr;      // * = "dereference" = lấy GIÁ TRỊ tại địa chỉ → in 100
*ptr = 50;              // sửa giá trị qua con trỏ → health giờ = 50
ptr = nullptr;          // con trỏ rỗng, không trỏ vào đâu cả
```

Hình dung:
```
health  ┌─────┐  địa chỉ 0x1000
        │ 100 │
        └─────┘
           ▲
ptr  ┌────────┐
     │ 0x1000 │   (ptr "chỉ tay" vào health)
     └────────┘
```

### Reference (tham chiếu) — **bí danh** (alias) cho biến đã có
```cpp
int health = 100;
int& ref = health;      // ref là TÊN KHÁC của health, KHÔNG phải bản sao
ref = 50;               // sửa ref ⇔ sửa health → health = 50
// Khác con trỏ: reference KHÔNG thể null, KHÔNG đổi đối tượng tham chiếu sau khi khởi tạo.
```

### Pointer vs Reference — chọn cái nào?
| Tiêu chí | Pointer `T*` | Reference `T&` |
|---|---|---|
| Có thể null? | ✅ Có | ❌ Không |
| Gán lại đối tượng khác? | ✅ Có | ❌ Không |
| Cú pháp | cần `*`, `&` | dùng như biến thường |
| Khi nào dùng | "có thể không tồn tại", cần re-assign | "luôn tồn tại", làm tham số hàm |

> **Quy tắc:** Mặc định dùng **reference**. Chỉ dùng **pointer** khi cần biểu diễn "có thể không có gì" (null) hoặc cần thay đổi target.

### `nullptr` và bug kinh điển
```cpp
Player* p = nullptr;
p->TakeDamage(10);      // 💥 CRASH! Dereference con trỏ null (null pointer dereference)

// Luôn kiểm tra trước khi dùng:
if (p != nullptr) {     // hoặc viết gọn: if (p)
    p->TakeDamage(10);
}
```

### `const` với pointer (đọc từ phải sang trái)
```cpp
const int* p1;        // con trỏ tới int hằng (không sửa được *p1, đổi được p1)
int* const p2 = &x;   // con trỏ HẰNG tới int (đổi được *p2, không đổi p2)
const int* const p3;  // cả hai đều hằng
```

### Dangling Pointer — con trỏ "treo" (cực nguy hiểm)
```cpp
int* GetBadPointer() {
    int local = 42;
    return &local;      // 💥 local bị hủy khi hàm kết thúc → con trỏ trỏ vào rác
}
```

---

# PHẦN II — BỘ NHỚ & QUẢN LÝ TÀI NGUYÊN

## 7. Memory Model: Stack vs Heap

Mọi biến trong C++ sống ở 1 trong 2 vùng nhớ chính:

| | **Stack** | **Heap** (Free Store) |
|---|---|---|
| Cấp phát | Tự động (compiler lo) | Thủ công (`new`/`delete`) hoặc smart pointer |
| Tốc độ | Cực nhanh | Chậm hơn |
| Kích thước | Nhỏ (~1–8 MB) | Lớn (gần như RAM) |
| Vòng đời | Hết scope `{}` là tự hủy | Sống đến khi bạn `delete` |
| Khi nào dùng | Biến local, object nhỏ, ngắn hạn | Object lớn, sống lâu, kích thước biết lúc runtime |

```cpp
void Example() {
    int x = 5;                  // STACK — tự hủy khi hết hàm
    Player p;                   // STACK — tự gọi destructor khi hết scope

    Player* heapPlayer = new Player();   // HEAP — sống tới khi delete
    delete heapPlayer;          // PHẢI tự giải phóng, nếu không → memory leak
}   // <-- tại đây x và p tự động bị hủy
```

> **Triết lý:** Ưu tiên **stack** bất cứ khi nào có thể. Stack vừa nhanh vừa an toàn (không leak). Chỉ lên heap khi thật sự cần.

## 8. Dynamic Allocation (new / delete)

```cpp
// Cấp 1 object:
Enemy* e = new Enemy();
delete e;                    // giải phóng 1 object

// Cấp 1 mảng:
int* arr = new int[100];
delete[] arr;                // CHÚ Ý: mảng phải dùng delete[], không phải delete
```

### Ba tội lỗi kinh điển của quản lý bộ nhớ thủ công
```cpp
// 1. MEMORY LEAK — quên delete → rò rỉ bộ nhớ
Enemy* e = new Enemy();
// ... không bao giờ delete → bộ nhớ mất vĩnh viễn

// 2. DANGLING POINTER — dùng sau khi delete (use-after-free)
delete e;
e->Attack();                 // 💥 undefined behavior

// 3. DOUBLE FREE — delete 2 lần
delete e;
delete e;                    // 💥 crash
```

> **Kết luận quan trọng:** Trong C++ hiện đại, bạn **gần như không nên viết `new`/`delete` trần** nữa. Hãy dùng **smart pointer** (mục 10) và **RAII** (mục 9).

## 9. RAII — nguyên lý vàng của C++

**RAII = Resource Acquisition Is Initialization.** Đây là *ý tưởng quan trọng nhất* trong C++. Nguyên tắc:

> **Gắn vòng đời của tài nguyên (memory, file, mutex, socket...) vào vòng đời của một object trên stack.** Constructor *giành* tài nguyên, Destructor *trả* tài nguyên. Khi object hết scope, tài nguyên tự được dọn — kể cả khi có exception.

```cpp
class FileHandle {
    FILE* file;
public:
    FileHandle(const char* path) {           // ACQUIRE trong constructor
        file = fopen(path, "r");
    }
    ~FileHandle() {                          // RELEASE trong destructor
        if (file) fclose(file);
    }
};

void ReadConfig() {
    FileHandle config("config.txt");   // mở file
    // ... dùng file ...
}   // <-- file TỰ ĐỘNG được đóng ở đây, dù return sớm hay throw exception
```

Smart pointer chính là RAII áp dụng cho bộ nhớ heap.

## 10. Smart Pointers (con trỏ thông minh)

Trong `<memory>`. Tự động `delete` khi hết scope → **không bao giờ leak**.

### `std::unique_ptr` — sở hữu DUY NHẤT (dùng 90% trường hợp)
```cpp
#include <memory>

std::unique_ptr<Enemy> e = std::make_unique<Enemy>();  // tạo & sở hữu
e->Attack();                  // dùng như con trỏ thường
// KHÔNG cần delete — tự hủy khi hết scope

// KHÔNG thể copy (vì "duy nhất"), chỉ có thể MOVE quyền sở hữu:
std::unique_ptr<Enemy> e2 = std::move(e);   // e giờ rỗng, e2 sở hữu
```

### `std::shared_ptr` — sở hữu CHIA SẺ (reference counting)
```cpp
std::shared_ptr<Texture> tex = std::make_shared<Texture>("hero.png");
std::shared_ptr<Texture> tex2 = tex;   // OK — cả hai cùng sở hữu, đếm = 2
// Object chỉ bị hủy khi shared_ptr CUỐI CÙNG biến mất (đếm về 0)
```

### `std::weak_ptr` — quan sát nhưng KHÔNG sở hữu (phá vỡ vòng tham chiếu)
```cpp
std::shared_ptr<Player> player = std::make_shared<Player>();
std::weak_ptr<Player> observer = player;     // không tăng đếm

if (auto locked = observer.lock()) {         // thử "nâng cấp" thành shared
    locked->DoSomething();                   // an toàn — object còn sống
} else {
    // object đã bị hủy rồi
}
```

> **Vì sao cần `weak_ptr`:** nếu A `shared_ptr` giữ B, và B `shared_ptr` giữ A → đếm không bao giờ về 0 → **leak vòng (circular reference)**. Cho một chiều thành `weak_ptr` để phá vòng.

### Bảng chọn smart pointer
| Tình huống | Dùng |
|---|---|
| Một chủ sở hữu rõ ràng | `unique_ptr` ✅ (mặc định) |
| Nhiều nơi cùng sở hữu | `shared_ptr` |
| Tham chiếu ngược / cache / observer | `weak_ptr` |
| Chỉ "mượn" tạm, không sở hữu | con trỏ thường `T*` (raw, non-owning) |

## 11. Move Semantics & Rvalue References

Một trong những tính năng "high-level" quan trọng nhất của Modern C++. Cho phép **"di dời" tài nguyên thay vì copy** → tăng tốc lớn cho object nặng.

### Lvalue vs Rvalue
```cpp
int x = 10;        // x là lvalue (có tên, có địa chỉ, tồn tại lâu)
                   // 10 là rvalue (giá trị tạm, sắp biến mất)
```

### Vấn đề move giải quyết
```cpp
std::vector<int> CreateHugeVector() {
    std::vector<int> v(1'000'000);   // vector 1 triệu phần tử
    return v;                         // KHÔNG copy 1 triệu phần tử nữa...
}
auto data = CreateHugeVector();       // ...mà MOVE — chỉ "chuyển nhượng" con trỏ nội bộ
```

### `std::move` — ép một lvalue thành rvalue để được move
```cpp
std::string a = "very long string...";
std::string b = std::move(a);    // MOVE thay vì copy: b "cướp" ruột của a
// Sau move, a ở trạng thái "valid but unspecified" — đừng dùng giá trị của a nữa
```

### Move Constructor & Move Assignment (cho class tự định nghĩa)
```cpp
class Buffer {
    int* data;
    size_t size;
public:
    // Move constructor — "ăn cắp" tài nguyên từ other thay vì copy
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;        // để other không delete vùng nhớ ta vừa lấy
        other.size = 0;
    }
};
```

> **Khi nào bạn quan tâm:** Hầu hết khi dùng STL containers (`vector`, `string`...), move xảy ra tự động và bạn hưởng lợi miễn phí. Bạn chỉ cần **tự viết** move khi class trực tiếp quản lý raw resource.

---

# PHẦN III — LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG (OOP)

## 12. Classes & Objects

**Class** = bản thiết kế (blueprint). **Object** = thực thể cụ thể tạo từ class (instance).

```cpp
class Character {
public:                          // ai cũng truy cập được
    std::string name;
    void Speak() { std::cout << name << " says hi"; }

private:                         // chỉ nội bộ class truy cập
    int secretLevel = 1;

protected:                       // class này + class con truy cập được
    int health = 100;
};

Character hero;                  // tạo object (instance)
hero.name = "Knight";
hero.Speak();
```

### Access Specifiers (mức truy cập)
| Specifier | Truy cập từ | Dùng cho |
|---|---|---|
| `public` | mọi nơi | interface công khai |
| `protected` | trong class + class con | dữ liệu cho subclass |
| `private` | chỉ trong chính class | chi tiết nội bộ (mặc định của `class`) |

> **Encapsulation (đóng gói):** Giữ dữ liệu `private`, mở `public` các hàm để thao tác. Bên ngoài không "sờ" trực tiếp vào dữ liệu → kiểm soát được tính hợp lệ.

```cpp
class HealthComponent {
private:
    int health = 100;
    int maxHealth = 100;
public:
    void TakeDamage(int dmg) {
        health = std::max(0, health - dmg);   // logic kiểm soát ở 1 nơi
    }
    int GetHealth() const { return health; }   // getter chỉ-đọc
};
```

### `struct` vs `class`
Giống hệt nhau, chỉ khác **mặc định**: `struct` mặc định `public`, `class` mặc định `private`. Quy ước thông dụng: `struct` cho dữ liệu thuần (POD — plain data), `class` cho thứ có hành vi/đóng gói.

## 13. Constructor/Destructor & Rule of 0/3/5

### Constructor — khởi tạo object
```cpp
class Vector3 {
    float x, y, z;
public:
    Vector3() : x(0), y(0), z(0) {}                       // default constructor
    Vector3(float x, float y, float z) : x(x), y(y), z(z) {}  // parameterized
    // ":" mở đầu member initializer list — KHỞI TẠO trực tiếp, hiệu quả hơn gán trong thân
};

Vector3 a;                  // gọi default → (0,0,0)
Vector3 b(1.0f, 2.0f, 3.0f);// gọi parameterized
Vector3 c{1.0f, 2.0f, 3.0f};// brace init (C++11, khuyến nghị)
```

### Destructor — dọn dẹp khi object bị hủy
```cpp
class Texture {
    unsigned char* pixels;
public:
    Texture()  { pixels = new unsigned char[1024]; }
    ~Texture() { delete[] pixels; }   // ~ChậmTên = destructor, tự gọi khi hết đời
};
```

### Rule of 0/3/5 — quy tắc cực kỳ quan trọng
Khi một class quản lý tài nguyên (như con trỏ heap), C++ tự sinh ra **copy constructor**, **copy assignment**, **destructor**, **move constructor**, **move assignment**. Nếu bạn định nghĩa 1 trong số đó, thường phải xử lý cả nhóm:

- **Rule of 0:** Tốt nhất — *không* quản lý raw resource, để smart pointer/STL lo → không cần viết hàm nào. **Ưu tiên cái này.**
- **Rule of 3:** Nếu cần destructor tùy biến → cũng cần copy constructor + copy assignment.
- **Rule of 5:** Như trên + thêm move constructor + move assignment cho hiệu năng.

```cpp
// Rule of 0 — class lý tưởng, không cần viết special member nào:
class Inventory {
    std::vector<Item> items;            // STL tự lo copy/move/destroy
    std::unique_ptr<Weapon> weapon;     // smart pointer tự lo
};   // compiler sinh mọi thứ đúng đắn — bạn không viết gì cả
```

## 14. Inheritance & Polymorphism

### Inheritance (kế thừa) — quan hệ "is-a"
```cpp
class Entity {                  // base class (lớp cha)
public:
    void Move(float dx, float dy) { /* ... */ }
    int health = 100;
};

class Enemy : public Entity {   // Enemy KẾ THỪA Entity → Enemy "is-a" Entity
public:
    void Attack() { /* ... */ }  // thêm hành vi riêng
};

Enemy goblin;
goblin.Move(1, 0);   // dùng được hàm kế thừa từ Entity
goblin.Attack();     // dùng hàm riêng
```

### Polymorphism (đa hình) — cùng interface, hành vi khác nhau
Đây là sức mạnh thật sự của OOP, cho phép xử lý nhiều loại object qua 1 con trỏ chung:

```cpp
class Shape {
public:
    virtual float Area() const { return 0.0f; }   // virtual = cho phép override
    virtual ~Shape() = default;                    // destructor PHẢI virtual ở base
};

class Circle : public Shape {
    float radius;
public:
    Circle(float r) : radius(r) {}
    float Area() const override { return 3.14159f * radius * radius; }  // override
};

class Square : public Shape {
    float side;
public:
    Square(float s) : side(s) {}
    float Area() const override { return side * side; }
};

// Xử lý đa hình:
std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>(5.0f));
shapes.push_back(std::make_unique<Square>(3.0f));

for (const auto& shape : shapes) {
    std::cout << shape->Area();   // gọi ĐÚNG hàm theo kiểu thực — đa hình!
}
```

> **`virtual` & `override` quan trọng vì sao:** không có `virtual`, lời gọi `shape->Area()` luôn gọi bản của `Shape` (static dispatch). Có `virtual`, compiler dùng **vtable** để gọi đúng bản của object thực lúc runtime (dynamic dispatch). Luôn thêm từ khóa `override` ở lớp con để compiler kiểm tra bạn override đúng.

### Cảnh báo: Virtual Destructor
```cpp
Shape* s = new Circle(5.0f);
delete s;   // Nếu ~Shape() KHÔNG virtual → chỉ gọi ~Shape, ~Circle bị bỏ qua → LEAK
            // → Base class có virtual function thì destructor PHẢI virtual.
```

## 15. Virtual Functions & Abstract Classes

### Pure Virtual & Abstract Class (interface)
```cpp
class IDamageable {                      // tiền tố "I" = interface (quy ước)
public:
    virtual void TakeDamage(int amount) = 0;   // "= 0" → pure virtual (không có thân)
    virtual ~IDamageable() = default;
};
// Class có pure virtual → ABSTRACT, KHÔNG thể tạo instance trực tiếp.

class Player : public IDamageable {
public:
    void TakeDamage(int amount) override { /* bắt buộc cài đặt */ }
};

// IDamageable d;          // ❌ LỖI — abstract class
IDamageable* d = new Player();  // ✅ OK — qua con trỏ
```

> Abstract class với toàn pure virtual = **interface** (giống `interface` trong C#/Java). Định nghĩa "hợp đồng" mà lớp con phải tuân theo.

## 16. Composition over Inheritance

Nguyên tắc thiết kế quan trọng: **ưu tiên ghép (has-a) hơn kế thừa sâu (is-a)**. Kế thừa nhiều tầng dễ thành "cây thừa kế" cứng nhắc, khó bảo trì.

```cpp
// ❌ Kế thừa sâu, cứng nhắc:
// Entity → Character → Humanoid → Player → ArmedPlayer → ...

// ✅ Composition — lắp ghép component:
class Player {
    HealthComponent     health;      // "có một" health
    MovementComponent   movement;    // "có một" movement
    InventoryComponent  inventory;   // "có một" inventory
public:
    void Update(float dt) {
        movement.Update(dt);
        health.Regenerate(dt);
    }
};
```

> Đây chính là triết lý nền tảng của **Component pattern** và **ECS** (Phần V), và là cách Unreal Engine tổ chức Actor (Actor + nhiều ActorComponent).

---

# PHẦN IV — C++ HIỆN ĐẠI (Modern C++)

> "Modern C++" = C++11 trở đi. Nó thay đổi *cách viết* C++ rất nhiều: an toàn hơn, gọn hơn, nhanh hơn. **Luôn viết Modern C++.**

## 17. auto, nullptr, range-based for

```cpp
// auto — suy kiểu tự động (đặc biệt hữu ích với kiểu dài dòng)
std::vector<std::pair<int, std::string>> data;
for (auto it = data.begin(); it != data.end(); ++it) { /* ... */ }   // thay vì gõ cả kiểu iterator

// nullptr — thay cho NULL/0 cũ (an toàn về kiểu)
Player* p = nullptr;          // ✅ thay vì  Player* p = NULL;  (lỗi thời)

// range-based for — duyệt gọn gàng
for (const auto& enemy : enemies) { enemy.Update(); }

// structured bindings (C++17) — "tách" tuple/pair/struct
std::map<std::string, int> scores;
for (const auto& [name, score] : scores) {        // tách key & value đẹp đẽ
    std::cout << name << ": " << score;
}
```

## 18. Lambda Expressions

Hàm vô danh (anonymous function) định nghĩa ngay tại chỗ — cực mạnh cho callback, sort, filter.

```cpp
// Cú pháp: [capture](params) -> returnType { body }
auto add = [](int a, int b) { return a + b; };
int sum = add(3, 4);          // 7

// Capture — "bắt" biến từ scope ngoài:
int threshold = 50;
auto isStrong = [threshold](const Enemy& e) {   // capture by value (sao chép)
    return e.health > threshold;
};

int multiplier = 2;
auto scale = [&multiplier](int x) {             // capture by reference (tham chiếu)
    return x * multiplier;
};

// [=] bắt mọi thứ by value, [&] bắt mọi thứ by reference, [this] bắt con trỏ this
```

**Ứng dụng thực tế — sort & filter:**
```cpp
std::vector<Enemy> enemies;
// Sắp xếp enemy theo máu giảm dần:
std::sort(enemies.begin(), enemies.end(),
    [](const Enemy& a, const Enemy& b) { return a.health > b.health; });

// Đếm enemy còn sống:
int alive = std::count_if(enemies.begin(), enemies.end(),
    [](const Enemy& e) { return e.health > 0; });
```

## 19. Templates & Generic Programming

Viết code **một lần, dùng cho mọi kiểu** — compiler sinh ra phiên bản cụ thể lúc biên dịch (zero runtime cost).

### Function Template
```cpp
template <typename T>
T Max(T a, T b) {
    return (a > b) ? a : b;
}

int   m1 = Max(3, 7);          // T = int
float m2 = Max(2.5f, 1.0f);    // T = float — cùng code, compiler tự sinh 2 bản
```

### Class Template
```cpp
template <typename T>
class Stack {
    std::vector<T> elements;
public:
    void Push(const T& item) { elements.push_back(item); }
    T    Pop() { T top = elements.back(); elements.pop_back(); return top; }
    bool IsEmpty() const { return elements.empty(); }
};

Stack<int>    intStack;        // stack chứa int
Stack<Enemy*> enemyStack;      // stack chứa con trỏ Enemy
```

### Template với nhiều tham số & giá trị
```cpp
template <typename T, int Size>
class FixedArray {
    T data[Size];              // mảng kích thước cố định lúc compile
public:
    T& operator[](int i) { return data[i]; }
    constexpr int Length() const { return Size; }
};

FixedArray<float, 16> matrix;  // mảng 16 float trên stack
```

> **Lưu ý:** Template thường phải **viết toàn bộ trong header** (không tách `.cpp`) vì compiler cần thấy định nghĩa để sinh code khi gặp lời gọi.

## 20. STL Containers

Standard Template Library cung cấp các container đã tối ưu sẵn. **Đừng tự viết lại** dynamic array, linked list, hash map...

| Container | Cấu trúc | Truy cập | Thêm/Xóa | Dùng khi |
|---|---|---|---|---|
| `std::vector<T>` | mảng động liền kề | O(1) theo index | O(1) cuối / O(n) giữa | **Mặc định** — 90% trường hợp |
| `std::array<T,N>` | mảng tĩnh stack | O(1) | không đổi size | size cố định, biết lúc compile |
| `std::deque<T>` | hàng đợi 2 đầu | O(1) | O(1) hai đầu | thêm/xóa cả 2 đầu |
| `std::list<T>` | doubly linked list | O(n) | O(1) bất kỳ vị trí | chèn/xóa giữa nhiều, ít duyệt |
| `std::map<K,V>` | cây cân bằng (sorted) | O(log n) | O(log n) | cần thứ tự theo key |
| `std::unordered_map<K,V>` | hash table | O(1) trung bình | O(1) trung bình | tra cứu nhanh theo key |
| `std::set<T>` | tập hợp có thứ tự | O(log n) | O(log n) | phần tử duy nhất, có thứ tự |
| `std::unordered_set<T>` | hash set | O(1) tb | O(1) tb | phần tử duy nhất, tra nhanh |

```cpp
#include <vector>
#include <unordered_map>

std::vector<Enemy> enemies;
enemies.push_back(Enemy{});        // thêm cuối
enemies.emplace_back();            // tạo TẠI CHỖ (hiệu quả hơn, tránh copy/move)
enemies[0].health = 50;            // truy cập theo index
enemies.size();                    // số phần tử
enemies.clear();                   // xóa hết

std::unordered_map<std::string, int> inventory;
inventory["potion"] = 5;           // thêm/sửa
inventory["sword"]  = 1;
if (inventory.contains("potion"))  // C++20 — kiểm tra tồn tại
    inventory["potion"]--;
```

> **Lời khuyên hiệu năng cho game:** `std::vector` thường là lựa chọn nhanh nhất vì dữ liệu **liền kề trong bộ nhớ** → thân thiện cache (xem mục 27). `std::list`/`std::map` (node rời rạc) thường chậm vì cache miss, dù big-O đẹp.

## 21. STL Algorithms & Iterators

`<algorithm>` cung cấp hàng trăm thuật toán sẵn. Kết hợp với lambda → code biểu cảm, ít bug.

```cpp
#include <algorithm>
#include <numeric>

std::vector<int> v = {5, 2, 8, 1, 9, 3};

std::sort(v.begin(), v.end());                          // sắp tăng dần
std::reverse(v.begin(), v.end());                       // đảo ngược
auto it = std::find(v.begin(), v.end(), 8);             // tìm phần tử
int total = std::accumulate(v.begin(), v.end(), 0);     // tính tổng
int maxVal = *std::max_element(v.begin(), v.end());     // phần tử lớn nhất

// Xóa theo điều kiện (erase-remove idiom):
v.erase(std::remove_if(v.begin(), v.end(),
        [](int x) { return x < 3; }), v.end());         // xóa mọi phần tử < 3

// Biến đổi từng phần tử:
std::transform(v.begin(), v.end(), v.begin(),
        [](int x) { return x * 2; });                   // nhân đôi tất cả
```

### Iterator — "con trỏ tổng quát" để duyệt container
```cpp
std::vector<int> v = {1, 2, 3};
std::vector<int>::iterator it = v.begin();   // trỏ phần tử đầu
*it;            // 1 — dereference
++it;           // tiến tới phần tử kế
it == v.end();  // end() = "qua khỏi" phần tử cuối (sentinel), KHÔNG dereference
```

## 22. const correctness, constexpr, enum class

### const correctness — đánh dấu cái gì không đổi
```cpp
class Player {
    int health = 100;
public:
    int  GetHealth() const { return health; }   // const method: KHÔNG sửa object
    void SetHealth(int h)  { health = h; }       // non-const: được sửa
};

void Print(const Player& p) {   // const& → chỉ gọi được const method
    std::cout << p.GetHealth(); // OK
    // p.SetHealth(50);         // ❌ LỖI — p là const
}
```
> `const` không chỉ là an toàn — nó là *tài liệu sống* cho biết hàm/biến nào "đọc-thôi", giúp compiler tối ưu và bắt lỗi sớm.

### constexpr — tính toán LÚC BIÊN DỊCH
```cpp
constexpr int MaxEnemies = 64;             // hằng số compile-time
constexpr int Factorial(int n) {           // hàm chạy lúc compile nếu input là hằng
    return (n <= 1) ? 1 : n * Factorial(n - 1);
}
constexpr int f5 = Factorial(5);           // 120 được tính KHI BIÊN DỊCH, 0 chi phí runtime
int arr[MaxEnemies];                       // dùng được làm kích thước mảng tĩnh
```

### enum class — enum an toàn về kiểu (scoped enum)
```cpp
// ❌ enum cũ (unscoped) — dễ lẫn, tự ngầm chuyển sang int:
enum Color { Red, Green, Blue };       // Red, Green... "rò" ra scope ngoài

// ✅ enum class (C++11) — an toàn, có scope:
enum class WeaponType { Sword, Bow, Staff };
WeaponType w = WeaponType::Sword;      // phải ghi rõ scope
// int x = w;                          // ❌ LỖI — không tự chuyển sang int (tốt!)
int x = static_cast<int>(w);           // muốn chuyển thì phải ép tường minh
```

## 23. Error Handling (xử lý lỗi)

C++ có 2 trường phái chính. Game/engine thường **hạn chế exception** vì lý do hiệu năng & xác định.

### Exceptions
```cpp
#include <stdexcept>

float Divide(float a, float b) {
    if (b == 0.0f)
        throw std::runtime_error("Division by zero");   // ném lỗi
    return a / b;
}

try {
    float r = Divide(10, 0);
} catch (const std::exception& e) {                      // bắt lỗi
    std::cerr << "Error: " << e.what();
}
```

### Vì sao game thường tránh exception
- Có thể gây **stall** không xác định (không phù hợp real-time 60fps).
- Tăng kích thước binary, đôi khi bị tắt hẳn (`-fno-exceptions`).
- **Unreal Engine mặc định tắt C++ exceptions.**

### Các lựa chọn thay thế (khuyến nghị cho game)
```cpp
// 1. Error code / bool trả về
bool TryLoadTexture(const std::string& path, Texture& outTex);

// 2. std::optional (C++17) — "có hoặc không có giá trị"
#include <optional>
std::optional<Player> FindPlayer(int id) {
    if (/* tìm thấy */ false) return Player{};
    return std::nullopt;                       // không tìm thấy
}
if (auto p = FindPlayer(5)) {                  // kiểm tra có giá trị
    p->DoSomething();
}

// 3. assert / check — bắt lỗi LẬP TRÌNH lúc dev (không cho dữ liệu xấu)
#include <cassert>
void SetIndex(int i) {
    assert(i >= 0 && i < size);   // crash sớm khi dev sai (bị loại bỏ ở Release)
}
// (Unreal dùng check() / ensure() thay cho assert — xem Phần VI)
```

---

# PHẦN V — C++ CHO GAME (tổng quát)

## 24. Vì sao C++ thống trị game dev

1. **Hiệu năng (Performance):** Game phải dựng 16.6ms/frame (60fps). C++ cho mã máy gần tối ưu, không GC pause.
2. **Kiểm soát bộ nhớ (Memory control):** Tự quản layout, alignment, pooling → tránh giật do GC, tối ưu cache.
3. **Truy cập phần cứng & API thấp:** Trực tiếp với GPU API (DirectX, Vulkan), SIMD, console SDK.
4. **Hệ sinh thái engine:** Unreal, CryEngine, hầu hết engine AAA viết bằng C++; nhiều engine khác (Unity, Godot) có lõi C++.
5. **Tính xác định (Determinism):** Quan trọng cho physics, netcode, replay.

> **Đánh đổi:** C++ khó và nguy hiểm hơn C#/Python. Bạn đổi sự an toàn lấy hiệu năng & kiểm soát. Vì thế kỷ luật (RAII, smart pointer, const correctness) là bắt buộc.

## 25. Game Loop

Trái tim của mọi game: vòng lặp chạy liên tục, mỗi vòng = 1 frame.

```cpp
// Mã giả — game loop cơ bản
void RunGame() {
    Initialize();                       // load asset, khởi tạo hệ thống

    while (isRunning) {
        float deltaTime = ComputeDeltaTime();   // thời gian trôi từ frame trước (giây)

        ProcessInput();                 // đọc bàn phím/chuột/gamepad
        Update(deltaTime);              // cập nhật logic game (AI, physics, gameplay)
        Render();                       // vẽ lên màn hình

        // (tùy chọn) giới hạn FPS / VSync
    }

    Shutdown();                         // giải phóng tài nguyên
}
```

### Delta Time — vì sao quan trọng
Để chuyển động **độc lập với FPS** (máy mạnh/yếu vẫn chạy như nhau):

```cpp
// ❌ SAI — tốc độ phụ thuộc FPS (máy nhanh thì nhân vật chạy nhanh hơn)
position.x += 5;

// ✅ ĐÚNG — nhân với deltaTime → 5 đơn vị MỖI GIÂY, bất kể FPS
position.x += speed * deltaTime;        // speed = đơn vị/giây
```

### Fixed Timestep (cho physics ổn định)
```cpp
// Mã giả — tách physics (bước cố định) khỏi render (bước biến thiên)
const float FIXED_DT = 1.0f / 60.0f;    // physics chạy đúng 60 lần/giây
float accumulator = 0.0f;

while (isRunning) {
    float frameTime = ComputeDeltaTime();
    accumulator += frameTime;

    while (accumulator >= FIXED_DT) {   // chạy physics theo bước cố định
        UpdatePhysics(FIXED_DT);
        accumulator -= FIXED_DT;
    }
    Render();                           // render chạy thoải mái theo FPS thực
}
```

## 26. Data-Oriented Design & ECS

### Object-Oriented vs Data-Oriented
OOP gom **dữ liệu + hành vi** vào object. Data-Oriented Design (DOD) tách dữ liệu ra, tổ chức để **CPU cache** xử lý hiệu quả nhất.

```cpp
// ❌ OOP "Array of Structs" (AoS) — mỗi object có đủ thứ, rải rác bộ nhớ
struct Particle {
    Vector3 position;
    Vector3 velocity;
    Color   color;
    float   lifetime;
    // ... 20 field khác
};
std::vector<Particle> particles;   // khi chỉ update position, vẫn kéo cả color, lifetime vào cache → lãng phí

// ✅ DOD "Struct of Arrays" (SoA) — gom cùng loại dữ liệu liền nhau
struct ParticleSystem {
    std::vector<Vector3> positions;    // tất cả position liền kề
    std::vector<Vector3> velocities;   // tất cả velocity liền kề
    std::vector<float>   lifetimes;
};
// Update position chỉ đụng tới mảng positions & velocities → cache cực hiệu quả
for (size_t i = 0; i < positions.size(); ++i)
    positions[i] += velocities[i] * dt;
```

### ECS — Entity Component System
Kiến trúc hiện đại cho game quy mô lớn (Unity DOTS, nhiều engine custom). Ba khái niệm:

- **Entity:** chỉ là 1 ID (con số), không chứa dữ liệu.
- **Component:** dữ liệu thuần (PositionComponent, HealthComponent...), không hành vi.
- **System:** logic xử lý mọi entity có component phù hợp.

```cpp
// Mã giả — minh họa tư tưởng ECS
using Entity = uint32_t;

struct Position { float x, y; };
struct Velocity { float dx, dy; };

// System chỉ xử lý các entity CÓ CẢ Position và Velocity:
void MovementSystem(ComponentArray<Position>& pos,
                    ComponentArray<Velocity>& vel, float dt) {
    for (Entity e : EntitiesWith<Position, Velocity>()) {
        pos[e].x += vel[e].dx * dt;
        pos[e].y += vel[e].dy * dt;
    }
}
```

> ECS đem lại hiệu năng cao (cache-friendly) và linh hoạt (lắp ghép component tự do), nhưng phức tạp hơn OOP truyền thống. Cân nhắc theo quy mô dự án.

## 27. Performance: Cache, Profiling, Tối ưu

### CPU Cache — yếu tố hiệu năng số 1 hiện nay
RAM rất chậm so với CPU. CPU có cache (L1/L2/L3) nhanh hơn RAM hàng trăm lần. **Dữ liệu liền kề + truy cập tuần tự** → cache hit → nhanh. Dữ liệu rải rác / truy cập ngẫu nhiên → cache miss → chậm.

```cpp
// ✅ NHANH — duyệt vector tuần tự, dữ liệu liền kề (cache-friendly)
for (auto& e : enemies) e.Update();

// ❌ CHẬM — truy cập ngẫu nhiên qua con trỏ rải rác bộ nhớ (cache-unfriendly)
for (Enemy* e : enemyPointers) e->Update();   // mỗi e ở 1 nơi khác nhau trên heap
```

> **Quy tắc ngón cái:** prefer `std::vector` of objects (liền kề) hơn `std::vector` of pointers (rời rạc) khi hiệu năng quan trọng.

### Nguyên tắc tối ưu
1. **Đo trước, tối ưu sau (Measure first):** Đừng đoán. Dùng profiler (Unreal Insights, Tracy, Visual Studio Profiler, perf).
2. **80/20:** 80% thời gian thường nằm ở 20% code (hotspot). Tối ưu đúng chỗ đó.
3. **Tránh "premature optimization":** Viết code rõ ràng trước; chỉ tối ưu khi profiler chỉ ra nút thắt.

### Một số kỹ thuật phổ biến
```cpp
// Reserve trước để tránh vector tái cấp phát nhiều lần:
std::vector<Enemy> enemies;
enemies.reserve(1000);              // cấp sẵn chỗ cho 1000 → không realloc khi push

// emplace thay vì push (tạo tại chỗ, tránh tạo object tạm + move):
enemies.emplace_back(args...);

// Truyền const& thay vì by value cho object lớn (mục 5).
// Object Pool — tái sử dụng object thay vì new/delete liên tục (mục 29).
```

## 28. Math cho game (Vector, Matrix, Quaternion)

Toán học là xương sống của đồ họa & physics. Thường dùng thư viện sẵn (**GLM** cho C++ thuần, hệ math tích hợp của Unreal: `FVector`, `FRotator`, `FQuat`...).

### Vector — vị trí, hướng, vận tốc
```cpp
struct Vector3 {
    float x, y, z;

    Vector3 operator+(const Vector3& o) const { return {x+o.x, y+o.y, z+o.z}; }
    Vector3 operator-(const Vector3& o) const { return {x-o.x, y-o.y, z-o.z}; }
    Vector3 operator*(float s)          const { return {x*s, y*s, z*s}; }

    float Length() const { return std::sqrt(x*x + y*y + z*z); }
    Vector3 Normalized() const { float l = Length(); return {x/l, y/l, z/l}; }
};

// Dot product — góc giữa 2 vector (>0: cùng hướng, 0: vuông góc, <0: ngược)
float Dot(const Vector3& a, const Vector3& b) {
    return a.x*b.x + a.y*b.y + a.z*b.z;
}

// Cross product — vector vuông góc với cả 2 (dùng tính pháp tuyến, hướng quay)
Vector3 Cross(const Vector3& a, const Vector3& b) {
    return { a.y*b.z - a.z*b.y,
             a.z*b.x - a.x*b.z,
             a.x*b.y - a.y*b.x };
}
```

### Các khái niệm cần biết
- **Matrix (ma trận):** Biểu diễn phép biến đổi (translation, rotation, scale). Nhân ma trận để gộp biến đổi. Quan trọng cho không gian model → world → view → projection.
- **Quaternion:** Biểu diễn xoay tránh **gimbal lock** (khóa trục) mà Euler angles gặp phải; nội suy xoay mượt (slerp). Dùng cho rotation trong hầu hết engine.
- **Lerp (linear interpolation):** Nội suy tuyến tính, dùng khắp nơi (animation, camera mượt).

```cpp
// Lerp — pha trộn giữa a và b theo t∈[0,1]
float Lerp(float a, float b, float t) { return a + (b - a) * t; }
// t=0 → a, t=1 → b, t=0.5 → trung điểm. Ví dụ: camera bám mượt:
camera.position.x = Lerp(camera.position.x, target.x, 0.1f);   // mỗi frame tiến 10% về target
```

## 29. Design Patterns thường gặp trong game

Pattern = giải pháp tái sử dụng cho vấn đề lặp lại. Dưới đây là các pattern *đặc biệt hữu ích cho game*.

### Singleton — một instance toàn cục (DÙNG THẬN TRỌNG)
```cpp
class GameManager {
public:
    static GameManager& Get() {        // truy cập toàn cục
        static GameManager instance;   // tạo 1 lần duy nhất (thread-safe từ C++11)
        return instance;
    }
    GameManager(const GameManager&) = delete;          // cấm copy
    void operator=(const GameManager&) = delete;
private:
    GameManager() = default;
};
// Dùng: GameManager::Get().StartLevel();
```
> ⚠️ Singleton dễ bị lạm dụng → tạo global state ẩn, khó test. Cân nhắc dependency injection thay thế khi có thể.

### Object Pool — tái sử dụng object (tối ưu chống GC/alloc)
```cpp
// Thay vì new/delete đạn liên tục (tốn & phân mảnh), tái dùng từ pool:
template <typename T>
class ObjectPool {
    std::vector<T>     pool;
    std::vector<bool>  inUse;
public:
    explicit ObjectPool(size_t count)            // PHẢI cấp sẵn 'count' object để tái dùng
        : pool(count), inUse(count, false) {}    // (nếu không, Acquire luôn trả nullptr)

    T* Acquire() {                          // lấy 1 object rảnh
        for (size_t i = 0; i < pool.size(); ++i)
            if (!inUse[i]) { inUse[i] = true; return &pool[i]; }
        return nullptr;                     // pool đầy
    }
    void Release(T* obj) {                   // trả về pool (không delete)
        size_t i = static_cast<size_t>(obj - pool.data());
        inUse[i] = false;
    }
};
// Dùng: ObjectPool<Bullet> bullets(256);  Bullet* b = bullets.Acquire();
// Cực hữu ích cho: bullets, particles, enemies — thứ tạo/hủy liên tục.
```

### Observer — phát/nhận sự kiện (event system)
```cpp
// Mã giả — đối tượng "phát" báo cho mọi "người nghe" khi có sự kiện
class EventSystem {
    std::vector<std::function<void(int)>> listeners;
public:
    void Subscribe(std::function<void(int)> cb) { listeners.push_back(cb); }
    void Notify(int data) {
        for (auto& cb : listeners) cb(data);   // gọi mọi listener
    }
};
// player.onDeath.Subscribe([](int){ ShowGameOver(); });
// (Unreal hiện thực hóa pattern này bằng Delegates — Phần VI.)
```

### State Machine — quản lý trạng thái (AI, animation, gameplay)
```cpp
enum class AIState { Idle, Patrol, Chase, Attack };

class Enemy {
    AIState state = AIState::Idle;
public:
    void Update(float dt) {
        switch (state) {
            case AIState::Idle:
                if (PlayerNearby()) state = AIState::Chase;   // chuyển trạng thái
                break;
            case AIState::Chase:
                MoveTowardPlayer(dt);
                if (InAttackRange()) state = AIState::Attack;
                if (!PlayerNearby())  state = AIState::Patrol;
                break;
            case AIState::Attack:
                PerformAttack();
                if (!InAttackRange()) state = AIState::Chase;
                break;
            // ...
        }
    }
};
```

### Command — đóng gói hành động (undo/redo, input remapping, replay)
```cpp
// Mã giả — mỗi hành động là 1 object, dễ ghi lại / hoàn tác / phát lại
class ICommand {
public:
    virtual void Execute() = 0;
    virtual void Undo()    = 0;
    virtual ~ICommand() = default;
};

class MoveCommand : public ICommand {
    Player& player; Vector3 delta;
public:
    MoveCommand(Player& p, Vector3 d) : player(p), delta(d) {}
    void Execute() override { player.position += delta; }
    void Undo()    override { player.position -= delta; }
};
// Lưu lịch sử command để undo, hoặc remap input → command.
```

### Component Pattern — (đã nói ở mục 16) nền tảng của Unreal Actor & ECS.

---

# PHẦN VI — UNREAL ENGINE C++

> Unreal Engine dùng một "phương ngữ" C++ riêng với reflection system, garbage collection, và bộ container/smart pointer riêng. Hiểu rõ khác biệt giúp tránh nhầm lẫn khi chuyển từ Standard C++.

## 30. UE C++ khác Standard C++ thế nào

| Khía cạnh | Standard C++ | Unreal C++ |
|---|---|---|
| Quản lý bộ nhớ | new/delete, smart pointer | **Garbage Collector** cho `UObject` |
| Container | `std::vector`, `std::map`... | `TArray`, `TMap`, `TSet`... |
| String | `std::string` | `FString`, `FName`, `FText` |
| Smart pointer | `unique_ptr`, `shared_ptr` | `TUniquePtr`, `TSharedPtr`, `TObjectPtr`, `TWeakObjectPtr` |
| Reflection | không có | **có** (UCLASS/UPROPERTY/UFUNCTION) |
| Exceptions | có | **mặc định tắt** |
| Assert | `assert` | `check()`, `ensure()`, `verify()` |
| Build | CMake/MSBuild | **UnrealBuildTool** (`.Build.cs`) |
| Naming | tùy team | quy ước nghiêm ngặt (prefix U/A/F/E/I) |

### Quy ước đặt tiền tố (prefix) — BẮT BUỘC trong UE
```cpp
class  UMyComponent;   // U — kế thừa từ UObject
class  AMyActor;       // A — kế thừa từ AActor (đặt được vào world)
struct FMyData;        // F — struct/class thường (không phải UObject)
enum class EWeaponType;// E — enum
class  IMyInterface;   // I — interface
template<> T...        // T — type template (TArray, TSubclassOf...)
```

### File Build cơ bản (`.Build.cs` — viết bằng C#)
```csharp
// MyGame.Build.cs
using UnrealBuildTool;

public class MyGame : ModuleRules {
    public MyGame(ReadOnlyTargetRules Target) : base(Target) {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
        // Module phụ thuộc — phải khai báo để link được:
        PublicDependencyModuleNames.AddRange(new string[] {
            "Core", "CoreUObject", "Engine", "InputCore",
            "GameplayAbilities", "GameplayTags", "GameplayTasks"  // ví dụ cho GAS
        });
    }
}
```

## 31. UObject, Reflection & Macros

### UObject — lớp gốc của hầu hết mọi thứ trong UE
`UObject` là base class cung cấp: garbage collection, reflection, serialization, networking, Blueprint integration. Hầu hết class gameplay kế thừa (gián tiếp) từ `UObject`.

### Reflection & Macros — "ma thuật" của UE
UE dùng **Unreal Header Tool (UHT)** quét các macro để sinh code reflection (cho Blueprint, serialization, GC, network...).

```cpp
// MyActor.h
#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MyActor.generated.h"          // BẮT BUỘC — include cuối, file UHT sinh ra

UCLASS()                                 // đánh dấu class cho reflection
class MYGAME_API AMyActor : public AActor {
    GENERATED_BODY()                     // BẮT BUỘC — chèn code UHT sinh

public:
    AMyActor();

    // UPROPERTY — cho biến: hiện trong editor, được GC quản lý, serialize, replicate
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    float Health = 100.0f;

    UPROPERTY(VisibleAnywhere, Category = "Components")
    class UStaticMeshComponent* MeshComp;

    // UFUNCTION — cho hàm: gọi được từ Blueprint, làm event/RPC...
    UFUNCTION(BlueprintCallable, Category = "Gameplay")
    void TakeDamage(float Amount);

protected:
    virtual void BeginPlay() override;   // được gọi khi actor vào game
public:
    virtual void Tick(float DeltaTime) override;  // gọi mỗi frame
};
```

### Các specifier UPROPERTY hay dùng
| Specifier | Ý nghĩa |
|---|---|
| `EditAnywhere` | Sửa được trong editor (cả class default lẫn instance) |
| `EditDefaultsOnly` | Chỉ sửa trên Blueprint/class default, không sửa từng instance |
| `VisibleAnywhere` | Xem được nhưng không sửa |
| `BlueprintReadWrite` | Blueprint đọc & ghi |
| `BlueprintReadOnly` | Blueprint chỉ đọc |
| `Category = "..."` | Nhóm trong Details panel |
| `meta = (ClampMin="0")` | Ràng buộc giá trị |

> **Cực kỳ quan trọng:** Mọi con trỏ tới `UObject` là **member của class** cần được đánh dấu `UPROPERTY()`. Nếu quên, GC không biết bạn đang giữ object đó → nó có thể bị **thu hồi giữa chừng** → crash. (Xem mục 32.)

## 32. Garbage Collection trong UE

Khác Standard C++ (bạn tự delete), UE **tự động** thu hồi `UObject` không còn được tham chiếu. Cơ chế: **reachability analysis** — định kỳ quét từ "root set", object nào không reachable qua các `UPROPERTY` → bị xóa.

```cpp
UCLASS()
class AWeaponManager : public AActor {
    GENERATED_BODY()

    // ✅ ĐÚNG — UPROPERTY → GC biết, object an toàn, con trỏ tự thành null nếu bị hủy
    UPROPERTY()
    TObjectPtr<AWeapon> CurrentWeapon;

    // ❌ SAI — raw pointer KHÔNG UPROPERTY → GC không biết → có thể thành dangling pointer
    AWeapon* DangerousWeapon;   // ĐỪNG làm thế này với UObject members
};
```

### Tạo UObject đúng cách (KHÔNG dùng new)
```cpp
// Tạo Actor trong world:
AWeapon* Weapon = GetWorld()->SpawnActor<AWeapon>(WeaponClass, Location, Rotation);

// Tạo Component:
MeshComp = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("MeshComp"));  // trong constructor

// Tạo UObject thường (không phải Actor/Component):
UMyObject* Obj = NewObject<UMyObject>(this);   // 'this' = outer (chủ sở hữu)
```

> **Ghi nhớ:** Không bao giờ `new`/`delete` một `UObject`. Dùng `NewObject`, `SpawnActor`, `CreateDefaultSubobject`, và để GC lo phần hủy.

## 33. Actor & Component

### Actor — bất cứ thứ gì đặt được vào level
`AActor` là object có thể tồn tại trong world (có transform: vị trí, xoay, scale). Ví dụ: nhân vật, đèn, camera, trigger volume.

### Component — khối chức năng gắn vào Actor (Composition!)
Actor là cái "khung", Component cung cấp hành vi cụ thể. Đây chính là **composition over inheritance** (mục 16) ở quy mô engine.

```cpp
// MyCharacter.h
UCLASS()
class AMyCharacter : public ACharacter {
    GENERATED_BODY()

    UPROPERTY(VisibleAnywhere)
    class UCameraComponent* CameraComp;            // component camera

    UPROPERTY(VisibleAnywhere)
    class USpringArmComponent* SpringArm;          // "cần" giữ camera

    UPROPERTY(VisibleAnywhere)
    class UHealthComponent* HealthComp;            // component tùy biến của bạn

public:
    AMyCharacter();
};
```

```cpp
// MyCharacter.cpp — lắp component trong constructor
AMyCharacter::AMyCharacter() {
    PrimaryActorTick.bCanEverTick = true;          // bật Tick mỗi frame

    SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArm"));
    SpringArm->SetupAttachment(RootComponent);     // gắn vào root
    SpringArm->TargetArmLength = 300.0f;

    CameraComp = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera"));
    CameraComp->SetupAttachment(SpringArm);        // camera gắn vào đầu spring arm

    HealthComp = CreateDefaultSubobject<UHealthComponent>(TEXT("Health"));
}
```

### Vòng đời Actor (Actor Lifecycle) — các hàm hay override
```cpp
AMyActor::AMyActor() { /* constructor — lắp component, đặt giá trị mặc định */ }

void AMyActor::BeginPlay() {                 // khi vào game / spawn — khởi tạo gameplay
    Super::BeginPlay();                      // LUÔN gọi Super để giữ hành vi lớp cha
}

void AMyActor::Tick(float DeltaTime) {       // mỗi frame — logic cập nhật liên tục
    Super::Tick(DeltaTime);
    // dùng DeltaTime cho chuyển động độc lập FPS (như mục 25)
}

void AMyActor::EndPlay(const EEndPlayReason::Type Reason) {  // khi rời game — dọn dẹp
    Super::EndPlay(Reason);
}
```

> **`Super::`** = gọi phiên bản của lớp cha. Trong UE gần như luôn phải gọi `Super::` ở các override lifecycle.

## 34. Gameplay Framework

UE cung cấp khung gameplay sẵn — hiểu vai trò từng lớp để biết đặt logic vào đâu:

| Lớp | Vai trò |
|---|---|
| `AGameModeBase` / `AGameMode` | Luật chơi, điều kiện thắng/thua (chỉ tồn tại trên **server**) |
| `AGameStateBase` | Trạng thái game chia sẻ cho mọi client (điểm số, thời gian...) |
| `APlayerController` | Đại diện 1 người chơi, nhận input, điều khiển Pawn |
| `APlayerState` | Trạng thái của 1 người chơi (tên, điểm, ping) |
| `APawn` / `ACharacter` | Thực thể điều khiển được; `ACharacter` thêm sẵn di chuyển 2 chân, capsule, mesh |
| `UGameInstance` | Tồn tại xuyên suốt phiên game (qua nhiều level) — lưu trạng thái lâu dài |

```cpp
// Mã giả — luồng điều khiển điển hình
// PlayerController nhận input → điều khiển Pawn (Character) → Pawn dùng các Component để hành động
// GameMode quyết định luật → GameState phát trạng thái → UI đọc GameState để hiển thị
```

## 35. UE Containers vs STL

UE có container riêng (tối ưu cho engine, hỗ trợ reflection/serialization). **Trong code UE, dùng container UE thay STL.**

| STL | Unreal | Ghi chú |
|---|---|---|
| `std::vector<T>` | `TArray<T>` | mảng động, dùng nhiều nhất |
| `std::map<K,V>` | `TMap<K,V>` | hash map (giống unordered_map hơn) |
| `std::set<T>` | `TSet<T>` | tập phần tử duy nhất |
| `std::string` | `FString` | chuỗi sửa được |
| (chuỗi định danh) | `FName` | chuỗi bất biến, hash sẵn — nhanh để so sánh (tên asset, tag) |
| (chuỗi hiển thị) | `FText` | chuỗi cho người dùng, hỗ trợ localization (đa ngôn ngữ) |

```cpp
// TArray — tương đương vector
TArray<AActor*> Enemies;
Enemies.Add(NewEnemy);                  // thêm (≈ push_back)
Enemies.Num();                          // số phần tử (≈ size)
Enemies[0];                             // truy cập index
Enemies.Remove(SomeEnemy);             // xóa theo giá trị
Enemies.RemoveAt(2);                    // xóa theo index
for (AActor* E : Enemies) { /* ... */ }// range-based for vẫn dùng được

// TMap — tương đương map
TMap<FString, int32> Scores;
Scores.Add(TEXT("Player1"), 100);
if (int32* Found = Scores.Find(TEXT("Player1")))   // trả con trỏ, null nếu không có
    (*Found)++;

// FString thao tác
FString Name = TEXT("Hero");           // TEXT() — bắt buộc cho string literal trong UE
FString Greeting = FString::Printf(TEXT("Hello %s, HP: %d"), *Name, 100);  // *Name → const TCHAR*
```

> **Kiểu số trong UE:** dùng `int32`, `int64`, `uint8`, `float`, `double` (UE typedef) thay vì `int`/`long` để đảm bảo cross-platform nhất quán.

## 36. UE Smart Pointers & Object Handles

UE có 2 nhóm smart pointer cho 2 loại object khác nhau:

### Cho UObject (đã có GC quản lý)
```cpp
// TObjectPtr — thay cho raw pointer trong UPROPERTY (UE5 khuyến nghị)
UPROPERTY()
TObjectPtr<AWeapon> Weapon;            // GC biết, hỗ trợ lazy load

// TWeakObjectPtr — tham chiếu yếu, KHÔNG ngăn GC, tự null khi object bị hủy
UPROPERTY()
TWeakObjectPtr<AActor> TargetActor;
if (TargetActor.IsValid()) {           // kiểm tra còn sống không
    TargetActor->DoSomething();
}

// TSubclassOf — "con trỏ tới một CLASS" (không phải instance) — dùng để spawn
UPROPERTY(EditAnywhere)
TSubclassOf<AWeapon> WeaponClass;       // chọn class trong editor, rồi SpawnActor
```

### Cho object KHÔNG phải UObject (struct C++ thường)
```cpp
TSharedPtr<FMyData>  Data = MakeShared<FMyData>();   // ≈ std::shared_ptr
TWeakPtr<FMyData>    WeakData = Data;                 // ≈ std::weak_ptr
TUniquePtr<FMyData>  Unique = MakeUnique<FMyData>();  // ≈ std::unique_ptr
```

> **Quy tắc chọn:** UObject → dùng `UPROPERTY` + `TObjectPtr`/`TWeakObjectPtr`. Non-UObject → dùng `TSharedPtr`/`TUniquePtr`/`TWeakPtr`.

## 37. Delegates & Events

Delegate = hiện thực của **Observer pattern** trong UE — cơ chế "đăng ký callback & phát sự kiện", dùng để giảm coupling giữa các hệ thống.

```cpp
// 1. Khai báo delegate type (thường trong header)
// "Dynamic Multicast" = nhiều listener + dùng được trong Blueprint
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnHealthChanged, float, NewHealth);

UCLASS()
class UHealthComponent : public UActorComponent {
    GENERATED_BODY()
public:
    // 2. Khai báo biến delegate
    UPROPERTY(BlueprintAssignable, Category = "Events")
    FOnHealthChanged OnHealthChanged;

    void TakeDamage(float Amount) {
        Health -= Amount;
        OnHealthChanged.Broadcast(Health);   // 3. PHÁT sự kiện cho mọi listener
    }
private:
    float Health = 100.0f;
};
```

```cpp
// AMyHUD.h — hàm nghe BẮT BUỘC phải là UFUNCTION() thì AddDynamic mới hoạt động:
UFUNCTION()
void HandleHealthChanged(float NewHealth);

// AMyHUD.cpp
// 4. ĐĂNG KÝ nghe (ví dụ trong BeginPlay của UI hoặc Character)
HealthComp->OnHealthChanged.AddDynamic(this, &AMyHUD::HandleHealthChanged);

void AMyHUD::HandleHealthChanged(float NewHealth) {   // được gọi mỗi khi máu đổi
    UpdateHealthBar(NewHealth);
}
```
> ⚠️ **Bẫy hay gặp:** Với *dynamic* delegate (`AddDynamic`), hàm callback **bắt buộc** đánh dấu `UFUNCTION()` — quên là lỗi biên dịch. Còn delegate non-dynamic dùng `AddUObject(this, &Class::Func)`, `AddLambda(...)`, `AddRaw(...)` thì callback **không** cần `UFUNCTION()`. Khi đối tượng nghe bị hủy, nhớ gọi `RemoveDynamic`/`RemoveAll` (hoặc dùng `AddWeakLambda`/handle) để tránh gọi vào con trỏ chết.

### Các loại delegate
| Loại | Đặc điểm |
|---|---|
| `DECLARE_DELEGATE` | single-cast, C++ only |
| `DECLARE_MULTICAST_DELEGATE` | nhiều listener, C++ only |
| `DECLARE_DYNAMIC_DELEGATE` | dùng được trong Blueprint (serialize được), chậm hơn |
| `DECLARE_DYNAMIC_MULTICAST_DELEGATE` | Blueprint + nhiều listener (hay dùng nhất cho event) |

## 38. C++ ↔ Blueprint Interaction

Triết lý UE: **C++ cho hệ thống/hiệu năng, Blueprint cho lắp ghép/iterate nhanh.** Phối hợp tốt hai bên là kỹ năng cốt lõi.

```cpp
// Cho Blueprint GỌI hàm C++:
UFUNCTION(BlueprintCallable, Category = "Combat")
void Fire();

// Cho Blueprint ĐỌC/GHI biến C++:
UPROPERTY(EditAnywhere, BlueprintReadWrite)
float FireRate = 0.2f;

// Hàm cài đặt trong C++ nhưng cho Blueprint OVERRIDE / mở rộng:
UFUNCTION(BlueprintNativeEvent, Category = "AI")
void OnTargetSpotted(AActor* Target);
void OnTargetSpotted_Implementation(AActor* Target) {   // bản C++ mặc định
    // logic mặc định — Blueprint có thể override
}

// Hàm CHỈ cài trong Blueprint, C++ chỉ khai báo & gọi:
UFUNCTION(BlueprintImplementableEvent, Category = "FX")
void PlayHitEffect();   // không có thân C++ — designer làm trong Blueprint
```

### Expose enum/struct cho Blueprint
```cpp
UENUM(BlueprintType)                         // enum dùng được trong Blueprint
enum class EWeaponType : uint8 {             // PHẢI là uint8 để BP nhận
    Sword UMETA(DisplayName = "Sword"),
    Bow   UMETA(DisplayName = "Bow")
};

USTRUCT(BlueprintType)                        // struct dùng được trong Blueprint
struct FWeaponStats {
    GENERATED_BODY()
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    float Damage = 10.0f;
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    float Range = 100.0f;
};
```

## 39. Data-Driven Design (DataAsset, DataTable)

Tách **dữ liệu** ra khỏi **code** → designer chỉnh được mà không cần compile, dễ cân bằng (balancing), dễ mở rộng. Đây là cách tiếp cận chuyên nghiệp cho nội dung game.

### Primary Data Asset — cấu hình từng "thứ" (vũ khí, skill, item...)
```cpp
// WeaponData.h
UCLASS(BlueprintType)
class UWeaponData : public UPrimaryDataAsset {
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Weapon")
    FName WeaponName;

    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Weapon")
    float Damage = 10.0f;

    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Weapon")
    TObjectPtr<UStaticMesh> Mesh;

    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Weapon")
    TObjectPtr<USoundBase> FireSound;
};
// Designer tạo nhiều asset (DA_Sword, DA_Bow...) từ class này, điền số liệu trong editor.
```

### Data Table — bảng dữ liệu (như spreadsheet), import từ CSV/JSON
```cpp
// Định nghĩa 1 dòng của bảng:
USTRUCT(BlueprintType)
struct FEnemyRow : public FTableRowBase {     // kế thừa FTableRowBase
    GENERATED_BODY()
    UPROPERTY(EditAnywhere, BlueprintReadWrite) float Health;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) float Speed;
    UPROPERTY(EditAnywhere, BlueprintReadWrite) int32 XPReward;
};

// Đọc trong C++:
if (const FEnemyRow* Row = EnemyTable->FindRow<FEnemyRow>(TEXT("Goblin"), TEXT("")))
{
    SpawnEnemyWith(Row->Health, Row->Speed);
}
```

> Đây gắn với chuyên môn **data-driven architecture** của bạn: DataAsset cho cấu hình phức tạp/tham chiếu asset, DataTable cho dữ liệu dạng bảng lớn (đặc biệt khi cần import từ Excel/CSV để balancing).

## 40. Gameplay Ability System (GAS) — tổng quan

GAS là framework mạnh của UE cho hệ thống **ability, attribute, effect, cooldown** — phù hợp RPG, MOBA, action. Đây là kiến trúc nâng cao; phần này chỉ giới thiệu các thành phần cốt lõi.

### Các thành phần chính
| Thành phần | Vai trò |
|---|---|
| `UAbilitySystemComponent` (ASC) | "Bộ não" — gắn vào Actor, quản lý ability/attribute/effect |
| `UGameplayAbility` | Một kỹ năng (đòn đánh, skill, dash...) — logic kích hoạt |
| `UAttributeSet` | Tập thuộc tính (Health, Mana, Strength...) qua `FGameplayAttributeData` |
| `UGameplayEffect` (GE) | Thay đổi attribute (gây damage, buff, debuff, cooldown) — data-driven |
| `FGameplayTag` | Tag phân loại trạng thái/ability (Status.Stunned, Ability.Fireball) |

```cpp
// Mã giả — luồng GAS điển hình
// 1. Actor có ASC + AttributeSet (Health, Mana...)
// 2. Input → ASC->TryActivateAbilityByClass(UFireballAbility::StaticClass())
// 3. Ability chạy → áp UGameplayEffect lên target's ASC
// 4. GE sửa Health attribute của target → trigger callback → cập nhật UI
// 5. GameplayTags kiểm soát điều kiện (vd: không cast được khi có tag Status.Silenced)
```

```cpp
// Khai báo một AttributeSet đơn giản
UCLASS()
class UMyAttributeSet : public UAttributeSet {
    GENERATED_BODY()
public:
    UPROPERTY(BlueprintReadOnly, Category = "Attributes")
    FGameplayAttributeData Health;
    ATTRIBUTE_ACCESSORS(UMyAttributeSet, Health)   // sinh getter/setter tiện dụng

    UPROPERTY(BlueprintReadOnly, Category = "Attributes")
    FGameplayAttributeData MaxHealth;
    ATTRIBUTE_ACCESSORS(UMyAttributeSet, MaxHealth)
};
```
> ⚠️ **Lưu ý chính xác:** `ATTRIBUTE_ACCESSORS` **không phải** macro có sẵn của engine — nó là macro tiện ích bạn **tự định nghĩa** (gần như mọi project GAS đều copy từ sample ActionRPG của Epic), gói 4 macro engine thật. Đặt đoạn này ở đầu file `.h` của AttributeSet:
> ```cpp
> #define ATTRIBUTE_ACCESSORS(ClassName, PropertyName) \
>     GAMEPLAYATTRIBUTE_PROPERTY_GETTER(ClassName, PropertyName) \
>     GAMEPLAYATTRIBUTE_VALUE_GETTER(PropertyName) \
>     GAMEPLAYATTRIBUTE_VALUE_SETTER(PropertyName) \
>     GAMEPLAYATTRIBUTE_VALUE_INITTER(PropertyName)
> ```
> Module phải link `"GameplayAbilities"` (mục 30) và include `"AttributeSet.h"`, `"AbilitySystemComponent.h"`. Trong thực tế, attribute thường thêm `ReplicatedUsing = OnRep_Health` để hỗ trợ multiplayer.

> **Vì sao dùng GAS:** xử lý sẵn các bài toán khó của combat system (prediction cho multiplayer, stacking effect, cooldown, cost, replication). Đánh đổi: learning curve dốc, setup ban đầu nhiều. Phù hợp khi hệ thống ability đủ phức tạp để xứng đáng.

---

# PHẦN VII — KỸ THUẬT & THỰC HÀNH

## 41. Tổ chức code: Header/Source, Forward Declaration

### Nguyên tắc include
- Header (`.h`) chỉ include **những gì interface cần**. Phần còn lại include trong `.cpp`.
- Dùng **forward declaration** thay include khi chỉ cần con trỏ/tham chiếu → giảm thời gian biên dịch & tránh circular include.

```cpp
// Weapon.h
#pragma once

class Player;          // FORWARD DECLARATION — đủ vì ta chỉ dùng con trỏ Player*

class Weapon {
    Player* owner;     // chỉ cần biết "Player tồn tại", chưa cần định nghĩa đầy đủ
public:
    void SetOwner(Player* p);
    void DealDamage();
};
```

```cpp
// Weapon.cpp
#include "Weapon.h"
#include "Player.h"    // CHỖ NÀY mới include đầy đủ vì cần GỌI hàm của Player

void Weapon::DealDamage() {
    owner->TakeDamage(10);   // cần định nghĩa đầy đủ của Player ở đây
}
```

> **Quy tắc:** Cần *gọi hàm / truy cập member / tạo object* → phải include đầy đủ. Chỉ cần *con trỏ hoặc tham chiếu* → forward declaration là đủ.

### Trong Unreal
```cpp
// Trong .h — forward declare bằng class:
UPROPERTY()
class UStaticMeshComponent* Mesh;   // "class" inline = forward declaration nhanh

// Trong .cpp — include đầy đủ:
#include "Components/StaticMeshComponent.h"
```

## 42. Naming Conventions & Code Style

Nhất quán quan trọng hơn "đúng/sai". Dưới đây là quy ước phổ biến (UE-style):

```cpp
// Class:        PascalCase, có prefix trong UE (U/A/F/E/I)
class UInventoryComponent;

// Hàm:          PascalCase (UE) hoặc camelCase (nhiều codebase khác)
void EquipWeapon();

// Biến local:   camelCase
int enemyCount = 0;

// Biến member:  thường giống local; UE hay dùng PascalCase cho member
float Health;

// Hằng số:      ALL_CAPS hoặc kPascalCase
const int MAX_PLAYERS = 4;
constexpr float kGravity = 9.81f;

// Boolean:      tiền tố b (UE) hoặc is/has/can
bool bIsAlive;        // UE-style
bool isReady;         // phổ biến khác
```

### Nguyên tắc clean code
- Tên **diễn đạt ý định**, không cần comment: `CalculateFallDamage()` > `Calc()`.
- Hàm ngắn, làm **một việc** (Single Responsibility).
- Comment giải thích **vì sao** (why), không phải **cái gì** (what) — code đã nói "what".
- Tránh "magic number": dùng hằng số đặt tên.

```cpp
// ❌ Magic number, khó hiểu
if (state == 3) { /* ... */ }

// ✅ Rõ ràng
if (state == EAIState::Attacking) { /* ... */ }
```

## 43. Debugging

### Kỹ thuật cơ bản
```cpp
// 1. Print debugging (Standard C++)
std::cout << "Health: " << health << ", Position: " << pos.x << "\n";

// 2. Print debugging (Unreal)
UE_LOG(LogTemp, Warning, TEXT("Health: %f, Enemies: %d"), Health, Enemies.Num());
// In lên màn hình game (debug nhanh):
GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Red,
    FString::Printf(TEXT("Health: %f"), Health));
```

### Breakpoint & Debugger (quan trọng nhất)
- Đặt **breakpoint** để dừng tại dòng cần xem, kiểm tra giá trị biến (watch), call stack.
- **Step over / into / out** để đi từng dòng.
- Hiệu quả hơn print rất nhiều cho lỗi logic phức tạp.

### Assertions trong Unreal
```cpp
check(Weapon != nullptr);          // crash NGAY nếu sai (lỗi nghiêm trọng, không thể tiếp tục)
ensure(Health >= 0);               // log + breakpoint nếu sai, nhưng VẪN chạy tiếp (cảnh báo)
verify(InitSystem());              // như check nhưng vẫn chạy biểu thức ở Release build

// Standard C++ tương đương:
assert(weapon != nullptr);         // chỉ hoạt động ở Debug build
```

### Sanitizers (Standard C++) — phát hiện lỗi bộ nhớ
```bash
g++ -fsanitize=address -g main.cpp    # AddressSanitizer: bắt use-after-free, leak, overflow
g++ -fsanitize=undefined -g main.cpp  # UBSan: bắt undefined behavior
```

## 44. Undefined Behavior & các bẫy phổ biến

**Undefined Behavior (UB)** = code mà chuẩn C++ không định nghĩa kết quả. Có thể chạy "đúng" trên máy bạn nhưng crash chỗ khác. **UB là nguồn bug nguy hiểm nhất.**

```cpp
// 1. Dùng biến chưa khởi tạo
int x;
std::cout << x;                    // 💥 UB — giá trị rác

// 2. Truy cập ngoài mảng (out-of-bounds)
int arr[5];
arr[10] = 1;                       // 💥 UB — ghi đè bộ nhớ lạ

// 3. Dereference con trỏ null/dangling
Player* p = nullptr;
p->health;                        // 💥 UB

// 4. Dùng object sau khi nó bị hủy (use-after-free / dangling reference)
int& GetRef() { int local = 5; return local; }   // 💥 trả tham chiếu tới biến đã chết

// 5. Integer overflow trên kiểu signed
int max = INT_MAX;
max + 1;                          // 💥 UB (signed overflow)

// 6. Quên break trong switch → fallthrough ngoài ý muốn
// 7. So sánh float bằng == (sai số dấu phẩy động)
if (0.1f + 0.2f == 0.3f) { }      // ❌ thường FALSE! Dùng so sánh có epsilon:
if (std::abs(a - b) < 0.0001f) { }// ✅
```

### Bẫy đặc thù Unreal
```cpp
// Quên UPROPERTY → UObject bị GC giữa chừng (mục 32)
// Quên Super:: trong override lifecycle → mất hành vi base
// Dùng con trỏ Actor mà không kiểm tra IsValid → crash khi actor đã destroy
if (IsValid(TargetActor)) { TargetActor->DoStuff(); }   // ✅ luôn check
// Sửa TArray trong khi đang range-for trên nó → invalid iterator → crash
```

## 45. Best Practices Checklist

Bản tổng kết tra cứu nhanh khi viết/review code:

### Bộ nhớ & tài nguyên
- [ ] Ưu tiên **stack** hơn heap; ưu tiên **smart pointer** hơn `new`/`delete` trần.
- [ ] Áp dụng **RAII** cho mọi tài nguyên (file, mutex, memory...).
- [ ] `unique_ptr` mặc định; `shared_ptr` khi cần chia sẻ; `weak_ptr` phá vòng tham chiếu.
- [ ] (UE) Mọi `UObject*` member là **`UPROPERTY()`**; không `new`/`delete` UObject.

### An toàn & đúng đắn
- [ ] Khởi tạo **mọi biến** ngay khi khai báo.
- [ ] Kiểm tra con trỏ **trước khi dereference** (`if (p)` / `IsValid(p)`).
- [ ] `const correctness`: đánh dấu `const` mọi thứ không đổi.
- [ ] Base class có virtual function → **virtual destructor**.
- [ ] Dùng `override` cho mọi hàm override; `enum class` thay enum cũ.
- [ ] So sánh float bằng **epsilon**, không bằng `==`.

### Hiệu năng
- [ ] Truyền object lớn bằng **`const&`**, không by value.
- [ ] `reserve()` vector khi biết trước kích thước; `emplace_back` thay `push_back`.
- [ ] Ưu tiên container **liền kề** (`vector`/`TArray`) cho hiệu năng (cache).
- [ ] **Đo bằng profiler** trước khi tối ưu — không đoán.

### Tổ chức & phong cách
- [ ] Tên rõ nghĩa; hàm ngắn, làm một việc.
- [ ] Forward declaration thay include khi đủ; tránh circular include.
- [ ] Nhất quán naming convention toàn dự án.
- [ ] Comment giải thích **why**, không phải **what**.

---

# PHỤ LỤC

## A. Cheat Sheet cú pháp

```cpp
// ===== KHAI BÁO =====
int x = 5;                          auto y = 5;
const int c = 10;                   constexpr int cc = 10;
int& ref = x;                       int* ptr = &x;
std::unique_ptr<T> u = std::make_unique<T>(args);
std::shared_ptr<T> s = std::make_shared<T>(args);

// ===== CONTROL FLOW =====
if (cond) {} else if (cond) {} else {}
switch (val) { case A: break; default: break; }
for (int i = 0; i < n; ++i) {}
for (const auto& item : container) {}
while (cond) {}                     do {} while (cond);

// ===== CLASS =====
class Foo {
public:
    Foo() = default;                // default constructor
    Foo(int x) : value(x) {}        // member init list
    virtual ~Foo() = default;       // virtual destructor
    virtual void Bar() = 0;         // pure virtual (abstract)
    int Get() const { return value; }
private:
    int value = 0;
};
class Derived : public Foo {
    void Bar() override {}          // override
};

// ===== TEMPLATE =====
template <typename T> T Max(T a, T b) { return a > b ? a : b; }
template <typename T> class Box { T item; };

// ===== LAMBDA =====
auto fn = [capture](params) -> ret { body };
[](){}          [=](){}         [&](){}        [this](){}

// ===== STL =====
std::vector<T> v;  v.push_back(x);  v.size();  v[i];
std::map<K,V> m;   m[key] = val;    m.find(key);
std::sort(v.begin(), v.end(), [](auto a, auto b){ return a < b; });
```

## B. STL vs UE — bảng đối chiếu nhanh

| Khái niệm | Standard C++ | Unreal Engine |
|---|---|---|
| Mảng động | `std::vector<T>` | `TArray<T>` |
| Hash map | `std::unordered_map<K,V>` | `TMap<K,V>` |
| Set | `std::unordered_set<T>` | `TSet<T>` |
| Chuỗi sửa được | `std::string` | `FString` |
| Chuỗi định danh | — | `FName` |
| Chuỗi hiển thị (i18n) | — | `FText` |
| unique ownership | `std::unique_ptr<T>` | `TUniquePtr<T>` |
| shared ownership | `std::shared_ptr<T>` | `TSharedPtr<T>` |
| weak ref | `std::weak_ptr<T>` | `TWeakPtr<T>` / `TWeakObjectPtr<T>` |
| UObject pointer | (n/a) | `TObjectPtr<T>` + `UPROPERTY()` |
| Optional | `std::optional<T>` | `TOptional<T>` |
| Function object | `std::function` | `TFunction` |
| Số nguyên | `int`, `int32_t` | `int32`, `int64`, `uint8` |
| Assert | `assert` | `check` / `ensure` / `verify` |
| Log | `std::cout` | `UE_LOG` |
| Tạo object | `new T()` / `make_unique` | `NewObject` / `SpawnActor` / `CreateDefaultSubobject` |

## C. Glossary (thuật ngữ)

- **Translation Unit:** Một file `.cpp` sau khi preprocess — đơn vị compiler dịch.
- **RAII:** Resource Acquisition Is Initialization — gắn vòng đời tài nguyên vào object.
- **UB (Undefined Behavior):** Hành vi không xác định theo chuẩn — nguồn bug nguy hiểm.
- **Lvalue / Rvalue:** Giá trị có tên/địa chỉ lâu dài (lvalue) vs giá trị tạm (rvalue).
- **Move Semantics:** Chuyển nhượng tài nguyên thay vì copy.
- **vtable:** Bảng hàm ảo, cơ chế cho dynamic dispatch (đa hình runtime).
- **POD (Plain Old Data):** Struct dữ liệu thuần, không có hành vi/constructor phức tạp.
- **Cache miss/hit:** CPU không/có tìm thấy dữ liệu trong cache — yếu tố hiệu năng lớn.
- **ECS:** Entity Component System — kiến trúc data-oriented cho game.
- **Reflection:** Khả năng chương trình "tự soi" cấu trúc của mình lúc runtime (UE có, C++ thuần không).
- **GC (Garbage Collection):** Tự động thu hồi bộ nhớ không dùng (UE dùng cho UObject).
- **ASC (AbilitySystemComponent):** Component trung tâm của GAS.
- **Delegate:** Hiện thực Observer pattern trong UE (đăng ký & phát callback).

## D. Tài nguyên học tập

**Sách:**
- *A Tour of C++* (Bjarne Stroustrup) — tổng quan Modern C++ nhanh, súc tích.
- *Effective Modern C++* (Scott Meyers) — best practices C++11/14, must-read.
- *Game Programming Patterns* (Robert Nystrom) — design patterns cho game, **đọc miễn phí online**, cực hay.
- *Game Engine Architecture* (Jason Gregory) — kiến trúc engine toàn diện.

**Online:**
- [cppreference.com](https://en.cppreference.com) — tài liệu chuẩn C++ chính xác nhất (bookmark ngay).
- [learncpp.com](https://www.learncpp.com) — tutorial C++ từ đầu, rất chi tiết & miễn phí.
- [Unreal Engine Documentation](https://dev.epicgames.com/documentation) — tài liệu UE chính thức.
- [Unreal C++ API Reference](https://dev.epicgames.com/documentation/en-us/unreal-engine/API) — tra cứu class/function UE.
- [Tom Looman's UE C++ resources](https://www.tomlooman.com) — hướng dẫn UE C++ thực chiến chất lượng cao.

**Lộ trình gợi ý cho người mới:**
1. Nền tảng (Phần I–II): cú pháp, con trỏ, bộ nhớ, RAII, smart pointer.
2. OOP & Modern C++ (Phần III–IV): class, đa hình, STL, template, lambda.
3. Tư duy game (Phần V): game loop, patterns, cache, math.
4. Chuyên sâu engine (Phần VI): chọn Unreal và đi sâu, hoặc tự viết mini-engine với SDL/raylib.
5. Thực hành (Phần VII): áp dụng best practices vào dự án thật — học bằng cách làm.

> **Lời cuối:** C++ rộng và sâu — đừng cố nhớ hết. Hãy hiểu *nguyên lý* (RAII, ownership, cache, đa hình), dùng tài liệu này tra cứu khi cần, và **học bằng cách viết code**. Mỗi bug bạn sửa là một bài học không sách nào dạy được.

---

*Tài liệu tham chiếu — phiên bản tổng hợp. Cập nhật/mở rộng theo nhu cầu dự án.*
