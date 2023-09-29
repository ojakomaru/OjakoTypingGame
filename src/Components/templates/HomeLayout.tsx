import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    padding-top: 3.25rem;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const Hero = styled.section``;

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: 990px;
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const HomeLayout = (props: HomeLayoutProps) => {
  const { header, ishero, maindisplay, children, footer } = props;
   return (
     <Wrapper {...props}>
       <Header>{header}</Header>
       {ishero && <Hero>{maindisplay}</Hero>}
       <Content>{children}</Content>
       <Footer>{footer}</Footer>
     </Wrapper>
   );
};

type HomeLayoutProps = {
  header: ReactNode;
  ishero?: boolean,
  maindisplay: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export default HomeLayout;