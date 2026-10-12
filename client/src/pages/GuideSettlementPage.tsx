import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettlementDeadline } from "@/lib/settlementDeadline";
import { GUIDE_DATA } from "@/data/guideData";
import { ArrowUpRight, ArrowDown, Check, Copy, Mail } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import "./settlement.css";

const checklistItems = [
  { id: "period", label: "협약기간과 월별 제출기한을 확인했습니다." },
  {
    id: "report",
    label: "월간 정산보고서에 사용 솔루션과 AI 활용내역을 작성했습니다.",
  },
  {
    id: "proof",
    label:
      "결제 건별 증빙 PDF를 Invoice → Receipt → 카드전표 순서로 준비했습니다.",
  },
  {
    id: "people",
    label: "4대보험 가입자명부 또는 사업자등록증명을 준비했습니다.",
  },
  {
    id: "newcomer",
    label: "신규 참여자가 있다면 개인정보 동의서를 준비했습니다.",
  },
  { id: "account", label: "지원금 수령계좌 확인자료를 준비했습니다." },
];
const stages = [
  { id: "schedule", title: "일정 확인", detail: "협약기간과 제출기한" },
  { id: "documents", title: "서류 준비", detail: "보고서·결제 증빙" },
  { id: "prepare", title: "자료 작성", detail: "내역 정리와 금액 확인" },
  { id: "submit", title: "제출·보완", detail: "안내된 경로로 제출" },
];

function SettlementDeadline() {
  const [now, setNow] = useState(() => Date.now());
  const deadline = getSettlementDeadline(now);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <aside className="notebook-deadline" aria-label="월별 정산 제출 기한">
      <div className="deadline-top">
        <span>다음 제출 마감</span>
        <span>KST · 한국 표준시</span>
      </div>
      <div className="deadline-date">
        <span>{deadline.label.split("월")[0]}월</span>
        <strong>15</strong>
        <span>일</span>
      </div>
      <p className="deadline-time">{deadline.label}</p>
      <div
        className="deadline-countdown"
        role="timer"
        aria-live="off"
        aria-label="정산 제출 마감까지 남은 시간"
      >
        <span>남은 시간</span>
        <strong>{deadline.remaining}</strong>
      </div>
      <p className="deadline-note">
        협회 별도 안내 일정이 우선합니다.
        <br />
        기업별 협약기간을 함께 확인해 주세요.
      </p>
    </aside>
  );
}

export default function GuideSettlementPage() {
  const [activeSection, setActiveSection] = useState(
    GUIDE_DATA.sections[0]?.id || ""
  );
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem("kaiga-settlement-checklist") || "[]"
      );
      return Array.isArray(saved)
        ? checklistItems
            .filter(item => saved.includes(item.id))
            .map(item => item.id)
        : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(
        "kaiga-settlement-checklist",
        JSON.stringify(checkedItems)
      );
    } catch {
      /* Storage may be disabled. */
    }
  }, [checkedItems]);
  useEffect(() => {
    const updateSection = () => {
      let current = GUIDE_DATA.sections[0]?.id || "";
      for (const section of GUIDE_DATA.sections) {
        if (
          (document.getElementById(section.id)?.getBoundingClientRect().top ??
            Infinity) <= 190
        )
          current = section.id;
      }
      setActiveSection(current);
    };
    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    return () => window.removeEventListener("scroll", updateSection);
  }, []);
  const copyForm = async () => {
    try {
      await navigator.clipboard.writeText("https://bit.ly/4xZ2YJu");
      setCopied(true);
      toast.success("정산서 양식함 링크가 복사되었습니다.");
    } catch {
      toast.error(
        "링크를 복사하지 못했습니다. 상단 양식함 열기를 이용해 주세요."
      );
    }
  };

  return (
    <div className="settlement-notebook">
      <Header />
      <main id="guide-top">
        <section className="notebook-cover" aria-labelledby="guide-title">
          <div className="notebook-shell">
            <div className="notebook-edition">
              <span>KAIGA / AX SUPPORT</span>
              <span>2026 — 실무 안내서</span>
            </div>
            <div className="notebook-cover-grid">
              <div className="notebook-intro">
                <p className="notebook-kicker">
                  게임을 만드는 시간에, 더 집중할 수 있도록.
                </p>
                <h1 id="guide-title">
                  정산 이용
                  <br />
                  <span>가이드.</span>
                </h1>
                <p className="notebook-description">
                  일정 확인부터 증빙 준비, 보고서 작성과 보완까지.
                  <br className="hidden sm:block" /> 매월 정산에 필요한 내용을
                  한곳에 모았습니다.
                </p>
                <div className="notebook-actions">
                  <a
                    className="notebook-button"
                    href="https://bit.ly/4xZ2YJu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    정산서 양식함 열기 <ArrowUpRight size={18} />
                  </a>
                  <a className="notebook-text-link" href="#documents">
                    준비할 서류 보기 <ArrowDown size={16} />
                  </a>
                </div>
              </div>
              <SettlementDeadline />
            </div>
            <nav className="notebook-stages" aria-label="정산 준비 단계">
              {stages.map((stage, i) => (
                <a key={stage.id} href={`#${stage.id}`}>
                  <span className="stage-number">0{i + 1}</span>
                  <div>
                    <strong>{stage.title}</strong>
                    <span>{stage.detail}</span>
                  </div>
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="notebook-shell notebook-body">
          <aside className="notebook-index">
            <nav aria-label="가이드 목차">
              <p className="notebook-index-title">
                이 가이드에서 <span>CONTENTS</span>
              </p>
              {GUIDE_DATA.sections.map((section, i) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={
                    activeSection === section.id ? "location" : undefined
                  }
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
              <a href="#submission-checklist" className="notebook-check-link">
                <Check size={16} /> 제출 전 체크리스트{" "}
                <span>{checkedItems.length}/6</span>
              </a>
            </nav>
            <div className="notebook-index-tools">
              <button type="button" onClick={copyForm}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "양식 링크 복사됨" : "양식 링크 복사"}
              </button>
              <Link href="/faq/">
                자주 묻는 질문 59개 <ArrowUpRight size={15} />
              </Link>
            </div>
            <p className="notebook-index-caption">
              KAIGA
              <br />
              인디게임의 다음 가능성을 함께.
            </p>
          </aside>
          <div className="notebook-pages">
            {GUIDE_DATA.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="notebook-chapter"
              >
                <div className="notebook-chapter-heading">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h2>{section.title}</h2>
                </div>
                <div
                  className="guide-content"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              </section>
            ))}
            <section
              id="submission-checklist"
              className="notebook-checklist"
              aria-labelledby="checklist-title"
            >
              <div className="notebook-checklist-head">
                <div>
                  <p>FINAL CHECK</p>
                  <h2 id="checklist-title">제출 전, 한 번 더.</h2>
                </div>
                <span aria-live="polite">
                  <strong>{checkedItems.length}</strong> /{" "}
                  {checklistItems.length}
                </span>
              </div>
              <progress
                aria-label="정산 준비 확인 항목"
                value={checkedItems.length}
                max={checklistItems.length}
              />
              {checklistItems.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() =>
                      setCheckedItems(current =>
                        current.includes(item.id)
                          ? current.filter(id => id !== item.id)
                          : [...current, item.id]
                      )
                    }
                  />
                  <span>{item.label}</span>
                </label>
              ))}
              <p className="notebook-checklist-note">
                체크 상태는 이 브라우저에만 저장됩니다. 해당하지 않는 항목은
                건너뛰어도 됩니다.
              </p>
            </section>
            <div className="notebook-help">
              <div>
                <p>함께 확인하겠습니다.</p>
                <h2>막히는 부분이 있나요?</h2>
                <span>추가 문의사항은 사업기획실로 편하게 문의하세요.</span>
              </div>
              <a href="mailto:kigs@k-indiegame.or.kr">
                <Mail size={18} /> kigs@k-indiegame.or.kr{" "}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <a className="notebook-back" href="#guide-top">
              가이드 처음으로 ↑
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
