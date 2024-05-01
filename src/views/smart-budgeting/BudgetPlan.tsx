// import { useEffect } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import SBSTab from 'src/components/smart-budgeting/SBSTab';
import ExpectedIncomeBar from 'src/components/smart-budgeting/ExpectedIncomeBar'
// import { fetchExpInc } from '../../store/smart-budgeting/ExpectedIncomeSlice';
// import { useSelector, useDispatch } from 'src/store/Store';
import AppCard from '../../components/shared/AppCard';
import ExpectedIncomeTableList from '../../components/smart-budgeting/ExpectedIncomeTableList';
import BudgetingCategoryTableList from '../../components/smart-budgeting/BudgetingCategoryTableList';
import BudgetingChart from 'src/components/smart-budgeting/BudgetingChart';

const BudgetPlan = () => {
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
              <BudgetingChart />
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h4' align='right' margin='5px' marginRight='20px'>Expected Incomes</Typography>
              <Divider variant="middle"/>
              <ExpectedIncomeBar />
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
