import classNames from "classnames/bind";
import styles from "~/pages/Profile/Profile.module.scss";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {  ExpandLess, ExpandMore, Password } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);


function ProfileInfo() {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
  
    return ( 
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
              <Link to="/profile/order" style={{textDecoration:'none',color:"#000000"}}>
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
                </Link>
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
     );
}

export default ProfileInfo;