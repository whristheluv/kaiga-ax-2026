import { useEffect, useState } from "react";
import { isSettlementReleased } from "@/lib/settlementRelease";

export function useSettlementRelease() {
  const [released, setReleased] = useState(() => isSettlementReleased(Date.now()));
  useEffect(() => {
    if (released) return;
    const update = () => setReleased(isSettlementReleased(Date.now()));
    const timer = window.setInterval(update, 1000);
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [released]);
  return released;
}
