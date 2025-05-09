// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid, Typography } from '@mui/material';
import AnimationFadeIn from '../animation/Animation';

const TestimonialTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={8}>
        <AnimationFadeIn>
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{
              fontSize: {
                lg: '36px',
                xs: '25px',
              },
              lineHeight: {
                lg: '43px',
                xs: '30px',
              },
            }}
          >
            {/* Meet Our Team title */}
            Thank you for all the team members who have contributed to the project
          </Typography>
        </AnimationFadeIn>
      </Grid>
    </Grid>
  );
};

export default TestimonialTitle;
