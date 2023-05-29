import { detailTourApi } from "~/GlobalFunction/Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailTour.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Container } from "@mui/material";

const cx = classNames.bind(styles);

function DetailTour() {
  const { id } = useParams();
  const [detailTour, setDetailTour] = useState({});
  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(id);
      setDetailTour(data);
    }
    detailData();
  }, [id]);
  console.log(detailTour);

  return (
    <div className={cx("detail-container")}>
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <div className={cx("detail-infomation-container")}>
          <div className={cx("detail-infomation-col-1")}>
            <div className={cx("detail-id")}>
              <FontAwesomeIcon icon={faTicket} />
              <span>{detailTour.id_tour}</span>
            </div>
            <h1 className={cx("detail-name-tour")}>{detailTour.name_tour}</h1>
            <div className={cx("detail-rating")}>
              <div className={cx("number-rating")}>
                <span>9</span>
                <div className={cx("comment-rating")}>
                  <p>Tuyệt vời</p>
                  <p>200 quan tâm</p>
                </div>
              </div>
              <div className={cx("heart-rating")}>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ fontSize: "22px", color: "#fd5056" }}
                />
                <label>126</label>
              </div>
            </div>
          </div>
          <div className={cx("detail-infomation-col-2")}>
            <div className={cx("detail-col-pirce")}>
              <span>{detailTour.adult_price}đ</span> / khách
            </div>
            <div className={cx("detail-col-pirce")}>
              <Button
                variant="contained"
                style={{
                  width: "192px",
                  height: "50px",
                  background:
                    "linear-gradient(64.4deg,#fd5056 21.33%,#fe2214 67.61%)",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginRight: "10px" }}
                />{" "}
                Đặt tour
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default DetailTour;
