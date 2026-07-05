import { Link } from "react-router-dom";
import { reference } from "../content/reference";
import { totalExercises } from "../content/exercises";
import { cardIds } from "../data/cards";
import { useStore } from "../lib/store";
import { startOfDay } from "../lib/srs";
import { dayKey } from "../lib/srs";
import ProgressRing from "../components/ProgressRing";
import LevelBar from "../components/LevelBar";
import Achievements from "../components/Achievements";
import ActivityHeatmap from "../components/ActivityHeatmap";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Chào buổi sáng";
  if (h < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

export default function Dashboard() {
  const state = useStore();

  const today = startOfDay();
  const dueCount = cardIds.filter((id) => {
    const c = state.srs[id];
    return !c || c.due <= today;
  }).length;

  const lessons = reference.lessonSections;
  const readCount = lessons.filter((s) => state.progress[s.id]?.read).length;
  const total = lessons.length;

  const reviewsToday = state.activityByDay[dayKey()]?.reviews ?? 0;
  const goalPct = Math.min(1, reviewsToday / state.dailyGoal);

  // continue: first unread lesson in curriculum order (else first lesson)
  const nextLesson = lessons.find((s) => !state.progress[s.id]?.read) ?? lessons[0];

  // surface the richer appendices + exercises as quick links (if present)
  const ap = reference.appendix;
  const findAp = (re: RegExp) => ap?.sections.find((s) => re.test(s.title));
  const apTo = (re: RegExp) => {
    const s = findAp(re);
    return s ? `/reference?tab=${s.id}` : null;
  };
  const resources: { icon: string; title: string; desc: string; to: string }[] = [];
  const roadmapTo = apTo(/lộ trình|onboarding/i);
  if (roadmapTo) resources.push({ icon: "🧭", title: "Lộ trình & Onboarding", desc: "Chọn track theo vai trò", to: roadmapTo });
  if (totalExercises > 0) resources.push({ icon: "🧪", title: "Bài tập thực hành", desc: "Làm & nộp link PR", to: "/exercises" });
  const capstoneTo = apTo(/capstone/i);
  if (capstoneTo) resources.push({ icon: "🏆", title: "Capstone Project", desc: "Đồ án tổng kết", to: capstoneTo });
  const errorsTo = apTo(/lỗi/i);
  if (errorsTo) resources.push({ icon: "🐞", title: "Bảng lỗi thường gặp", desc: "Tra cứu lỗi build & runtime", to: errorsTo });

  return (
    <div className="page narrow fade" style={{ padding: 0 }}>
      <section className="hero">
        <div className="hero-glow" />
        <h1>
          {greeting()} 👋 Sẵn sàng luyện C++ chưa?
        </h1>
        <p>
          Học có hệ thống, luyện tập ngay trong từng bài, và <b>ôn tập hàng ngày</b> để kiến thức
          không rơi rụng. Kiên trì mỗi ngày là cách nhanh nhất để thành thạo.
        </p>
        <div className="hero-actions">
          <Link to="/review" className="btn primary lg">
            ↻ Ôn tập hôm nay{dueCount > 0 ? ` (${dueCount})` : ""}
          </Link>
          <Link to={`/lesson/${nextLesson.id}`} className="btn lg">
            {readCount > 0 ? "Tiếp tục học" : "Bắt đầu học"} →
          </Link>
        </div>
      </section>

      <div style={{ marginBottom: 20 }}>
        <LevelBar xp={state.xp} />
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat">
          <div className="stat-ico" style={{ background: "var(--warning-soft)" }}>🔥</div>
          <div>
            <div className="stat-val">{state.streak.count}</div>
            <div className="stat-label">Chuỗi ngày liên tiếp</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-ico" style={{ background: "var(--accent-soft)" }}>✦</div>
          <div>
            <div className="stat-val">{state.xp}</div>
            <div className="stat-label">Tổng điểm XP</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-ico" style={{ background: "var(--success-soft)" }}>📘</div>
          <div>
            <div className="stat-val">
              {readCount}
              <span style={{ fontSize: 15, color: "var(--text-faint)" }}>/{total}</span>
            </div>
            <div className="stat-label">Bài đã học</div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-ico" style={{ background: "var(--danger-soft)" }}>↻</div>
          <div>
            <div className="stat-val">{dueCount}</div>
            <div className="stat-label">Thẻ cần ôn hôm nay</div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 320px", alignItems: "start" }}>
        <div>
          <h2 className="section-title">Lộ trình học</h2>
          <div className="part-cards">
            {reference.parts
              .filter((p) => !p.isAppendix)
              .map((part) => {
              const read = part.sections.filter((s) => state.progress[s.id]?.read).length;
              const pct = part.sections.length ? read / part.sections.length : 0;
              const first = part.sections[0];
              return (
                <Link
                  key={part.id}
                  to={first ? `/lesson/${first.id}` : "/"}
                  className="card part-card"
                >
                  <div className="pc-label">{part.label}</div>
                  <div className="pc-title">{part.title.replace(/^PH.+?[—–-]\s*/i, "")}</div>
                  <div className="pc-meta">
                    <span>{part.sections.length} bài</span>
                    <span>{Math.round(pct * 100)}%</span>
                  </div>
                  <div className={"bar" + (pct === 1 ? " success" : "")}>
                    <span style={{ width: `${pct * 100}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card pad" style={{ position: "sticky", top: 84 }}>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            Mục tiêu hôm nay
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <ProgressRing
              value={goalPct}
              size={132}
              label={`${reviewsToday}/${state.dailyGoal}`}
              sub="lượt ôn"
              color={goalPct >= 1 ? "var(--success)" : "var(--accent)"}
            />
          </div>
          <p className="center muted" style={{ fontSize: 13.5, margin: "0 0 16px" }}>
            {goalPct >= 1
              ? "Tuyệt vời! Bạn đã hoàn thành mục tiêu ôn tập hôm nay 🎉"
              : `Ôn thêm ${state.dailyGoal - reviewsToday} thẻ nữa để đạt mục tiêu.`}
          </p>
          <Link to="/review" className="btn primary block">
            Vào ôn tập
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <Achievements />
      </div>

      <div style={{ marginTop: 30 }}>
        <ActivityHeatmap />
      </div>

      {resources.length > 0 && (
        <section style={{ marginTop: 30 }}>
          <h2 className="section-title">Tài nguyên &amp; lộ trình</h2>
          <div className="part-cards">
            {resources.map((r) => (
              <Link key={r.to} to={r.to} className="card part-card">
                <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
                <div className="pc-title" style={{ margin: 0 }}>
                  {r.title}
                </div>
                <div className="pc-meta" style={{ marginTop: 8, marginBottom: 0 }}>
                  <span>{r.desc}</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
