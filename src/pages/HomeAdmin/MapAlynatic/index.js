import React from 'react';
import { VectorMap } from 'jvectormap-next';
import 'jvectormap-next/jquery-jvectormap.css';

const MapAlynatic = () => {
  // Dữ liệu thống kê cho Việt Nam (ví dụ)
  const data = {
    "VN-65": 100,
    "VN-27": 200,
    // Thêm dữ liệu thống kê cho các khu vực khác ở đây
  };
  const mapData = {
    VN: data,
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <VectorMap
        map="vn_merc"
        backgroundColor="#ffffff"
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: '#C8EEFF',
          },
          hover: {
            fill: '#0071A4',
          },
        }}
        series={{
          regions: [
            {
              values: mapData.VN,
              scale: ['#C8EEFF', '#0071A4'],
              normalizeFunction: 'polynomial',
            },
          ],
        }}
      />
    </div>
  );
};

export default MapAlynatic;
