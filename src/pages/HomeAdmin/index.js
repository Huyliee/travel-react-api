
import { faMoneyBill, faNewspaper, faPlane, faUsers } from '@fortawesome/free-solid-svg-icons';
import BoxCountup from './BoxCountup';
import styles from "./HomeAdmin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function HomeAdmin() {
    return (
        <div className={cx("home-container")}>
          <h1>Xin chào Adminitrator</h1>
          <div className={cx("count-up-container")}>
          <BoxCountup icon={faUsers} text="Khách hàng" type="customer"/>
          <BoxCountup icon={faPlane} text="Tour" type="tour"/>
          <BoxCountup icon={faNewspaper} text="Tin tức" type="news"/>
          <BoxCountup icon={faMoneyBill} text="Đơn đặt tour" type="order"/>
          <BoxCountup icon={faUsers} text="Khách hàng" type="customer"/>
          </div>
        </div>
      );
}

export default HomeAdmin;