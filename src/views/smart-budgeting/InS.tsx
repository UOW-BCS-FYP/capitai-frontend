import { Box } from '@mui/material';
import SBSTab from 'src/components/smart-budgeting/SBSTab';
import InSTableList from '../../components/smart-budgeting/InSTableList';

const InS = () => {
    return (
        <Box
            flexDirection="column"
            height="100vh"
            textAlign="center"
            justifyContent="center"
        >
            <SBSTab />
            <InSTableList />
        </Box>
    );
};

export default InS;
