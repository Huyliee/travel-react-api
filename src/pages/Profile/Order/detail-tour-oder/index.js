import classNames from "classnames/bind";
import styles from "~/pages/Profile/Profile.module.scss";
import {
  Button,
  Container,
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
import { detailTourApi, detailTourOder } from "~/GlobalFunction/Api";
import { Link, useParams } from "react-router-dom";

const cx = classNames.bind(styles);
function DetailOrderTour() {
  const { id } = useParams();
  const [detailOrder, setDetailOder] = useState({});
  const [tour, setTour] = useState({});
  const [idTour, setIdTour] = useState("");
  const [date, setDate] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      async function detailData() {
        const data = await detailTourOder(id);
        setDate(data?.date_go);
        setIdTour(data?.detail_order[0].id_tour);
        setDetailOder(data);
      }
      detailData();
    }
  }, [id]);

  useEffect(() => {
    if (detailOrder?.detail_order && detailOrder?.detail_order[0]?.id_tour) {
      async function detailDataTour() {
        const data = await detailTourApi(detailOrder?.detail_order[0].id_tour);
        setTour(data);
      }
      detailDataTour();
    }
  }, [detailOrder.detail_order]);
  const lengthPayment = detailOrder?.payment?.length;
  return (
    <Container style={{ margin: "20px auto", width: "100%" }}>
      <div
        // className={cx("profile-change-container")}
        style={{
          margin: "0 auto",
          width: "950px!important",
          minHeight: "473px",
          padding: "24px",
          border: "1px solid #d5d5d5",
          borderRadius: "10px",
        }}
      >
        <div className={cx("profile-change-heading")}>
          <h2 style={{ margin: "20px" }}>Thông tin Tour</h2>

          <TableContainer component={Paper} variant="outlined">
            <TableHead>
              <TableRow>
                <TableCell className={cx("headCell")}>Tên Tour</TableCell>
                <TableCell className={cx("headCell")}>Hình ảnh</TableCell>
                <TableCell className={cx("headCell")}>Nơi khởi hành</TableCell>
                <TableCell className={cx("headCell")}>Ngày khởi hành</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {tour?.name_tour}{" "}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  <img
                    style={{ width: "300px" }}
                    src={tour?.img_tour}
                    alt="mota"
                  />
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {tour?.place_go}
                </TableCell>
                <TableCell className={cx("bodyCell")}> {date?.date}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
          <h2 style={{ margin: "20px" }}>Thông tin người đặt Tour</h2>
          <TableContainer component={Paper} variant="outlined">
            <TableHead>
              <TableRow>
                <TableCell className={cx("headCell")}>Tên</TableCell>
                <TableCell className={cx("headCell")}>Email</TableCell>
                <TableCell className={cx("headCell")}>Số điện thoại</TableCell>
                <TableCell className={cx("headCell")}>Địa chỉ</TableCell>
                <TableCell className={cx("headCell")}>Ngày đặt tour</TableCell>
                <TableCell className={cx("headCell")}>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.name}{" "}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.email}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.phone}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.address}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {detailOrder.order_time}
                </TableCell>
                <TableCell className={cx("bodyCell")}>
                  {" "}
                  {id &&
                 ((detailOrder?.payment?.length > 0 &&
                  (detailOrder.payment[lengthPayment - 1]?.amount_unpaid > 0 && detailOrder?.total_price > 0)) || detailOrder?.payment?.length === 0)
                  ? "Chưa thanh toán đủ"
                  : "Đã thanh toán đủ"
                 }                
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>

          <h2 style={{ margin: "20px" }}>Thông tin khách hàng tham gia Tour</h2>

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
                {detailOrder.detail_order &&
                  detailOrder.detail_order.map((item) => (
                    <TableRow>
                      <TableCell className={cx("bodyCell")} key={item.id}>
                        {item.name_customer}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.sex}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.CMND}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.birth}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
                        {item.age}
                      </TableCell>
                      <TableCell className={cx("bodyCell")}>
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
                  <TableCell className={cx("footCell")}>
                    Tổng giá tiền
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className={cx("footCell")}>
                    {" "}
                    {(detailOrder?.total_price ?? "").toLocaleString("vi-VN", {
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
                    {detailOrder?.payment?.length > 0
                      ? (
                          detailOrder.payment[lengthPayment - 1].amount_paid ?? ""
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
                    {detailOrder?.payment?.length > 0
                      ? (
                          detailOrder.payment[lengthPayment - 1].amount_unpaid ?? ""
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : (detailOrder?.total_price ?? "").toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Link
            to={`/booking/payment/${id}/idTour/${idTour}/date/${date?.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" style={{ margin: "10px 0px" }}>
              Thanh toán ngay
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default DetailOrderTour;
