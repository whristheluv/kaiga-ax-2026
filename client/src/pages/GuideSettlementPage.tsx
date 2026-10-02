import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIllustration from '@/components/PageIllustration';
import { getSettlementDeadline } from '@/lib/settlementDeadline';
import { GUIDE_DATA } from '@/data/guideData';
import {
  FileSpreadsheet,
  Calendar,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  ClipboardCheck
} from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';

export default function GuideSettlementPage() {
  const [now, setNow] = useState(() => Date.now());
  const settlementDeadline = getSettlementDeadline(now);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const [activeSection, setActiveSection] = useState<string>(
    GUIDE_DATA.sections[0]?.id || ''
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const checklistItems = [
    { id: 'period', label: '협약기간과 월별 제출기한을 확인했습니다.' },
    { id: 'report', label: '월간 정산보고서에 사용 솔루션과 AI 활용내역을 작성했습니다.' },
    { id: 'proof', label: '결제 건별 증빙 PDF를 Invoice → Receipt → 카드전표 순서로 준비했습니다.' },
    { id: 'people', label: '4대보험 가입자명부 또는 사업자등록증명을 준비했습니다.' },
    { id: 'newcomer', label: '신규 참여자가 있다면 개인정보 동의서를 준비했습니다.' },
    { id: 'account', label: '지원금 수령계좌 확인자료를 준비했습니다.' },
  ];
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem('kaiga-settlement-checklist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of GUIDE_DATA.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('kaiga-settlement-checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleChecklist = (id: string) => {
    setCheckedItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleCopyFormLink = () => {
    navigator.clipboard.writeText('https://bit.ly/4xZ2YJu');
    setCopiedLink(true);
    toast.success('정산서 양식함 링크가 복사되었습니다.');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-purple-100 selection:text-purple-900">
      <Header />

      <main className="flex-1 relative pt-20 pb-28">
        <PageIllustration />

        {/* Intro Banner */}
        <section className="pt-12 pb-12 border-b border-slate-200/80 bg-gradient-to-b from-purple-50/40 via-white to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-purple-800 text-xs font-semibold mb-3">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>2026 AX 지원사업 실무 가이드</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                  {GUIDE_DATA.introTitle}
                </h1>
                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-2">
                  {GUIDE_DATA.introDesc.map((desc, i) => (
                    <p key={i}>{desc}</p>
                  ))}
                </div>
              </div>

              {/* Deadline Card */}
              {GUIDE_DATA.introDeadline && (
                <div className="w-full lg:w-80 lg:shrink-0 bg-white rounded-2xl p-6 border border-purple-200/80 shadow-md shadow-purple-900/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-700 tracking-wider mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>월별 정산 자료 제출 기한</span>
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug mb-3">
                      {settlementDeadline.label}
                    </div>
                    <div className="mb-4 rounded-lg bg-purple-50 px-3 py-2.5" role="timer" aria-label="정산 제출 마감까지 남은 시간" aria-live="off">
                      <p className="text-xs font-medium text-purple-700 mb-1">마감까지 남은 시간</p>
                      <p className="text-sm font-bold text-purple-900 tabular-nums">{settlementDeadline.remaining}</p>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                        <span>협회 별도 안내 일정 우선</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                        <span>기업별 협약기간 확인 필수</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <a
                      href="https://bit.ly/4xZ2YJu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <span>정산서 양식함 열기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Submission Checklist */}
        <section className="guide-checklist-wrap" aria-labelledby="settlement-checklist-title">
          <div className="guide-checklist-card">
            <div className="guide-checklist-heading">
              <div className="guide-checklist-icon"><ClipboardCheck className="h-5 w-5" /></div>
              <div>
                <p className="guide-eyebrow">제출 전 셀프 점검</p>
                <h2 id="settlement-checklist-title">정산 서류, 빠진 것 없이 준비했나요?</h2>
              </div>
              <div className="guide-checklist-progress" aria-live="polite">
                <strong>{checkedItems.length}/{checklistItems.length}</strong>
                <span>확인 완료</span>
              </div>
            </div>
            <div className="guide-checklist-list">
              {checklistItems.map((item) => {
                const checked = checkedItems.includes(item.id);
                return (
                  <label key={item.id} className={`guide-checklist-item${checked ? ' is-checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleChecklist(item.id)}
                    />
                    <span className="guide-checklist-check" aria-hidden="true">
                      {checked ? <CheckCircle2 className="h-5 w-5" /> : <span className="h-5 w-5 rounded-full border-2 border-slate-300" />}
                    </span>
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
            <p className="guide-checklist-note">체크 상태는 이 브라우저에만 저장됩니다. 해당하지 않는 항목은 건너뛰어도 됩니다.</p>
          </div>
        </section>

        {/* Layout with Sticky TOC */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Table of Contents Sticky Sidebar */}
            <aside className="lg:col-span-4 sticky top-28 z-20">
              <nav className="bg-slate-50/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span>목차 바로가기</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {GUIDE_DATA.sections.length}개 챕터
                  </span>
                </div>

                <ul className="space-y-1">
                  {GUIDE_DATA.sections.map((section, idx) => {
                    const isActive = activeSection === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={() => setActiveSection(section.id)}
                          className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-purple-700 text-white font-semibold shadow-xs'
                              : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                          }`}
                        >
                          <span className="truncate">
                            <span className="opacity-70 mr-1.5">{String(idx + 1).padStart(2, '0')}.</span>
                            {section.title}
                          </span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:translate-x-0.5'
                            }`}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-4 border-t border-slate-200/80 space-y-2">
                  <button
                    type="button"
                    onClick={handleCopyFormLink}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-purple-300 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-purple-600" />}
                    <span>{copiedLink ? '양식 링크 복사됨!' : '정산 서식 링크 복사'}</span>
                  </button>

                  <Link
                    href="/faq/"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>정산 QnA 확인하기</span>
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Guide Section Content Blocks */}
            <div className="lg:col-span-8 space-y-8">
              {GUIDE_DATA.sections.map((section, idx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-100">
                    <span className="flex items-center justify-center h-8 w-8 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  {/* Render content with guide-content wrapper */}
                  <div
                    className="guide-content text-sm sm:text-base leading-relaxed text-slate-700"
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                </section>
              ))}

              {/* End of Guide Contact box */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">정산 서류 작성이 어려우신가요?</h3>
                  <p className="text-sm text-purple-200 mb-6 leading-relaxed max-w-xl">
                    정산 보고서 양식 작성 방법, 결제 건별 증빙 누락 방지 등에 대해 문의사항이 있으시면 언제든지 협회 지원센터로 연락주세요.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="mailto:kigs@k-indiegame.or.kr"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-purple-950 font-bold text-xs shadow-md hover:bg-purple-50 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-purple-700" />
                      <span>kigs@k-indiegame.or.kr 문의 메일 보내기</span>
                    </a>

                    <Link
                      href="/faq/"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-800/80 hover:bg-purple-800 text-white font-semibold text-xs border border-purple-600 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>정산·지원금 QnA 보기</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
