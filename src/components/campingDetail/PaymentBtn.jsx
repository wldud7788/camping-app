import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PaymentBtn({ productName, amount }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  // 환경 변수에서 고객사 식별코드 가져오기
  const CUSTOMER_ID = import.meta.env.VITE_PORTONE_CUSTOMER_ID;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;

    script.onload = () => {
      console.log("포트원 SDK 로드 완료", window.INP);

      // 포트원 SDK 초기화
      if (window.IMP) {
        // 고객사 식별코드로 초기화
        window.IMP.init(CUSTOMER_ID);
        setIsSDKLoaded(true);
      } else {
        console.error("포트원 SDK를 찾을 수 없습니다.");
      }
    };

    script.oneerror = () => {
      console.error("포트원 SDK로드 중 오류 발생");
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [CUSTOMER_ID]);

  const handlePayment = () => {
    if (!isSDKLoaded || !window.IMP) {
      console.error("포트원 SDK가 로드되지 않았습니다.");
      return;
    }

    // 고유한 주문번호 생성 (주문 번호는 중복되면 안됨)
    const merchantUid = `mid_${new Date().getTime()}`;

    // 결제 데이터 구성
    const paymentData = {
      pg: "danal_tpay",
      pay_method: "card", // 결제 수단
      merchant_uid: merchantUid, // 주문번호
      name: productName, // 상품명
      amount: amount, // 결제금액
      buyer_email: "buyer@example.com", // 구매자 이메일
    };

    // 결제창 호출
    window.IMP.request_pay(paymentData, (response) => {
      const { success, error_msg } = response;

      if (success) {
        toast.success("결제완료");
      } else {
        toast.error(`결제 실패 ${error_msg}`);
      }
    });
  };

  return (
    <button
      className="payment_button"
      onClick={handlePayment}
      disabled={!isSDKLoaded}
    >
      {amount}원 결제하기
    </button>
  );
}

export default PaymentBtn;
PaymentBtn.propTypes = {
  productName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
