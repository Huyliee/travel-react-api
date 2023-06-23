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
  
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const avt = localStorage.getItem("picture");

    return ( 
        <Box>
        <div className={cx("profile-info-container")}>
          <div className={cx("profile-name-container")}>
            <img
              src={avt}
              alt=""
            />
            <div className={cx("profile-name-box")}>
              <h5>{name}</h5>
              <span>{email}</span>
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