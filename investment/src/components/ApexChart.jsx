import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ numArray }) => {
  const series = [
    {
      name: 'Starting Amount',
      data: numArray.map((yearData) =>Math.floor(yearData.investAmount)),
    },
    {
      name: 'Total Contributions',
      data: numArray.map((yearData) => Math.floor(yearData.totaladdAmount)),
    },
    {
      name: 'Total Interest Earned',
      data: numArray.map((yearData) => Math.floor(yearData.totalrateAmount)),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 500,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
            formatter: (value) => `$${value.toLocaleString()}`,
          },
        },
      },
    },
    xaxis: {
      type: 'category',
      categories: numArray.map((item) => item.numYear),
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: ['#008FFB', '#FF7226','#A0D703'],
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ApexChart;