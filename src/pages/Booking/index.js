import { Container, TextField } from "@mui/material";
import styles from "./Booking.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Booking() {
  return (
    <>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <h2 className={cx("content-tour-heading")}>Tổng quan về chuyến đi</h2>
        <div className={cx("booking-body")}>
          <div className={cx("booking-info-customer")}>
            <div>
                <h3 className={cx("content-tour-heading")} style={{fontSize:'22px'}}>Thông tin liên hệ</h3>
                <div className={cx("text-field-container")}>
                    <div>
                        <div style={{display:'flex'}}><label>Họ và tên</label><p style={{color:'red'}}> *</p></div>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{width:'385px' , marginTop:'10px'}}/>
                    </div>
                    <div>
                        <div style={{display:'flex'}}><label>Email</label><p style={{color:'red'}}> *</p></div>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{width:'385px' , marginTop:'10px'}}/>
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <div style={{display:'flex'}}><label>Số điện thoại</label><p style={{color:'red'}}> *</p></div>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{width:'385px' , marginTop:'10px'}}/>
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <div style={{display:'flex'}}><label>Địa chỉ</label><p style={{color:'red'}}> *</p></div>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{width:'385px' , marginTop:'10px'}}/>
                    </div>
                </div>
            </div>

          </div>
          <div className={cx("booking-info-tour")}></div>
        </div>
      </Container>
    </>
  );
}

export default Booking;
