
import { Box, CardContent, Paper, Stack, Typography, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddNewGoalCard = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const navigate = useNavigate();

  const handleFabClick = () => {
    navigate('/goal-tracker/create'); 
  };

  return (
    <Paper sx={{ bgcolor: 'primary.main', border: `1px solid ${borderColor}` }} variant="outlined">
      <CardContent>
        <Typography variant="h5" color="white">
          Goal
        </Typography>
        <Typography variant="subtitle1" color="white" mb={-3}>
          Add New
        </Typography>
      </CardContent>
      <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px' }}>
        <Box p={3}>
          <Stack spacing={3}>
            <Box>
              <Stack direction="row" spacing={3} mb={1.2} justifyContent="space-between" alignItems="center">
                <Box>
                  <Fab
                    color="primary"
                    aria-label="add"
                    style={{ marginLeft: 70, marginTop: 10 }}
                    onClick={handleFabClick}
                  >
                    <AddIcon />
                  </Fab>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Paper>
  );
};

export default AddNewGoalCard;