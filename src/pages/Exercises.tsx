import { exerciseGroups, exerciseIntro, totalExercises } from "../content/exercises";
import { actions, useStore } from "../lib/store";
import Markdown from "../components/Markdown";

export default function Exercises() {
  const state = useStore();

  const doneCount = exerciseGroups.reduce(
    (n, g) => n + g.items.filter((it) => state.exercises[it.id]?.done).length,
    0,
  );
  const pct = totalExercises ? doneCount / totalExercises : 0;

  if (exerciseGroups.length === 0) {
    return (
      <div className="fade">
        <div className="empty card pad">
          <div className="emoji">🛠️</div>
          <h3>Chưa có bài tập</h3>
          <p className="muted">
            Bài tập được đọc từ <b>Phụ lục F</b> của tài liệu. Thêm mục{" "}
            <code>## F. Bài tập thực hành theo phần</code> để hiển thị ở đây.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade">
      <h1 style={{ fontSize: 28, letterSpacing: "-0.02em", margin: "0 0 4px" }}>
        Bài tập thực hành 🛠️
      </h1>
      <p className="muted" style={{ marginTop: 0, marginBottom: 18 }}>
        {exerciseIntro ||
          "Học xong mỗi phần → làm bài tập tương ứng → nộp qua Pull Request để mentor review."}
      </p>

      <div className="card pad" style={{ marginBottom: 22 }}>
        <div className="row spread" style={{ marginBottom: 8 }}>
          <b>Tiến độ bài tập</b>
          <span className="muted">
            {doneCount}/{totalExercises} · {Math.round(pct * 100)}%
          </span>
        </div>
        <div className={"bar" + (pct === 1 ? " success" : "")}>
          <span style={{ width: `${pct * 100}%` }} />
        </div>
      </div>

      {exerciseGroups.map((g) => {
        const groupDone = g.items.filter((it) => state.exercises[it.id]?.done).length;
        return (
          <section key={g.id} className="card pad" style={{ marginBottom: 18 }}>
            <div className="row spread" style={{ marginBottom: 14 }}>
              <h3 style={{ margin: 0 }}>{g.title}</h3>
              <span className="chip">
                {groupDone}/{g.items.length}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {g.items.map((it) => {
                const ex = state.exercises[it.id];
                const done = !!ex?.done;
                return (
                  <div key={it.id} className={"ex-item" + (done ? " done" : "")}>
                    <label className="ex-check">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => actions.toggleExercise(it.id)}
                      />
                      <span className="ex-box">{done ? "✓" : ""}</span>
                    </label>
                    <div className="ex-body">
                      <div className="ex-text">
                        <Markdown>{it.text}</Markdown>
                        {it.advanced && <span className="chip adv">★ nâng cao</span>}
                      </div>
                      <input
                        className="ex-link-input"
                        placeholder="🔗 Dán link PR / commit của bạn (lưu cục bộ)…"
                        value={ex?.link ?? ""}
                        onChange={(e) => actions.setExerciseLink(it.id, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <p className="muted center" style={{ fontSize: 12.5, marginTop: 8 }}>
        Đánh dấu hoàn thành mỗi bài để nhận +20 XP. Link nộp bài được lưu ngay trên trình duyệt này.
      </p>
    </div>
  );
}
