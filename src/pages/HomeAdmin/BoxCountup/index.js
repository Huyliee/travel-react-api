import { Box } from "@mui/material";
import styles from "./BoxCountup.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import  CountUp  from 'react-countup';

const cx = classNames.bind(styles);

function BoxCountup() {
    return (  
        <div>
            <Box className={cx("count-up-box")}>
                <FontAwesomeIcon icon={faUsers} className={cx("count-up-icon")}/>
                <h4 className={cx("count-up-text")}>Khách hàng</h4>
                <CountUp end={100} duration={1.5} className={cx("count-up-number")}/>
            </Box>
        </div>
    );
}

export default BoxCountup;