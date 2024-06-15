// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ChatSidebar from 'src/components/financial-consultant/ChatSidebar';
import ChatContent from 'src/components/financial-consultant/ChatContent';
import ChatMsgSent from 'src/components/financial-consultant/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';
import { fetchConsultant } from 'src/store/financial-consultant/ConsultSlice';
import { useDispatch } from 'src/store/Store';

const FinanicalConsultant = () => {
  const dispatch = useDispatch();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch consultant data when page loads
    dispatch(fetchConsultant({}));
  }, [dispatch]);

  return (
    <PageContainer title="Personal Financial Advisor" description="this is Personal Financial Advisor page">
      <Breadcrumb title="Personal Financial Advisor" subtitle="Your AI powered financial consultant and investment advisor" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1} width={'100%'}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default FinanicalConsultant;
