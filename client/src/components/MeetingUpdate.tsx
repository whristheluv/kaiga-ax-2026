import { Link } from 'wouter';

export default function MeetingUpdate() {
  return (
    <aside aria-label="10월 1일 운영회의 반영 안내" className="rounded-xl border border-purple-200 bg-purple-50 p-4 sm:p-5 text-sm leading-6 text-slate-700">
      <p className="font-bold text-purple-900">2026.10.01 운영회의 반영 안내</p>
      <p className="mt-1">AI 활용내역은 솔루션 1개당 1개로 완화됐습니다. 인보이스 미발급 시 대체 증빙 검토가 가능하며, 국내 AI는 인보이스에서 확인되는 공급가액을 100% 지원합니다.</p>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-semibold text-purple-800">
        <Link className="underline underline-offset-4" href="/faq/#q-39">활용내역 기준</Link>
        <Link className="underline underline-offset-4" href="/faq/#q-60">대체 증빙 안내</Link>
        <Link className="underline underline-offset-4" href="/faq/#q-16">외화 환율 확인 사항</Link>
        <a className="underline underline-offset-4" href="/#review-results">신규 솔루션 검토 결과</a>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-600">신규 항목의 적용월·지원 개시일과 외화 고정환율은 협회 안내를 확인해 주세요.</p>
    </aside>
  );
}
