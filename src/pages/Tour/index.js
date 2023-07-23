import styles from "./Tour.module.scss";
import classNames from "classnames/bind";
import Filter from "./Filter";
import ProductList from "./Product";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import ProductLoading from "./Product/ProductLoading";
import { paginationApi, searchApi } from "~/GlobalFunction/Api";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function Tour() {
  // const [products, setProduct] = useState([]);
  const [name_tour, setNameTour] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idLocation = queryParams.get("nameTour");

  const handleInput = (e) => {
    setNameTour(e.target.value);
  };
  const handleSliderChange = (event, newValue) => {
    setPriceValue(newValue);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShouldSearch(true);
    } else {
      setShouldSearch(false);
    }
  };
  const [tours, setTours] = useState([]);
  useEffect(() => {
    // Chỉ gọi fetchData khi isLoaded là true (tức là đã tải xong dữ liệu)
    if (isLoaded) {
      const fetchData = async () => {
        const result = await paginationApi(currentPage);
        setTours(result.data);
        setTotalPages(result.last_page);
        setLoading(true); // Bạn cũng có thể set loading thành true tại đây để ẩn loading indicator
      };
      fetchData();
    }
  }, [isLoaded, currentPage]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      setLoading(true); // Sau khi 3 giây, set isLoaded thành true để cho phép gọi useEffect lấy dữ liệu
    }, 3000);
  }, []);
  console.log(tours);
  useEffect(() => {
    async function Search() {
      const id_location = selectedValue || idLocation;
      const res = await searchApi(name_tour, priceValue, id_location);
      setTotalPages(res?.tours.last_page)
      setTours(res?.tours.data);
    }
    Search();
  }, [shouldSearch, name_tour, priceValue, idLocation, selectedValue]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 3000);
  // }, []);
  console.log(totalPages);
  return (
    <div className={cx("tour-container")}>
      <form className={cx("tour-main")}>
        <div className={cx("filter-container")}>
          <Filter
            handleInput={handleInput}
            nameTour={name_tour}
            handleKeyPress={handleKeyPress}
            priceTour={priceValue}
            handleSliderChange={handleSliderChange}
            handleSelect={handleChange}
            selectValue={selectedValue}
            setNameTour={setNameTour}
          />
        </div>
        <div className={cx("product-container")}>
          <div className={cx("title-container")}>
            <span>
              <h1>Các tour du lịch</h1>
            </span>
          </div>
          <div className={cx("list-tour-container")}>
            {loading &&
              tours.map((product, index) => (
                <ProductList
                  key={index}
                  img={product.img_tour}
                  name={product.name_tour}
                  location="Phú quốc"
                  price={product.adult_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  des={product.content_tour}
                  id={product.id_tour}
                />
              ))}
            {!loading && tours.map(() => <ProductLoading />)}
            {totalPages > 1 && loading && (
              <Pagination
                count={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                color="primary"
                onChange={(e, page) => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Tour;
