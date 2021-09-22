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

export const HomepageDiv = styled.div`
  overflow: hidden;
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