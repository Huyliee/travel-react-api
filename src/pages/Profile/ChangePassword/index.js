import { Box, Button, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import swal from "sweetalert";
import { changePass } from "~/GlobalFunction/Api";
import styles from "~/pages/Profile/Profile.module.scss";
const cx = classNames.bind(styles);
function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("id_customer");

  const handleChangePass = async () => {
    setLoading(true);
    try {
      await changePass(id, newPass);
      setOldPass("");
      setNewPass("");
      setLoading(false);
      swal({
        title: "Thành công!",
        text: "Đổi mật khẩu thành công!",
        icon: "success",
      });
    } catch (error) {
      setLoading(false);
      swal({
        title: "Thất bại!",
        text: "Đổi mật khẩu thất bại!",
        icon: "error",
      });
    }
  };
  return (
    <Box>
      <div className={cx("profile-change-container")}>
        {loading ? (
          <div className={cx("sweet-loading")}>
            <HashLoader size={80} color={"#4f46e5"} />{" "}
          </div>
        ) : (
          ""
        )}

        <div className={cx("profile-change-heading")}>
          <h5>Đổi mật khẩu</h5>
          <span>Quý khách của thể đổi mật khẩu tại đây</span>
        </div>
        <div className={cx("changepass-container")}>
          <div className={cx("changepass-box")}>
            <p>Mật khẩu cũ</p>
            <TextField
              id="outlined-basic"
              value={oldPass}
              label="Mật khẩu cũ"
              variant="outlined"
              style={{ width: "200px" }}
              onChange={(e) => setOldPass(e.target.value)}
              type="password"
            />
          </div>
          <div className={cx("changepass-box")}>
            <p>Mật khẩu mới</p>
            <TextField
              id="outlined-basic"
              value={newPass}
              label="Mật khẩu mới"
              variant="outlined"
              style={{ width: "200px" }}
              type="password"
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <div className={cx("changepass-box")}>
            <p>Nhập lại mật khẩu mới</p>
            <TextField
              id="outlined-basic"
              label="Nhập lại mật khẩu mới"
              variant="outlined"
              type="password"
              style={{ width: "200px" }}
            />
          </div>
          <Button onClick={handleChangePass}>Thêm</Button>
        </div>
      </div>
    </Box>
  );
}

export default ChangePassword;
