// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
// import Banner from '../../../components/landingpage/banner/Banner';
// import C2a from '../../../components/landingpage/c2a/C2a';
// import C2a2 from '../../../components/landingpage/c2a/C2a2';
// import DemoSlider from '../../../components/landingpage/demo-slider/DemoSlider';
// import Features from '../../../components/landingpage/features/Features';
// import Footer from '../../components/capitai-team/footer/Footer';
// import Frameworks from '../../../components/landingpage/frameworks/Frameworks';
import LpHeader from '../../components/capitai-team/header/Header';
import Testimonial from '../../components/capitai-team/testimonial/Testimonial';

const OurTeam = () => {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <LpHeader />
      {/* <Banner /> */}
      {/* <DemoSlider /> */}
      {/* <Frameworks /> */}
      <Testimonial />
      {/* <Features /> */}
      {/* <C2a /> */}
      {/* <C2a2 /> */}
      {/* <Footer /> */}
    </PageContainer>
  );
};

export default OurTeam;
