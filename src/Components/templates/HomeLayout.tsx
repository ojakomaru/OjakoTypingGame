import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const MainDisplay = styled.section`
  display: flex;
  flex-direction: column;
`;

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
  const { header, maindisplay, typinglists, footer } = props;
  return (
    <Wrapper>
      <Header>{header}</Header>
      <main>
        <MainDisplay>{maindisplay}</MainDisplay>
        <Content>{typinglists}</Content>
      </main>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
};

type HomeLayoutProps = {
  header: ReactNode;
  maindisplay: ReactNode;
  footer: ReactNode;
  typinglists: ReactNode;
};

export default HomeLayout;
