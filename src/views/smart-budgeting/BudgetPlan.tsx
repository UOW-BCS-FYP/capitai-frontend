import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Typography } from '@mui/material';
import SBSTab from 'src/components/smart-budgeting/SBSTab';
import { Props } from 'react-apexcharts';
import ExpectedIncomeBar from 'src/components/smart-budgeting/ExpectedIncomeBar'
import { fetchExpInc } from '../../store/smart-budgeting/ExpectedIncomeSlice';
import { useSelector, useDispatch } from 'src/store/Store';
import AppCard from '../../components/shared/AppCard';
import ExpectedIncomeTableList from '../../components/smart-budgeting/ExpectedIncomeTableList';
import BudgetingCategoryTableList from '../../components/smart-budgeting/BudgetingCategoryTableList';

const BudgetPlan = () => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;
    const secondarylight = theme.palette.secondary.light;
    const warning = theme.palette.warning.main;

    const optionsdoughnutchart: Props = {
        chart: {
            id: 'donut-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70px',
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
        },
        colors: [primary, primarylight, secondary, secondarylight, warning],
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    const seriesdoughnutchart = [45, 15, 27, 18, 35];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchExpInc());
    }, [dispatch]);

    const expectedIncomes = useSelector((state) =>
        state.expectedIncomeReducer.expectedIncomes
    );

    return (
      <Box
          flexDirection="column"
          height="100vh"
          textAlign="center"
          justifyContent="center"
      >
      <SBSTab />
        <AppCard>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='h4' align='left' margin='5px' marginLeft='20px'>Budget Categories</Typography>
              <Divider variant="middle"/>
              <Chart
                options={optionsdoughnutchart}
                series={seriesdoughnutchart}
                type="donut"
                height="300px"
                />
              </Grid>
            <Grid item xs={6}>
              <Typography variant='h4' align='right' margin='5px' marginRight='20px'>Expected Incomes</Typography>
              <Divider variant="middle"/>
              {expectedIncomes.map((expInc) => (
                  <ExpectedIncomeBar expInc={expInc} />
              ))}
            </Grid>

            <Grid item xs={6}>
              <BudgetingCategoryTableList />
            </Grid>
            <Grid item xs={6}>
              <ExpectedIncomeTableList />
            </Grid>
          </Grid>
        </AppCard>
      </Box>
    );
};

export default BudgetPlan;
