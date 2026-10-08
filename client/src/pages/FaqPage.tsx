import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQ_DATA } from '@/data/faqData';
import {
  Check,
  ChevronDown,
  Copy,
  Filter,
  HelpCircle,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';

const CATEGORIES = ['전체', '사업 안내', '정산·지원금', '서류·증빙', 'AI 솔루션', '계정·인원'] as const;
const QUICK_SEARCHES = ['제출기한', '환율', '4대보험', '카드 영수증', '연간 결제', '좌석 추가'];

type Category = (typeof CATEGORIES)[number];

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    const categoryParam = params.get('category');
    if (qParam) setSearchQuery(qParam);
    if (categoryParam && CATEGORIES.includes(categoryParam as Category)) {
      setSelectedCategory(categoryParam as Category);
    }

    const hash = window.location.hash.replace('#', '');
    const item = FAQ_DATA.find((faq) => faq.id === hash || faq.numericId === hash);
    if (item) {
      setOpenItems({ [item.id]: true });
      window.setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
    }
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory !== '전체') params.set('category', selectedCategory);
    const query = params.toString();
    window.history.replaceState(null, '', query ? `/faq/?${query}${window.location.hash}` : `/faq/${window.location.hash}`);
  }, [searchQuery, selectedCategory]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase().replace(/\s+/g, '');
    return FAQ_DATA.filter((item) => {
      if (selectedCategory !== '전체' && item.category !== selectedCategory) return false;
      if (!query) return true;
      const corpus = `${item.category} ${item.question} ${item.answerText}`.toLowerCase().replace(/\s+/g, '');
      return corpus.includes(query);
    });
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 전체: FAQ_DATA.length };
    FAQ_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((current) => ({ ...current, [id]: !current[id] }));
  };

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/faq/#${id}`);
    setCopiedId(id);
    toast.success('해당 질문 바로가기 링크가 복사되었습니다.');
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('전체');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8fc] text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <Header />

      <main className="flex-1 pt-20 pb-24">
        <section className="relative overflow-hidden bg-[#101126] text-white">
          <div className="absolute -right-24 -top-40 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" />
          <div className="absolute -left-28 bottom-[-12rem] h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-purple-100">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>2026 AX 지원사업 질의응답집</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">자주 묻는 질문</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                사업 참여와 월간 정산 과정에서 자주 확인하는 답변을 검색하고, 카테고리별로 빠르게 찾아보세요.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <section className="relative z-10 -mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/8 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="faq-search" className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Search className="h-4 w-4 text-purple-600" />
                원하는 답변 찾기
              </label>
              <span className="hidden items-center gap-1 text-[11px] text-slate-400 sm:inline-flex">
                <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono">/</kbd>
                검색 바로가기
              </span>
            </div>

            <form onSubmit={(event) => event.preventDefault()} className="relative mt-3">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                id="faq-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="검색어를 입력해 주세요 (예: 인감, 4대보험, 환율)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-20 text-sm text-slate-900 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-500 shadow-sm hover:text-slate-900">
                  지우기
                </button>
              )}
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-slate-500">빠른 검색</span>
              {QUICK_SEARCHES.map((term) => (
                <button key={term} type="button" onClick={() => { setSearchQuery(term); searchInputRef.current?.focus(); }} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-800">
                  {term}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Filter className="h-4 w-4 text-purple-600" />
              <span>카테고리</span>
              <span className="ml-auto font-semibold normal-case tracking-normal text-purple-700">{filteredItems.length}개 표시</span>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((category) => {
                const selected = selectedCategory === category;
                return (
                  <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${selected ? 'border-purple-700 bg-purple-700 text-white shadow-md shadow-purple-700/20' : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-700'}`}>
                    <span>{category}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${selected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{categoryCounts[category]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="mt-5 flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-xs text-slate-500">
            <p>
              전체 질문 <strong className="text-slate-900">{FAQ_DATA.length}개</strong>
              {searchQuery && <> · 검색어 “<strong className="text-purple-700">{searchQuery}</strong>”</>}
            </p>
            {(searchQuery || selectedCategory !== '전체') && (
              <button type="button" onClick={resetFilters} className="inline-flex shrink-0 items-center gap-1 font-semibold text-slate-600 hover:text-purple-700">
                <RotateCcw className="h-3.5 w-3.5" />
                필터 초기화
              </button>
            )}
          </div>

          <div className="mt-4 space-y-2.5">
            {filteredItems.map((item) => {
              const isOpen = openItems[item.id] ?? false;
              const isCopied = copiedId === item.id;
              return (
                <article key={item.id} id={item.id} className={`scroll-mt-28 overflow-hidden rounded-xl border bg-white transition ${isOpen ? 'border-purple-300 shadow-lg shadow-purple-900/8' : 'border-slate-200 hover:border-slate-300'}`}>
                  <button type="button" onClick={() => toggleItem(item.id)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-xs font-black text-purple-800">Q</span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">{item.category}</span>
                        <span className="font-mono text-[11px] text-slate-400">#{item.numericId}</span>
                      </span>
                      <span className="block text-sm font-bold leading-6 text-slate-900 sm:text-base">{item.question}</span>
                    </span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-purple-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-[#fbfbfe] px-4 pb-5 pt-4 sm:px-5">
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-black text-indigo-800">A</span>
                        <div className="min-w-0 flex-1">
                          <div className="prose prose-sm max-w-none text-slate-700 prose-a:font-semibold prose-a:text-purple-700 prose-a:underline hover:prose-a:text-purple-900" dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-3 text-xs text-slate-400">
                            <span>질문 식별자: {item.id}</span>
                            <button type="button" onClick={(event) => { event.stopPropagation(); handleCopyLink(item.id); }} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-semibold text-slate-600 transition hover:border-purple-300 hover:text-purple-700">
                              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                              {isCopied ? '복사됨!' : '링크 복사'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <Sparkles className="mx-auto mb-3 h-8 w-8 text-purple-400" />
                <h2 className="font-bold text-slate-900">일치하는 질문이 없습니다</h2>
                <p className="mt-1 text-sm text-slate-500">검색어를 바꾸거나 다른 카테고리를 선택해 보세요.</p>
                <button type="button" onClick={resetFilters} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-800">
                  <RotateCcw className="h-4 w-4" />
                  전체 목록으로 돌아가기
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-purple-100 bg-purple-50/70 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-sm font-bold text-purple-950">정산 작성 단계가 더 궁금하신가요?</p>
              <p className="mt-1 text-xs leading-5 text-purple-800/70">제출 일정부터 증빙 준비까지 정산 이용 가이드에서 순서대로 확인할 수 있습니다.</p>
            </div>
            <Link href="/guide/settlement/" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-800">
              정산 이용 가이드 보기
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
