// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ChatSidebar from 'src/components/financial-consultant/ChatSidebar';
import ChatContent from 'src/components/financial-consultant/ChatContent';
import ChatMsgSent from 'src/components/financial-consultant/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const FinanicalConsultant = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Personal Financial Consultant" description="this is Personal Financial Consultant page">
      <Breadcrumb title="Personal Financial Consultant" subtitle="Your AI powered financial advisor" />
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

        <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default FinanicalConsultant;
