import GroupCreateLogo from "../assets/GroupCreate_Logo.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "../component/Giver-Header";

const mobileWrapper = css`
  width: 100vw;
  height: 100vh;
  max-width: 402px;
  margin: 0 auto;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const logoWrapper = css`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const logoImg = css`
  width: 160px;
`;

const formWrapper = css`
  margin-top: 40px;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  & input {
    width:92%;
    height: 48px;
    border: 1px solid #cfcfcf;
    border-radius: 10px;
    padding: 0 12px;
    margin-bottom: 30px;
    font-size: 16px;
  }
`;

const codeCreateRow = css`
  width: 100%;
  display: flex;
  gap: 12px;

  & input {
    flex: 1;
    margin-bottom: 0;
  }

  & button {
    width: 105px;
    border-radius: 10px;
    background: #78a366;
    color: #fff;
    border: none;
    font-size: 16px;
  }
`;

const submitBtn = css`
  margin-top: 50px;
  width: 85%;
  height: 58px;
  border-radius: 12px;
  background: #78a366;
  color: #fff;
  font-size: 18px;
  border: none;
`;

export default function GroupCreate() {
  return (
    <>
      <div css={mobileWrapper}>
        <Header />
        <div css={logoWrapper}>
          <img src={GroupCreateLogo} alt="group create logo" css={logoImg} />
        </div>

        {/* 폼 */}
        <div css={formWrapper}>
          <h1>그룹 이름</h1>
          <input type="text" placeholder="그룹 이름 입력" />

          <h1>코드 생성</h1>
          <div css={codeCreateRow}>
            <input type="text" placeholder="코드 생성" />
            <button>코드 생성</button>
          </div>
        </div>

        <button css={submitBtn}>생성하기</button>
      </div>
    </>
  );
}
