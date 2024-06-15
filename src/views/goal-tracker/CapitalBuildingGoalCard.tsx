// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, CardContent, Chip, Paper, Stack, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface capitalBuildingData {
  title: string;
  type: string;
  goal: string,
  current: string,
  percent: number;
  color: string;
  day: string;
}

const capital: capitalBuildingData[] = [
  {
    title: 'Capital Building',
    type: 'Capital Building',
    goal: '$20,000',
    current: '$6,600',
    percent: 33,
    color: 'primary',
    day: '102 days left'
  }
];

const CapitalBuildingGoalCard = () => {
  const theme = useTheme();
  const secondarylight = theme.palette.secondary.light;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const primary = theme.palette.primary.main;
  const borderColor = theme.palette.divider;

  return (
    <Paper sx={{ bgcolor: 'primary.main', border: `1px solid ${borderColor}` }} variant="outlined">
      <CardContent>
        <Typography variant="h5" color="white">
          Goal
        </Typography>
        <Typography variant="subtitle1" color="white" mb={-3}>
          Capital Building
         </Typography>

      </CardContent>
      <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px' }}>
        <Box p={3}>
          <Stack spacing={3}>
            {capital.map((capital: any, i: number) => (
              <Box key={i}>
                <Stack
                  direction="row"
                  spacing={2}
                  mb={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                <Box >
                  <Typography variant="h6" mb={0}>{capital.goal}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                      {capital.current}
                     </Typography>
                </Box>
                
                  <Chip
                    sx={{
                      backgroundColor: capital.color === 'primary' ? primarylight : secondarylight,
                      color: capital.color === 'primary' ? primary : secondary,
                      borderRadius: '4px',
                      width: 55,
                      height: 24,
                    }}
                    label={capital.percent + '%'}
                  />
                </Stack>
                <LinearProgress value={capital.percent} variant="determinate" color={capital.color} />
                <Box>
                    <Typography variant="caption" >{capital.day}</Typography>
                  </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Paper>
  );
};

export default CapitalBuildingGoalCard;


