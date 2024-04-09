import { Box, Container, Typography } from '@mui/material';

const SmartBudgeting = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <Typography align="center" variant="h4" mb={4}>
        This is the Smart Budgeting page.
      </Typography>
    </Container>
  </Box>
);

export default SmartBudgeting;
