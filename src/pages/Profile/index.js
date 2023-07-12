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
  const ggtoken = localStorage.getItem('ggtoken');
  const [detailCustomer, setDetailCustomer] = useState({});
  const [detailSocial,setDetailSocial]= useState({});
  useEffect(() => {
    async function detailData() {
      if (ggtoken) {
      
        const data = await detailCustomerSocial(email);
        setDetailSocial(data);
      } else {
       
        const data = await detailCustomerApi(idCustomer);
        setDetailCustomer(data);
      }
    }
    detailData();
 
  }, [idCustomer, email , ggtoken]);  



  ggtoken?localStorage.setItem('id_customer',detailSocial[0]?.id):console.log('loi');
  console.log(detailSocial[0]?.id);

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
         
          <InfoCustomer title="Họ và tên"       value={ggtoken?detailSocial[0]?.customer_name : detailCustomer.customer_name} inputName="customer_name"/>
          <InfoCustomer title="Số tour đã đi" value="Chưa có thông tin" />
          <InfoCustomer title="Email" value={ggtoken?detailSocial[0]?.email : detailCustomer.email} inputName="email"/>
          <InfoCustomer title="Số điện thoại" value={ggtoken?detailSocial[0]?.phone : detailCustomer.phone} inputName="phone"/>
          <InfoCustomer title="Ngày sinh" value={ggtoken?detailSocial[0]?.date_of_birth : detailCustomer.date_of_birth} inputName="date_of_birth"/>
          <InfoCustomer title="Giới tính" value={ggtoken?detailSocial[0]?.gender : detailCustomer.gender} inputName="gender"/>
          <InfoCustomer title="Quốc tịch" value="Chưa có thông tin" />
          <InfoCustomer title="Địa chỉ" value={ggtoken?detailSocial[0]?.address : detailCustomer.address} inputName="address"/>
          <InfoCustomer title="CMND" value="Chưa có thông tin" />
        </div>
      </Box>
    </div>
  );
}

export default Profile;
