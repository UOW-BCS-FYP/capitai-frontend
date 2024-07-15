// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Grid, Stack, Typography, Button, Avatar, Box, Skeleton } from '@mui/material';
import { IconGridDots } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';
import CustomSelect from '../forms/theme-elements/CustomSelect';
import { Props } from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/store/Store';
import { getStatChartData } from 'src/store/smart-budgeting/InSRecordSlice';

const InSUpdates = () => {
  // const [month, setMonth] = React.useState('1');
  const [year, setYear] = useState(new Date().getFullYear());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setYear(parseInt(event.target.value));
    } catch (error) {}
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const dispatch = useDispatch();
  const status = useSelector((state) => state.InSRecordRecuder.fetchStatChartDataStatus);
  const data = useSelector((state) => state.InSRecordRecuder.fetchStatChartData);
  // const error = useSelector((state) => state.InSRecordRecuder.fetchStatChartDataError);
  const years = useSelector(() => {
    const _years = [new Date().getFullYear()];
    data?.incomes?.forEach((income) => {
      if (!_years.includes(income.year)) {
        _years.push(income.year);
      }
    });
    data?.expenses?.forEach((expense) => {
      if (!_years.includes(expense.year)) {
        _years.push(expense.year);
      }
    });
    return _years;
  })
  const seriescolumnchart = useSelector(() => {
    return [
      {
        name: 'Earnings this month',
        data: [...Array(12).keys()].map((month) => {
          const income = (data?.incomes ?? []).find((_income) => _income.year == year && _income.month == month + 1);
          return income ? income.amount : 0;
        }),
      },
      {
        name: 'Expense this month',
        data: [...Array(12).keys()].map((month) => {
          const expense = (data?.expenses ?? []).find((_expense) => _expense.year == year && _expense.month == month + 1);
          return expense ? -expense.amount : 0;
        }),
      },
    ]
  });
  const optionscolumnchart: Props = useSelector(() => {
    const max = Math.max(
      seriescolumnchart[0].data.reduce((a, b) => a > b ? a : b, 0),
      -seriescolumnchart[1].data.reduce((a, b) => a < b ? a : b, 0)
    )

    return {
      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: true,
        },
        height: 370,
        stacked: true,
      },
      colors: [primary, secondary],
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '60%',
          columnWidth: '30%',
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
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
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        // min: -35000,
        // max: 30000,
        min: -(max * 1.1),
        max: (max * 1.1),
        tickAmount: 5,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: false,
        },
      },
      tooltip: {
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        fillSeriesColor: false,
      },
    }
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getStatChartData({}));
    }
  });


  return (
    <DashboardCard
      title="Income & Spending"
      subtitle="Monthly Earnings and Expenses"
      action={
        <CustomSelect
          labelId="year-month"
          id="year-month"
          size="small"
          value={year}
          onChange={handleChange}
        >
          {years.map((_year) => (
            <MenuItem key={_year} value={_year}>
              {_year}
            </MenuItem>
          ))}
        </CustomSelect>
      }
    >
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={12} sm={8}>
          <Box className="rounded-bars">
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="bar"
            height="342px"
          />
          </Box>
        </Grid>
        {/* column */}
        <Grid item xs={12} sm={4}>
          <Stack spacing={3} mt={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                width={40}
                height={40}
                bgcolor="primary.light"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="primary" variant="h6" display="flex">
                  <IconGridDots width={21} />
                </Typography>
              </Box>
              <Box>
                { status === 'loading' ? (
                    <Skeleton width="100%" animation="wave">
                      <Typography variant="h3" fontWeight="700">
                        $0
                      </Typography>
                    </Skeleton>
                  ) : (
                    <Typography variant="h3" fontWeight="700">
                      ${ seriescolumnchart[0].data.reduce((a, b) => a + b, 0) + seriescolumnchart[1].data.reduce((a, b) => a + b, 0) }
                    </Typography>
                  )
                }
                <Typography variant="subtitle2" color="textSecondary">
                  Total Revenue
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Earnings this year
                </Typography>
                { status === 'loading' ? (
                  <Skeleton width="100%" animation="wave">
                    <Typography variant="h5">
                      $0
                    </Typography>
                  </Skeleton> )
                  : (
                    <Typography variant="h5">
                      ${ seriescolumnchart[0].data.reduce((a, b) => a + b, 0) }
                    </Typography>
                  )
                }
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 9, mt: 1, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Expense this year
                </Typography>
                { status === 'loading' ? (
                  <Skeleton width="100%" animation="wave">
                    <Typography variant="h5">
                      $0
                    </Typography>
                  </Skeleton> )
                  : (
                    <Typography variant="h5">
                      ${ -seriescolumnchart[1].data.reduce((a, b) => a + b, 0) }
                    </Typography>
                  )
                }
              </Box>
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" fullWidth component={Link} to={`/smart-budgeting/income-n-spending`}>
            View Full Report
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default InSUpdates;
