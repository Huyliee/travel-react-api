import { useEffect, useState } from "react";
import { Box, Button, Container, Step, StepLabel, Stepper, TextField } from "@mui/material";
import styles from "./Booking.module.scss";
import classNames from "classnames/bind";
import Quantity from "./Quantity";
import axios from "axios";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function Booking() {
  //Chuyển lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idTour = queryParams.get("state");
  const id_date = queryParams.get("date");
  console.log(id_date);
  const id_customer = localStorage.getItem("id_customer");
  const [email,setEmail]= useState("");
  const [name,setName] = useState("");
  const [phone,setPhone]= useState("");
  const [address,setAddress] = useState("")
  const [detail, setDetail] = useState({
    adultInfo: [],
    childInfo: []
  });
  //Thêm dữ liệu vào mảng adultInfo khi nhập từ input của người lớn
  const handleAdultCustomerInfoChange = (info) => {
    setDetail((prevInfo) => ({
      ...prevInfo,
      adultInfo: info
    }));
  };
  console.log(detail);

  //Thêm dữ liệu vào mảng childInfo khi nhập từ input của trẻ em
  const handleChildCustomerInfoChange = (info) => {
    setDetail((prevInfo) => ({
      ...prevInfo,
      childInfo: info
    }));
  };

  //Xử lý đặt tour
  const handleCheckout = async (e) => {
    e.preventDefault();
     await axios.post(
      `http://127.0.0.1:8000/api/tour/checkout/${idTour}`,
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
  const steps = [
    'Nhập thông tin',
    'Thanh toán'
  ]
  // CSS base Stepper MUI
  const customStyles = {
    '& .MuiStepLabel-iconContainer': {
      marginRight: '8px', // Tăng khoảng cách giữa icon và chữ
    },
    '& .MuiStepLabel-label': {
      fontSize: '14px', // Tăng kích thước chữ
    },
    '& .MuiStepIcon-root': {
      fontSize: '30px', // Tăng kích thước của icon
    },
    justifyContent: 'flex-start',
  };
  return (
    <>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <Box sx={{ width: '100%' , marginBottom:'20px' }}>
          <Stepper alternativeLabel sx={customStyles}>
              {steps.map((label)=>(
                  <Step key={label} >
                    <StepLabel>{label}</StepLabel>
                  </Step>
              ))}
          </Stepper>
        </Box>
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
              <Button type="submit" variant="contained">Đặt tour</Button>
            </form>
          </div>
          <div className={cx("booking-info-tour")}></div>
        </div>
      </Container>
    </>
  );
}

export default Booking;
