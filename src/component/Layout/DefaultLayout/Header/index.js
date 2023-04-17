import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/component/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "./wrapper";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('access_token');
    navigate('/login');
  }
  return (
    <div className={cx("Main-nav")}>
      <div className={cx("nav-container")}>
        <div className={cx("logo-container")}>
          <img src={images.logo} alt="Logo" />
          <p>Travel</p>
        </div>
        <div className={cx("sub-nav-container")}>
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/">Giới thiệu</a>
            </li>
            <Tippy
              interactive
              render={(attrs) => (
                <div
                  className={cx("wrapper-container")}
                  tabIndex="-1"
                  {...attrs}
                >
                  <Wrapper></Wrapper>
                </div>
              )}
              placement="bottom"
              trigger="mouseenter focus"
            >
              <li className={cx("tour-down")}>
                <Link to="/tour">
                  Tour du lịch
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ marginLeft: 2 }}
                  />
                </Link>
                {/* <Wrapper/> */}
              </li>
            </Tippy>
            <li>
              <a href="/">Tin tức</a>
            </li>
            <li>
              <a href="/">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className={cx("login-container")}>
          <div className={cx("icon-container")}>
            <FontAwesomeIcon icon={faMoon} className={cx("icon")} />
          </div>
          <Tippy
            interactive
            trigger="click"
            render={(attrs) => (
              <div {...attrs}>
                <input
                  placeholder="Nhập địa điểm cần tìm kiếm"
                  className={cx("input-search")}
                />
              </div>
            )}
          >
            <div className={cx("icon-container")}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={cx("icon")}
              />
            </div>
          </Tippy>
          <div className={cx("login-sub-container")}>
            {token ? (
              <Tippy 
              interactive
              trigger="click"
              render={(attrs) => (
                <div {...attrs}>
                  <div className={cx('user-list-container')}>
                    <div className={cx('user-list-option')}>
                      <div className={cx('user-list-box')}>
                        <AccountCircleIcon className={cx('user-list-icon')} />
                        <span>Account</span>
                      </div>
                      <div className={cx('user-list-box')}>
                        <MessageIcon className={cx('user-list-icon')} />
                        <span>Message</span>
                      </div>
                      <div className={cx('user-list-box')}>
                        <FavoriteBorderIcon className={cx('user-list-icon')} />
                        <span>Wishlists</span>
                      </div>
                      <div className={cx('user-list-box')}>
                        <HomeIcon className={cx('user-list-icon')} />
                        <span>Booking</span>
                      </div>
                    </div>
                    <div className={cx('user-list-logout')} onClick={handleLogout}>
                      <LogoutIcon className={cx('user-list-icon')} />
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              )}>
                <Avatar sx={{bgcolor:"#4f46e5"}}>H</Avatar>
              </Tippy>
            ) : (
              <Link to="/login" className={cx("login-btn-link")}>
                <button className={cx("login-btn")}>Đăng nhập</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
