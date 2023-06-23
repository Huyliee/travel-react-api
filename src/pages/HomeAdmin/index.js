
import BoxCountup from './BoxCountup';
import styles from "./HomeAdmin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function HomeAdmin() {
    return (
        <div className={cx("home-container")}>
          <h1>Xin chào Adminitrator</h1>
          <div className={cx("count-up-container")}>
          <BoxCountup />
          <BoxCountup />
          <BoxCountup />
          <BoxCountup />
          <BoxCountup />
          </div>
        </div>
      );
}

export default HomeAdmin;