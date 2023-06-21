import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import {
  Box,
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {  ExpandLess, ExpandMore, Password } from "@mui/icons-material";
import { useState } from "react";
const cx = classNames.bind(styles);

function Profile() {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <div className={cx("profile-container")}>
          <Box>
            <div className={cx("profile-info-container")}>
              <div className={cx("profile-name-container")}>
                <img
                  src="https://lh3.googleusercontent.com/a/AAcHTtdj7xXaNfG0M7OVLCGEIJFuwKcQXJbF3D4DBLRG=s96-c"
                  alt=""
                />
                <div className={cx("profile-name-box")}>
                  <h5>Nguyễn Trọng Hiếu</h5>
                  <span>hieu745233@gmail.com</span>
                </div>
              </div>
              <div>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemText
                      primary="Tài khoản"
                      sx={{
                        ".MuiListItemText-primary": {
                          fontSize: "18px",
                          fontWeight: "700",
                        },
                      }}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </ListItemIcon>
                        <ListItemText primary="Thông tin cá nhân" sx={{
                        ".MuiListItemText-primary": {
                          fontSize: "14px",
                          fontWeight: "400",
                        },
                      }}/>
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Password />
                        </ListItemIcon>
                        <ListItemText primary="Đổi mật khẩu" sx={{
                        ".MuiListItemText-primary": {
                          fontSize: "14px",
                          fontWeight: "400",
                        },
                      }}/>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton>
                    <ListItemText
                      primary="Đơn đặt tour"
                      sx={{
                        ".MuiListItemText-primary": {
                          fontSize: "18px",
                          fontWeight: "700",
                        },
                      }}
                    />
                    </ListItemButton>
                </List>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton>
                    <ListItemText
                      primary="Danh sách yêu thích"
                      sx={{
                        ".MuiListItemText-primary": {
                          fontSize: "18px",
                          fontWeight: "700",
                        },
                      }}
                    />
                    </ListItemButton>
                </List>
              </div>
            </div>
          </Box>
          <Box>
            <div className={cx("profile-change-container")}>
                <div className={cx("profile-change-heading")}>
                    <h5>Thông tin cá nhân</h5>
                    <span>Cập nhật thông tin của Quý khách và tìm hiểu các thông tin này được sử dụng ra sao.</span>
                </div>
                <div className={cx("profile-change-info")}>
                    <div className={cx("profile-change-row")}>
                        <h5>Họ và tên:</h5>
                        <span>Nguyễn Trọng Hiếu</span>
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
                        <span>hieu745233@gmail.com</span>
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
      </Container>
    </div>
  );
}

export default Profile;
