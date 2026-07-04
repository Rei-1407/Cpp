import { useState } from "react";
import type { Challenge } from "../data/challenges";
import { COMPILER_EXPLORER_URL } from "../data/challenges";
import Markdown from "./Markdown";

function normOut(s: string): string {
  return s.trim().replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n");
}

interface Props {
  challenge: Challenge;
  onSolved?: () => void;
}

export default function ChallengePanel({ challenge, onSolved }: Props) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState<null | boolean>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);

  const check = () => {
    const ok = normOut(answer) === normOut(challenge.expected ?? "");
    setChecked(ok);
    if (ok) onSolved?.();
  };

  const openInGodbolt = async () => {
    try {
      await navigator.clipboard.writeText(challenge.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard may be blocked — the editor still opens */
    }
    window.open(COMPILER_EXPLORER_URL, "_blank", "noreferrer");
  };

  return (
    <div className="challenge card pad">
      <div className="ch-head">
        <span className={"ch-type " + challenge.type}>
          {challenge.type === "predict" ? "Đoán output" : "Viết code"}
        </span>
        <span className="ch-title">{challenge.title}</span>
      </div>
      <div className="ch-prompt">{challenge.prompt}</div>

      <Markdown>{"```cpp\n" + challenge.code + "\n```"}</Markdown>

      {challenge.type === "predict" ? (
        <>
          <label className="muted" style={{ fontSize: 13, display: "block", marginBottom: 6 }}>
            Chương trình in ra gì? (gõ output dự đoán của bạn)
          </label>
          <textarea
            className="answer-input"
            rows={2}
            value={answer}
            placeholder="ví dụ: 15 25"
            onChange={(e) => {
              setAnswer(e.target.value);
              setChecked(null);
            }}
          />
          <div className="ch-actions">
            <button className="btn primary sm" onClick={check} disabled={!answer.trim()}>
              ✓ Kiểm tra
            </button>
            <button className="btn ghost sm" onClick={openInGodbolt}>
              {copied ? "Đã copy code!" : "▶ Chạy thử trên Compiler Explorer"}
            </button>
            {challenge.hints && (
              <button className="btn ghost sm" onClick={() => setShowHints((v) => !v)}>
                💡 Gợi ý
              </button>
            )}
          </div>
          {checked !== null && (
            <div className={"ch-feedback " + (checked ? "ok" : "no")}>
              {checked ? (
                "🎉 Chính xác! Output đúng là: " + challenge.expected
              ) : (
                <>
                  Chưa đúng. Thử lại hoặc chạy thử để kiểm chứng.{" "}
                  <button
                    className="btn ghost sm"
                    style={{ marginLeft: 8 }}
                    onClick={() => setShowSolution(true)}
                  >
                    Xem đáp án
                  </button>
                </>
              )}
            </div>
          )}
          {showSolution && (
            <div className="ch-feedback ok fade">Đáp án: {challenge.expected}</div>
          )}
        </>
      ) : (
        <>
          <div className="ch-actions">
            <button className="btn primary sm" onClick={openInGodbolt}>
              {copied ? "Đã copy code!" : "▶ Mở trong Compiler Explorer"}
            </button>
            <button
              className="btn ghost sm"
              onClick={() => {
                setShowSolution((v) => !v);
                if (!showSolution) onSolved?.();
              }}
            >
              {showSolution ? "Ẩn lời giải" : "Xem lời giải tham khảo"}
            </button>
            {challenge.hints && (
              <button className="btn ghost sm" onClick={() => setShowHints((v) => !v)}>
                💡 Gợi ý
              </button>
            )}
          </div>
          {showSolution && challenge.solution && (
            <div className="fade" style={{ marginTop: 12 }}>
              <div className="muted" style={{ fontSize: 12, marginBottom: 4 }}>
                Lời giải tham khảo (một trong nhiều cách):
              </div>
              <Markdown>{"```cpp\n" + challenge.solution + "\n```"}</Markdown>
            </div>
          )}
        </>
      )}

      {showHints && challenge.hints && (
        <ul className="hint-list fade">
          {challenge.hints.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
