// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { ExpectedIncomeType } from '../../_mockApis/api/v1/smart-budgeting/expectedIncomeData';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const ExpectedIncomeBar = (props: { expInc?: Partial<ExpectedIncomeType> }) => {
    return (
        <Box marginTop='5px' marginBottom='15px' marginLeft='33px'>
            <Typography align='left' variant='h4'>{props.expInc?.title}</Typography>
            <Typography align='left'>Expected amount: ${props.expInc?.amount}</Typography>
            <Grid container alignItems="center" spacing='30px'>
                <Grid item xs={10} >
                    <BorderLinearProgress variant="determinate" value={50} />
                </Grid>
                <Grid item xs={1}>
                    <Typography>50%</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExpectedIncomeBar;
