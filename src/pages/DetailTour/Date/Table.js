import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table
} from "@mui/material";

function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  
  const rows = [
    createData('15/06/2023', 'Tour chọn gói', '7.000.000đ'),
    createData('17/06/2023', 'Tour chọn gói', '7.000.000đ'),
    createData('22/06/2023', 'Tour chọn gói', '7.000.000đ'),
    createData('25/06/2023', 'Tour chọn gói', '7.000.000đ'),
    createData('30/06/2023', 'Tour chọn gói', '7.000.000đ'),
  ];

function TablePrice() {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ngày khởi hành</TableCell>
              <TableCell align="right">Hạng tour</TableCell>
              <TableCell align="right">Giá tour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TablePrice;
