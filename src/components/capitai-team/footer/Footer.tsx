// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid, Link, Typography, Container } from '@mui/material';
import logoIcon from 'src/assets/images/logos/logoIcon.svg';

const Footer = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center" mt={4}>
        <Grid item xs={12} sm={5} lg={4} textAlign="center">
          <img src={logoIcon} alt="icon" />
          <Typography fontSize="16" color="textSecondary" mt={1} mb={4}>
            All rights reserved by Capit-AI. Designed & Developed by
            <Link target="_blank" href="https://github.com/UOW-BCS-FYP">
              <Typography color="textSecondary" component="span" display="inline">
                {' '}
                UOW BCS Group2
              </Typography>{' '}
            </Link>
            .
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
