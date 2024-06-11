// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import {
  Avatar,
  List,
  ListItemText,
  ListItemAvatar,
  TextField,
  Box,
  Alert,
  Badge,
  ListItemButton,
  Typography,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { useSelector, useDispatch } from 'src/store/Store';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
// import { SelectChat, fetchChats, SearchChat } from 'src/store/financial-consultant/ConsultSlice';
import { FinancialConsultant } from 'src/types/financial-consultant';
import { last } from 'lodash';
import { formatDistanceToNowStrict } from 'date-fns';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import { fetchConsultant, selectConsultant } from 'src/store/financial-consultant/ConsultSlice';
// import user1 from 'src/assets/images/profile/user-1.jpg';

const ChatListing = () => {
  const dispatch = useDispatch();
  const chattingWith = useSelector((state) => state.financialConsultantReducer.chattingWith);
  // const ws = useSelector((state) => state.financialConsultantReducer.ws);
  // console.log('ws', ws);

  // useEffect(() => {
  //   dispatch(fetchChats());
  // }, [dispatch]);

  // const filterChats = (chats: ChatsType[], cSearch: string) => {
  //   if (chats)
  //     return chats.filter((t) => t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()));

  //   return chats;
  // };

  // const chats = useSelector((state) =>
  //   filterChats(state.financialConsultantReducer.chats, state.financialConsultantReducer.chatSearch),
  // );

  const consultants = useSelector((state) => state.financialConsultantReducer.consultants);

  const getDetails = (conversation: FinancialConsultant) => {
    let displayText = '';

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage) {
      const sender = lastMessage.senderId === conversation.id ? '' : 'You: ';
      const message = lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.msg;
      displayText = `${sender}${message}`;
    }

    return displayText;
  };

  const lastActivity = (chat: FinancialConsultant) => last(chat.messages)?.createdAt;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* Profile */}
      {/* ------------------------------------------- */}
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        {/* <Badge
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          overlap="circular"
          color="success"
        >
          <Avatar alt="Remy Sharp" src={user1} sx={{ width: 54, height: 54 }} />
        </Badge> */}
        <Box>
          <Typography variant="body1" fontWeight={600}>
            All Advisors
          </Typography>
          <Typography variant="body2">We are here to help you</Typography>
        </Box>
      </Box>
      {/* ------------------------------------------- */}
      {/* Search */}
      {/* ------------------------------------------- */}
      <Box px={3} py={1}>
        <TextField
          id="outlined-search"
          placeholder="Search consultant"
          size="small"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={'16'} />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => dispatch(fetchConsultant({ query: e.target.value }))}
        />
      </Box>
      {/* ------------------------------------------- */}
      {/* Contact List */}
      {/* ------------------------------------------- */}
      <List sx={{ px: 0 }}>
        <Box px={2.5} pb={1}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Recent Consult <IconChevronDown size="16" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Sort By Time</MenuItem>
            <MenuItem onClick={handleClose}>Sort By Unread</MenuItem>
            <MenuItem onClick={handleClose}>Mark as all Read</MenuItem>
          </Menu>
        </Box>
        <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '600px' }}>
          {consultants && consultants.length ? (
            consultants.map((consultant) => (
              <ListItemButton
                key={consultant.id}
                onClick={() => dispatch(selectConsultant(consultant.id))}
                sx={{
                  mb: 0.5,
                  py: 2,
                  px: 3,
                  alignItems: 'start',
                }}
                selected={chattingWith === consultant.id}
              >
                <ListItemAvatar>
                  <Badge
                    color={
                      consultant.status === 'online'
                        ? 'success'
                        : consultant.status === 'busy'
                        ? 'error'
                        : consultant.status === 'away'
                        ? 'warning'
                        : 'secondary'
                    }
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    overlap="circular"
                  >
                    <Avatar alt="Remy Sharp" src={consultant.thumb} sx={{ width: 42, height: 42 }} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                      {consultant.name}
                    </Typography>
                  }
                  secondary={getDetails(consultant)}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                  sx={{ my: 0 }}
                />
                <Box sx={{ flexShrink: '0' }} mt={0.5}>
                  <Typography variant="body2">
                    {formatDistanceToNowStrict(new Date(lastActivity(consultant)), {
                      addSuffix: false,
                    })}
                  </Typography>
                </Box>
              </ListItemButton>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
                No Contacts Found!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
