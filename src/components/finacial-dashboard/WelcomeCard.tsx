// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { Box, Avatar, Typography, Card, CardContent, Grid, Divider, Stack, Skeleton } from '@mui/material';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

import welcomeImg from 'src/assets/images/backgrounds/welcome-bg.svg';
import userImg from 'src/assets/images/profile/user-1.jpg';
import { useDispatch, useSelector } from 'src/store/Store';
import { getStatChartData } from 'src/store/smart-budgeting/InSRecordSlice';

const WelcomeCard = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.InSRecordRecuder.fetchStatChartDataStatus);
  const data = useSelector((state) => state.InSRecordRecuder.fetchStatChartData);
  // const error = useSelector((state) => state.InSRecordRecuder.fetchStatChartDataError);
  const monthlyEarnings = useSelector(() => {
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
    const lastYear = thisMonth === 1 ? thisYear - 1 : thisYear;

    const income = (data?.incomes ?? []).find((_income) => _income.year == thisYear && _income.month == thisMonth) ?? { amount: 0 };
    const lastIncome = (data?.incomes ?? []).find((_income) => _income.year == lastYear && _income.month == lastMonth) ?? { amount: 0 };
    const performance = lastIncome.amount === 0 ? 0 : ((income.amount - lastIncome.amount) / lastIncome.amount) * 100;

    return {
      earning: (income.amount),
      performance: performance,
    };
  })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getStatChartData({}));
    }
  });

  return (
    <Card elevation={0} sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}>
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box>
              <Box
                gap="22px" mb={5}
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'flex',
                  },
                  alignItems: 'center',
                }}
              >
                <Avatar src={userImg} alt="img" sx={{ width: 40, height: 40 }} />
                <Typography variant="h5" whiteSpace="nowrap">
                  Welcome back!
                </Typography>
              </Box>

              <Stack spacing={2}  direction="row" divider={<Divider orientation="vertical" flexItem />}>
                <Box>
                  { status === 'loading' ? (
                    <Skeleton width="100%" animation="wave">
                      <Typography variant="h2" whiteSpace="nowrap">$0</Typography>
                    </Skeleton>
                    ) : (
                    <Typography variant="h2" whiteSpace="nowrap">
                      ${monthlyEarnings.earning.toFixed()}
                      { monthlyEarnings.earning >= 0
                        ? (<span><IconArrowUpRight width={18} color="#39B69A" /></span>)
                        : (<span><IconArrowDownRight width={18} color="#FF5B5B" /></span>)
                      }
                    </Typography>
                    )
                  }
                  <Typography variant="subtitle1" whiteSpace="nowrap">Monthly Earnings</Typography>
                </Box>
                <Box>
                {
                  monthlyEarnings.performance != 0 ? (
                    <>
                      <Typography variant="h2" whiteSpace="nowrap">
                        { monthlyEarnings.performance.toFixed(2) }%
                        { monthlyEarnings.performance >= 0
                          ? (<span><IconArrowUpRight width={18} color="#39B69A" /></span>)
                          : (<span><IconArrowDownRight width={18} color="#FF5B5B" /></span>)
                        }
                      </Typography>
                      <Typography variant="subtitle1" whiteSpace="nowrap">Performance</Typography>
                    </>
                  ) : null
                }
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box mb="-51px">
              <img src={welcomeImg} alt={welcomeImg} width={'340px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
