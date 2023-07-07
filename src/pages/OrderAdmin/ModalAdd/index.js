import {
  Container,
  Box,
  Modal,
  Typography,
  TextField,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "~/pages/OrderAdmin/OrderAdmin.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { detailTourApi, getTour } from "~/GlobalFunction/Api";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";

const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

function ModalAdd({ open, handleClose , order , customer}) {
  const id_customer = localStorage.getItem('id_customer');
  const [dataTour, setDataTour] = useState({});
  const [valueTour, setValueTour] = useState(null);
  const [date, setDate] = useState({});
  const [valueDate, setValueDate] = useState({});
  const [isDateDisabled, setIsDateDisabled] = useState(true);
  const [adultFormCount, setAdultFormCount] = useState(1);
  const [childFormCount, setChildFormCount] = useState(1);
  const [adultFormData, setAdultFormData] = useState([]);
  const [childFormData, setChildFormData] = useState([]);
  const [detail, setDetail] = useState({
    adultInfo: [],
    childInfo: [],
  });
  const [formData, setFormData] = useState({
    name:  '',
    email:  '',
    phone:  '',
    address:  '',
  });
  useEffect(() => {
    if (order) {
      setFormData({
        name: order.name || "",
        email: order.email || "",
        phone: order.phone || "",
        address: order.address || "",
      });
    }
    if(customer)
    {
      setDetail({
        adultInfo: customer.adultInfo || [],
        childInfo: customer.childInfo || [],
      })
    }
  }, [order,customer]);
  console.log(formData);
  console.log(order);
  console.log(customer);
  console.log(detail);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log(formData);
    //Thêm dữ liệu vào mảng adultInfo khi nhập từ input của người lớn
    const handleAdultCustomerInfoChange = (info) => {
      const updatedInfo = info.map((customer) => ({
        ...customer,
        age: 'Người lớn',
      }));
      setDetail((prevInfo) => ({
        ...prevInfo,
        adultInfo: updatedInfo,
      }));
    };
  
    //Thêm dữ liệu vào mảng childInfo khi nhập từ input của trẻ em
    const handleChildCustomerInfoChange = (info) => {
      const updatedInfo = info.map((customer) => ({
        ...customer,
        age: 'Trẻ em',
      }));
      setDetail((prevInfo) => ({
        ...prevInfo,
        childInfo: updatedInfo,
      }));
    };
  
  //Load dữ liệu tất cả tour
  useEffect(() => {
    async function loadTour() {
      const data = await getTour();
      setDataTour(data);
    }
    loadTour();
  }, []);

  //Lấy kết quả được chọn
  const handleOnChange = (e, newValue) => {
    if (newValue) {
      setValueTour(newValue);
      setIsDateDisabled(false);
    } else {
      setValueTour(null);
      setValueDate(null);
      setIsDateDisabled(true);
    }
  };
  const handleOnChangeDate = (e, newValue) => {
    setValueDate(newValue);
  };
  //Lấy ngày khởi hành sau khi chọn tour
  useEffect(() => {
    async function detailData() {
      if (valueTour) {
        const data = await detailTourApi(valueTour.id_tour);
        setDate(data.date_go);
      }
    }
    detailData();
  }, [valueTour]);
  ///Xử lý tăng giảm số lượng form trẻ em và người lớn
  const handleIncreaseAdult = () => {
    setAdultFormCount(adultFormCount + 1);
  };
  const handleDecreaseAdult = () => {
    if (adultFormCount > 0) {
      setAdultFormCount(adultFormCount - 1);
    }
  };
  const handleIncreaseChild = () => {
    setChildFormCount(childFormCount + 1);
  };
  const handleDecreaseChild = () => {
    if (childFormCount > 0) {
      setChildFormCount(childFormCount - 1);
    }
  };
  //xứ lý nhập liệu
  const handleAdultFormChange = (index, field, value) => {
    const updatedData = [...adultFormData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setAdultFormData(updatedData);
    handleAdultCustomerInfoChange(updatedData)
  };

  const handleChildFormChange = (index, field, value) => {
    const updatedData = [...childFormData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setChildFormData(updatedData);
    handleChildCustomerInfoChange(updatedData)
  };
  // Xử lý thêm đơn đặt tour
  const handleCheckout = async (e) => {
    e.preventDefault();
    const idTour = valueTour.id_tour;
    const id_date = valueDate.id;
    const { name, email, phone, address } = formData;
    await axios
      .post(`https://travel2h.click/public_html/api/tour/checkout/${idTour}`, {
        name, 
        email,
        phone,
        address,
        id_customer,
        id_date,
        detail,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const [detailOrder, setDetailOrder] = useState({});
  // const [listCustomer, setListCustomer] = useState([]);
  // useEffect(() => {
  //   async function detailData() {
  //     const data = await getDetailOrder(idBooking);
  //     setDetailOrder(data);
  //     setListCustomer(data.detail_order);
  //   }
  //   detailData();
  // }, [idBooking]);
  // console.log(detailOrder);
  // console.log(listCustomer);
  const renderAdultForms = () => {
    const adultForms = [];
    for (let i = 0; i < adultFormCount; i++) {
      adultForms.push(
        <form key={i}>
          <TextField
            label={`Họ tên người lớn ${i + 1}`}
            variant="outlined"
            className={cx("field-customer")}
            onChange={(event) =>
              handleAdultFormChange(i, "name_customer", event.target.value)
            }
          />
          <FormControl className={cx("field-customer")}>
            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={adultFormData[i]?.gender || ""}
              onChange={(event) =>
                handleAdultFormChange(i, "gender", event.target.value)
              }
              label="Age"
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              placeholder="dd/mm/yyyy"
              sx={{
                width: 160,
                ".MuiInputBase-input": { height: 15, fontSize: 13 },
              }}
              className={cx("field-customer")}
              onChange={(newValue) => {
                const dateString = dayjs(newValue).format("YYYY-MM-DD");
                handleAdultFormChange(i, "date", dateString)
              }}
              renderInput={(params) => <TextField {...params} value={adultFormData[i]?.date || ""}/>} // thêm đoạn này
            />
          </LocalizationProvider>
          <TextField
            label={`CMND người lớn ${i + 1}`}
            variant="outlined"
            className={cx("field-customer")}
            onChange={(event) =>
              handleAdultFormChange(i, "CMND", event.target.value)
            }
          />
        </form>
      );
    }
    return adultForms;
  };

  const renderChildForms = () => {
    const childForms = [];
    for (let i = 0; i < childFormCount; i++) {
      childForms.push(
        <form key={i}>
          <TextField
            label={`Thông tin trẻ em ${i + 1}`}
            variant="outlined"
            className={cx("field-customer")}
            onChange={(event) =>
              handleChildFormChange(i, "name_customer", event.target.value)
            }
          />
          <FormControl className={cx("field-customer")}>
            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={childFormData[i]?.gender || ""}
              onChange={(event) =>
                handleChildFormChange(i, "gender", event.target.value)
              }
              label="Age"
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              placeholder="dd/mm/yyyy"
              sx={{
                width: 160,
                ".MuiInputBase-input": { height: 15, fontSize: 13 },
              }}
              className={cx("field-customer")}
              onChange={(newValue) => {
                const dateString = dayjs(newValue).format("YYYY-MM-DD");
                handleChildFormChange(i, "date", dateString)
              }}
              renderInput={(params) => <TextField {...params} value={childFormData[i]?.date || ""}/>}
            />
          </LocalizationProvider>
          <TextField
            label={`Thông tin trẻ em ${i + 1}`}
            variant="outlined"
            className={cx("field-customer")}
            onChange={(event) =>
              handleChildFormChange(i, "CMND", event.target.value)
            }
          />
        </form>
      );
    }
    return childForms;
  };
  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Thêm đơn đặt tour</Typography>
          <Box className={cx("modal-body")}>
            <Box className={cx("col-left")}>
              <h4 className={cx("heading")}>Thông tin liên hệ</h4>
              <Box className={cx("info-contact-container")}>
                <div className={cx("field-container")}>
                  <label className={cx("field-label")}>Họ và tên:</label>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    className={cx("field-text")}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={cx("field-container")}>
                  <label className={cx("field-label")}>Email:</label>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    className={cx("field-text")}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={cx("field-container")}>
                  <label className={cx("field-label")}>Số điện thoại:</label>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    className={cx("field-text")}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={cx("field-container")}>
                  <label className={cx("field-label")}>Địa chỉ:</label>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    className={cx("field-text")}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </Box>
              <h4 className={cx("heading")}>Tour du lịch</h4>
              <Box className={cx("tour-container")}>
                <Autocomplete
                  value={valueTour}
                  options={dataTour}
                  getOptionLabel={(option) => option.name_tour || ""}
                  onChange={handleOnChange}
                  sx={{ width: "480px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chọn tour du lịch"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  value={valueDate}
                  options={date}
                  getOptionLabel={(option) => option.date || ""}
                  onChange={handleOnChangeDate}
                  sx={{ width: "180px" }}
                  disabled={isDateDisabled}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chọn ngày khởi hành"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <form onSubmit={handleCheckout} encType="multipart/form-data">
              <Button type="submit">Thêm</Button>
              </form>
            </Box>
            <Box className={cx("col-right")}>
              <h4 className={cx("heading")}>Thông tin từng khách hàng</h4>
              <div className={cx("info-customer")}>
                <h4>Thông tin người lớn</h4>
                <div className={cx("button-quantity-container")}>
                  <Button
                    variant="contained"
                    onClick={handleIncreaseAdult}
                    className={cx("button-quantity")}
                  >
                    Tăng
                  </Button>
                  {adultFormCount}
                  <Button
                    variant="contained"
                    onClick={handleDecreaseAdult}
                    className={cx("button-quantity")}
                  >
                    Giảm
                  </Button>
                </div>
                {renderAdultForms()}

                <h4>Thông tin trẻ em</h4>
                <div className={cx("button-quantity-container")}>
                  <Button
                    variant="contained"
                    onClick={handleIncreaseChild}
                    className={cx("button-quantity")}
                  >
                    Tăng
                  </Button>
                  {childFormCount}
                  <Button
                    variant="contained"
                    onClick={handleDecreaseChild}
                    className={cx("button-quantity")}
                  >
                    Giảm
                  </Button>
                </div>
                {renderChildForms()}
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default ModalAdd;
