import React, { FC, ReactNode } from "react";
import styled from "styled-components";

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
  padding: 0 30px;
`;

const MainDisplay = styled.section``;

const Content = styled.section`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: 990px;
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const HomeLayout = (props: HomeLayoutProps) => {
  const { header, maindisplay, typinglists, footer, navigation } = props;
  return (
    <Wrapper>
      <Header>{header}</Header>
      <main>
        <MainDisplay>{maindisplay}</MainDisplay>
          {navigation}
        <Content>
          {typinglists}
        </Content>
      </main>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
};

type HomeLayoutProps = {
  header: ReactNode;
  maindisplay: ReactNode;
  footer: ReactNode;
  navigation: ReactNode;
  typinglists: ReactNode;
};

export default HomeLayout;
