import styles from "./PayMethods.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Radio,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getDetailOrder } from "~/GlobalFunction/Api";
import DetailCustomerTable from "./DetailCustomerTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faQrcode } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function PayMothods() {
  //Chuyển lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const steps = ["Nhập thông tin", "Thanh toán"];
  // CSS base Stepper MUI
  const customStyles = {
    "& .MuiStepLabel-iconContainer": {
      marginRight: "8px", // Tăng khoảng cách giữa icon và chữ
    },
    "& .MuiStepLabel-label": {
      fontSize: "14px", // Tăng kích thước chữ
    },
    "& .MuiStepIcon-root": {
      fontSize: "30px", // Tăng kích thước của icon
    },
    justifyContent: "flex-start",
  };
  /// Lấy dữ liệu url
  const { idBooking } = useParams();
  //Load api của chi tiết tour
  const [detailOrder, setDetailOrder] = useState({});
  const [listCustomer, setListCustomer] = useState([]);
  useEffect(() => {
    async function detailData() {
      const data = await getDetailOrder(idBooking);
      setDetailOrder(data);
      setListCustomer(data.detail_order);
    }
    detailData();
  }, [idBooking]);
  //////////////////
  const [selectRadio, setSelectRadio] = useState("tm");
  const handleRadio = (e) => {
    setSelectRadio(e.target.value);
  };
  return (
    <div>
      <Container
        maxWidth="xl"
        style={{ padding: "20px 68px", marginBottom: "20px" }}
      >
        <Box sx={{ width: "100%", marginBottom: "20px" }}>
          <Stepper alternativeLabel activeStep={1} sx={customStyles}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <h2 className={cx("content-tour-heading")}>Thanh toán</h2>
        <Box
          sx={{ width: "100%", marginBottom: "20px" }}
          className={cx("payment-body")}
        >
          <div className={cx("body-left-payment")}>
            <div className={cx("info-contact")}>
              <div className={cx("heading")}>
                <h5>Thông tin liên lạc</h5>
              </div>
              <div className={cx("body-info-contact")}>
                <div className={cx("body-info-text")}>
                  <span>Họ và tên</span>
                  <p>{detailOrder.name}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Email</span>
                  <p>{detailOrder.email}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Địa chỉ</span>
                  <p>{detailOrder.address}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Điện thoại</span>
                  <p>{detailOrder.phone}</p>
                </div>
                <div className={cx("body-info-text")}>
                  <span>Ghi chú</span>
                  <p>Booking từ travel-react-api.netlify.app</p>
                </div>
              </div>
            </div>
            <div className={cx("detail-booking")}>
              <div className={cx("heading")}>
                <h5>Chi tiết booking</h5>
              </div>
              <div className={cx("body-detail-booking")}>
                <div className={cx("label-detail-booking")}>
                  <p>Số booking</p>
                  <p>Giá booking</p>
                  <p>Số tiền đã thanh toán</p>
                  <p>Số tiền còn lại</p>
                  <p>Ngày đăng ký</p>
                  <p>Hình thức thanh toán</p>
                  <p>Tình trạng</p>
                  <p>Thời hạn thanh toán</p>
                </div>
                <div className={cx("text-detail-booking")}>
                  <p>
                    <span style={{ color: "#fd5056", fontWeight: "800" }}>
                      {idBooking}
                    </span>{" "}
                    (Quý khách vui lòng nhớ số booking để thuận tiện cho các
                    giao dịch sau này)
                  </p>
                  <p>7,490,000₫</p>
                  <p>0₫</p>
                  <p>7,490,000₫</p>
                  <p>10/06/2023 18:40:09</p>
                  <p>
                    <div className={cx("payment-methods")}>
                      <div className={cx("payment-box")}>
                        <div className={cx("payment-text")}>
                          <FontAwesomeIcon icon={faMoneyBill} />
                          <p>Tiền mặt</p>
                        </div>
                        <Radio
                          checked={selectRadio === "tm"}
                          onChange={handleRadio}
                          value="tm"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                      </div>
                      <div className={cx("payment-box")}>
                        <div className={cx("payment-text")}>
                          <FontAwesomeIcon icon={faQrcode} />
                          <p>Thanh toán VNPay</p>
                        </div>
                        <Radio
                          checked={selectRadio === "vnpay"}
                          onChange={handleRadio}
                          value="vnpay"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "B" }}
                        />
                      </div>
                      <div className={cx("payment-box")}>
                        <div className={cx("payment-text")}>
                          <FontAwesomeIcon icon={faQrcode} />
                          <p>Thanh toán MoMo</p>
                        </div>
                        <Radio
                          checked={selectRadio === "momo"}
                          onChange={handleRadio}
                          value="momo"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "B" }}
                        />
                      </div>
                    </div>
                  </p>
                  <p>
                    Booking của quý khách đã được chúng tôi xác nhận thành công
                  </p>
                  <p>
                    <span style={{ color: "#fd5056", fontWeight: "800" }}>
                      11/06/23 06:40:09
                    </span>{" "}
                    (Theo giờ Việt Nam. Booking sẽ tự động hủy nếu quá thời hạn
                    thanh toán trên)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("body-right-payment")}>
            <div className={cx("heading")}>
              <h5>Phiếu xác nhận booking</h5>
            </div>
            <div className={cx("product")}>
              <p style={{ marginTop: "10px" }}>
                Quy Nhơn - Eo Gió - Kỳ Co - Phú Yên - Gành Đá Dĩa
              </p>
              <span>
                Số booking:{" "}
                <span style={{ color: "#fd5056", fontWeight: "800" }}>
                  {idBooking}
                </span>
              </span>
            </div>
            <div className={cx("detail")}>
              <div className={cx("detail-label")}>
                <div>
                  <p>Mã tour</p>
                </div>
                <div>
                  <p>Hành trình</p>
                </div>
                <div>
                  <p>Ngày đi</p>
                </div>
                <div>
                  <p>Ngày về</p>
                </div>
                <div>
                  <p>Nơi khởi hành</p>
                </div>
              </div>
              <div className={cx("detail-text")}>
                <div>
                  <span>NDSGN590-028-150623VU-V</span>
                </div>
                <div>
                  <span>HCM - QUY NHƠN - HCM</span>
                </div>
                <div>
                  <span>15/06/2023</span>
                </div>
                <div>
                  <span>18/06/2023</span>
                </div>
                <div>
                  <span>TP. Hồ Chí Minh</span>
                </div>
              </div>
            </div>
            <div className={cx("qr-code")}>
              <img
                src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://travel.com.vn/du-lich/track-booking-no-230610308457/tra-cuu-booking.aspx?utm_source=BookingSearch%26utm_medium=referral%26utm_campaign=qrcode&choe=UTF-8"
                alt="QR"
              />
            </div>
            <div
              style={{
                height: "188px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span>
                Để xem thông tin chương trình tour mới nhất Quý khách có thể
                dùng điện thoại để quét mã QR bên cạnh để truy cập vào website.
              </span>
              <span style={{ marginTop: "10px" }}>
                Để cài phần mềm quét mã QR Code quý khách có thể tìm trong kho
                ứng dụng của điện thoại với từ khóa sau: QRCode Scanner, QRCode
                Reader,..
              </span>
            </div>
            <Button
              style={{
                color: "#ffffff",
                backgroundColor: "#fd5056",
                width: "100%",
                height: "38px",
                marginTop: "20px",
              }}
              variant="contained"
            >
              Thanh toán
            </Button>
          </div>
        </Box>
      </Container>
      <Container
        maxWidth="xl"
        style={{ padding: "20px 68px", marginBottom: "20px" }}
      >
        <div className={cx("info-customer")}>
          <div className={cx("heading")}>
            <h5>Thông tin khách hàng</h5>
          </div>
          <div className={cx("body-info-customer")}>
            <DetailCustomerTable listCustomer={listCustomer} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PayMothods;
