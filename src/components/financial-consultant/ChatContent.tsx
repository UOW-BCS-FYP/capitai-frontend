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
import { setConsultantNewToken } from 'src/store/financial-consultant/ConsultSlice';
import Markdown from 'marked-react';
import { useUnmountEffect } from 'framer-motion';

interface ChatContentProps {
  toggleChatSidebar: () => void;
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

  function onLLMNewToken (new_token: { data: string, agent_id: string, message_id: string }) {
    dispatch(setConsultantNewToken({
      token: new_token.data,
      consultant_id: new_token.agent_id,
      message_id: new_token.message_id
    }));
  }

  function onChainEnd (data: any) {
    console.log('chain_end', data);
  }

  function onToolStart (data: any) {
    console.log('tool_start', data);
  }

  function onAgentAction (data: any) {
    console.log('agent_action', data);
  }

  useEffect(() => {
    auth.socket?.on('llm_new_token', onLLMNewToken);
    auth.socket?.on('chain_end', onChainEnd);
    auth.socket?.on('tool_start', onToolStart);
    auth.socket?.on('agent_action', onAgentAction);
  }, []);

  useUnmountEffect(() => {
    auth.socket?.off('llm_new_token', onLLMNewToken);
    auth.socket?.off('chain_end', onChainEnd);
    auth.socket?.off('tool_start', onToolStart);
    auth.socket?.off('agent_action', onAgentAction);
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
                            <Box display="flex">
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
                                {chat.type === 'text' ? (
                                  <Box
                                    mb={2}
                                    sx={{
                                      p: 2,
                                      backgroundColor: 'grey.100',
                                      mr: 'auto',
                                      maxWidth: '70vw',
                                    }}
                                  >
                                    <Markdown>
                                      { chat.msg }
                                    </Markdown>
                                  </Box>
                                ) : null}
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
                                    p: 2,
                                    backgroundColor: 'primary.light',
                                    ml: 'auto',
                                    maxWidth: '70vw',
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
