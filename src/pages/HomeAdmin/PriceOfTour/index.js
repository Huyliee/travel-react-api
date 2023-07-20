import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const MAX_TOUR_NAME_LENGTH = 30; // Độ dài tối đa bạn muốn hiển thị cho tên tour

const TourChart = () => {
  const [toursData, setToursData] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/analytic/getPriceTour')
      .then((response) => setToursData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const shortenTourName = (name) => {
    if (name.length > MAX_TOUR_NAME_LENGTH) {
      return name.substring(0, MAX_TOUR_NAME_LENGTH) + '...';
    }
    return name;
  };

  const handleClickTour = (tour) => {
    setSelectedTour(tour);
  };

  const handleGoBack = () => {
    setSelectedTour(null);
  };

  const handleBarClick = (elements) => {
    if (elements && elements.length > 0) {
      const tourIndex = elements[0].index;
      handleClickTour(toursData[tourIndex]);
    }
  };

  const calculateTotalRevenue = () => {
    return toursData.reduce((total, tour) => total + tour.total_revenue, 0);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US');
  };

  const renderTourChart = () => {
    if (selectedTour) {
      const dataBarChart = {
        labels: selectedTour.order_count_by_date.map((item) => item.date_go),
        datasets: [
          {
            label: 'Total Revenue by Date',
            data: selectedTour.order_count_by_date.map((item) => item.total_revenue),
            backgroundColor: 'rgba(18, 105, 219, 0.6)',
          },
        ],
      };

      const optionsBarChart = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      return (
        <div>
          <h2>{shortenTourName(selectedTour.tour_name)}</h2>
          <Bar data={dataBarChart} options={optionsBarChart} />
          <button onClick={handleGoBack}>Go back</button>
        </div>
      );
    } else {
      const dataBarChart = {
        labels: toursData.map((tour) => shortenTourName(tour.tour_name)),
        datasets: [
          {
            label: 'Total Revenue by Tour',
            data: toursData.map((tour) => tour.total_revenue),
            backgroundColor: 'rgba(18, 105, 219, 0.6)',
          },
        ],
      };

      const optionsBarChart = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        onClick: (event, elements) => handleBarClick(elements),
      };

      const totalRevenue = calculateTotalRevenue();

      return (
        <div>
          <h2>Doanh thu các tour</h2>
          <Bar data={dataBarChart} options={optionsBarChart} />
          <p>Tổng doanh thu tất cả tour: {formatCurrency(totalRevenue)} VNĐ</p>
        </div>
      );
    }
  };

  return (
    <div>
      {renderTourChart()}
    </div>
  );
};

export default TourChart;
