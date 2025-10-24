import { FC } from 'react';
import { Header } from '@/widgets/header';
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  CtaSection,
  FooterSection
} from '@/widgets/landing';

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-950 dark:to-primary-950">
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          <CtaSection />
          <FooterSection />
        </div>
      </main>
    </>
  );
};

export default MainPage;