import classNames from "classnames/bind";
import styles from "~/pages/Profile/Profile.module.scss";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { detailTourApi, detailTourOder } from "~/GlobalFunction/Api";
import { useParams } from "react-router-dom";
import CardOrder from "../CardOrder";

const cx = classNames.bind(styles);
function DetailOrderTour() {

    const { id } = useParams();
    const [detailOrder, setDetailOder] = useState({});
    const [tour,setTour] = useState({});
    useEffect(() => {
        async function detailData() {
          const data = await detailTourApi(detailOrder.detail_order[0]?.id_tour);
          setTour(data);
        }
        detailData();
      }, [detailOrder.detail_order]);
      console.log(tour);
      //Load api của chi tiết tin tức
      useEffect(() => {
          async function detailData() {
            const data = await detailTourOder(id);
            setDetailOder(data);
          }
          detailData();
        }, [id]);
    
  return (
    <div>

      <Box className={cx("container")}>
        <div className={cx("profile-change-container")}>
          <div className={cx("profile-change-heading")}>
            <h5>Chi tiết đơn đặt tour</h5>
            <span>
              Quý khách của thể xem thông tin cơ bản và chi tiết các tour đã đặt
            </span>
          </div>
          <div>
            <h3>Thông tin người đặt Tour</h3>
            <p>Tên: {detailOrder.name} </p>
            <p>Email: {detailOrder.email}</p>
            <p>Số điện thoại: {detailOrder.phone}</p>
            <p>Địa chỉ: {detailOrder.address}</p>
            <p>Ngày đặt tour: {detailOrder.order_time}</p>
            <h3>Thông tin hành khách Tour: </h3>
          </div>
        </div>
        
            
             <div className={ cx("left-detail-tour")}>
             Tên Tour: {tour.name_tour} <br/>
             <img src={tour.img_tour} style={{width:"200px"}}></img>
             </div>

              
                
                
                
                
        
          
      </Box>
    </div>
  );
}

export default DetailOrderTour;
