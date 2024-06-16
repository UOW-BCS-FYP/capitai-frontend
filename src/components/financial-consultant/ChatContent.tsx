// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  // IconButton,
  Box,
  Stack,
  Badge,
  CircularProgress,
  CircularProgressProps,
  circularProgressClasses,
  ListItemButton,
  ListItemIcon,
  Collapse,
  List,
  ListSubheader,
  // useMediaQuery,
  // Theme
} from '@mui/material';
import {
  // IconDotsVertical, 
  IconMenu2,
  // IconPhone, IconVideo
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'src/store/Store';
import { formatDistanceToNowStrict } from 'date-fns';
// import ChatInsideSidebar from './ChatInsideSidebar';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import useAuth from 'src/guards/authGuard/UseAuth';
import { setConsultantChat } from 'src/store/financial-consultant/ConsultSlice';
import Markdown from 'marked-react';
import { useUnmountEffect } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface ChatContentProps {
  toggleChatSidebar: () => void;
}

function ChatCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={30}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={30}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

const AgentToolBox: React.FC<{ tool_start?: { tool: string, input: string }[], tool_end?: string[] }> = ({ tool_start, tool_end }) => {
  const [open, setOpen] = React.useState<{ [key: number]: boolean }>({});

  function toolToStatement (tool_name: string) {
    switch (tool_name) {
      case 'stock_financial_statement_search':
        return 'I searched for the financial statement of the stock';
      case 'stock_historical_data_search':
        return 'I searched for the historical data of the stock';
      case 'stock_recommendation_search':
        return 'I searched for the recommendation of the stock';
      case 'stock_earnings_date_search':
        return 'I searched for the earnings date of the stock';
      case 'stock_news_search':
        return 'I searched for the news of the stock';
      case 'stock_ownership_insider_search':
        return 'I searched for the ownership insider of the stock';
      case 'cfa_level_1_knowledge':
        return 'I searched for the knowledge of CFA Level 1';
      default:
        return 'I searched for the information';
    }
  }

  return tool_start ? (
    <List
      sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          I performed the following tasks
        </ListSubheader>
      }
    >
      {tool_start?.map((tool, index) => (
        <>
          <ListItemButton onClick={() => setOpen({ ...open, [index]: !open[index] })}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary={`${toolToStatement(tool.tool)} ... ${tool.input}`} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[index]} timeout="auto" unmountOnExit>
            <Markdown>
              {tool_end ? tool_end[index] : 'Loading...'}
            </Markdown>
          </Collapse>
        </>
      ))}
    </List>
  ) : null;

}

const ChatContent: React.FC<ChatContentProps> = ({ toggleChatSidebar }) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  
  // const [open, setOpen] = React.useState(false);
  // const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const chattingWith = useSelector((state) => state.financialConsultantReducer.chattingWith);
  const chatDetails = useSelector(
    (state) => chattingWith && state.financialConsultantReducer.consultants.find((c) => c.id === chattingWith),
  );

  const scrollToBottom = () => {
    const chatContent = document.getElementById('chat-content');
    if (chatContent && chatContent.parentElement && chatContent.parentElement.parentElement) {
      chatContent.parentElement.parentElement.scrollTop = chatContent.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatDetails]);

  function onChat(data: any) {
    dispatch(setConsultantChat(data));
  }

  useEffect(() => {
    auth.socket?.on('chat', onChat);
  }, []);

  useUnmountEffect(() => {
    auth.socket?.off('chat', onChat);
  })

  return (
    <Box>
      {chatDetails ? (
        <Box>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'none' },
                  mr: '10px',
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <ListItem key={chatDetails.id} dense disableGutters>
                <ListItemAvatar>
                  <Badge
                    color={
                      chatDetails.status === 'online'
                        ? 'success'
                        : chatDetails.status === 'busy'
                        ? 'error'
                        : chatDetails.status === 'away'
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
                    <Avatar alt={chatDetails.name} src={chatDetails.thumb} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h5">{chatDetails.name}</Typography>}
                  secondary={chatDetails.excerpt}
                />
              </ListItem>
              <Stack direction={'row'}>
                {/* <IconButton aria-label="delete">
                  <IconPhone stroke={1.5} />
                </IconButton>
                <IconButton aria-label="delete">
                  <IconVideo stroke={1.5} />
                </IconButton> */}
                {/* <IconButton aria-label="delete" onClick={() => setOpen(!open)}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton> */}
              </Stack>
            </Box>
            <Divider />
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}

          <Box display="flex" sx={{ height: 'calc(100vh - 400px)' }}>
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box width="100%">
              <Scrollbar sx={{ height: '650px', overflow: 'auto', maxHeight: 'calc(100vh - 400px)' }}>
                <Box p={3} id="chat-content">
                  {chatDetails.messages.map((chat) => {
                    return (
                      <Box key={chat.id + chat.msg + chat.createdAt}>
                        {chatDetails.id === chat.senderId ? (
                          <>
                            <Box display={'flex'}>
                              <ListItemAvatar>
                                <Avatar
                                  alt={chatDetails.name}
                                  src={chatDetails.thumb}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </ListItemAvatar>
                              <Box>
                                {chat.createdAt ? (
                                  <Typography variant="body2" color="grey.400" mb={1}>
                                    {chatDetails.name},{' '}
                                    {formatDistanceToNowStrict(new Date(chat.createdAt), {
                                      addSuffix: false,
                                    })}{' '}
                                    ago
                                  </Typography>
                                ) : null}
                                {chat.type === 'text' && chat.msg ? (
                                  <>
                                    <AgentToolBox tool_start={chat.llm?.tool_start} tool_end={chat.llm?.tool_end} />
                                    <Box
                                      mb={1}
                                      sx={{
                                        p: 2,
                                        backgroundColor: '#e8e8e8',
                                        color: 'text.primary',
                                        mr: 'auto'
                                      }}
                                    >
                                      <Markdown>
                                        { chat.llm?.chain_end?.data ?? chat.msg }
                                      </Markdown>
                                    </Box>
                                  </>
                                ) : <ChatCircularProgress /> }
                                {chat.type === 'image' ? (
                                  <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
                                    <img src={chat.msg} alt="attach" width="150" />
                                  </Box>
                                ) : null}
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <Box
                            mb={1}
                            display="flex"
                            alignItems="flex-end"
                            flexDirection="row-reverse"
                          >
                            <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                              {chat.createdAt ? (
                                <Typography variant="body2" color="grey.400" mb={1}>
                                  ago
                                </Typography>
                              ) : null}
                              {chat.type === 'text' ? (
                                <Box
                                  mb={1}
                                  key={chat.id}
                                  sx={{
                                    p: 1,
                                    backgroundColor: 'primary.light',
                                    ml: 'auto',
                                  }}
                                >
                                  <Markdown>
                                    { chat.msg }
                                  </Markdown>
                                </Box>
                              ) : null}
                              {chat.type === 'image' ? (
                                <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
                                  <img src={chat.msg} alt="attach" width="250" />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Scrollbar>
            </Box>

            {/* ------------------------------------------- */}
            {/* Chat right sidebar Content */}
            {/* ------------------------------------------- */}
            {/* <ChatInsideSidebar isInSidebar={open} consultant={chatDetails} /> */}
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
          {/* ------------------------------------------- */}
          {/* if No Chat Content */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'flex', lg: 'none' },
              mr: '10px',
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
          <Typography variant="h4">Select Chat</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;

