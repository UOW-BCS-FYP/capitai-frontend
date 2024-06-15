import { Box, Grid, TextField } from '@mui/material';
import { useEffect } from 'react';
import DashboardCard from 'src/components/shared/DashboardCard';
import BudgetingChart from 'src/components/smart-budgeting/BudgetingChart';
import { useDispatch, useSelector } from 'src/store/Store';
import { fetchBudgetCtgy } from 'src/store/smart-budgeting/BudgetCategorySlice';

const BudgetingCard = () => {

  // use dispatch for calling the action in reducer (the state management)
  const dispatch = useDispatch();
  
  // fetch budget categories
  const fetchStatus = useSelector((state) => state.budgetCategoryReducer.fetchBudgetCategoryStatus);
  const fetchFilter = useSelector((state) => state.budgetCategoryReducer.fetchBudgetCategoryFilter);

  // useEffect to avoid infinite loop, only fetch data when fetchStatus is idle
  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchBudgetCtgy(fetchFilter)); // use {} empty filter criteria to fetch all records
    }
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSearch(event.target.value);
    dispatch(fetchBudgetCtgy({ query: event.target.value }));
  };

  return (
    <DashboardCard title="Budgeting Category">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ flex: '1 1 100%' }}>
            <TextField
              placeholder="Search Budget Category"
              size="small"
              onChange={handleSearch}
              value={fetchFilter.query ?? ''}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <BudgetingChart />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default BudgetingCard;