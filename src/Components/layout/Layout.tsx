import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { Navigation } from "../ui/Navigation/Navigation";
import { AuthGuard } from "./AuthGuard";

const Wrapper = styled.div.attrs(() => ({
  id: "root",
}))`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  box-sizing: border-box;
`;

const Main = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  margin: 0.5rem auto;
  max-width: 990px;
  min-height: calc(100vh - 130px);
`;

const FooterWrapper = styled.footer`
  margin-top: 1rem;
  padding: 8 2;
  min-height: 30;
`;

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);
  return (
    <AuthGuard>
      <Wrapper>
        <Header toggleNavigation={toggleNavigation} />
        <Navigation open={open} handleClose={toggleNavigation} />
        <Main>{children}</Main>
        <FooterWrapper>
          <Footer description="Ojako Typing App var.1.0.0" />
        </FooterWrapper>
      </Wrapper>
    </AuthGuard>
  );
};

export default Layout;
