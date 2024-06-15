// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// import TopCards from 'src/components/dashboards/modern/TopCards';
import RevenueUpdates from 'src/components/dashboards/modern/RevenueUpdates';
import CapitalBuildCard from 'src/components/goal-tracker/CapitalBuildingCard';
import LongTermExpenseCard from 'src/components/goal-tracker/LongTermExpenseCard';
// import EmployeeSalary from 'src/components/dashboards/modern/EmployeeSalary';
// import Customers from 'src/components/dashboards/modern/Customers';
// import Projects from 'src/components/dashboards/modern/Projects';
// import Social from 'src/components/dashboards/modern/Social';
// import SellingProducts from 'src/components/dashboards/modern/SellingProducts';
// import WeeklyStats from 'src/components/dashboards/modern/WeeklyStats';
// import TopPerformers from 'src/components/dashboards/modern/TopPerformers';
// import BudgetingChart from 'src/components/smart-budgeting/BudgetingChart';
import BudgetingCard from 'src/components/dashboards/modern/BudgetingCard';
import CapitalBuildingGoalCard from '../goal-tracker/CapitalBuildingGoalCard';
import DebtPaymentGoalCard from '../goal-tracker/DebtPaymentGoalCard';
import LongTermExpenseGoalCard from 'src/views/goal-tracker/LongTermExpenseGoalCard';
import AddNewGoalCard from 'src/views/goal-tracker/AddNewGoalCard';
// import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import WelcomeCard from 'src/components/dashboards/ecommerce/WelcomeCard';

const Modern = () => {
  return (
    <PageContainer title="Modern Dashboard" description="this is Modern Dashboard page">
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          {/* <Grid item xs={12} lg={12}>
           <TopCards /> 
          </Grid> */}
          {/* column */}
          <Grid item xs={12} lg={12}>
            <WelcomeCard/>
          </Grid>
          <Grid item xs={12} lg={7}>
            <RevenueUpdates />
          </Grid>
          <Grid item xs={12} lg={5}>
            <BudgetingCard />
          </Grid>

          {/* column */}
          {/* <Grid item xs={12} lg={3}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} lg={12}>
                <CapitalBuildingGoalCard />
              </Grid>
              <Grid item xs={6} sm={6} lg={12}>
                <CapitalBuildingGoalCard />
              </Grid>
            </Grid>
          </Grid> */}

          <Grid item xs={12} sm={6} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CapitalBuildingGoalCard />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DebtPaymentGoalCard />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LongTermExpenseGoalCard />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AddNewGoalCard />
              </Grid>
            </Grid>
          </Grid>

          {/* column */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <CapitalBuildCard />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <LongTermExpenseCard />
              </Grid>
            </Grid>
          </Grid>
          
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <EmployeeSalary />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid> */}
          {/* column */}
          
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <WeeklyStats />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid> */}
        </Grid>
        {/* column */}
        {/* <Welcome /> */}
      </Box>
    </PageContainer>
  );
};

export default Modern;
