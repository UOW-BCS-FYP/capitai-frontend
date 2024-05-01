// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { ExpectedIncomeType } from 'src/types/smart-budgeting';
import { useSelector } from 'src/store/Store';

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

const Bar = (props: { 
    expInc?: Partial<ExpectedIncomeType>
    loading?: boolean
    grandTotal?: number
}) => {
    const ratio = (props.expInc?.amount && props.grandTotal) && props.expInc?.amount / props.grandTotal * 100;

    return (
        props.loading ? (
            <Skeleton width="100%" animation="wave">
                <Box marginTop='5px' marginBottom='15px' marginLeft='33px'>
                    <Typography align='left' variant='h4'>{props.expInc?.title}</Typography>
                    <Typography align='left'>Expected amount: ${props.expInc?.amount}</Typography>
                    <Grid container alignItems="center" spacing='30px'>
                        <Grid item xs={10} >
                            <BorderLinearProgress variant="determinate" value={ratio} />
                        </Grid>
                        <Grid item xs={1}>
                            <Typography>
                                {ratio?.toFixed(0)}%
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Skeleton>
        ) :
        <Box marginTop='5px' marginBottom='15px' marginLeft='33px'>
            <Typography align='left' variant='h4'>{props.expInc?.title}</Typography>
            <Typography align='left'>Expected amount: ${props.expInc?.amount}</Typography>
            <Grid container alignItems="center" spacing='30px'>
                <Grid item xs={10} >
                    <BorderLinearProgress variant="determinate" value={ratio} />
                </Grid>
                <Grid item xs={1}>
                    <Typography>
                        {ratio?.toFixed(0)}%
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const ExpectedIncomeBar = () => {
    const expectedIncomes = useSelector((state) => state.expectedIncomeReducer.expectedIncomes);
    const fetchExpectedIncomeStatus = useSelector((state) => state.expectedIncomeReducer.fetchExpectedIncomeStatus);
    const grandTotal = expectedIncomes?.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        expectedIncomes?.map((expInc) => (
            <Bar
                expInc={expInc}
                grandTotal={grandTotal}
                key={expInc.id}
                loading={fetchExpectedIncomeStatus === 'loading'}
            />
        ))
    );
}

export default ExpectedIncomeBar;
