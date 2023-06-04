import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import TablePrice from "./Table";

function Date() {
  const [value, setValue] = useState('1');
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tháng 6" value="1" />
              <Tab label="Tháng 7" value="2" />
              <Tab label="Tháng 8" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"> <TablePrice /></TabPanel>
          <TabPanel value="2"><TablePrice /></TabPanel>
          <TabPanel value="3"><TablePrice /></TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Date;
