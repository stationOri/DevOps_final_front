import "../css/pages/RestaurantSignin.css"
import Oriblue from "../assets/images/oriblue.png"
import File from "../components/File"

function RestaurantSignin() {
  
  return (
    <div className="fullWrapper">
    <div className = "restSigninWrapper">
      <div className="signinHeader">
        <img className="ori" src={Oriblue} alt="duck"/>
        <div className="headertext">기업 회원가입</div>
        <div className="headerexplain">식당 정보 및 업체 정보를 입력해주시기 바랍니다.</div>
      </div>
      <div className="signinContent">
        <div className="row">
          <div className="input1btn1"> 
            <div className="explainText">
              담당자 이메일*
            </div>
            <div className="buttoninputWrapper">
            <input
              type="text"
              className="input1"
              placeholder="담당자 이메일"
            />
            <button className="emailCheckBtn">
            이메일 중복 확인
            </button>
            </div>
          </div>
        </div>
        <div className="row child2">
          <div className="wrapper2"> 
            <div className="explainText">
              비밀번호*
            </div>
            <input
              type="password"
              className="input2"
              placeholder="비밀번호"
            />
          </div>
          <div className="wrapper2"> 
            <div className="explainText">
              비밀번호 확인*
            </div>
            <input
              type="password"
              className="input2"
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
        <div className="row">
          <div className="wrapper2"> 
            <div className="explainText">
              담당자 이름*
            </div>
            <input
              type="text"
              className="input2"
              placeholder="담당자 이름"
            />
          </div>
        </div>
        <div className="row child2">
          <div className="input2btn2short"> 
            <div className="explainText">
              담당자 휴대폰 번호*
            </div>
            <div className="buttoninputWrapper">
            <input
              type="text"
              className="input1short"
              placeholder="'-'제외"
            />
            <button className="phoneCheck">
              인증번호 요청
            </button>
            </div>
          </div>
          <div className="input2btn2short"> 
            <div className="explainText">
              인증번호*
            </div>
            <div className="buttoninputWrapper">
            <input
              type="text"
              className="input1short"
              placeholder="입력해주세요"
            />
            <button className="numberCheck">
              확인
            </button>
            </div>
          </div>
        </div>
        <div className="row child2">
          <div className="wrapper2"> 
            <div className="explainText">
              매장 이름*
            </div>
            <input
              type="text"
              className="input2"
              placeholder="매장 이름"
            />
          </div>
          <div className="wrapper2"> 
            <div className="explainText">
              사업자 등록번호*
            </div>
            <input
              type="text"
              className="input2"
              placeholder="숫자만 입력해주세요"
            />
          </div>
        </div>
        <div className="row">
        <div className="filebox"> 
            <div className="explainText">
              사업자등록증*
            </div>
            <div className="filecompoWrapper">
            <File className="filecompo"></File>
            </div>
          </div>
        </div>
      </div>
      <div className="signinFooter">
        <button className="signinSubmitBtn">
          기업 회원가입
        </button>
      </div>
    </div>
    </div>
  );
}

export default RestaurantSignin;
