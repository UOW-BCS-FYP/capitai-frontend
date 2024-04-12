import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';
import SBSTab from 'src/components/apps/smartBudgeting/SBSTab';
import { Props } from 'react-apexcharts';
import I_STableList from '../../components/apps/smartBudgeting/I_STableList';

const I_S = () => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;
    const secondarylight = theme.palette.secondary.light;
    const warning = theme.palette.warning.main;

    const optionsdoughnutchart: Props = {
        chart: {
            id: 'donut-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70px',
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
        },
        colors: [primary, primarylight, secondary, secondarylight, warning],
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    const seriesdoughnutchart = [45, 15, 27, 18, 35];

    return (
        <Box
            flexDirection="column"
            height="100vh"
            textAlign="center"
            justifyContent="center"
        >
            <SBSTab />
            <I_STableList />
        </Box>
    );
};;

export default I_S;
