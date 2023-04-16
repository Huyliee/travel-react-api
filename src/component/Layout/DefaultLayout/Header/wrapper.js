import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/component/assets/images";

const cx = classNames.bind(styles);

function Wrapper() {
  return (
    <div className={cx("tour-down-container")}>
      <div className={cx("tour-down-container-main")}>
        <div className={cx("list-tour-container")}>
          <img src={images.nav1} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Tour miền nam</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
          </ul>
        </div>
        <div className={cx("list-tour-container")}>
          <img src={images.nav2} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Tour miền nam</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
          </ul>
        </div>
        <div className={cx("list-tour-container")}>
          <img src={images.nav3} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Tour miền nam</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
          </ul>
        </div>
        <div className={cx("list-tour-container")}>
          <img src={images.nav4} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Tour miền nam</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
          </ul>
        </div>
        <div className={cx("list-tour-container")}>
          <img src={images.nav5} alt="nav1" className={cx("nav-down-img")} />
          <ul className={cx("list-nav")}>
            <li className={cx("header-list-nav")}>Tour miền nam</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
            <li>Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
