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
import { setAgentNewToken } from 'src/store/financial-consultant/ConsultSlice';
import Markdown from 'marked-react';

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
  const agentNewToken = useSelector((state) => state.financialConsultantReducer.agentNewToken);
  
  console.log('chatDetails', chatDetails);

  useEffect(() => {
    auth.socket?.on('server_new_token', (new_token) => {
      console.log('server_new_token', new_token.data);
      dispatch(setAgentNewToken(new_token.data));
    });
  }, []);

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

          <Box display="flex">
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box width="100%">
              <Scrollbar sx={{ height: '650px', overflow: 'auto', maxHeight: '800px' }}>
                <Box p={3}>
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
                                      p: 1,
                                      backgroundColor: 'grey.100',
                                      mr: 'auto',
                                      maxWidth: '320px',
                                    }}
                                  >
                                    {chat.msg}
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
                                    p: 1,
                                    backgroundColor: 'primary.light',
                                    ml: 'auto',
                                    maxWidth: '320px',
                                  }}
                                >
                                  {chat.msg}
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
                  <Markdown>
                    { agentNewToken }
                  </Markdown>
                  <Markdown>
                    { "Hello! How can I assist you with your investments today?\n### Performance Comparison: Google (GOOGL) vs. Microsoft (MSFT) for This Month Here's a detailed comparison of the performance of Google (GOOGL) and Microsoft (MSFT) over the past month: #### Google (GOOGL) - **Opening Prices:** - Lowest: \$138.83 - Highest: \$178.20 - **Closing Prices:** - Lowest: \$139.63 - Highest: \$177.79 - **Volume:** - Lowest: 19,661,400 - Highest: 69,273,700 #### Microsoft (MSFT) - **Opening Prices:** - Lowest: \$410.71 - Highest: \$435.32 - **Closing Prices:** - Lowest: \$414.35 - Highest: \$441.06 - **Volume:** - Lowest: 13,621,700 - Highest: 45,049,800 ### Summary - **Price Range**: Microsoft has a higher price range compared to Google, with its stock trading between \$410.71 and \$441.06, while Google's stock traded between \$138.83 and \$177.79. - **Volume**: Both companies showed significant trading volumes, but Google had a day with a higher peak volume of 69,273,700 shares compared to Microsoft's peak of 45,049,800 shares. ### Conclusion - Microsoft has experienced higher stock prices compared to Google during this month. - Both stocks have shown strong trading volumes, with Google experiencing higher peak trading volumes on certain days. ### Next Steps - Consider the broader market conditions, upcoming earnings reports, and any company-specific news that might impact future performance. - Assess your investment goals and risk tolerance before making any decisions. Would you like more detailed analysis or information on any specific aspect?Of course, I'd be happy to provide a more detailed analysis. Could you please specify the stock or investment topic you're interested in? This will help me tailor the analysis to your needs.Here are the latest news highlights for Apple (AAPL) and Alphabet (GOOGL): ### Apple Inc. (AAPL) - **Top Analyst Reports**: Recent reports include analysis on Apple, highlighting its market performance, product innovation, and strategic moves. Analysts are closely watching their financial health and market strategies. ### Alphabet Inc. (GOOGL) - **Top Analyst Reports**: Alphabet is also in the spotlight with in-depth research reports assessing its business segments, particularly Google’s advertising revenue, cloud services, and other innovative ventures. Would you like more detailed information on their financials, earnings dates, historical data, insider ownership, or stock recommendations?" }
                  </Markdown>
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
