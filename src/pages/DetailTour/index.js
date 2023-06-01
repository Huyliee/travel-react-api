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
import {
  Button,
  Container,
  ImageListItem,
  ImageList,
  Box,
} from "@mui/material";
import Itinerary from "./Itinerary";
import axios from "axios";

const cx = classNames.bind(styles);

function DetailTour() {
  const { id } = useParams();
  const [detailTour, setDetailTour] = useState({});
  const [weather, setWeather] = useState({});
  const API_KEY_WEATHER = "cd80aaec45724113a6c125437230106";
  //Api thời tiết
  useEffect(() => {
    async function getWeather() {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=Da Lat`
        );
        setWeather(response?.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getWeather();
  }, []);
  console.log(weather);
  //Load api của chi tiết tour
  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(id);
      setDetailTour(data);
    }
    detailData();
  }, [id]);
  //List Image của MUI
  function modifyImages(images) {
    return images.map((image, index) => {
      if (index === 0) {
        return {
          ...image,
          rows: 2,
          cols: 2,
        };
      }
      if (index === 3) {
        return {
          ...image,
          cols: 2,
        };
      }
      return image;
    });
  }
  //Chuyển lên đầu trang khi bấm vào 1 sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              {/* Hiển thị api thời tiết */}
              <div className={cx("weather-container")}>
                <img src={weather?.current?.condition?.icon} alt="Weather" />
                <p>
                  {" "}
                  {weather?.location?.name} - {weather?.current?.temp_c} ° C -{" "}
                  {weather?.current?.temp_f} ° F
                </p>
              </div>
              {/* /-----------------------------/ */}
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
      {/* Hiển thị List Image của MUI */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <ImageList cols={4} rowHeight={300} style={{ overflow: "hidden" }}>
          {detailTour.images &&
            Array.isArray(detailTour.images) &&
            modifyImages(detailTour.images).map((image) => (
              <ImageListItem key={image.id} cols={image.cols} rows={image.rows}>
                <img
                  src={image.url}
                  alt=""
                  style={{
                    height: "auto",
                    objectFit: "fill",
                    borderRadius: "10px",
                    padding: "1px",
                  }}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Container>
      {/* /---------------------------/ */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <h2 className={cx("content-tour-heading")}>Điểm nhấn</h2>
        <Box>
          <p className={cx("content-tour-text")}>{detailTour.content_tour}</p>
        </Box>
      </Container>
      {/* Lịch trình */}
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <h2 className={cx("content-tour-heading")}>Lịch trình</h2>
        <Box>
          <Itinerary />
        </Box>
      </Container>
      {/* /---------------------/ */}
    </div>
  );
}

export default DetailTour;
