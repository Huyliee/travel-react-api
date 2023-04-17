import styles from "./Tour.module.scss";
import classNames from "classnames/bind";
import Filter from "./Filter";
import ProductList from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Tour() {
  // const [products, setProduct] = useState([]);
  const [nameTour, setNameTour] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const handleInput = (e)=>{
    setNameTour(e.target.value)
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShouldSearch(true);
    } else {
      setShouldSearch(false);
    }
  };
  const [tours,setTours] = useState([]);
    const handleSearch = useEffect(()=>{
      axios
        .get(`https://lav2.cf/api/search?name=${nameTour}`)
        .then((res) => {
          setTours(res.data.tours);
        })
        .catch((err) => {
          console.log(err);
        });
      
    },[shouldSearch,nameTour])
    console.log(tours);
  return (
    <div className={cx("tour-container")}>
      <form className={cx("tour-main")}>
        <div className={cx("filter-container")}>
          <Filter handleInput={handleInput} nameTour={nameTour} handleSearch={handleSearch} handleKeyPress={handleKeyPress} />
        </div>
        <div className={cx("product-container")}>
          <span>
            <h1>Các tour du lịch</h1>
          </span>
          <div className={cx("list-tour-container")}>
            {tours.map((product, index) => (
              <ProductList
                key={index}
                img={product.img_tour}
                name={product.name_tour}
                location="Phú quốc"
                price={product.adult_price}
                des={product.content_tour}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Tour;
