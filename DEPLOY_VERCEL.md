# KAIGA 2026 AX 사이트 Vercel 배포 안내

## 변경 사항
- vercel.json: Vite 정적 배포와 SPA 하위 경로 새로고침 설정.
- package.json: build:vercel 명령, Node.js 22.x 지정. 기존 build/start 유지.
- vite.config.ts: Manus 전용 실행 플러그인과 개발용 로그/스토리지 프록시 분리.
- 기존 페이지, QNA, 사업 정보, PDF, 로고, 링크는 변경하지 않았습니다.

## GitHub를 통한 배포
1. 이 ZIP의 압축을 풉니다.
2. GitHub 저장소에 압축을 푼 파일을 올립니다. ZIP 자체를 올리지 마세요.
   package.json, pnpm-lock.yaml, vercel.json과 client, shared, server, patches 폴더가 저장소 최상위에 있어야 합니다.
   파일이 많으면 GitHub Desktop으로 폴더를 저장소로 만들고 Publish repository를 사용하세요.
3. Vercel에 로그인하고 새 프로젝트에서 해당 GitHub 저장소를 Import합니다.
4. 다음 설정을 확인하고 Deploy를 누릅니다.

| 항목 | 값 |
| --- | --- |
| Framework | Vite |
| Root Directory | . (package.json이 있는 폴더) |
| Install Command | pnpm install --frozen-lockfile |
| Build Command | pnpm run build:vercel |
| Output Directory | dist/public |
| Node.js | 22.x |
| Environment Variables | 현재 페이지에 필요한 추가 값 없음 |

vercel.json에 배포 설정이 포함되어 있습니다. package.json의 packageManager로 pnpm 10.4.1을 지정합니다.

## CLI로 배포하는 방법
Node.js 22 설치 후 package.json이 있는 폴더에서 실행합니다.

```sh
npx vercel login
npx vercel --prod
```

계정과 프로젝트를 선택하고 위 설정을 확인하세요. 실제 배포 URL은 Vercel이 발급합니다.

## 로컬 확인
```sh
npx pnpm@10.4.1 install --frozen-lockfile
npx pnpm@10.4.1 run check
npx pnpm@10.4.1 run build:vercel
npx pnpm@10.4.1 run preview
```

## 배포 후 확인
- /, /faq, /guide/settlement를 직접 열고 새로고침합니다.
- QNA 검색/답변 펼치기, 정산 가이드, PDF 다운로드, 문의 링크를 확인합니다.
- 휴대전화에서 메뉴와 검색을 확인합니다.
- 로그아웃 또는 시크릿 창에서 Production URL이 열리는지 확인합니다.
  로그인 화면이 나온다면 Vercel 프로젝트의 Deployment Protection 설정에서 Production 접근 제한을 확인하세요.
- 별도 도메인은 프로젝트 Domains에서 추가한 뒤 안내되는 DNS 값을 도메인 관리 업체에 등록합니다.

## 유지 및 제한
현재 화면은 정적 콘텐츠이며 별도 DB나 Manus API 키 없이 작동합니다.
사용되지 않는 지도/로그인 템플릿 파일은 원본 보존을 위해 남겨 두었습니다. 나중에 해당 기능을 활성화하면 별도 연동이 필요합니다.
이 작업은 배포용 파일 준비이며 Vercel 계정에 실제 게시한 상태는 아닙니다.

공식 참고: https://vercel.com/docs/frameworks/frontend/vite

## 검증 결과 (2026-09-29)
- pnpm 10.4.1 frozen-lockfile 설치 성공.
- 애플리케이션 및 Vite 설정 타입 검사 통과.
- 프로덕션 정적 빌드 성공. 검증 환경 Node.js 24.19.0, Vercel 지정 환경 Node.js 22.x.
- Chromium에서 PC 1440px / 모바일 390px, 홈·QNA·정산 가이드 직접 접근 확인.
- QNA 검색과 답변 펼치기, 모바일 메뉴 동작 확인. 가로 넘침과 브라우저 실행 오류 없음.
- 코드에 직접 참조된 로컬 이미지/PDF 6개 존재 확인.
- 외부 기관 링크의 도착 페이지, 실제 Vercel 서버 및 사용자 도메인 연결은 배포 후 확인이 필요합니다.
