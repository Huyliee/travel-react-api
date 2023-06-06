import { useEffect, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import styles from "./Booking.module.scss";
import classNames from "classnames/bind";
import Quantity from "./Quantity";
import axios from "axios";
const cx = classNames.bind(styles);

function Booking() {
  //Chuyển lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const id_customer = localStorage.getItem("id_customer");
  const [email,setEmail]= useState("");
  const [name,setName] = useState("");
  const [phone,setPhone]= useState("");
  const [address,setAddress] = useState("")
  const id_date = 2;
  const [detail, setDetail] = useState({
    adultInfo: [],
    childInfo: []
  });
  const handleAdultCustomerInfoChange = (info) => {
    setDetail((prevInfo) => ({
      ...prevInfo,
      adultInfo: info
    }));
  };
  console.log(detail);
  const handleChildCustomerInfoChange = (info) => {
    setDetail((prevInfo) => ({
      ...prevInfo,
      childInfo: info
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://127.0.0.1:8000/api/tour/checkout/NDSGN1352-010-060722VU-V",
      {
        email,
        name,
        phone,
        address,
        id_customer,
        id_date,
        detail
      }
    ).then((res)=>{
      console.log(res);
    })
    .catch ((error) => {
      console.log(error);
    });
  };

  // console.log(customer);
  return (
    <>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <h2 className={cx("content-tour-heading")}>Tổng quan về chuyến đi</h2>
        <div className={cx("booking-body")}>
          <div className={cx("booking-info-customer")}>
              <div>
                <h3
                  className={cx("content-tour-heading")}
                  style={{ fontSize: "22px" }}
                >
                  Thông tin liên hệ
                </h3>

                <div className={cx("text-field-container")}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <label>Họ và tên</label>
                      <p style={{ color: "red" }}> *</p>
                    </div>
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      value={name}
                      sx={{ width: "385px", marginTop: "10px" }}
                      onChange={(e)=>{setName(e.target.value)}}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <label>Email</label>
                      <p style={{ color: "red" }}> *</p>
                    </div>
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      value={email}
                      sx={{ width: "385px", marginTop: "10px" }}
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex" }}>
                      <label>Số điện thoại</label>
                      <p style={{ color: "red" }}> *</p>
                    </div>
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      value={phone}
                      sx={{ width: "385px", marginTop: "10px" }}
                      onChange={(e)=>{setPhone(e.target.value)}}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex" }}>
                      <label>Địa chỉ</label>
                      <p style={{ color: "red" }}> *</p>
                    </div>
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      value={address}
                      sx={{ width: "385px", marginTop: "10px" }}
                      onChange={(e)=>{setAddress(e.target.value)}}
                    />
                  </div>
                </div>
              </div>
              <div className={cx("quantity-customer-container")}>
                <h3
                  className={cx("content-tour-heading")}
                  style={{ fontSize: "22px" }}
                >
                  Hành khách
                </h3>
                <div>
                  <Quantity title="Người lớn" subtitle="&gt; 12"  customerInfo={handleAdultCustomerInfoChange}  />
                  <Quantity title="Trẻ em" subtitle="Từ 5 - 11"  customerInfo={handleChildCustomerInfoChange} />
                </div>
              </div>
              <form onSubmit={handleCheckout} encType="multipart/form-data">
              {/* Rest of your code */}
              <Button type="submit">Đặt tour</Button>
            </form>
          </div>
          <div className={cx("booking-info-tour")}></div>
        </div>
      </Container>
    </>
  );
}

export default Booking;
