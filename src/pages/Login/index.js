import faceIO from "@faceio/fiojs";
import fioErrCode from "@faceio/fiojs"
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import SocialLogin from "./social-login";
import { TextField, Button, Modal, Box } from "@mui/material";
import {  useState } from "react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { loginApi } from "~/GlobalFunction/Api";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
const cx = classNames.bind(styles);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'10px',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'space-between',
  height:'250px'
};

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
        const res = await loginApi(email,password);
        console.log(res.permission);
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("id_customer",res.id);
        setLoading(false)
          swal({
            title: "Thành công!",
            text: "Đăng nhập thành công!",
            icon: "success",
            timer: 1500,
            buttons:false,
          }).then(() => {
            if(res.permission === "user")
            {
              navigate('/');
            }else{
              navigate('/admin');
            }
          });
      } catch (error) {
        setError(error.res.message);
      }
    },1500)
  };  
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let faceioInstance = null
  // useEffect(() => {
  //   const script = document.createElement('script')
  //   script.src = '//cdn.faceio.net/fio.js'
  //   script.async = true
  //   script.onload = () => loaded()
  //   document.body.appendChild(script)
  //   return () => {
  //     document.body.removeChild(script)
  //   }
  // }, [])

    console.log(faceIO)
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO('fioaf1da')
    }

  console.log(faceioInstance);
  const faceRegistration = async () =>{
    try {
      const userInfo = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          email: "trungquandev01@gmail.com",
          userId: "170795-id-trungquandev",
          username: "trungquandev",
          website: "https://trungquandev.com"
        },
      })
      console.log(userInfo)
      console.log('Unique Facial ID: ', userInfo.facialId)
      console.log('Enrollment Date: ', userInfo.timestamp)
      console.log('Gender: ', userInfo.details.gender)
      console.log('Age Approximation: ', userInfo.details.age)
      setOpen(false); 
    } catch (errorCode) {
      console.log(errorCode)
      handleError(errorCode)
    }
  }
  const faceSignIn = async () =>{
    try {
      console.log(faceioInstance)
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      })
      console.log(userData)
      console.log('Unique Facial ID: ', userData.facialId)
      console.log('PayLoad: ', userData.payload)
      setOpen(false); 
    } catch (errorCode) {
      console.log(errorCode)
      handleError(errorCode)
    }
  }
  const handleError = (errCode) => {
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    // const fioErrCode={PERMISSION_REFUSED:1,NO_FACES_DETECTED:2,UNRECOGNIZED_FACE:3,MANY_FACES:4,PAD_ATTACK:5,FACE_MISMATCH:6,NETWORK_IO:7,WRONG_PIN_CODE:8,PROCESSING_ERR:9,UNAUTHORIZED:10,TERMS_NOT_ACCEPTED:11,UI_NOT_READY:12,SESSION_EXPIRED:13,TIMEOUT:14,TOO_MANY_REQUESTS:15,EMPTY_ORIGIN:16,FORBIDDDEN_ORIGIN:17,FORBIDDDEN_COUNTRY:18,UNIQUE_PIN_REQUIRED:19,SESSION_IN_PROGRESS:20},fioState={UI_READY:1,PERM_WAIT:2,PERM_REFUSED:3,PERM_GRANTED:4,REPLY_WAIT:5,PERM_PIN_WAIT:6,AUTH_FAILURE:7,AUTH_SUCCESS:8}
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user")
        break
      case fioErrCode.NO_FACES_DETECTED:
        console.log("No faces were detected during the enroll or authentication process")
        break
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index")
        break
      case fioErrCode.MANY_FACES:
        console.log("Two or more faces were detected during the scan process")
        break
      case fioErrCode.PAD_ATTACK:
        console.log("Presentation (Spoof) Attack (PAD) detected during the scan process")
        break
      case fioErrCode.FACE_MISMATCH:
        console.log("Calculated Facial Vectors of the user being enrolled do not matches")
        break
      case fioErrCode.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated")
        break
      case fioErrCode.PROCESSING_ERR:
        console.log("Server side error")
        break
      case fioErrCode.UNAUTHORIZED:
        console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information")
        break
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user")
        break
      case fioErrCode.UI_NOT_READY:
        console.log("The FACEIO Widget code could not be (or is being) injected onto the client DOM")
        break
      case fioErrCode.SESSION_EXPIRED:
        console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly")
        break
      case fioErrCode.TIMEOUT:
        console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)")
        break
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications")
        break
      case fioErrCode.EMPTY_ORIGIN:
        console.log("Origin or Referer HTTP request header is empty or missing")
        break
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log("Domain origin is forbidden from instantiating fio.js")
        break
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js")
        break
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log("Another authentication or enrollment session is in progress")
        break
      case fioErrCode.NETWORK_IO:
      default:
        console.log("Error while establishing network connection with the target FACEIO processing node")
        break
    }
  }
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
            <Button onClick={handleOpen}>
              <SocialLogin
                text="Continue with FaceIO"
                icon="https://cdn.faceio.net/select.svg"
              />
            </Button>
            <LoginSocialGoogle 
              client_id={
                "609226686716-rha901hdhi60o2tsgsrik8k56pr9cs4n.apps.googleusercontent.com"
              }
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={({provider,data})=>{
                console.log(provider,data);
                

            localStorage.setItem("name",data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("picture", data.picture);
                
              }}
              onReject={(err)=>{
                console.log(err);
              }}
            >
                <GoogleLoginButton></GoogleLoginButton>
            </LoginSocialGoogle>
        
          </div>
          <div className={cx("text-line")}>
            <span>OR</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label className={cx("label")}>
              <span className={cx("label-input")}>Email</span>
              <TextField
                fullWidth
                label="Email"
                id="fullWidth"
                sx={{
                  width: 448,
                  marginTop: "10px",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className={cx("label")}>
              <span className={cx("label-input")}>Mật khẩu</span>
              <TextField
                fullWidth
                label="Password"
                id="fullWidth"
                sx={{
                  width: 448,
                  marginTop: "10px",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
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
          <span className={cx('link-register')}>New user? <Link to="/signup">Create an account</Link></span>
        </div>
      </div>
      <div>
        <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={style}>
            <h1>Đăng nhập bằng khuôn mặt</h1>
            <Button variant="contained" style={{width:'300px',height:'45px'}} onClick={faceSignIn}>Đăng nhập</Button>
            <Button variant="contained" style={{width:'300px',height:'45px'}} onClick={faceRegistration}>Đăng ký</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
