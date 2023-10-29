import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Main = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: 990px;
`;

const Footer = styled.footer`
  margin: 1rem;
  padding: 8 2;
  min-height: 30;
`;

type LayoutProps = {
  header: ReactNode;
  footer: ReactNode;
  navigation: ReactNode;
  children: ReactNode;
};
const Layout = (props: LayoutProps) => {
  const { header, children, footer, navigation } = props;
  return (
    <Wrapper>
      {header}
      {navigation}
      <Main>{children}</Main>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
};

export default Layout;
