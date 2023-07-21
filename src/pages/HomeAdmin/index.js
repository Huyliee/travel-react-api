import {
  faMoneyBill,
  faNewspaper,
  faPlane,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import BoxCountup from "./BoxCountup";
import styles from "./HomeAdmin.module.scss";
import classNames from "classnames/bind";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import OrderTourCount from "./OrderTourCount";
import TourChart from "./PriceOfTour";



const cx = classNames.bind(styles);

function HomeAdmin() {
  return (
    <div className={cx("home-container")}>
      <h1>Xin chào Adminitrator</h1>
      <div className={cx("count-up-container")}>
        <div className={cx("count-up-img-container")}>
          <img
            src="https://demo.bootstrapdash.com/skydash-free/template/images/dashboard/people.svg"
            alt="Ảnh"
          />
        </div>
        <div className={cx("count-up-sub-container")}>
          <BoxCountup icon={faUsers} text="Khách hàng" type="customer" />
          <BoxCountup icon={faPlane} text="Tour" type="tour" />
          <BoxCountup icon={faNewspaper} text="Tin tức" type="news" />
          <BoxCountup icon={faMoneyBill} text="Đơn đặt tour" type="order" />
        </div>
      </div>
      <div className={cx("chart-container")}>
        <MonthlyRevenueChart />
      </div>
      <div>
        <OrderTourCount />
      </div>
      <div>
        <TourChart />
      </div>
      {/* <div>
        <MapAlynatic />
      </div> */}
    </div>
  );
}

export default HomeAdmin;
