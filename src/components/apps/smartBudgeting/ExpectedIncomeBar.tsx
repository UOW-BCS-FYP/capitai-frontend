// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { expectedIncomeType } from '../../../_mockApis/smartBudgeting/expectedIncomeData';
import { useDispatch, useSelector } from '../../../store/Store';
import { fetchI_S } from '../../../store/apps/smartBudgeting/I_SRecordSlice';

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

const ExpectedIncomeBar = (props: { expInc?: Partial<expectedIncomeType> }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchI_S());
    }, [dispatch]);

    const I_SRecords = useSelector((state) =>
        state.I_SRecordRecuder.I_SRecords
    );

    const progress =
        (
            I_SRecords.filter(obj => obj.isIncome === true)
            .filter(obj => obj.category === props.expInc?.title)
            .map(obj => obj.amount)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            / props.expInc?.amount * 100).toFixed(2);

    return (
        <Box marginTop='5px' marginBottom='15px' marginLeft='33px'>
            <Typography align='left' variant='h4'>{props.expInc?.title}</Typography>
            <Typography align='left'>Expected amount: ${props.expInc?.amount}</Typography>
            <Grid container alignItems="center" spacing='30px'>
                <Grid item xs='10' >
                    <BorderLinearProgress variant="determinate" value={progress} />
                </Grid>
                <Grid item xs='1'>
                    <Typography>{progress}%</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExpectedIncomeBar;
