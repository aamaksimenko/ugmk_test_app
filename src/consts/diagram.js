export const options = {
  maintainAspectRatio: false,
  aspectRatio: 0.5,
  plugins: {
      legend: {
          labels: {
              fontColor: 'black',
          },
          position: 'bottom',
          onClick: null
      }
  },
  scales: {
      x: {
          ticks: {
              color: 'black',
              font: {
                  weight: 500
              }
          }
      },
      y: {
          ticks: {
              color: 'black'
          }
      }
  }
};
