import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./policy.css";

function PolicyLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="policy-page">
      <Header />
      <main className="policy-document" id="policy-main" tabIndex={-1}>
        <Link href="/guide/settlement/">정산 가이드로 돌아가기</Link>
        <p className="policy-brand">KAIGA · AX 지원사업 안내 사이트</p>
        <h1>{title}</h1>
        <div className="policy-status">
          <strong>작성 중 · 협회 확인 필요</strong>
          <p>
            현재 사이트에서 확인되는 기능을 설명한 초안입니다. 아래 ‘입력 필요’
            항목은 협회의 확인과 확정 전이며, 시행 중인 약관 또는 완성된
            개인정보처리방침으로 표시하지 않습니다.
          </p>
        </div>
        {children}
        <p className="policy-contact">
          기존 사업 문의 창구:{" "}
          <a href="mailto:kigs@k-indiegame.or.kr">kigs@k-indiegame.or.kr</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export function TermsPage() {
  return (
    <PolicyLayout title="이용약관">
      <section>
        <h2>사이트 이용 범위</h2>
        <p>
          한국인공지능게임협회(KAIGA)의 2026 게임제작환경 인공지능 전환(AX)
          지원사업을 안내합니다. 사업 정보, 지원 솔루션 목록, 정산 가이드와 자주
          묻는 질문을 열람할 수 있습니다.
        </p>
        <p>
          이 사이트에는 회원가입, 결제 또는 정산 서류 업로드·접수 기능이
          없습니다. 실제 정산자료 제출은 협회 안내 메일의 경로와 형식을 확인해
          진행하세요.
        </p>
      </section>
      <section>
        <h2>안내 내용과 개별 협약</h2>
        <p>
          기업별 협약서와 협회의 개별 안내를 우선 확인하세요. 화면의 월별 마감
          카운트다운이나 체크리스트 확인 상태만으로 접수가 완료되거나 지원금
          지급이 확정되지 않습니다.
        </p>
      </section>
      <section>
        <h2>외부 자료와 체크리스트</h2>
        <p>
          정산서 양식함 등 외부 링크는 해당 서비스로 이동합니다. 체크리스트
          상태는 사용 중인 브라우저에 저장되며, 다른 기기와 동기화되지 않습니다.
        </p>
      </section>
      <section className="policy-pending">
        <h2>약관 확정을 위해 입력할 사항</h2>
        <dl>
          <div>
            <dt>운영자 상세 정보</dt>
            <dd>입력 필요: 공식 소재지, 대표 연락처 및 필요한 사업자 정보</dd>
          </div>
          <div>
            <dt>이용 조건</dt>
            <dd>입력 필요: 콘텐츠 이용·저작권 조건, 이용 제한 기준</dd>
          </div>
          <div>
            <dt>책임 및 분쟁 처리</dt>
            <dd>입력 필요: 협회가 승인한 책임 범위와 분쟁 처리 절차</dd>
          </div>
          <div>
            <dt>시행과 변경</dt>
            <dd>입력 필요: 시행일, 변경 고지 방법·기간 및 최종 승인</dd>
          </div>
        </dl>
      </section>
    </PolicyLayout>
  );
}

export function PrivacyPage() {
  return (
    <PolicyLayout title="개인정보처리방침">
      <section>
        <h2>현재 사이트에서 확인되는 처리</h2>
        <p>
          사이트 자체에는 이름·이메일을 입력받는 회원가입이나 문의 전송 폼, 정산
          서류 업로드 기능이 없습니다. 질문 검색과 체크리스트 조작은
          브라우저에서 실행됩니다.
        </p>
        <dl>
          <div>
            <dt>체크리스트 저장</dt>
            <dd>
              확인한 항목의 식별자를 브라우저의 로컬 저장소에 보관하여 재방문 시
              표시합니다. 이 기능은 체크 상태를 서버로 전송하지 않습니다. 별도
              만료 기간을 설정하지 않았으며, 체크를 해제하거나 브라우저 설정에서
              이 사이트의 저장 데이터를 삭제할 수 있습니다.
            </dd>
          </div>
          <div>
            <dt>링크 복사</dt>
            <dd>
              ‘양식 링크 복사’를 누르면 공개된 양식함 주소를 기기의 클립보드에
              씁니다.
            </dd>
          </div>
          <div>
            <dt>외부 서비스 연결</dt>
            <dd>
              페이지를 표시할 때 외부 글꼴 서비스(jsDelivr, Google Fonts)에
              요청이 발생합니다. 양식함 링크는 외부 서비스로 이동하며, 문의
              이메일 링크는 이용자의 메일 앱을 엽니다. 해당 서비스의 처리 방식은
              별도 확인이 필요합니다.
            </dd>
          </div>
        </dl>
      </section>
      <section className="policy-pending">
        <h2>협회가 확인·입력할 사항</h2>
        <p>아래 사항은 사이트 화면과 소스코드만으로 확정할 수 없습니다.</p>
        <dl>
          <div>
            <dt>개인정보 보호 담당자</dt>
            <dd>
              입력 필요: 담당 부서·책임자, 개인정보 문의 및 권리 행사 연락처
            </dd>
          </div>
          <div>
            <dt>문의·정산 접수 정보</dt>
            <dd>
              입력 필요: 이메일 및 실제 접수 서비스에서 처리하는 항목, 목적,
              처리 근거, 보유기간과 파기 방법
            </dd>
          </div>
          <div>
            <dt>호스팅 및 접속 기록</dt>
            <dd>
              입력 필요: Vercel 호스팅의 실제 로그 항목·보관기간, 분석 기능과
              쿠키 사용 여부
            </dd>
          </div>
          <div>
            <dt>외부 서비스·이전 및 위탁</dt>
            <dd>
              입력 필요: 호스팅·글꼴·양식·메일 서비스의 수탁자, 제3자 제공·국외
              이전 해당 여부와 관련 고지
            </dd>
          </div>
          <div>
            <dt>보호 조치 및 이용자 권리</dt>
            <dd>
              입력 필요: 실제 보호 조치, 열람·정정·삭제 등 요청 절차와 피해 구제
              안내
            </dd>
          </div>
          <div>
            <dt>시행과 변경</dt>
            <dd>입력 필요: 시행일, 변경 고지 방식 및 최종 검토·승인</dd>
          </div>
        </dl>
      </section>
    </PolicyLayout>
  );
}
