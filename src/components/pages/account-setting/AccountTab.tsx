// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { CardContent, Grid, Typography, Box, Avatar, Button, Stack } from '@mui/material';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
// import CustomSelect from '../../forms/theme-elements/CustomSelect';

// images
import user1 from 'src/assets/images/profile/user-1.jpg';
import { useDispatch, useSelector } from 'src/store/Store';
import { deleteMockData, generateMockData } from 'src/store/mockdata/MockDataSlice';

// interface locationType {
//   value: string;
//   label: string;
// }

// // locations
// const locations: locationType[] = [
//   {
//     value: 'us',
//     label: 'United States',
//   },
//   {
//     value: 'uk',
//     label: 'United Kingdom',
//   },
//   {
//     value: 'india',
//     label: 'India',
//   },
//   {
//     value: 'russia',
//     label: 'Russia',
//   },
// ];

// // currency
// const currencies: locationType[] = [
//   {
//     value: 'us',
//     label: 'US Dollar ($)',
//   },
//   {
//     value: 'uk',
//     label: 'United Kingdom (Pound)',
//   },
//   {
//     value: 'india',
//     label: 'India (INR)',
//   },
//   {
//     value: 'russia',
//     label: 'Russia (Ruble)',
//   },
// ];

const AccountTab = () => {
  // const [location, setLocation] = React.useState('india');

  // const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLocation(event.target.value);
  // };

  // //   currency
  // const [currency, setCurrency] = React.useState('india');

  // const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCurrency(event.target.value);
  // };

  const status = useSelector((state) => state.mockDataReducer.status);
  const dispatch = useDispatch();

  const onGenerateData = () => {
    dispatch(generateMockData());
  };
  const onRemoveData = () => {
    dispatch(deleteMockData());
  };

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Profile
            </Typography>
            <Typography color="textSecondary" mb={3}>Change your profile picture from here</Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={user1}
                  alt={user1}
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button variant="contained" color="primary" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button variant="outlined" color="error">
                    Reset
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Password
            </Typography>
            <Typography color="textSecondary" mb={3}>To change your password please confirm here</Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Current Password
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">New Password</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">Confirm Password</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Demo Data
            </Typography>
            <Typography color="textSecondary" mb={3}>For demo purpose we have added some data</Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={onGenerateData} disabled={status === 'loading'}>
                    Generate Data
                  </Button>
                  <Button variant="outlined" color="error" onClick={onRemoveData} disabled={status === 'loading'}>
                    Remove Data
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">
            Save
          </Button>
          <Button size="large" variant="text" color="error">
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
