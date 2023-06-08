import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { detailTourApi } from "~/GlobalFunction/Api";

function TablePrice({ id ,month}) {
  const [date, setDate] = useState([]);
  useEffect(() => {
    async function detailData() {
      const data = await detailTourApi(id);
      const filteredData = data.date_go.filter((item) => item.month === month);
      setDate(filteredData);
    }
    detailData();
  }, [id,month]);
  console.log(date);
  if (date === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "280px", fontSize: "20px" }}>
                Ngày khởi hành
              </TableCell>
              <TableCell style={{ fontSize: "20px" }} align="right">
                Hạng tour
              </TableCell>
              <TableCell style={{ fontSize: "20px" }} align="right">
                Giá tour
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {date && date.length > 0 ? (
              date.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "16px" }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell style={{ fontSize: "16px" }} align="right">
                    Tour trọn gói
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", color: "red" }}
                    align="right"
                  >
                    7.000.000đ
                    <Link to={`/booking/tourId/${id}?state=${encodeURIComponent(id)}&date=${encodeURIComponent(row.id)}`}>
                    <Button variant="contained" style={{ marginLeft: "10px" }}>
                      Chọn ngày
                    </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No dates available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TablePrice;
