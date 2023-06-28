import { useEffect, useState } from "react";
import styles from "./OrderAdmin.module.scss";
import classNames from "classnames/bind";
import { getOrderTour } from "~/GlobalFunction/Api";
import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function OrderAdmin() {
  const [order, setOrder] = useState({});

  //API Order
  useEffect(() => {
    async function loadTour() {
      const data = await getOrderTour();
      setOrder(data);
    }
    loadTour();
  }, []);
  console.log(order);
  // Dữ liệu cột
  const columns = [
    {
      field: "delete",
      headerName: "Xóa",
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleDelete(params.row.id_order_tour);
          }}
        >
          Xóa
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Sửa",
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            // handleUpdate(params.row.id_tour);
            // handleInputUpdate();
            // handleOpen();
          }}
        >
          Sửa
        </Button>
      ),
    },
    { field: "id_order_tour", headerName: "ID", width: 150 },
    { field: "order_time", headerName: "Thời gian đặt", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "name", headerName: "Tên người đặt", width: 150 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) =>
        params.value === "Yes" ? (
          <Chip label="Đã xác nhận" color="success" sx={{fontSize:'12px'}} />
        ) : (
          <Chip label="Chưa xác nhận" color="error" sx={{fontSize:'12px'}}/>
        ),
    },
    { field: "address", headerName: "Địa chỉ", width: 150 },
  ];
  /// Xử lý mở modal thêm
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //style modal 
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };
  // xử lý xóa 
  const handleDelete = (id)=>{
    axios
    .delete(`https://travel2h.click/public_html/api/order/delete/${id}`)
    .then(() => {
      // xóa thành công, cập nhật lại danh sách tour

      const updatedOrder = order.filter((t) => t.id_order_tour !== id);
      setOrder(updatedOrder);
      toast.success("Đơn đặt tour đã được xóa thành công.");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Không thể xóa đơn đặt vì tồn tại chi tiết hóa đơn");
    });
  }
  return (
    <div
      style={{
        height: 1000,
        width: "1120px",
        display: "flex",
        flexDirection: "column",
        margin: "50px auto",
      }}
    >
      <div className={cx("heading-container")}>
        <h1 style={{ margin: "40px 0px 40px 20px" }}>Quản lý đơn đặt tour</h1>
        <img src="https://i.imgur.com/BNBtVP9.png" alt="" />
      </div>
      {/* Modal thêm */}
      <div>
        <Button
          variant="contained"
          sx={{ marginBottom: "10px" }}
          onClick={handleOpen}
        >
          Thêm đơn đặt tour
        </Button>
        {/* Modal thêm  */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "26px" }}
            >
              {/* {inputUpdate ? "Sửa" : "Thêm"} tour */}
            </Typography>
            <form
              className={cx("store-input-container")}
              // onSubmit={handleSubmit}
              enctype="multipart/form-data"
            >
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Mã tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Mã tour"
                    id="outlined-size-normal"
                    // value={id_order}
                    // onChange={(e) => setIdTour(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tên tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Tên tour"
                    id="outlined-size-normal"
                    // value={name_tour}
                    // onChange={(e) => setNameTour(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ngày đi: </label>
                </div>
                <div className={cx("input-container")}>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      placeholder="dd/mm/yyyy"
                      sx={{
                        width: 210,
                        ".MuiInputBase-input": { height: 3, fontSize: 12 },
                      }}
                      onChange={(newValue) => {
                        // const dateString = dayjs(newValue).format("DD/MM/YYYY");
                        // setDateBack(dateString);
                      }}
                      // renderInput={(params) => (
                      //   <TextField {...params} value={date_back} />
                      // )} // thêm đoạn này
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Nội dung tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Nội dung tour"
                    id="outlined-size-normal"
                    // value={content_tour}
                    // onChange={(e) => setContentTour(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Nơi khởi hành: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Nơi khởi hành"
                    id="outlined-size-normal"
                    // value={place_go}
                    // onChange={(e) => setPlaceGo(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Giá trẻ em: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Giá trẻ em"
                    id="outlined-size-normal"
                    // value={child_price}
                    // onChange={(e) => setChildPrice(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Giá người lớn: </label>
                </div>
                <div className={cx("input-container")}>
                  <TextField
                    label="Giá người lớn"
                    id="outlined-size-normal"
                    // value={adult_price}
                    // onChange={(e) => setAdultPrice(e.target.value)}
                    sx={{width:'215px'}}
                  />
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Ảnh tour: </label>
                </div>
                <div className={cx("input-container")}>
                  <Button sx={{ width: "210px" }} component="label">
                    <input
                      type="file"
                      accept="image/*"
                      // onChange={(e) => setImgTour(e.target.files[0])}
                      // ref={fileInputRef}
                    />
                  </Button>
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tour giảm giá: </label>
                </div>
                <div className={cx("input-container")}>
                  {/* <Switch
                    checked={best_seller === 1}
                    defaultChecked={best_seller === 1 ? true : undefined}
                    onChange={(e) => setBestSeller(e.target.checked ? 1 : 0)}
                  /> */}
                </div>
              </div>
              <div className={cx("store-input")}>
                <div className={cx("label-container")}>
                  <label>Tour hot: </label>
                </div>
                <div className={cx("input-container")}>
                  {/* <Switch
                    checked={hot_tour === 1}
                    defaultChecked={hot_tour === 1 ? true : undefined}
                    onChange={(e) => setHotTour(e.target.checked ? 1 : 0)}
                  /> */}
                </div>
              </div>
              <Button
                variant="contained"
                sx={{ marginTop: "10px" }}
                type="submit"
              >
                {/* {inputUpdate ? "Sửa" : "Thêm"} tour */}
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      <DataGrid
        rows={order}
        columns={columns}
        getRowId={(row) => row.id_order_tour}
        autoHeight
        rowHeight={150}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          "& .MuiDataGrid-colCell": {
            fontSize: "14px",
          },
          "& .MuiDataGrid-cell, & .MuiDataGrid-colCellTitle, ": {
            fontSize: "14px",
          },
          "& .MuiButtonBase-root": {
            fontSize: "14px",
          },
          "& .MuiInputBase-root": {
            fontSize: "14px",
            padding: "8px",
            border: "1px solid #d5d5d5",
            borderRadius: "10px",
            width: "300px",
            margin: "5px 10px",
          },
          // "& .MuiInputBase-root:after": {
          //     borderBottom:'none'
          // },
        }}
      />
    </div>
  );
}

export default OrderAdmin;
