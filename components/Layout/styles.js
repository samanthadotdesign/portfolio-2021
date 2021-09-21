import styled from 'styled-components';

export const NameLogo = styled.a`
  font-family: "Neue Montreal";
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  color: #000;
`;

export const NavLink = styled.a`
  font-family: "Neue Montreal";
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  color: #000;
`;

export const NavLinks = styled.nav`
  display: flex;
  flex-direction: row !important;
  width: 120px;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  height: fit-content;
`;

export const NavHeader = styled.header`
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 40px 60px;
`;

export const HomepageDiv = styled.div`
  overflow: none;
  width: 100vw;
  height: 100vh;
`;

export const FooterDiv = styled.footer`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  bottom: 0;
  left: 0;
`;