// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, CardContent, Chip, Paper, Stack, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LongTermExpenseData {
  title: string;
  type: string;
  goal: string,
  current: string,
  percent: number;
  color: string;
  day: string;
}

const longTermExpense: LongTermExpenseData[] = [
  {
    title: 'Long Term Expense',
    type: 'Long term Expense',
    goal: '$12,100',
    current: '$9,196',
    percent: 76,
    color: 'secondary',
    day: '149 days left'
  }
];

const LongTermExpenseGoalCard = () => {
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
           Long Term Expense
         </Typography>

      </CardContent>
      <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px' }}>
        <Box p={3}>
          <Stack spacing={3}>
            {longTermExpense.map((longTermExpense: any, i: number) => (
              <Box key={i}>
                <Stack
                  direction="row"
                  spacing={2}
                  mb={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                <Box >
                  <Typography variant="h6" mb={0}>{longTermExpense.goal}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                      {longTermExpense.current}
                     </Typography>
                </Box>
                
                  <Chip
                    sx={{
                      backgroundColor: longTermExpense.color === 'primary' ? primarylight : secondarylight,
                      color: longTermExpense.color === 'primary' ? primary : secondary,
                      borderRadius: '4px',
                      width: 55,
                      height: 24,
                    }}
                    label={longTermExpense.percent + '%'}
                  />
                </Stack>
                <LinearProgress value={longTermExpense.percent} variant="determinate" color={longTermExpense.color} />
                <Box>
                    <Typography variant="caption" >{longTermExpense.day}</Typography>
                  </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Paper>
  );
};

export default LongTermExpenseGoalCard;


