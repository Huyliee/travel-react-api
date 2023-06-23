import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Box } from "@mui/material";
const cx = classNames.bind(styles);
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const avt = localStorage.getItem("picture");
function Profile() {
  return (
    <div>
      <Box>
        <div className={cx("profile-change-container")}>
          <div className={cx("profile-change-heading")}>
            <h5>Thông tin cá nhân</h5>
            <span>
              Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này
              được sử dụng ra sao.
            </span>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Họ và tên: </h5>
              <span>{name}</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Số tour đã đi:</h5>
              <span>Chưa có thông tin</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Email:</h5>
              <span>{email}</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Số điện thoại:</h5>
              <span>0931487873</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Ngày sinh:</h5>
              <span>Chưa có thông tin</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Giới tính:</h5>
              <span>Chưa có thông tin</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Quốc tịch:</h5>
              <span>Chưa có thông tin</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>Địa chỉ:</h5>
              <span>Chưa có thông tin</span>
            </div>
          </div>
          <div className={cx("profile-change-info")}>
            <div className={cx("profile-change-row")}>
              <h5>CMND:</h5>
              <span>Chưa có thông tin</span>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Profile;
