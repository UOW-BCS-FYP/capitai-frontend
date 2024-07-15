// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, CardContent, Chip, Paper, Stack, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface DebtPaymentData {
  title: string;
  type: string;
  goal: string,
  current: string,
  percent: number;
  color: string;
  day: string;
}

const debt: DebtPaymentData[] = [
  {
    title: 'Debt Payment',
    type: 'Debt Payment',
    goal: '$21,000',
    current: '$10,080',
    percent: 48,
    color: 'secondary',
    day: '217 days left'
  }
];

const DebtPaymentGoalCard = () => {
  const theme = useTheme();
  const secondarylight = theme.palette.secondary.light;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const primary = theme.palette.primary.main;
  const borderColor = theme.palette.divider;

  return (
    <Paper sx={{ bgcolor: 'secondary.main', border: `1px solid ${borderColor}` }} variant="outlined">
      <CardContent>
        <Typography variant="h5" color="white">
          Goal
        </Typography>
        <Typography variant="subtitle1" color="white" mb={-3}>
          Debt Payment
         </Typography>

      </CardContent>
      <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px' }}>
        <Box p={3}>
          <Stack spacing={3}>
            {debt.map((debt: any, i: number) => (
              <Box key={i}>
                <Stack
                  direction="row"
                  spacing={2}
                  mb={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                <Box >
                  <Typography variant="h6" mb={0}>{debt.goal}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                      {debt.current}
                     </Typography>
                </Box>
                
                  <Chip
                    sx={{
                      backgroundColor: debt.color === 'primary' ? primarylight : secondarylight,
                      color: debt.color === 'primary' ? primary : secondary,
                      borderRadius: '4px',
                      width: 55,
                      height: 24,
                    }}
                    label={debt.percent + '%'}
                  />
                </Stack>
                <LinearProgress value={debt.percent} variant="determinate" color={debt.color} />
                <Box>
                    <Typography variant="caption" >{debt.day}</Typography>
                  </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Paper>
  );
};

export default DebtPaymentGoalCard;


