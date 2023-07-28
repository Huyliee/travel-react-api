import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import Annyang from "annyang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { beepSound } from "~/pages/Tour/Filter/sound/beep";

const cx = classNames.bind(styles);

function Filter({
  handleInput,
  nameTour,
  handleKeyPress,
  priceTour,
  handleSliderChange,
  handleSelect,
  selectValue,
  setNameTour,
}) {
  const [isListening, setIsListening] = useState(false);
  const audioRef = useRef();
  const handleSpeechRecognition = () => {
    if (isListening) {
      // Dừng nhận dạng giọng nói và xóa callback khi kết thúc
      Annyang.abort();
      Annyang.removeCallback("result", resultCallback);
      setIsListening(false);

      // Kiểm tra nếu audio đang phát, thì dừng nó trước khi chơi âm thanh khi thu xong
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Đặt thời gian trở về 0 để chuẩn bị cho lần phát tiếp theo
      }

      // Chơi âm thanh khi thu xong
      audioRef.current.src = beepSound;
      audioRef.current.play();
    } else {
      Annyang.setLanguage("vi-VN"); // Thiết lập ngôn ngữ tiếng Việt

      // Đăng ký callback cho sự kiện result
      Annyang.addCallback("result", resultCallback);

      // Chơi âm thanh khi bắt đầu thu
      audioRef.current.src = beepSound;
      audioRef.current.play();

      // Bắt đầu nhận dạng giọng nói
      Annyang.start({ autoRestart: false, continuous: false });

      setIsListening(true);
    }
  };

  const resultCallback = (phrases) => {
    let searchQuery = phrases[0].trim(); // Loại bỏ khoảng trắng dư thừa
    if (searchQuery.endsWith(".")) {
      searchQuery = searchQuery.slice(0, -1); // Loại bỏ dấu chấm cuối cùng
    }
    setNameTour(searchQuery);

    // Dừng nhận dạng giọng nói và xóa callback khi kết thúc
    Annyang.abort();
    Annyang.removeCallback("result", resultCallback);
    setIsListening(false);

    // Kiểm tra nếu audio đang phát, thì dừng nó trước khi chơi âm thanh khi thu xong
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Đặt thời gian trở về 0 để chuẩn bị cho lần phát tiếp theo
    }

    // Chơi âm thanh khi thu xong
    audioRef.current.src = beepSound;
    audioRef.current.play();
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1000000,
      label: "1Tr",
    },
    {
      value: 3000000,
      label: "3Tr",
    },
    {
      value: 5000000,
      label: "5Tr",
    },
    {
      value: 7000000,
      label: "7Tr",
    },
    {
      value: 10000000,
      label: "10Tr",
    },
  ];

  return (
    <div>
      <div className={cx("titile-container")}>
        <span className={cx("title-filter")}>Lọc kết quả</span>
      </div>
      <div className={cx("filter-main")}>
        <div className={cx("tour-filter")}>
          <span>Tìm theo tên</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="outlined-basic"
              label="Nhập tên"
              variant="outlined"
              sx={{ width: 280 }}
              onKeyPress={handleKeyPress}
              value={nameTour}
              onChange={handleInput}
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              onClick={handleSpeechRecognition}
              cursor="pointer"
              style={{
                fontSize: "24px",
                marginLeft: "10px",
                color: isListening ? "red" : "blue",
              }}
            />
          </div>
        </div>

        <div className={cx("tour-filter")}>
          <span>Địa điểm du lịch</span>
          <FormControl sx={{ minWidth: 290 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Địa điểm
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              label="Loại hình"
              onChange={handleSelect}
              value={selectValue}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="bg">Hồ Chí Minh</MenuItem>
              <MenuItem value="hn">Hà Nội</MenuItem>
              <MenuItem value="pq">Phú Quốc</MenuItem>
              <MenuItem value="dl">Đà Lạt</MenuItem>
              <MenuItem value="vt">Vũng Tàu</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={cx("tour-filter")}>
          <span>Ngân sách của quý khách</span>
          <Box sx={{ width: 290 }}>
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              value={priceTour}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              max={10000000}
              step={1000000}
              disableSwap
              marks={marks}
              sx={{
                color: "#ffbf44",
                "& .MuiSlider-thumb": {
                  color: "#fff",
                  width: "15px",
                  height: "15px",
                },

                "& .MuiSlider-rail": {
                  opacity: 0.5,
                  backgroundColor: "#bfbfbf",
                },
              }}
              //  getAriaValueText={valuetext}
            />
            <Typography
              gutterBottom
              sx={{
                border: "1px",
                fontSize: "16px",
                marginTop: "20px",
                color: "#fd5056",
                fontWeight: 500,
              }}
            >
              Price:{" "}
              {priceTour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
            </Typography>
          </Box>
        </div>
        <div>
          {/* Âm thanh khi bấm */}
          <audio ref={audioRef} />
        </div>
      </div>
    </div>
  );
}

export default Filter;
