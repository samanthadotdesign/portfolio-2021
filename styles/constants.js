import css from 'styled-components';
import EditorialNewRegularWoff from '../public/fonts/EditorialNew-Regular.woff';
import EditorialNewRegularWoff2 from '../public/fonts/EditorialNew-Regular.woff2';

const FONTS = css`
  @font-face {
    font-family: 'Editorial New Regular';
    src: 
      url(${EditorialNewRegularWoff}) format('woff'), url(${EditorialNewRegularWoff2}) format('woff2');
    font-weight: 400;
  } 

  @font-face {
    font-family: 'Editorial New Bold';
    src: 
      url(${EditorialNewRegularWoff}) format('woff'), url(${EditorialNewRegularWoff2}) format('woff2');
    font-weight: 400;
  } 

  @font-face {
    font-family: neue-haas-unica,sans-serif;
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: neue-haas-unica,sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export const FONT_STYLES = {
	display: 'Editorial New Regular',
	paragraph: 'neue-haas-unica'
};

export const FONT_SIZE = {
	sizeH1: '3.15rem',
	sizeH2: '2.36rem',
	sizeH3: '1.77rem',
	sizeH4: '1.33rem',
};

export const COLORS = {
	primary: 'hsl(262.8,50.6%,53.1%)',
	textPrimary: 'hsl(236.5,100%,10%)',
	textSecondary: 'hsl(208.5,18%,43.5%)',
	light: 'hsl(200,23.1%,97.5%)',
	white: 'hsl(0,0%,100%)',
};
