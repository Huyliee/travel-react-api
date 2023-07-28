import { Container, Box } from "@mui/material";
import styles from "./PaymentSuccess.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { paymentMoMoStore } from "~/GlobalFunction/Api";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function PaymentSuccess() {
  const id_customer = localStorage.getItem('id_customer');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị từ queryParams
  const id_order_tour = searchParams.get('orderId');
  const id_order = id_order_tour.split("-")[0];
  const amount_paid = searchParams.get('amount');
  const payment_methods = "MOMO"
  // console.log(id_customer,id_order,amount_paid,payment_methods);
  useEffect(()=>{
    const data = paymentMoMoStore(id_customer,id_order,amount_paid,payment_methods);
    console.log(data);
  },[id_customer,id_order,amount_paid,payment_methods])

  return (
    <div>
      <Container
        maxWidth="xl"
        style={{ padding: "20px 68px", marginBottom: "20px" }}
      >
        <Box
          sx={{ width: "100%", marginBottom: "20px" }}
          className={cx("payment-success-container")}
        >
          <div className={cx("heading")}>
            <h5>Đặt tour thành công!! 🎉</h5>
          </div>
          <div className={cx("body")}>
            <div className={cx("tour-container")}>
            <p style={{ fontSize: "16px" , padding:'10px' }}>Chúng tôi xin chân thành cảm ơn bạn vì đã chọn chúng tôi để tổ chức hành trình đáng nhớ của bạn. Sự tin tưởng và lựa chọn của bạn đối với chúng tôi là một động lực vô cùng lớn để chúng tôi tiếp tục nỗ lực mang đến những trải nghiệm tuyệt vời nhất cho quý khách.</p>
            <p style={{ fontSize: "16px" , padding:'10px' }}>Để biết chi tiết về các thông tin đã đặt bạn có thể vào trang cá nhân hoặc là email bạn dùng để đăng ký tour</p>
            </div>
           
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default PaymentSuccess;
