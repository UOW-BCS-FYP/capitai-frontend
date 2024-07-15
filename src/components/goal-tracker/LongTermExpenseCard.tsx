// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Typography, Avatar, Grid, Stack, Skeleton } from '@mui/material';
import { IconArrowDownRight, IconArrowUpLeft } from '@tabler/icons-react';
import { Props } from 'react-apexcharts';
import DashboardCard from '../shared/DashboardCard';
import { useDispatch, useSelector } from 'src/store/Store';
import { getStatChartData } from 'src/store/goal-tracker/GoalTrackerSlice';

const LongTermExpenseCard = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const successlight = theme.palette.success.light;
  const secondarylight = theme.palette.secondary.light;
  const errorlight = theme.palette.error.light;

  // chart
  const optionscolumnchart: Props = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 100,
      sparkline: {
        enabled: true,
      },
    },
    colors: [secondarylight, secondarylight, secondary, secondarylight, secondarylight, secondarylight],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%',
        distributed: true,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const status = useSelector((state) => state.goalTrackerReducer.fetchStatChartDataStatus);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.goalTrackerReducer.statChartData);
  const lastExpense = useSelector(() => {
    if (!data?.longTermExpense?.expenses || data?.longTermExpense?.expenses.length < 1) return 0;
    return data?.longTermExpense.expenses[data.longTermExpense.expenses.length - 1].amount ?? 0;
  })
  const percent = useSelector(() => {
    if (!data?.longTermExpense?.expenses || data?.longTermExpense?.expenses.length < 2) return 0;
    const lastExpense = data?.longTermExpense.expenses[data.longTermExpense.expenses.length - 1].amount ?? 0;
    const thisExpense = data?.longTermExpense.expenses[data.longTermExpense.expenses.length - 2].amount ?? lastExpense;
    if (!lastExpense || !thisExpense) return 0;
    return parseFloat((((thisExpense - lastExpense) / lastExpense) * 100).toFixed(2));
  });
  const seriescolumnchart = useSelector(() => {
    return [
      {
        name: '',
        data: data?.longTermExpense?.expenses?.map(p => p.amount) ?? [],
      },
    ];
  });

  React.useEffect(() => {
    if (status === 'idle') dispatch(getStatChartData({}));
  }, [dispatch]);

  return (
    <DashboardCard title="Long Term Expense">
      <Grid container spacing={3}>
        <Grid item xs={5}>
          {status === 'loading' ? (
            <Skeleton width="100%" animation="wave">
              <Typography variant="h4" mt={3} fontWeight={600}>
                $0
              </Typography>
            </Skeleton>
          ) : (
            <Typography variant="h4" mt={3} fontWeight={600}>
              ${ lastExpense }
            </Typography>
          )}
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            { percent >= 0 ? (
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
            ) : (
              <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                <IconArrowDownRight width={20} color="#FA896B" />
              </Avatar>
            )}
            {status === 'loading' ? (
              <Skeleton width="100%" animation="wave">
                <Typography variant="subtitle2" fontWeight={600}>
                  &nbsp;
                </Typography>
              </Skeleton>
            ) : (
              <Typography variant="subtitle2" color="textSecondary">
                { percent >= 0 ? `+${percent}%` : `${percent}%` }
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="bar"
            height="125.5px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default LongTermExpenseCard;
