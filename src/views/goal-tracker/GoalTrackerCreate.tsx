import { Grid, CardContent, CardHeader, Divider } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import BlankCard from "src/components/shared/BlankCard";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import GoalTrackerForm from "src/components/goal-tracker/GoalTrackerForm";
import { dispatch } from "src/store/Store";
import { addGoal } from "src/store/goal-tracker/GoalTrackerSlice";
import { useNavigate } from "react-router";

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
    title: 'Create Goal',
  },
];

const GoalTrackerCreate = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="Goal Tracker" description="this is Goal Tracker page">
      <Breadcrumb title="Goal Tracker" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <BlankCard title="Register"> */}
          <BlankCard>
            <CardHeader title={"Create Goal Tracker"} />
            <Divider />
            <CardContent sx={{ pt: 0 }}>
              <GoalTrackerForm
                onSubmit={(values) => {
                  // alert(JSON.stringify(values, null, 2));
                  dispatch(addGoal({
                    ...values
                  }))
                    .then(() => {
                      alert('Goal Added Successfully');
                      navigate('/goal-tracker/stat');
                    })
                }}
              />
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
};

export default GoalTrackerCreate;
