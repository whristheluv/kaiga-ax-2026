# 2026 KAIGA AX 지원사업 웹사이트 리디자인 분석 및 작업 계획

## 1. 사이트 현황 분석 및 보존 항목 (Preservation)
- **대상 사이트**: https://kaiga-ax-qna-2026.workspace-687060.chatgpt.site/
- **주요 페이지 및 라우팅**:
  1. `/` (메인 홈):
     - 브랜드 헤더 및 앵커 네비게이션 (`#about`, `#support`, `#solutions`, `#notices`, `guide/settlement/`, `/faq/`)
     - 사업 개요 (한국인공지능게임협회 주관, 최대 5,000만원, 국내 100%·해외 90% 지원, 62종 솔루션)
     - 실시간 QnA 빠른 검색 및 자주 확인하는 질문 3개 (제출기한, 정산자료, 환율)
     - 지원금 규모별 카드 (1~2인 500만원, 3~10인 1,500만원, 11~20인 3,000만원, 21인 이상 5,000만원)
     - 신청 전 확인 사항 (게임 사업자 요건, 중복 지원 제한, 체납 제한)
     - 지원 AI 솔루션 62종 (9개 분야별 상세 리스트)
     - 1~4차 모집 공고 및 일정, 공고문 PDF 다운로드 링크 4종
     - 신청 서류 및 선정 후 진행 절차 4단계
     - 문의처 및 안내
  2. `/faq/` (QnA 전체 페이지):
     - 5개 카테고리 탭 (전체 53개, 사업 안내 3개, 정산·지원금 23개, 서류·증빙 12개, AI 솔루션 8개, 계정·인원 7개)
     - 실시간 검색창, 결과 카운트, 초기화 버튼
     - URL 해시 링크(`#q-1-1` ~ `#q-2-23`) 직접 열림 및 스크롤 연동
     - 검색 파라미터 `?q=...` 연동
     - 증빙 안내 및 외부 공식 양식 링크 (bit.ly/4xZ2YJu, kriss.re.kr 등)
  3. `/guide/settlement/` (정산 이용 가이드 페이지):
     - 정산 일정, 준비할 서류 4종
     - 정산자료 작성 순서 5단계
     - 지원금 계산 기준 (국내 100%, 해외 90%, 세금계산서/인보이스 환율 기준)
     - 월간 정산보고서 작성 요령, 프롬프트/결과물 제출 기준
     - 제출 전 체크리스트 및 주의사항
     - 목차(TOC) 스티키 내비게이션 및 세부 섹션 링크
- **공식 애셋 및 아이덴티티**:
  - KAIGA 공식 로고 (`/assets/kaiga-logo.png`, `kaiga-logo.png`)
  - 브랜드 시그니처 색상: Deep Violet (`#6800ad`), Indigo/Navy (`#101e40`), Cobalt Blue (`#1436cc`), Light Lilac Tint (`#f4eff8`, `#f3edf8`)
  - 공식 공고문 PDF 4건 (`kaiga-ax-2026-round1.pdf` ~ `round4.pdf`)
  - 협회 양식 링크 (`https://bit.ly/4xZ2YJu`), 문의 메일 (`kigs@k-indiegame.or.kr`)
- **보존 원칙**:
  - 기존 53개 Q&A 내용, 질문 번호, 앵커 ID, 상세 본문 100% 보존
  - 사업 지원 요건, 금액, 지원 비율, 솔루션 62개 명단 100% 보존
  - 1~4차 공고 일정, PDF 다운로드 링크, 외부 링크 및 UTM 파라미터 보존
  - 기존 주소 구조(`/`, `/faq/`, `/guide/settlement/`) 완전 일치 보존

## 2. 참고 디자인(Cruip Tailwind Landing Page) 해석 및 적용 방안
- **타이포그래피**:
  - 현대적이고 단단한 Pretendard + Inter 조합
  - 대형 헤드라인(`tracking-tight`, 세련된 글자 자간 및 위계)
  - 뱃지와 섹션 키커(`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold`)
- **간격과 레이아웃 (Spacing & Layout)**:
  - 넉넉한 상하 패딩(`py-20 md:py-28`), 1200px 중앙 컨테이너
  - 비대칭 및 그리드 카드 레이아웃, 부드러운 다단 구성
  - 스티키 사이드바 및 목차 내비게이션 최적화
- **색감과 질감 (Depth & Texture)**:
  - 촌스러운 단색 박스 대신 Cruip의 소프트 블러 그라디언트 배경(Background glow/blur orb)
  - 은은한 보더(`border-slate-200/80` 또는 `border-purple-200/60`), 글래스모피즘(`backdrop-blur-md bg-white/80`)
  - KAIGA의 보라/인디고 브랜드 색채를 현대적인 디지털 프로덕트 느낌으로 세련되게 정제
- **움직임과 인터랙션 (Motion & Interactivity)**:
  - 탭 전환, 아코디언 확장 시 부드러운 트랜지션
  - 카피 버튼(양식 링크, 이메일 복사 시 피드백 토스트/체크 아이콘 제공)
  - `@media (prefers-reduced-motion: reduce)` 철저 적용하여 불필요한 흔들림 및 애니메이션 방지

## 3. 검수 계획
- 데스크톱(1440px) & 모바일(390px) 뷰포트 레이아웃, 오버플로우, 터치 타겟 검증
- 모든 라우트, 아코디언, 빠른 검색, 필터링, 해시 스크롤 검증
- `tsc --noEmit` 타입 검사 및 `vite build` 프로덕션 빌드 통과 확인
