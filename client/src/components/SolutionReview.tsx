const approved = [
  ['Ace Studio', '해외', '사운드'],
  ['Adobe Firefly', '해외', '아트'],
  ['Google AI Studio', '해외', '게임개발통합'],
  ['Google Gemini API', '해외', '아트'],
  ['OpenAI API', '해외', '기획'],
  ['openai usage credit', '해외', '프로그래밍'],
  ['QuickMagic', '해외', '3D 에셋 및 애니메이션'],
  ['Retro Diffusion', '해외', '아트'],
  ['XSTAGE', '국내', '3D 에셋 및 애니메이션'],
];
const rejected = ['3D AI Studio', 'Amazon Bedrock', 'AURA AI', 'Flova', 'GENCOW', 'cloud.vast.ai', 'runpod.io', 'manus', 'Recraft.ai', 'requesty.ai', 'Vrew(브루)', '명필(Myeongpil)', '정어(Jeongeo)', '풍류(Pungnyu)'];

export default function SolutionReview() {
  return (
    <div id="review-results" className="mt-10 scroll-mt-24 rounded-2xl border border-purple-200 p-5 sm:p-8">
      <h3 className="text-xl font-bold text-slate-900">신규 솔루션 검토 결과</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">2026.10.01 운영회의 · 24건 검토: 허용 9건 / 불허 14건 / 보류 1건</p>
      <div className="mt-5 overflow-x-auto" role="region" aria-label="신규 허용 솔루션 9건" tabIndex={0}>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">신규 허용 솔루션의 국내외 구분과 분야</caption>
          <thead className="bg-purple-50 text-purple-900"><tr>{['솔루션', '구분', '분야'].map(label => <th key={label} scope="col" className="px-3 py-3">{label}</th>)}</tr></thead>
          <tbody>{approved.map(([name, region, field]) => <tr key={name} className="border-b border-slate-100"><th scope="row" className="px-3 py-3 font-semibold break-words">{name}</th><td className="px-3 py-3 whitespace-nowrap">{region}</td><td className="px-3 py-3">{field}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-purple-900"><strong>Adobe Firefly 조건:</strong> AI 이용 관련 인보이스를 별도 발행할 수 있는 구독형 상품만 인정합니다.</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">OpenAI API와 openai usage credit은 보고서의 별도 허용 항목으로 각각 표시했습니다. 신규 허용 항목별 지원 개시일은 협회 안내를 확인해 주세요.</p>
      <details className="mt-5 rounded-lg border border-slate-200 p-4">
        <summary className="cursor-pointer font-semibold text-slate-900">불허 14건·보류 1건 확인</summary>
        <p className="mt-3 text-sm leading-7 text-slate-700"><strong>불허:</strong> {rejected.join(', ')}</p>
        <p className="mt-3 text-sm leading-7 text-slate-700"><strong>보류:</strong> unitry ai. 기존 허용 목록의 Unity AI와 다른 항목이며, 보류는 승인이 아닙니다.</p>
        <p className="mt-3 text-xs leading-6 text-slate-600">해당 결과는 이번에 검토한 항목별 결정입니다. 기존 허용 솔루션에 일괄 적용하여 제외하는 기준은 아닙니다.</p>
      </details>
    </div>
  );
}
