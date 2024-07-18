import "../css/pages/UserSignup.css"
import Oriblue from "../assets/images/oriblue.png"
import HeaderOrange from "../components/HeaderOrange"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

function UserSignup() {
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [userNickname, setuserNickname] = useState('');
  const [userPhone, setuserPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationok, setVerificationok]=useState(false);
  useEffect(() => {
    // 토큰을 localStorage에서 가져오기
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const userinfo = jwtDecode(storedToken);
        setEmail(userinfo.object.registerDto.email);
        setuserName(userinfo.object.registerDto.userName);
        setuserNickname(userinfo.object.registerDto.nickName);
        setuserPhone(userinfo.object.registerDto.phone);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);
  const sendEmail=()=>{
    axios.post('http://localhost:8080/mail/send', email)
    .then(response => {
      console.log('mail success:', response.data);
      // 성공적으로 회원가입이 처리되었을 경우의 처리
    })
    .catch(error => {
      console.error('mail failed:', error);
      // 회원가입 실패 시의 처리
    });
  }
  const verifyEmail=()=>{
    axios.post('http://localhost:8080/mail/verify', verificationCode)
    .then(response => {
      console.log('verify success:', response.data);
      setVerificationok(true);
      // 성공적으로 회원가입이 처리되었을 경우의 처리
    })
    .catch(error => {
      console.error('verify failed:', error);
      // 회원가입 실패 시의 처리
    });
  }
  const handleSignup = () => {
    const signupData = {
      email,
      userName,
      userNickname,
      userPhone,
    };
    if(verificationok){
      axios.post('http://localhost:8080/register/user', signupData)
      .then(response => {
        console.log('Signup success:', response.data);
        // 성공적으로 회원가입이 처리되었을 경우의 처리
      })
      .catch(error => {
        console.error('Signup failed:', error);
        // 회원가입 실패 시의 처리
      });
    }
    
  };
  return (
    <div className="fullWrapper">
      <HeaderOrange></HeaderOrange>
    <div className = "restSigninWrapper">
      <div className="signinHeader">
        <img className="ori" src={Oriblue} alt="duck"/>
        <div className="headertext">개인 회원가입</div>
        <div className="headerexplain">정보를 입력해주세요.</div>
      </div>
      <div className="signinContent">
        {/* <div className="row">
          <div className="input1btn1"> 
            <div className="explainText">
              이메일*
            </div>
            <div className="buttoninputWrapper">
            <input
              type="text"
              className="input1"
              placeholder="이메일"
            />
            <button className="emailCheckBtn">
            이메일 중복 확인
            </button>
            </div>
          </div>
        </div> */}
        <div className="row child2">
          <div className="input2btn2short"> 
            <div className="explainText">
              이메일*
            </div>
            <div className="buttoninputWrapper">
            <input
              type="text"
              className="input1short"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <button className="phoneCheck" onClick={sendEmail}>
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
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button className="numberCheck" onClick={verifyEmail}>
              확인
            </button>
            </div>
          </div>
        </div>
  
        {/* <div className="row child2">
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
        </div> */}
        <div className="row child2">
          <div className="wrapper2"> 
            <div className="explainText">
              이름*
            </div>
            <input
              type="text"
              className="input2"
              placeholder="이름"
              value={userName}
              disabled
            />
          </div>
          <div className="wrapper2"> 
            <div className="explainText">
              닉네임*
            </div>
            <input
              type="text"
              className="input2"
              placeholder="닉네임"
              value={userNickname}
              onChange={(e) => setuserNickname(e.target.value)}
              
            />
          </div>
        </div>
        <div className="row child2">
          <div className="input2btn2short"> 
            <div className="explainText">
              휴대폰 번호*
            </div>
            <div className="buttoninputWrapper">
            <input
              type="text"
              className="input1short"
              placeholder="'-'제외"
              value={userPhone}
              disabled
            />
            {/* <button className="phoneCheck">
              인증번호 요청
            </button> */}
            </div>
          </div>
          {/* <div className="input2btn2short"> 
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
            </div> */}
          {/* </div> */}
        </div>
      </div>
      <div className="signinFooter">
        <button className="signinSubmitBtn" onClick={handleSignup}>
          개인 회원가입
        </button>
      </div>
    </div>
    </div>
  );
}

export default UserSignup;
