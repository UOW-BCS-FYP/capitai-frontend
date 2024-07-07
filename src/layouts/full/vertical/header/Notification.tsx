// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Chip,
  Stack,
  Box
} from '@mui/material';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

import { IconBellRinging, IconAdjustmentsDollar, IconConfetti, IconReportMoney, IconBus, IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'src/store/Store';
import { deleteNotification, fetchNotification } from 'src/store/notification/notificationSlice';
import { useNavigate } from 'react-router';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const dispatch = useDispatch();
  const records = useSelector((state) => state.notificationReducer.notifications);
  const navigate = useNavigate();
  const fetchStatus = useSelector((state) => state.notificationReducer.fetchNotificationStatus);

  React.useEffect(() => {
    // dispatch(fetchExpInc());
    if (fetchStatus === 'idle') {
        dispatch(fetchNotification());
    }
  }, [dispatch]);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? 'primary.main' : 'text.secondary',
        }}
        onClick={handleClick2}
      >
        <Badge variant="dot" color="primary">
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '540px',
          },
        }}
      >
        <Stack direction="row" py={2} px={4} alignItems="center">
          <Typography variant="h6" paddingRight={2}>Notifications</Typography>
          <Chip label={records.length + " new"} color="primary" size="small" />
          <IconButton sx={{ marginLeft: "auto" }} onClick={() => {
            records.forEach((notification) => dispatch(deleteNotification(notification)) )
            dispatch(fetchNotification());
          }}>
            <IconTrash width="18" />
          </IconButton>
        </Stack>
        <Scrollbar sx={{ height: '385px' }}>
          {records.map((notification, index) => (
            <Box key={index}>
              <MenuItem sx={{ py: 2, px: 4 }} onClick={ () => {
                  dispatch(deleteNotification(notification));
                  navigate(notification.url);
                  dispatch(fetchNotification());
                } }>
                <Stack direction="row" spacing={2}>
                  {
                   notification.type === 'spending' ? <IconReportMoney size="21" stroke="1.5" /> :
                   notification.type === 'endOfMonth' ? <IconAdjustmentsDollar size="21" stroke="1.5" /> :
                   notification.type === 'goalReached' ? <IconConfetti size="21" stroke="1.5" /> :
                   <IconBus size="21" stroke="1.5" />
                  }
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: '450px',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '450px',
                      }}
                      noWrap
                    >
                      {notification.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Notifications;
