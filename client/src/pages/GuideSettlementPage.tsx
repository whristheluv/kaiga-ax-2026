import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettlementDeadline } from "@/lib/settlementDeadline";
import { GUIDE_DATA } from "@/data/guideData";
import { ArrowUpRight, Check, Copy } from "lucide-react";
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
      "결제 건별 증빙 PDF를 영수증 → 인보이스 → 거래내역 순서로 준비했습니다.",
  },
  {
    id: "people",
    label: "4대보험 가입자명부 또는 사업자등록증명을 준비했습니다.",
  },
  {
    id: "newcomer",
    label: "신규 참여자가 있다면 개인정보 동의서를 준비했습니다.",
  },
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
      await navigator.clipboard.writeText(
        "https://drive.google.com/drive/folders/1yZGpz_u_PEeuzXGQlL1k0bSMwFpSu64A?usp=drive_link"
      );
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
      <a className="guide-skip-link" href="#guide-top">
        정산 가이드 본문으로 건너뛰기
      </a>
      <main id="guide-top" tabIndex={-1}>
        <section className="notebook-cover" aria-labelledby="guide-title">
          <div className="notebook-shell">
            <div className="notebook-edition">
              <span>KAIGA / AX SUPPORT</span>
              <span>2026 KAIGA 정산 안내서</span>
            </div>
            <div className="notebook-cover-grid">
              <div className="notebook-intro">
                <h1 id="guide-title">정산 이용 가이드</h1>
                <p className="notebook-description">
                  월간 보고서와 결제 증빙을 준비하고, 협회 안내 메일의 접수처로
                  제출하세요.
                </p>
                <section
                  className="evidence-example"
                  aria-labelledby="evidence-title"
                >
                  <h2 id="evidence-title">
                    결제 1건의 증빙, 이렇게 준비하세요
                  </h2>
                  <ol>
                    <li>
                      <strong>자료 모으기</strong>
                      <span>
                        영수증 → 인보이스 → 거래내역 순서로 보유 자료 정리
                      </span>
                    </li>
                    <li>
                      <strong>PDF 하나로 병합</strong>
                      <span>
                        파일명 예:{" "}
                        <code>01. kaiga@abc.com_ChatGPT_09월.pdf</code>
                      </span>
                    </li>
                    <li>
                      <strong>보고서와 대조</strong>
                      <span>계정·솔루션·결제금액이 같은지 확인</span>
                    </li>
                  </ol>
                  <p>
                    파일명은 예시입니다.
                    <br />
                    제출 형식과 접수처는 협회 안내를 확인하세요.
                  </p>
                </section>
                <div className="notebook-actions">
                  <a
                    className="notebook-button"
                    href="https://drive.google.com/drive/folders/1yZGpz_u_PEeuzXGQlL1k0bSMwFpSu64A?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    정산서 양식함 열기 <span className="sr-only">(새 창)</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                  <a className="notebook-text-link" href="#documents">
                    준비할 서류 보기
                  </a>
                </div>
              </div>
              <SettlementDeadline />
            </div>
            <section
              className="settlement-submission"
              aria-labelledby="september-title"
            >
              <h2 id="september-title">9월 사용분 정산 제출</h2>
              <p>선정 차수에 맞는 링크로 정산 서류를 제출해 주세요.</p>
              <div className="settlement-submission-links">
                <a
                  href="https://forms.gle/p5ZpyiReYZeZpQbF8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1·2차 9월 정산 제출 <span>(새 창)</span>
                </a>
                <a
                  href="https://forms.gle/qpVJ1B8AuGKiWwe99"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3·4차 9월 정산 제출 <span>(새 창)</span>
                </a>
              </div>
              <details className="settlement-common-notice" open>
                <summary>정산 서류 공통 공지</summary>
                <p>
                  결제 1건에 대한 증빙자료를 PDF 파일 1개로 합쳐서 제출해
                  주시기 바랍니다.
                </p>
                <h3>1. 같은 결제 건의 자료를 하나로 합쳐 주세요.</h3>
                <p>
                  해당 결제의 영수증, 인보이스, 카드 결제 내역, 계정 및 구독
                  정보 화면 등을 하나의 PDF 파일에 넣어 주세요.
                </p>
                <h3>2. 결제 건마다 파일을 따로 만들어 주세요.</h3>
                <p>
                  전체 자료를 한 파일로 합치는 것이 아니라, 결제 건별로 나누어
                  만들어 주시면 됩니다.
                  <br />
                  같은 솔루션이라도 결제 건이 다르면 별도 파일로 작성해 주세요.
                </p>
                <h3>3. 파일명은 아래 형식으로 작성해 주세요.</h3>
                <p>파일명 앞에 01, 02, 03… 순서로 번호를 붙여 주세요.</p>
                <div className="settlement-file-examples">
                  <p>
                    <code>01. kaiga@abc.com_ChatGPT_09월.pdf</code>
                  </p>
                  <p>
                    <code>02. kaiga@abc.com_Claude_09월.pdf</code>
                  </p>
                  <p>
                    <code>03. kaiga@abc.com_SUNO_09월.pdf</code>
                  </p>
                </div>
              </details>
            </section>
            <nav className="notebook-stages" aria-label="정산 준비 단계">
              {stages.map((stage, i) => (
                <a key={stage.id} href={`#${stage.id}`}>
                  <span className="stage-number">0{i + 1}</span>
                  <div>
                    <strong>{stage.title}</strong>
                    <span>{stage.detail}</span>
                  </div>
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
                제출 전 체크리스트{" "}
                <span>
                  {checkedItems.length}/{checklistItems.length}
                </span>
              </a>
            </nav>
            <div className="notebook-index-tools">
              <button type="button" onClick={copyForm}>
                {copied ? (
                  <Check size={15} aria-hidden="true" />
                ) : (
                  <Copy size={15} aria-hidden="true" />
                )}
                {copied ? "양식 링크 복사됨" : "양식 링크 복사"}
              </button>
              <Link href="/faq/">자주 묻는 질문 59개</Link>
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
                체크 상태는 이 브라우저에만 저장됩니다.
                <br />
                해당하지 않는 항목은 건너뛰어도 됩니다.
              </p>
            </section>
            <div className="notebook-help">
              <div>
                <p>함께 확인하겠습니다.</p>
                <h2>막히는 부분이 있나요?</h2>
                <span>추가 문의사항은 사업기획실로 편하게 문의하세요.</span>
              </div>
              <a href="mailto:kigs@k-indiegame.or.kr">kigs@k-indiegame.or.kr</a>
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
