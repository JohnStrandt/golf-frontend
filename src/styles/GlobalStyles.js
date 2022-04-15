import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`

:root {

  --background: #f1f1f1;
  --card-bg: #fff;
  --text-primary: #121212;
  --text-hero:  #fff;
  --icons: #121212;
  --active: #359e64;
  

  --danger: #fc4b0b;
  --augusta-green: #076652;
  --augusta-yellow: #FFDD01;
  --neon-green: #38F714;


  --color-success: #359e64;
  --color-success-bg: #def8e8;
  --color-error: #fc4b0b;
  --color-error-bg: #fff2ee;

  /* chrome dark mode colors */
  --color-dm-txt: #0FF;
  --color-dm-bg2: #333;
  --color-dm-bdr: #4AF;

}

[app-theme="dark"]{
  --background: #121212;
  --card-bg: #1E1E1E;
  --text-primary: #e6faff;
  --icons: #e6faff;
  --active: #38F714;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  padding: 0;
}

body{
  /* iPone notch issue */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);

  font-family: 'Poppins', sans-serif;
  font-weight: 200;

}

`;
export default GlobalStyles;