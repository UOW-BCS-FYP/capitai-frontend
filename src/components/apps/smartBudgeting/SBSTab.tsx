// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { IconHeart, IconPhoto, IconUserCircle } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const SBSTab = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    interface SBSTabType {
        label: string;
        icon: JSX.Element;
        to: string;
    }

    const ProfileTabs: SBSTabType[] = [
        {
            label: 'Budget Plan',
            icon: <IconUserCircle size="20" />,
            to: '/smart-budgeting',
        },
        {
            label: 'Income & Spending',
            icon: <IconPhoto size="20" />,
            to: '/smart-budgeting/i_s',
        },
    ];

    return (
        <Box mt={1} sx={{ mt: 1, backgroundColor: (theme) => theme.palette.grey[100] }} style={{ marginBottom: '10px' }}>
            <Box sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
                <Tabs value={value} onChange={handleChange} aria-label="scrollable prevent tabs example" variant="scrollable" scrollButtons="auto">
                    {ProfileTabs.map((tab) => {
                        return (
                            <Tab
                                iconPosition="start"
                                label={tab.label}
                                sx={{ minHeight: '50px' }}
                                icon={tab.icon}
                                component={Link}
                                to={tab.to}
                                value={tab.to}
                                key={tab.label}
                            />
                        );
                    })}
                </Tabs>
            </Box>
        </Box>
    );
};

export default SBSTab;
