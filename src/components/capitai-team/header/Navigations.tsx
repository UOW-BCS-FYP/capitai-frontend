// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigations = () => {
    return (
        <>
            <Button color="inherit" variant="text" component={Link} to="/our-team" sx={{ fontSize: '16px', color: 'text.secondary' }}>
                Our Team
            </Button>
            <Button color="primary" variant="contained" component={Link} to="/auth/login">
                Sign In
            </Button>
        </>
    );
};

export default Navigations;
