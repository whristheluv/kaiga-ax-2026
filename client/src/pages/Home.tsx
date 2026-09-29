import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageIllustration from '@/components/PageIllustration';
import { FAQ_DATA, FaqItem } from '@/data/faqData';
import { SOLUTION_GROUPS, NOTICE_ROUNDS } from '@/data/businessData';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  Building,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileSpreadsheet,
  Download,
  Calendar,
  Layers,
  HelpCircle,
  Copy,
  Check,
  Cpu,
  Coins,
  ShieldCheck,
  Send,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [quickQuery, setQuickQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Default featured questions (1-2: 서류 제출기한, 1-3: 정산 제출자료, 1-16: 달러 환율)
  const defaultQuickIds = ['1-2', '1-3', '1-16'];

  const quickResults = useMemo(() => {
    const q = quickQuery.trim().toLowerCase().replace(/\s+/g, '');
    if (!q) {
      return FAQ_DATA.filter((item) => defaultQuickIds.includes(item.numericId));
    }
    return FAQ_DATA.filter((item) => {
      const corpus = (item.question + ' ' + item.answerText).toLowerCase().replace(/\s+/g, '');
      return corpus.includes(q);
    });
  }, [quickQuery]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kigs@k-indiegame.or.kr');
    setCopiedEmail(true);
    toast.success('이메일 주소가 클립보드에 복사되었습니다.');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-purple-100 selection:text-purple-900">
      <Header />

      <main className="flex-1 relative pt-20">
        <PageIllustration />

        {/* 1. HERO SECTION */}
        <section id="about" className="relative scroll-mt-24 pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-800 text-xs sm:text-sm font-semibold shadow-xs mb-6 animate-in fade-in duration-500">
                <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
                <span>2026 · 한국인공지능게임협회 (KAIGA)</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2] mb-6">
                게임제작환경 <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-600">
                  인공지능 전환(AX)
                </span> 지원사업
              </h1>

              {/* Subhead */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl mx-auto text-center">
                <span className="block">국내 게임 개발사의 AI 솔루션 도입을 적극 지원합니다.</span>
                <span className="block">기획·프로그래밍·아트·사운드 등 게임 제작 전 과정의 솔루션 구독·사용비를 지원받으세요.</span>
              </p>

              {/* Stat Pill Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-2 sm:p-3 bg-slate-50/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl mx-auto mb-10">
                <div className="bg-white rounded-xl p-3.5 border border-slate-100 text-center shadow-xs flex flex-col items-center justify-center min-w-0">
                  <div className="text-xs text-slate-500 font-medium mb-1">지원 한도</div>
                  <div className="text-base sm:text-lg lg:text-xl leading-tight font-bold text-slate-900 whitespace-nowrap">최대 5,000만 원</div>
                  <div className="text-[11px] leading-tight text-purple-700 font-medium mt-1 whitespace-nowrap">기업 규모별 차등 지원</div>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-slate-100 text-center shadow-xs flex flex-col items-center justify-center min-w-0">
                  <div className="text-xs text-slate-500 font-medium mb-1">지원 비율</div>
                  <div className="text-base sm:text-lg lg:text-xl leading-tight font-bold text-slate-900 whitespace-nowrap">국내 100% · 해외 90%</div>
                  <div className="text-[11px] leading-tight text-purple-700 font-medium mt-1 whitespace-nowrap">VAT 제외 공급가 기준</div>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-slate-100 text-center shadow-xs flex flex-col items-center justify-center min-w-0">
                  <div className="text-xs text-slate-500 font-medium mb-1">지원 솔루션</div>
                  <div className="text-base sm:text-lg lg:text-xl leading-tight font-bold text-slate-900 whitespace-nowrap">총 62종</div>
                  <div className="text-[11px] leading-tight text-purple-700 font-medium mt-1 whitespace-nowrap">9개 분야 솔루션 포괄</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="#support"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-sm shadow-md shadow-purple-200 transition-all active:scale-[0.98]"
                >
                  <span>규모별 지원 기준 확인</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>

                <Link
                  href="/faq/"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-xs transition-all active:scale-[0.98]"
                >
                  <HelpCircle className="w-4 h-4 mr-1.5 text-purple-600" />
                  <span>전체 QnA 59개 확인</span>
                </Link>

                <Link
                  href="/guide/settlement/"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold text-sm border border-purple-200/60 transition-all active:scale-[0.98]"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-1.5 text-purple-700" />
                  <span>정산 이용 가이드</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. QUICK QNA SEARCH SECTION */}
        <section className="relative pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-b from-white to-purple-50/40 rounded-3xl border border-purple-200/80 p-6 sm:p-8 lg:p-10 shadow-lg shadow-purple-900/5 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>실시간 검색</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    정산에 필요한 답변 찾기
                  </h2>
                </div>

                <Link
                  href="/faq/"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
                >
                  <span>전체 질문 목록 (59개)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Search Input */}
              <div className="relative mb-6">
                <label htmlFor="quick-query" className="sr-only">
                  궁금한 내용 검색
                </label>
                <div className="relative flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    id="quick-query"
                    type="search"
                    value={quickQuery}
                    onChange={(e) => setQuickQuery(e.target.value)}
                    placeholder="예: 제출기한, 환율, 연간 결제, 가입자명부..."
                    className="w-full pl-11 pr-24 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-inner transition-all"
                  />
                  {quickQuery && (
                    <button
                      type="button"
                      onClick={() => setQuickQuery('')}
                      className="absolute right-3 px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      초기화
                    </button>
                  )}
                </div>
              </div>

              {/* Status Notice */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-4 px-1">
                <span>
                  {quickQuery
                    ? `“${quickQuery}” 검색 결과 (${quickResults.length}건)`
                    : '자주 확인하는 핵심 질문 3개'}
                </span>
                {quickQuery && quickResults.length > 5 && (
                  <Link
                    href={`/faq/?q=${encodeURIComponent(quickQuery)}`}
                    className="text-purple-700 font-semibold hover:underline"
                  >
                    FAQ 전체 검색으로 이동 ↗
                  </Link>
                )}
              </div>

              {/* Accordion / List */}
              <div className="space-y-3">
                {quickResults.slice(0, 5).map((item) => (
                  <details
                    key={item.id}
                    className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-all hover:border-purple-300"
                  >
                    <summary className="flex items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer list-none select-none font-semibold text-slate-800 group-hover:text-purple-900">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-md bg-purple-100 text-purple-800 text-xs font-bold">
                          Q
                        </span>
                        <span className="text-sm sm:text-base tracking-tight truncate">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 space-y-3">
                      <div
                        className="whitespace-pre-line leading-relaxed text-slate-700"
                        dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                      />
                      <div className="pt-2 flex justify-end">
                        <Link
                          href={`/faq/#${item.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900"
                        >
                          <span>QnA에서 자세히 보기</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </details>
                ))}

                {quickResults.length === 0 && (
                  <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-200">
                    <p className="text-sm text-slate-500 mb-2">일치하는 질문을 찾지 못했습니다.</p>
                    <Link
                      href="/faq/"
                      className="text-xs font-semibold text-purple-700 hover:underline"
                    >
                      전체 59개 질문 목록에서 찾아보기
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. SUPPORT AMOUNTS SECTION */}
        <section id="support" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2 block">
                기업 맞춤 지원
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                기업 규모에 맞춘 AI 사용비 지원
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                상시 고용 인원 규모에 따라 최대 5,000만 원까지 솔루션 이용료를 차등 지원합니다.
              </p>
            </div>

            {/* Grid 4 tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1~2인 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold">
                      초기·1인 개발사
                    </span>
                    <Users className="w-5 h-5 text-purple-600 opacity-60" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">1~2인</h3>
                  <p className="text-xs text-slate-500 mb-6">1인 창업기업 및 인디 개발팀</p>
                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">500만 원</span>
                    <span className="text-xs text-slate-400 block mt-1">기업당 최대 지원 한도</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 mb-1 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>국내 솔루션 100% 지원</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>해외 솔루션 90% 지원</span>
                  </div>
                </div>
              </div>

              {/* 3~10인 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold">
                      소규모 스튜디오
                    </span>
                    <Users className="w-5 h-5 text-purple-600 opacity-60" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">3~10인</h3>
                  <p className="text-xs text-slate-500 mb-6">성장 단계의 소형 게임 개발사</p>
                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">1,500만 원</span>
                    <span className="text-xs text-slate-400 block mt-1">기업당 최대 지원 한도</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 mb-1 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>국내 솔루션 100% 지원</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>해외 솔루션 90% 지원</span>
                  </div>
                </div>
              </div>

              {/* 11~20인 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold">
                      중소 스튜디오
                    </span>
                    <Users className="w-5 h-5 text-purple-600 opacity-60" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">11~20인</h3>
                  <p className="text-xs text-slate-500 mb-6">본격 양산 및 파이프라인 개발사</p>
                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">3,000만 원</span>
                    <span className="text-xs text-slate-400 block mt-1">기업당 최대 지원 한도</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 mb-1 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>국내 솔루션 100% 지원</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>해외 솔루션 90% 지원</span>
                  </div>
                </div>
              </div>

              {/* 21인 이상 */}
              <div className="bg-purple-900 text-white rounded-2xl p-6 border border-purple-800 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-700/40 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-purple-800 text-purple-200 text-xs font-bold">
                      최대 규모 지원
                    </span>
                    <Building className="w-5 h-5 text-purple-300 opacity-80" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">21인 이상</h3>
                  <p className="text-xs text-purple-300 mb-6">다수 프로젝트 운용 중견 게임사</p>
                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-white">5,000만 원</span>
                    <span className="text-xs text-purple-300 block mt-1">기업당 최대 지원 한도</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-purple-800 text-xs text-purple-200">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" />
                    <span>국내 솔루션 100% 지원</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" />
                    <span>해외 솔루션 90% 지원</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility requirements */}
            <div className="mt-14 max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
                <span>신청 전 필수 확인 사항</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-2">게임 사업자 요건</h4>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    게임산업진흥에 관한 법률 제21조에 따른 게임제작업 또는 게임배급업으로 등록된 사업자여야 합니다.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-2">중복 지원 제한</h4>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    동일한 과제 또는 유사 사업으로 정부·지자체 지원금을 중복 수령하는 경우 선정이 취소될 수 있습니다.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-2">체납·지원 제한 확인</h4>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    국세·지방세 체납 사실이 있거나 정부 지원사업 참여제한 제재를 받고 있는 기업은 신청할 수 없습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. AI SOLUTIONS LIST (62종) */}
        <section id="solutions" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2 block">
                지원 솔루션 목록
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                게임 제작의 모든 과정에, 지원 AI 솔루션 62종
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                기획, 아트, 프로그래밍, 3D 모델링, 사운드 등 파이프라인 전 분야를 지원합니다.
              </p>
              <div className="mt-4 inline-flex items-center gap-2">
                <a
                  href="/notices/kaiga-ax-2026-round4.pdf#page=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline underline-offset-4 flex items-center gap-1"
                >
                  <span>지원개시일 포함 전체 목록 및 규정 확인 (공고문 p.4)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Category Groups Accordion */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOLUTION_GROUPS.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 hover:border-purple-300 hover:bg-purple-50/30 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                    <span className="font-bold text-base tracking-tight">
                      <span className="text-purple-700 font-black tabular-nums">{group.title.slice(0, 2)}</span>
                      <span className="text-slate-900">{group.title.slice(2)}</span>
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 whitespace-nowrap">
                      {group.chips.length}개
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-600 border border-slate-200 shadow-2xs hover:border-purple-300 hover:text-purple-700 transition-colors"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. NOTICES & TIMELINE (1차 ~ 4차) */}
        <section id="notices" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2 block">
                모집 공고 및 일정
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                1차부터 4차까지, 공고와 사업 일정
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                각 차수별 공고문 전문과 세부 지원기간을 확인하고 원본 PDF를 다운로드할 수 있습니다.
              </p>
              <a
                href="/kaiga-ax-2026-summary.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-semibold text-purple-800 transition-colors hover:bg-purple-100"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>지원 한도·일정 요약표 PDF 다운로드</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {NOTICE_ROUNDS.map((round, rIdx) => (
                <div
                  key={rIdx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-bold text-lg text-slate-900 whitespace-nowrap">{round.name}</span>
                      <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 whitespace-nowrap">
                        {round.badge}
                      </span>
                    </div>
                    <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                      {round.status}
                    </span>

                    <dl className="space-y-2.5 text-xs text-slate-600 my-4">
                      {Object.entries(round.info).map(([key, val], iIdx) => (
                        <div key={iIdx} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-2 items-start py-1.5 border-b border-slate-100">
                          <dt className="text-slate-500 font-medium leading-snug">{key}</dt>
                          <dd className={`font-semibold text-slate-800 text-right leading-snug ${key === '모집 기준' ? '' : 'whitespace-nowrap'}`}>{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="pt-4 mt-2">
                    <a
                      href={round.pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold border border-purple-200/60 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>공고문 PDF 다운로드</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Flow 4 steps */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 text-center mb-8">
                선정 후, 이렇게 지원받습니다
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
                  <span className="text-xs font-bold text-purple-600 block mb-1">STEP 01</span>
                  <h4 className="font-bold text-slate-900 mb-2">협약 체결</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    선정 안내 후 전자협약 체결 및 사업비 지원 승인을 완료합니다.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
                  <span className="text-xs font-bold text-purple-600 block mb-1">STEP 02</span>
                  <h4 className="font-bold text-slate-900 mb-2">AI 사용·결제</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    선정 기업 법인카드 또는 대표자 카드로 AI 솔루션을 정산 기간 내 결제·활용합니다.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
                  <span className="text-xs font-bold text-purple-600 block mb-1">STEP 03</span>
                  <h4 className="font-bold text-slate-900 mb-2">월별 정산 청구</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    매월 1~15일까지 월간 정산보고서, 결제 영수증, 4대보험 명부 등을 제출합니다.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
                  <span className="text-xs font-bold text-purple-600 block mb-1">STEP 04</span>
                  <h4 className="font-bold text-slate-900 mb-2">검토 후 지급</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    협회 및 전담기관 서류 검토 완료 후 신청 계좌로 지원금을 직접 입금받습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION & CONTACT */}
        <section className="py-20 bg-gradient-to-b from-white to-purple-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              사업에 대해 더 궁금하신가요?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
              정산 지침과 자주 묻는 59개 질문을 확인하고, 추가 문의사항은 사업기획실로 편하게 문의하세요.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
              <Link
                href="/faq/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-sm shadow-md shadow-purple-200 transition-all active:scale-[0.98]"
              >
                <HelpCircle className="w-4 h-4" />
                <span>QnA 확인하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/guide/settlement/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-xs transition-all active:scale-[0.98]"
              >
                <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                <span>정산 가이드 바로가기</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold text-sm border border-purple-200/60 transition-all active:scale-[0.98]"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? '복사 완료!' : '운영팀 이메일 복사'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              한국인공지능게임협회 사업기획실: <span className="font-semibold text-slate-700">kigs@k-indiegame.or.kr</span>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
