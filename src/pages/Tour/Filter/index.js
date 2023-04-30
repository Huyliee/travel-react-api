import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import styles from "./Filter.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Filter({handleInput,nameTour,handleKeyPress}) {
  const [value, setValue] = useState([0, 100]);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className={cx("titile-container")}>
        <span className={cx("title-filter")}>Lọc kết quả</span>
      </div>
      <div className={cx("filter-main")}>
        <div className={cx("tour-filter")}>
          <span>Tìm theo tên</span>
          <TextField
            id="outlined-basic"
            label="Nhập tên"
            variant="outlined"
            sx={{ width: 290 }}
            onKeyPress={handleKeyPress}
            value={nameTour}
            onChange={handleInput}
          />
        </div>
        <div className={cx("tour-filter")}>
          <span>Loại hình du lịch</span>
          <FormControl sx={{ minWidth: 290 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Loại hình
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" label="Loại hình">
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="Tour trọn gói">Tour trọn gói</MenuItem>
              <MenuItem value="Tour gia đình">Tour gia đình</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={cx("tour-filter")}>
          <span>Địa điểm du lịch</span>
          <FormControl sx={{  minWidth: 290 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Địa điểm
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" label="Loại hình">
              <MenuItem value="Tất cả">Tất cả</MenuItem>
              <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
              <MenuItem value="Hà Nội">Hà Nội</MenuItem>
              <MenuItem value="Phú Quốc">Phú Quốc</MenuItem>
              <MenuItem value="Đà Lạt">Đà Lạt</MenuItem>
              <MenuItem value="Vũng Tàu">Vũng Tàu</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={cx("tour-filter")}>
          <span>Ngày đi</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              placeholder="dd/mm/yyyy"
              sx={{
                width: 290,
                ".MuiInputBase-input": { height: 3, fontSize: 12 },
              }}
            />
          </LocalizationProvider>
        </div>
        <div className={cx("tour-filter")}>
          <span>Số người</span>
          <FormControl sx={{  minWidth: 290 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Số người
            </InputLabel>
            <Select labelId="demo-simple-select-helper-label" label="Số người">
              <MenuItem value="1 Người">1 Người</MenuItem>
              <MenuItem value="2 Người">2 Người</MenuItem>
              <MenuItem value="3-5 Người">3-5 Người</MenuItem>
              <MenuItem value="5+ Người">5+ Người</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={cx("tour-filter")}>
          <span>Ngân sách của quý khách</span>
          <Box sx={{ width: 290 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              //  getAriaValueText={valuetext}
            />
          </Box>
        </div>
        <div className={cx("tour-filter")}>
          <span>Hiển thị những chuyến đi có</span>
          <FormControl sx={{ width: 290 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Khuyến mãi"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Còn chỗ"
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default Filter;
