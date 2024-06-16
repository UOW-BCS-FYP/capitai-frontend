import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack, Theme } from '@mui/material';

import { useSelector, useDispatch } from 'src/store/Store';
import { toggleSidebar, toggleMobileSidebar, setDarkMode } from 'src/store/customizer/CustomizerSlice';
import { IconMenu2 } from '@tabler/icons-react';
// import Notifications from './Notification';
import Profile from './Profile';
// import Cart from './Cart';
import Search from './Search';
// import Language from './Language';
import { AppState } from 'src/store/Store';
import Navigation from './Navigation';
// import MobileRightSidebar from './MobileRightSidebar';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';

const Header = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={lgUp ? () => dispatch(toggleSidebar()) : () => dispatch(toggleMobileSidebar())}
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        {lgUp ? (
          <>
            <Navigation />
          </>
        ) : null}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Language /> */}
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Notifications /> */}
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          <IconButton aria-label="fingerprint" color="secondary" onClick={() => customizer.activeMode === 'dark' ? dispatch(setDarkMode('light')) : dispatch(setDarkMode('dark'))}>
            {
              customizer.activeMode === 'dark' ? (
                <WbSunnyTwoToneIcon
                  color={'primary'}
                />
              ) : (
                <DarkModeTwoToneIcon
                  color={customizer.activeMode === 'dark' ? 'primary' : 'inherit'}
                />
              )
            }
          </IconButton>
          {/* <Stack direction={'row'} gap={2} my={2}>
            <StyledBox onClick={() => dispatch(setDarkMode('light'))} display="flex" gap={1}>
              
              Light
            </StyledBox>
            <StyledBox onClick={() => dispatch(setDarkMode('dark'))} display="flex" gap={1}>
              <DarkModeTwoToneIcon
                color={customizer.activeMode === 'dark' ? 'primary' : 'inherit'}
              />
              Dark
            </StyledBox>
          </Stack> */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
