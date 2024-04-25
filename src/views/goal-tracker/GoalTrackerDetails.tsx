import { Grid, CardHeader, Divider, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import PageContainer from "src/components/container/PageContainer";
import GoalTrackerForm from "src/components/goal-tracker/GoalTrackerForm";
import BlankCard from "src/components/shared/BlankCard";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import { AppState, dispatch } from "src/store/Store";
import { updateGoal } from "src/store/goal-tracker/GoalTrackerSlice";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/goal-tracker/stat',
    title: 'Goal Tracker',
  },
  {
    title: 'Goal Details',
  },
];

const GoalTrackerDetails = () => {
  const param = useParams();
  const { id } = param;
  const goal = useSelector((state: AppState) => state.goalTrackerReducer.goals.find((goal) => goal.id === parseInt(id!)));

  return (
    <PageContainer title="Goal Tracker" description="this is Goal Tracker page">
      <Breadcrumb title={"Goal Tracker Details " + id} items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <BlankCard>
            <CardHeader title={"Edit Goal Tracker"} />
            <Divider />
            <CardContent sx={{ pt: 0 }}>
              <GoalTrackerForm
                editGoal={goal}
                onSubmit={(values) => {
                  dispatch(updateGoal({
                    ...values,
                    id: parseInt(id!)
                  })).then(() => {
                    alert('Goal Updated Successfully');
                  })
                }}
              />
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default GoalTrackerDetails