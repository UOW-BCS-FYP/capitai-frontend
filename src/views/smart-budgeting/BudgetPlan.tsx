import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import SBSTab from 'src/components/apps/smartBudgeting/SBSTab';
import { Props } from 'react-apexcharts';
import ExpectedIncomeBar from 'src/components/apps/smartBudgeting/ExpectedIncomeBar'
import { fetchExpInc } from '../../store/apps/smartBudgeting/ExpectedIncomeSlice';
import { useSelector, useDispatch } from 'src/store/Store';
import AppCard from '../../components/shared/AppCard';
import ExpectedIncomeTableList from '../../components/apps/smartBudgeting/ExpectedIncomeTableList';
import BudgetingCategoryTableList from '../../components/apps/smartBudgeting/BudgetingCategoryTableList';
import { fetchBudgetCtgy } from '../../store/apps/smartBudgeting/BudgetCategorySlice';

const BudgetPlan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchExpInc());
        dispatch(fetchBudgetCtgy());
    }, [dispatch]);

    const budgetCategories = useSelector((state) =>
        state.budgetCategoryReducer.budgetCategories
    );

    const expectedIncomes = useSelector((state) =>
        state.expectedIncomeReducer.expectedIncomes
    );

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
        labels: budgetCategories.map(obj => obj.title)
    };
    const seriesdoughnutchart = budgetCategories.map(obj => obj.amount);
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
