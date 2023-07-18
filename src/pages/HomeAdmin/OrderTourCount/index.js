import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

function OrderTourCount() {
  const [chartData, setChartData] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [tourOrders, setTourOrders] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const processChartData = (data) => {
    const labels = [];
    const orderCounts = [];

    data.forEach((tour) => {
      const shortenedName = tour.tour_name.substring(0, 20) + "...";
      labels.push(shortenedName);

      let totalOrderCount = 0;
      tour.order_count_by_date.forEach((item) => {
        totalOrderCount += item.order_count;
      });

      orderCounts.push(totalOrderCount);
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Total Orders",
          data: orderCounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/analytic/getOrderTour"
      ); // Thay đổi đường dẫn API tương ứng

      if (response.status === 200) {
        const data = response.data;
        const chartData = processChartData(data);
        setChartData(chartData);
        setData(data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTourClick = (tourIndex) => {
    const selectedTour = data[tourIndex];
    setSelectedTour(selectedTour);
    setTourOrders(selectedTour.order_count_by_date);
  };

  return (
    <div>
      {chartData ? (
        <>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              onClick: (e) => {
                const element = e[0];
                if (element) {
                  const tourIndex = element._index;
                  handleTourClick(tourIndex);
                }
              },
            }}
          />
          {selectedTour && tourOrders ? (
            <>
              <h2>Selected Tour: {selectedTour.tour_name}</h2>
              <h3>Order Counts by Month:</h3>
              <ul>
                {tourOrders.map((order) => (
                  <li key={order.date_go}>
                    {order.date_go}: {order.order_count}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No tour selected.</p>
          )}
        </>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default OrderTourCount;
