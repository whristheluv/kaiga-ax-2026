const KST_OFFSET = 9 * 60 * 60 * 1000;

// Include the entire 15th through 23:59:59 KST, then roll to next month.
export function getSettlementDeadline(now: number) {
  const kst = new Date(now + KST_OFFSET);
  const year = kst.getUTCFullYear();
  const month = kst.getUTCMonth();
  let deadline = Date.UTC(year, month, 16) - KST_OFFSET;
  if (now >= deadline) deadline = Date.UTC(year, month + 1, 16) - KST_OFFSET;
  const labelDate = new Date(deadline - 1 + KST_OFFSET);
  const seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
  return {
    deadline,
    label: `${labelDate.getUTCMonth() + 1}월 15일 23:59 (KST)`,
    remaining: `${Math.floor(seconds / 86400)}일 ${Math.floor(seconds % 86400 / 3600)}시간 ${Math.floor(seconds % 3600 / 60)}분 ${seconds % 60}초`,
  };
}
