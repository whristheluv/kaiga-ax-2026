// Explicit Korean standard time, independent of the visitor's time zone.
export const SETTLEMENT_RELEASE_AT = Date.parse("2026-11-01T00:00:00+09:00");
export const SETTLEMENT_RELEASE_NOTICE = "11월 1일 00:00(KST) 공개 예정";
export const isSettlementReleased = (now: number) => now >= SETTLEMENT_RELEASE_AT;

export function getSettlementFaqAnswer(released: boolean, html: string, text: string) {
  if (released) return { answerHtml: html, answerText: text };
  return {
    answerHtml: '<div class="answer-text"><p>10월 사용분 제출 기간은 <strong>2026년 11월 1일부터 15일 23:59(KST)까지</strong>입니다.</p><p>1·2차 및 3·4차 기업의 정산 제출 링크는 <strong>11월 1일 00:00(KST)</strong>에 공개됩니다.<br/>공개 후 선정 차수에 맞는 링크로 제출해 주세요.</p></div>',
    answerText: "10월 사용분 제출 기간은 2026년 11월 1일부터 15일 23:59(KST)까지입니다.\n\n1·2차 및 3·4차 기업의 정산 제출 링크는 11월 1일 00:00(KST)에 공개됩니다.\n공개 후 선정 차수에 맞는 링크로 제출해 주세요.",
  };
}
