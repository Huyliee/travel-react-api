import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Box} from "@mui/material";
import InfoCustomer from "./InfoCustomer";
import { useEffect, useState } from "react";
import { detailCustomerApi, detailCustomerSocial } from "~/GlobalFunction/Api";
const cx = classNames.bind(styles);
function Profile() {
  const idCustomer = localStorage.getItem('id_customer');
  const email = localStorage.getItem('email');
  const [detailCustomer, setDetailCustomer] = useState({});
  const [detailSocial,setDetailSocial]= useState({});
  console.log(email);
  useEffect(() => {
    async function detailData() {
      if (idCustomer) {
        const data = await detailCustomerApi(idCustomer);
        setDetailCustomer(data);
      } else if (email) {
        const data = await detailCustomerSocial(email);
        setDetailSocial(data);
      }
    }
    detailData();
  }, [idCustomer, email]);


  
  console.log(detailSocial);
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
          <InfoCustomer title="Họ và tên" value={detailCustomer.customer_name} inputName="customer_name"/>
          <InfoCustomer title="Số tour đã đi" value="Chưa có thông tin" />
          <InfoCustomer title="Email" value={detailCustomer.email} inputName="email"/>
          <InfoCustomer title="Số điện thoại" value={detailCustomer.phone} inputName="phone"/>
          <InfoCustomer title="Ngày sinh" value={detailCustomer.date_of_birth} inputName="date_of_birth"/>
          <InfoCustomer title="Giới tính" value={detailCustomer.gender} inputName="gender"/>
          <InfoCustomer title="Quốc tịch" value="Chưa có thông tin" />
          <InfoCustomer title="Địa chỉ" value={detailCustomer.address} inputName="address"/>
          <InfoCustomer title="CMND" value="Chưa có thông tin" />
        </div>
      </Box>
    </div>
  );
}

export default Profile;
