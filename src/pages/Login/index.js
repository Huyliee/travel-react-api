import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import SocialLogin from "./social-login";
import { TextField, Button } from "@mui/material";
import {  useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(async ()=>{
      try {
        const res = await axios.post("http://lav2.cf/api/login", {
          email,
          password,
        })
        if(res.data.permission === "user"){
          navigate('/');
        }else{
          navigate('/admin');
        }
        localStorage.setItem("access_token", res.data.access_token);
      } catch (error) {
        setError(error.res.data.message);
      }
    },1500)
   
  };
  return (
    <div className={cx("Login-main")}>
      <div className={cx("Login-container")}>
      {error && <p>{error}</p>}
        <h2 className={cx("Login-text")}>Login</h2>
        <div className={cx("Login-container-body")}>
          <div className={cx("Login-social-container")}>
            <SocialLogin
              text="Continue with Facebook"
              icon="https://chisfis-template.vercel.app/static/media/Facebook.c8b110290da41cf2d9e4312c085e008d.svg"
            />
            <SocialLogin
              text="Continue with Twitter"
              icon="https://chisfis-template.vercel.app/static/media/Twitter.5de92974108f200405da6d8ed49a998e.svg"
            />
            <SocialLogin
              text="Continue with Google"
              icon="https://chisfis-template.vercel.app/static/media/Google.b9361a382296ba2cbc182016085b0cc8.svg"
            />
          </div>
          <div className={cx("text-line")}>
            <span>OR</span>
            <div className={cx("line")}></div>
          </div>
          <form onSubmit={handleSubmit}>
            <label className={cx("label")}>
              <span className={cx("label-input")}>Email Address</span>
              <TextField
                fullWidth
                label="Email"
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
              <span className={cx("label-input")}>Password</span>
              <TextField
                fullWidth
                label="Password"
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
                Đăng nhập
              </Button>
            )}
          </form>
          <span className={cx('link-register')}>New user? <a href="/">Create an account</a></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
