// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Skeleton } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import { IconArrowDownRight } from '@tabler/icons-react';

import DashboardCard from '../shared/DashboardCard';
import { Props } from 'react-apexcharts';
import { useDispatch, useSelector } from 'src/store/Store';
import { getStatChartData } from 'src/store/goal-tracker/GoalTrackerSlice';

const CapitalBuildCard = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  // chart
  const optionscolumnchart: Props = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  const dispatch = useDispatch();
  const status = useSelector((state) => state.goalTrackerReducer.fetchStatChartDataStatus);
  const data = useSelector((state) => state.goalTrackerReducer.statChartData);
  // const error = useSelector((state) => state.goalTrackerReducer.fetchStatChartDataError);
  const percent = useSelector(() => {
    const thisYear = data?.capitalBuilding.thisYear ?? 0;
    const lastYear = data?.capitalBuilding.lastYear ?? 0;
    if (lastYear === 0) return 0;
    return parseFloat((((thisYear - lastYear) / lastYear) * 100).toFixed(2));
  })
  const seriescolumnchart = [data?.capitalBuilding.lastYear ?? 0, data?.capitalBuilding.thisYear ?? 0];

  useEffect(() => {
    if (status === 'idle')
      dispatch(getStatChartData({}));
  });

  return (
    <DashboardCard title="Capital Building">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
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
            { status === 'loading' ? (
              <Skeleton width="100%" animation="wave">
                <Typography variant="subtitle2" fontWeight="600">
                  $0
                </Typography>
              </Skeleton>
            ) : (
              <>
                <Typography variant="subtitle2" fontWeight="600">
                  { percent >= 0 ? `+${percent}%` : `${percent}%` }
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  last year
                </Typography>
              </>
            )}
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                { new Date().getFullYear() - 1 }
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                { new Date().getFullYear() }
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="130px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default CapitalBuildCard;
