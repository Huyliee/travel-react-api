import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import {  Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCreditCard,
  faHeadset,
  faMobile,
  faMoneyBill,
  faPlaneUp,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import CartLocation from "./CartLocation";
import WhyChooseBox from "./WhyChoose";
import Product from "./Product";
import ProductDisCount from "./ProductDiscount";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import axios from "axios";
import { getTour } from "~/GlobalFunction/Api";
import News from "./News";
import Banner from "./Banner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function HomePage() {
  const SlideElement = useRef(null);
  const productElement = useRef(null);
  const searchElement = useRef(null);
  const bannerElement = useRef(null);
  const locationElement = useRef(null);

  useEffect(()=>{
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(SlideElement.current, {x:100,opacity:0},{
        x: 0,
        opacity: 1,
        duration: 2
      });
      gsap.fromTo(searchElement.current,{opacity:0,x:-100},{opacity:1,x:0,duration:0.6,scrollTrigger: {
        trigger: searchElement.current,
        toggleActions: "play none none reverse",
      },})
      gsap.fromTo(bannerElement.current,{opacity:0,x:-100},{opacity:1,x:0,duration:0.6,scrollTrigger: {
        trigger: bannerElement.current,
        toggleActions: "play none none reverse",
      },})
      gsap.fromTo(locationElement.current,{opacity:0,x:-100},{opacity:1,x:0,duration:0.6,scrollTrigger: {
        trigger: locationElement.current,
        toggleActions: "play none none reverse",
      },})
  },[])
  // const [guest, setGuest] = useState("Guests");
  // const handleChange = (event) => {
  //   setGuest(event.target.value);
  // };
  // const [activeButton, setActiveButton] = useState(0);
  // const handleActive = (btnIndex) => {
  //   setActiveButton(btnIndex);
  // };
  //API Product
  const [products, setProduct] = useState([]);
  useEffect(() => {
    async function loadTour() {
      const data = await getTour();
      setProduct(data);
    }
    loadTour();
  }, []);

  //Slick Slider
  const settingsSlider = {
    dots: true,
    infinite: true,
    arrows:true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]    
  };
  //Setting Slider Banner
  const settingsBanner = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1210,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]    
  };

  const [idTour,setIdTour] = useState("");
  const handleIdTour = (id)=> ()=>{
    setIdTour(id);
  }
  console.log(idTour);

  return (
    <div className={cx("Home-main")}>
      <div className={cx("Home-container")}>
        {/* slide */}
        <div className={cx("silde-container")} ref={SlideElement}>
          <div className={cx("slide-content")}>
            <h1>Khám phá Mùa Hè độc đáo</h1>
            <p>
              Mùa hè đang đến, và trên khắp thế giới, những festival mùa hè đang
              chờ đón du khách bằng những trải nghiệm tuyệt vời
            </p>
            <Link to="/tour" style={{textDecoration:'none'}}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4f46e5",
                height: "48px",
                width: "186px",
                borderRadius: "9999px",
                "&:hover": {
                  backgroundColor: "#4338ca",
                },
                "& .MuiButton-label": {
                  borderRadius: "9999px",
                },
                marginTop: "40px",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Start your search
            </Button>
            </Link>
          </div>
          <div className={cx("slide-img")}>
            <div className={cx("slide-img-left")}>
              <img
                src="https://i.imgur.com/5BWOQwM.jpg"
                alt="img-left"
                className={cx("img-left")}
              />
              <img
                src="https://i.imgur.com/1336ESA.jpg"
                alt="img-left"
                className={cx("img-left")}
              />
            </div>
            <div className={cx("slide-img-right")}>
              <img
                src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="img-left"
                className={cx("img-right")}
              />
            </div>
          </div>
        </div>
        {/* Search container */}
        {/* Ưu đãi */}
        <div className={cx("location-container")} ref={bannerElement}>
          <div className={cx("location-heading-container")}>
            <h2>Ưu đãi</h2>
            <span>Những ưu đãi hấp dẫn đang chờ đón bạn</span>
          </div>
          <Slider {...settingsBanner}>
            <Banner img="https://media.travel.com.vn/Advertisings/bn__230510_.jpg"/>
            <Banner img="https://media.travel.com.vn/Advertisings/bn__230511_.jpg"/>
            <Banner img="https://media.travel.com.vn/Advertisings/bn_230403_TourHongKong_1024-768px.webp"/>
            <Banner img="https://th.bing.com/th/id/R.9689a50ce40f55f5eebb4dba8487c006?rik=NvZEQvvfsbjXsw&riu=http%3a%2f%2fhanoivietnamtourism.vn%2fwp-content%2fuploads%2f2019%2f06%2ftop-banner.jpg&ehk=bdGlfagQkipBQk1y%2f6t47WZpV7l3S1kbdN9279d2a8o%3d&risl=&pid=ImgRaw&r=0"/>
            <Banner img="https://i.imgur.com/R0woH44.jpg"/>
            <Banner img="https://i.imgur.com/mxZQmf7.jpg"/>
          </Slider>
        </div>
        {/* Location List */}
        <div className={cx("location-container")} ref={locationElement}>
          <div className={cx("location-heading-container")}>
            <h2>Địa điểm du lịch nổi bật</h2>
            <span>Các tour du lịch tại nhiều địa điểm nổi bật</span>
          </div>

            <Slider {...settingsSlider}>
            <CartLocation
              img="https://media.travel.com.vn/destination/tf_230203050956_597235.jpg"
              heading="Phú Quốc"
              decription="112 properties"
            />
            <CartLocation
              img="https://media.travel.com.vn/destination/tf_230209110612_090667.jpg"
              heading="Đà Nẵng"
              decription="112 properties"
            />
            <CartLocation
              img='https://media.travel.com.vn/destination/tf_220704050248_747884.jpg'
              heading="Hội An"
              decription="112 properties"
            />
            <CartLocation
              img='https://media.travel.com.vn/destination/tf_220616013254_229036.jpg'
              heading="Huế"
              decription="112 properties"
            />
            <CartLocation
              img="https://media.travel.com.vn/destination/tf_230222042713_821125.JPG"
              heading="Đà Lạt"
              decription="112 properties"
            />
                        <CartLocation
              img="https://media.travel.com.vn/destination/tf_230222042713_821125.JPG"
              heading="Đà Lạt"
              decription="112 properties"
            />
                        <CartLocation
              img="https://media.travel.com.vn/destination/tf_230222042713_821125.JPG"
              heading="Đà Lạt"
              decription="112 properties"
            />
                        <CartLocation
              img="https://media.travel.com.vn/destination/tf_230222042713_821125.JPG"
              heading="Đà Lạt"
              decription="112 properties"
            />
            </Slider>
        </div>
        {/* Why Choose */}
        <div className={cx("location-container")}>
          <div className={cx("location-heading-container")}>
            <h2>Tại sao lại lựa chọn chúng tôi?</h2>
            <span>Các tour du lịch tại nhiều địa điểm nổi bật</span>
          </div>
          <div className={cx("why-choose-container")}  ref={productElement}>
            <div className={cx("why-choose-img")}>
              <img src="https://i.imgur.com/igEP5Gj.jpg" alt="why choose" />
            </div>
            <div className={cx("why-choose-content-container")}>
              <WhyChooseBox
                icon={faPlaneUp}
                heading="Đặt tour"
                des="Dễ dàng & nhanh chóng chỉ với 3 bước"
              />
              <WhyChooseBox
                icon={faThumbsUp}
                heading="Sản phẩm & Dịch vụ"
                des="Đa dạng – Chất lượng – An toàn"
              />
              <WhyChooseBox
                icon={faMoneyBill}
                heading="Giá cả"
                des="Luôn có mức giá tốt nhất"
              />
              <WhyChooseBox
                icon={faHeadset}
                heading="Hỗ trợ"
                des="Hotline & trực tuyến (08h00 - 22h00)"
              />
              <WhyChooseBox
                icon={faCreditCard}
                heading="Thanh toán"
                des="An toàn & linh hoạt"
              />
              <WhyChooseBox
                icon={faMobile}
                heading="Mạng bán tour"
                des="Ứng dụng công nghệ mới nhất"
              />
            </div>
          </div>
        </div>
        {/* Product List v1*/}
        <div
          className={cx("location-container", "product-response")}
          style={{
            backgroundColor: "#f3f4f6",
            padding: "64px 48px",
            borderRadius: "40px",
            maxWidth: "1380px!important",
          }}
        >
          <div className={cx("location-heading-container")}>
            <h2>Các tour thịnh hành</h2>
            <span>
              Những tour du lịch thịnh hành mà chúng tôi đề xuất cho bạn
            </span>
          </div>
          <div className={cx("btn-location-product-container")}>
            {/* <div className={cx("btn-location-product-list")}>
              <ul className={cx("ul-location-product")}>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 0 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(0)}
                  >
                    Hà Nội
                  </button>
                </li>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 1 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(1)}
                  >
                    Huế
                  </button>
                </li>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 2 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(2)}
                  >
                    HCM
                  </button>
                </li>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 3 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(3)}
                  >
                    Hà Nội
                  </button>
                </li>
              </ul>
            </div> */}
            <div className={cx("btn-location-product-all-container")}>
              <Link to="/tour" style={{textDecoration:'none'}}>
              <button className={cx("btn-location-product-all")}>
                View all <FontAwesomeIcon icon={faArrowRight} />
              </button>
              </Link>
            </div>
          </div>
          <div className={cx("product-container")}>
            {products.slice(0, 8).map((product, index) => (
              <Product
                key={index}
                img={product.img_tour}
                name={product.name_tour}
                location={product.place_go}
                price={product.adult_price}
                id={product.id_tour}
                onClick={() => handleIdTour(product.id_tour)}
                ref={productElement}
              />
            ))};
          </div>
        </div>
        {/* Product List v2 */}
        <div
          className={cx("location-container", "product-response")}
          style={{
            backgroundColor: "#f3f4f6",
            padding: "64px 48px",
            borderRadius: "40px",
            maxWidth: "1380px!important",
          }}
        >
          <div className={cx("location-heading-container")}>
            <h2>Các tour ưu đãi</h2>
            <span>
              Những tour du lịch đang giảm giá chúng tôi đề xuất cho bạn
            </span>
          </div>
          <div className={cx("btn-location-product-container")}>
            {/* <div className={cx("btn-location-product-list")}>
              <ul className={cx("ul-location-product")}>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 0 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(0)}
                  >
                    Hà Nội
                  </button>
                </li>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 1 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(1)}
                  >
                    Huế
                  </button>
                </li>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 2 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(2)}
                  >
                    HCM
                  </button>
                </li>
                <li className={cx("li-location-product")}>
                  <button
                    className={cx(
                      "btn-location-product",
                      `${activeButton === 3 ? "active" : ""}`
                    )}
                    onClick={() => handleActive(3)}
                  >
                    Phú Quốc
                  </button>
                </li>
              </ul>
            </div> */}
            <div className={cx("btn-location-product-all-container")}>
            <Link to="/tour" style={{textDecoration:'none'}}>
              <button className={cx("btn-location-product-all")}>
                View all <FontAwesomeIcon icon={faArrowRight} />
              </button>
              </Link>
            </div>
          </div>
          <div className={cx("product-container")}>
            {products.slice(0, 8).map((product, index) => (
              <ProductDisCount
                key={index}
                img={product.img_tour}
                name={product.name_tour}
                location="Phú quốc"
                price={product.adult_price}
                id={product.id_tour}
              />
            ))}
          </div>
        </div>
        <div className={cx("location-container")} style={{marginBottom:"20px"}}>
          <div className={cx("location-heading-container")}>
            <h2>Tin tức du lịch</h2>
            <span>Các tour du lịch tại nhiều địa điểm nổi bật</span>
          </div>
          {/* <div className={cx("video-full-container")}>
              <PlyrComponent />
          </div>
          <div className={cx("list-video-container")}>
              
          </div> */}
          <div className={cx("news-container")}>
            <div className={cx("news-left-container")}>
              <News
                width="650px"
                height="500px"
                font="30px"
                title="VinWonders tưng bừng khởi động lễ hội hè Wonder Summer 2023"
                background="https://cdn.24h.com.vn/upload/2-2023/images/2023-05-09/vw_wonder-summer_tcbc_a3--1683595932-589-width1000height666.jpg"
              />
            </div>
            <div className={cx("news-right-container")}>
              <News
                width="650px"
                height="245px"
                font="22px"
                title="Nghỉ lễ siêu sang săn ngàn ưu đãi khủng từ Vinpearl"
                background="https://cdn.24h.com.vn/upload/2-2023/images/2023-04-24/vp_flash-sale_pr1_a4-1682303275-205-width1000height665.jpg"
              />
              <div className={cx("news-right-bottom")}>
                <News
                  width="280px"
                  height="245px"
                  font="22px"
                  title="Những công trình đẹp siêu thực tại Sun World Ba Na Hills"
                  background="https://cdn.24h.com.vn/upload/2-2023/images/2023-05-19/3-1684478989-763-width1000height613.jpg"
                />
                <News
                width="280px"
                height="245px"
                font="22px"
                title="Du khách thích thú ngắm thung lũng hoa hồng dịp lễ 30/4 tại Fansipan"
                background="https://cdn.24h.com.vn/upload/2-2023/images/2023-04-30/3-1682842149-488-width1000height666.jpg"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
