import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import { TextField, Button } from "@mui/material";
import {  useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const cx = classNames.bind(styles);

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) =>{
    setLoading(true);
    e.preventDefault();
    setTimeout(async ()=>{
        axios
        .post("http://127.0.0.1:8000/api/signup", {
            customer_name,
            email,
            password,
        })
        .then((response) => {
          console.log(response.data);
          swal("Thành công!", "Bạn đã đăng ký thành công!", "success", {
            buttons: {
              confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn btn-primary",
                closeModal: true,
              },
            },
          }).then((value) => {
            // Chuyển hướng về trang login
            navigate('/login');
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },1500)
  }
  return (
    <div className={cx("Login-main")}>
      <div className={cx("Login-container")}>
        <h2 className={cx("Login-text")}>Sign Up</h2>
        <div className={cx("Login-container-body")}>
          <form onSubmit={handleSignUp}>
            <label className={cx("label")}>
              <span className={cx("label-input")}>Email</span>
              <TextField
                fullWidth
                label="Nhập email"
                id="fullWidth"
                sx={{
                  width: 448,
                  marginTop: "10px",
                  "& .MuiInputBase-root": {
                    borderRadius: "16px",
                  },
                }}
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className={cx("label")}>
            <span className={cx("label-input")}>Họ tên</span>
              <TextField
                fullWidth
                label="Nhập họ tên"
                id="fullWidth"
                sx={{
                  width: 448,
                  marginTop: "10px",
                  "& .MuiInputBase-root": {
                    borderRadius: "16px",
                  },
                }}
                placeholder="example@example.com"
                value={customer_name}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </label>
            <label className={cx("label")}>
              <span className={cx("label-input")}>Mật khẩu</span>
              <TextField
                fullWidth
                label="Nhập password"
                id="fullWidth"
                sx={{
                  width: 448,
                  marginTop: "10px",
                  "& .MuiInputBase-root": {
                    borderRadius: "16px",
                  },
                }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className={cx("label")}>
              <span className={cx("label-input")}>Nhập lại mật khẩu</span>
              <TextField
                fullWidth
                label="Nhập lại password"
                id="fullWidth"
                sx={{
                  width: 448,
                  marginTop: "10px",
                  "& .MuiInputBase-root": {
                    borderRadius: "16px",
                  },
                }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {loading ? (
              <div className={cx("sweet-loading")}>
              <BeatLoader  size={15} color={'#4f46e5'} /> </div>
             ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4f46e5",
                  height: "48px",
                  width: "448px",
                  borderRadius: "9999px",
                  "&:hover": {
                    backgroundColor: "#4338ca",
                  },
                  "& .MuiButton-label": {
                    borderRadius: "9999px",
                  },
                  marginTop: "25px",
                  fontWeight: 700,
                  fontSize: 16,
                }}
                type="submit"
              >
                Đăng ký
              </Button>
            )}
          </form>
          <span className={cx('link-register')}>Thành viên cũ! <a href="/" style={{color:"red"}}>Đã có tài khoản</a></span>
        </div>
      </div>
    </div>
  );
}

export default Register;
