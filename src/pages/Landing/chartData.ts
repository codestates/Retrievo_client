export const chartData = {
  labels: ["Todo", "Start", "Progress", "Review", "Done"],
  datasets: [
    {
      label: "# of Jason",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "# of Dean",
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: "rgb(54, 162, 235)",
    },
    {
      label: "# of Peter",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

export const chartOptions = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};
