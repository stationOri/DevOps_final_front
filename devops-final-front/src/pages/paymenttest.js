import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Paymenttest() {
    const [amount, setAmount] = useState(0);
  
    const handleChange = (e) => {
      setAmount(e.target.value);
    }
  
    const ClickChargeBtn = (pg_method, amount, nickname, redirect_url) => {
      const { IMP } = window;
      IMP.init('imp50204728'); // 가맹점 번호 지정
      IMP.request_pay({
        pg: "tosspayments",
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호 생성
        name: '상품1',
        amount: `${amount}`, // 결제 가격
        buyer_name: '김민규',
        buyer_tel: '010-1234-5678'
        // 모바일에서는 필요함 m_redirect_url: `${BASE_URL}/payment-redirect`
    },  async (response) => {
        if (response.error_code != null) {
          return alert(`결제에 실패하였습니다. 에러 내용: ${response.error_msg}`);
        }else{
            try {
                const notified = await axios.post('http://localhost:8080/payment/validation', {
                  imp_uid: response.imp_uid,
                  merchant_uid: response.merchant_uid,
                  amount: parseInt(amount)
                  // 주문 정보 추가...
                }, {
                  headers: { "Content-Type": "application/json" }
                });
                if(notified){
                  console.log("결제 verification 성공");
                }else{
                  console.log("결제 verification 실패");
                }
              } catch (error) {
                console.error('api 호출 실패:', error);
              }
        }

      
      })
    }
  
    return (
      <div className="App">
        <h1>Test</h1>
        <p>금액<input type="number" className='amount' onChange={handleChange}></input></p>
        <button onClick={() => ClickChargeBtn('kakaopay', amount, 'nickname', 'http://localhost:3000/redirect')}>카카오페이</button>
        <button onClick={() => ClickChargeBtn('tosspay', amount, 'nickname', 'http://localhost:3000/redirect')}>토스페이</button>
      </div>
    );
  }
  
  export default Paymenttest;