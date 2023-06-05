import styles from "./Quantity.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TextField } from "@mui/material";
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const cx = classNames.bind(styles);

function Quantity({ title, subtitle }) {
  const [quantityAdult, setQuantityAdult] = useState(1);
  const [customers, setCustomer] = useState([
    {
      name: "",
      age: "",
    },
  ]);

  const handleAddQuantity = () => {
    setQuantityAdult(quantityAdult + 1);
    setCustomer([...customers, { name: "", age: "" }]);
  };

  const handleMinusQuantity = () => {
    if (quantityAdult >= 1) {
      setQuantityAdult(quantityAdult - 1);
    }
    setCustomer(customers.slice(0, quantityAdult - 1));
  };

  const handleCustomerInfoChange = (index, field, value) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index][field] = value;
    setCustomer(updatedCustomers);
  };
  console.log(customers);
  return (
    <div>
      <div className={cx("quantity-customer-box")}>
        <div className={cx("quantity-customer-title")}>
          <h4>{title}</h4>
          <p>{subtitle} tuổi</p>
        </div>
        <div className={cx("quantity-customer-number")}>
          <span>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={cx("btn-quantity")}
              onClick={handleAddQuantity}
            />
          </span>
          <span className={cx("number-quantity")}>{quantityAdult}</span>
          <span>
            <FontAwesomeIcon
              icon={faCircleMinus}
              className={cx("btn-quantity")}
              onClick={handleMinusQuantity}
            />
          </span>
        </div>
      </div>
      <div className={cx("customer-container")}>
        <div className={cx("heading-form")}> 
            <span>Họ và tên</span>
            <span>Giới tính</span>
            <span>Ngày sinh</span>
        </div>
        {customers.map((customer, index) => (
          <div key={index} className={cx("customer-form")}>
            <TextField
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
              value={customer.name}
              onChange={(e) =>
                handleCustomerInfoChange(index, "name", e.target.value)
              }
              className={cx("input-info")}
            />
            <TextField
              id="outlined-basic"
              label="Tuổi"
              variant="outlined"
              value={customer.age}
              onChange={(e) =>
                handleCustomerInfoChange(index, "age", e.target.value)
              }
              className={cx("input-info")}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    placeholder="dd/mm/yyyy"
                    sx={{
                      width: 220,
                      ".MuiInputBase-input": { height: 15, fontSize: 16 },
                    }}
                  />
            </LocalizationProvider>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quantity;
