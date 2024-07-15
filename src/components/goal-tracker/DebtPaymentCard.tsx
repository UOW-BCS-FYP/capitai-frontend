// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Skeleton } from '@mui/material';
import { IconArrowDownRight, IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '../shared/DashboardCard';
import { Props } from 'react-apexcharts';
import { useDispatch, useSelector } from 'src/store/Store';
import { getStatChartData } from 'src/store/goal-tracker/GoalTrackerSlice';


const DebtPaymentCard = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const successlight = theme.palette.success.light;
  const secondarylight = theme.palette.secondary.light;
  const errorlight = theme.palette.error.light;

  // chart
  const optionscolumnchart: Props = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: false
      }
    },
  };

  const status = useSelector((state) => state.goalTrackerReducer.fetchStatChartDataStatus);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.goalTrackerReducer.statChartData);
  // const error = useSelector((state) => state.goalTrackerReducer.fetchStatChartDataError);
  const percent = useSelector(() => {
    const lastYear = data?.debtPayment.lastYear;
    const thisYear = data?.debtPayment.thisYear;
    if (!lastYear || !thisYear) return 0;
    return parseFloat((((thisYear - lastYear) / lastYear) * 100).toFixed(2));
  })
  const seriescolumnchart = useSelector(() => {
    return [
      {
        name: '',
        color: secondary,
        data: data?.debtPayment.repayment.map(p => p.amount) ?? [],
      },
    ];
  })
  
  React.useEffect(() => {
    if (status === 'idle')
      dispatch(getStatChartData({}));
  }, [dispatch]);


  return (
    <DashboardCard
      title="Debt Payment"
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="48px" />
      }
    >
      <>
        { status === 'loading' ? (
          <Skeleton width="100%" animation="wave">
            <Typography variant="h3" fontWeight="700">
              $0
            </Typography>
          </Skeleton>
          ) : (
            <Typography variant="h3" fontWeight="700">
              ${ data?.capitalBuilding.thisYear }
            </Typography>
          )
        }
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          { percent >= 0 ? (
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
          ) : (
            <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
              <IconArrowDownRight width={20} color="#FA896B" />
            </Avatar>
          )}
          <Typography variant="subtitle2" fontWeight="600">
            { percent >= 0 ? `+${percent}%` : `${percent}%` }
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last year
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default DebtPaymentCard;
