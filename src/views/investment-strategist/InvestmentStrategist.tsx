import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import ChatContent from 'src/components/financial-consultant/ChatContent';
import ChatMsgSent from 'src/components/financial-consultant/ChatMsgSent';
import ChatSidebar from 'src/components/financial-consultant/ChatSidebar';
import AppCard from 'src/components/shared/AppCard';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const InvestmentStrategist = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  return (
    <PageContainer title="Personal Investment Strategist" description="this is Personal Investment Strategist page">
      <Breadcrumb title="Personal Investment Strategist" subtitle="Your AI powered investment advisor" />
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
  )
};

export default InvestmentStrategist;
