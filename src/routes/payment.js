const express = require("express");
const axios = require("axios");
const router = express.Router();

// 결제 검증 API
router.post("/payments/verify", async (req, res) => {
  const { imp_uid, merchant_uid, amount } = req.body;

  try {
    // 1. 포트원 액세스 토큰(access token) 발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        imp_key: process.env.VITE_PORTONE_REST_API_KEY, // REST API Key
        imp_secret: process.env.VITE_PORTONE_REST_API_SECRET, // REST API Secret
      },
    });

    const { access_token } = getToken.data.response;

    // 2. 포트원 API로 결제 정보 조회
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: "get",
      headers: { Authorization: access_token },
    });

    const paymentData = getPaymentData.data.response;

    // 3. 결제 검증
    if (paymentData.status === "paid") {
      // 결제 금액 일치 여부 확인
      if (paymentData.amount === amount) {
        console.log("결제 검증 성공", paymentData);

        return res.status(200).json({
          success: true,
          message: "결제가 성공적으로 완료되었습니다.",
        });
      } else {
        // 결제 금액 불일치 (위/변조 된 결제)
        console.error("결제 금액 불일치", {
          expected: amount,
          actual: paymentData.amount,
        });

        return res.status(400).json({
          success: false,
          message: "결제 금액이 일치하지 않습니다.",
        });
      }
    } else {
      // 결제 상태 확인 (미결제, 결제 실패 등)
      console.error("결제 상태 비정상", paymentData.status);

      return res.status(400).json({
        success: false,
        message: "결제가 정상적으로 이루어지지 않았습니다.",
      });
    }
  } catch (error) {
    console.error("결제 검증 중 오류 발생", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
