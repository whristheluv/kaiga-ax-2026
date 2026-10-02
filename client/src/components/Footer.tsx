import { SOLUTION_COUNT } from '@/data/businessData';
import React from 'react';
import { Link } from 'wouter';
import { Mail, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-36 h-10 overflow-hidden">
                <img
                  src="/KAIGA.png"
                  alt="KAIGA 로고"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">
                  한국인공지능게임협회 (KAIGA)
                </span>
                <p className="text-xs text-slate-400">
                  2026 게임제작환경 인공지능 전환(AX) 지원사업
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              본 사업은 국내 게임 개발사의 AI 솔루션 도입과 인공지능 전환(AX)을 촉진하여
              제작 효율성 및 글로벌 경쟁력을 강화하기 위한 공공 지원사업입니다.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>문의: </span>
                <a
                  href="mailto:kigs@k-indiegame.or.kr"
                  className="text-purple-300 hover:text-white underline underline-offset-4 transition-colors"
                >
                  kigs@k-indiegame.or.kr
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              사업 바로가기
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#about" className="text-slate-400 hover:text-white transition-colors">
                  사업 소개 및 지원 한도
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-slate-400 hover:text-white transition-colors">
                  지원 AI 솔루션 {SOLUTION_COUNT}종
                </a>
              </li>
              <li>
                <a href="/#notices" className="text-slate-400 hover:text-white transition-colors">
                  1~4차 모집 공고 및 일정
                </a>
              </li>
              <li>
                <Link href="/guide/settlement/" className="text-slate-400 hover:text-white transition-colors">
                  정산 이용 가이드
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="text-purple-300 hover:text-white transition-colors font-medium">
                  전체 질문 및 답변 (59개)
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Notices & Documents */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              공식 문서 및 양식
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://bit.ly/4xZ2YJu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors"
                >
                  <span>정산서 및 증빙 양식함</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="/notices/kaiga-ax-2026-round4.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                  <span>4차 모집공고문 PDF</span>
                </a>
              </li>
              <li>
                <a
                  href="/notices/kaiga-ax-2026-round3.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                  <span>3차 모집공고문 PDF</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.kriss.re.kr/menu.es?mid=a10305010000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs"
                >
                  <span>표준시 동기화(한국표준과학연구원)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 한국인공지능게임협회 (KAIGA). All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>참여기업 전용 안내 및 질의응답 포털</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
