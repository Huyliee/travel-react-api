import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detailTourApi, detailTourOder } from "~/GlobalFunction/Api";
import styles from "~/pages/OrderAdmin/OrderAdmin.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);

function DetailOrder() {
  const [order, setOrder] = useState({});
  const [tour, setTour] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      async function detailData() {
        const data = await detailTourOder(id);
        setOrder(data);
      }
      detailData();
    }
  }, [id]);
  useEffect(() => {
    if (order?.detail_order) {
      async function detailDataTour() {
        const data = await detailTourApi(order?.detail_order[0]?.id_tour);
        setTour(data);
      }
      detailDataTour();
    }
  }, [order?.detail_order]);
  const handleAccept = (id)=>{
    axios
    .put(`http://127.0.0.1:8000/api/order/accept/${id}`)
    .then(() => {
      // xóa thành công, cập nhật lại danh sách tour
      toast.success("Đơn đặt tour đã được xác nhận");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Không thể xác nhận đơn đặt tour");
    });
  }
  const lengthPayment = order?.payment?.length;
  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ display: "flex" }}>
        <div
          style={{ display: "flex", alignItems: "center", margin: "10px 0px",width:'40%' }}
        >
          <div>
            {" "}
            <h3>Họ tên: </h3>
            <h3>Email: </h3>
            <h3>Số điện thoại: </h3>
            <h3>Mã hóa đơn: </h3>
            <h3>Thời gian đặt: </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              justifyContent: "space-between",
              height: "140px",
            }}
          >
            <span>{order?.name}</span>
            <span>{order?.email}</span>
            <span>{order?.phone}</span>
            <span>{order?.id_order_tour}</span>
            <span>{order?.order_time}</span>
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "10px 0px" }}
        >
          <div style={{width:'200px'}}>
            {" "}
            <h3>ID tour: </h3>
            <h3>Tên tour: </h3>
            <h3>Nơi khởi hành: </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              justifyContent: "space-between",
              height: "80px",
            }}
          >
            <span>{tour?.id_tour}</span>
            <span>{tour?.name_tour}</span>
            <span>{tour?.place_go}</span>
          </div>
        </div>
      </div>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={cx("headCell")}>Tên</TableCell>
              <TableCell className={cx("headCell")}>Giới tính</TableCell>
              <TableCell className={cx("headCell")}>CMND</TableCell>
              <TableCell className={cx("headCell")}>Ngày sinh</TableCell>
              <TableCell className={cx("headCell")}>Loại khách</TableCell>
              <TableCell className={cx("headCell")}>Giá vé</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.detail_order &&
              order.detail_order.map((item) => (
                <TableRow>
                  <TableCell className={cx("bodyCell")} key={item.id}>
                    {item.name_customer}
                  </TableCell>
                  <TableCell className={cx("bodyCell")}>{item.sex}</TableCell>
                  <TableCell className={cx("bodyCell")}>{item.CMND}</TableCell>
                  <TableCell className={cx("bodyCell")}>{item.birth}</TableCell>
                  <TableCell className={cx("bodyCell")}>{item.age}</TableCell>
                  <TableCell>
                    {item.age === "Người lớn"
                      ? (tour.adult_price ?? "").toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : (tour.child_price ?? "").toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className={cx("footCell")}>Tổng giá tiền</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className={cx("footCell")}>
                {" "}
                {(order?.total_price ?? "").toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={cx("footCell")}>
                Số tiền đã thanh toán
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className={cx("footCell")}>
                {order?.payment?.length > 0
                  ? (
                      order.payment[lengthPayment - 1].amount_paid ?? ""
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : "0 đ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={cx("footCell")}>
                Số tiền chưa thanh toán
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className={cx("footCell")}>
                {order?.payment?.length > 0
                  ? (
                      order.payment[lengthPayment - 1].amount_unpaid ?? ""
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : (order?.total_price ?? "").toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Button style={{margin:'20px 0px'}}variant="contained" onClick={() => handleAccept(order?.id_order_tour)}>Xác nhận</Button>
    </div>
  );
}

export default DetailOrder;
