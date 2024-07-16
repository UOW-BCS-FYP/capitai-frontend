// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Button, Box, Stack } from '@mui/material';
import Logo from "src/layouts/full/shared/logo/Logo"
import { Link } from 'react-router-dom';

const MobileSidebar = () => {

    return (
        <>
            <Box px={3}>
                <Logo />
            </Box>
            <Box p={3}>
                <Stack direction="column" spacing={2} >
                    <Button color="inherit" variant="text" component={Link} to="/our-team" sx={{ justifyContent: 'start' }}>
                        Our Team
                    </Button>
                    <Button color="primary" variant="contained" component={Link} to="/auth/login">
                        Sign In
                    </Button>
                </Stack>
            </Box>
        </>


    );
};

export default MobileSidebar;
