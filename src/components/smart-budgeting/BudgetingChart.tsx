import { Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Props } from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { useSelector } from 'src/store/Store';

export default () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const warning = theme.palette.warning.main;
  
  const categories = useSelector((state) => state.budgetCategoryReducer.budgetCategories);
  const fetchStatus = useSelector((state) => state.budgetCategoryReducer.fetchBudgetCategoryStatus);

  const optionsdoughnutchart: Props = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
      donut: {
        labels: {
          show: true,
          // name: {
          //   show: true,
          //   fontSize: '22px',
          //   fontFamily: "'Plus Jakarta Sans', sans-serif",
          //   color: undefined,
          //   offsetY: -10,
          // },
          // value: {
          //   show: true,
          //   fontSize: '16px',
          //   fontFamily: "'Plus Jakarta Sans', sans-serif",
          //   color: undefined,
          //   offsetY: 16,
          //   formatter: function (val) {
          //     return val + '%';
          //   },
          // },
          total: {
            show: true,
            label: 'Total',
            color: primary,
            showAlways: true,
            formatter: function (w: any) {
              console.log(w)
              return w.globals.seriesTotals.reduce((a: any, b: any) => {
                return a + b;
              }, 0) + '%';
            },
          },
        },
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      customLegendItems: categories.map((category) => category.title)
    },
    colors: [primary, primarylight, secondary, secondarylight, warning],
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
    labels: categories.map((category) => category.title),
  };

  //const seriesdoughnutchart = [45, 15, 27, 18, 35];
  const seriesdoughnutchart = categories.map((category) => category.amount);

  return (
    fetchStatus === 'loading' ? (
      <Skeleton width="100%" animation="wave">
        <Chart
          options={optionsdoughnutchart}
          series={seriesdoughnutchart}
          type="donut"
          height="300px"
        />
      </Skeleton>
    ) : (
      <Chart
        options={optionsdoughnutchart}
        series={seriesdoughnutchart}
        type="donut"
        height="300px"
      />
    )
  )
}