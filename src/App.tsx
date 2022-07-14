import { ThemeProvider } from "styled-components";
import GlobalStyled from "./globalStyled";
import { themeAtom } from "./atom";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import Router from "./Router";

function App() {
  const themeMode = useRecoilValue(themeAtom);
  return (
    <ThemeProvider theme={themeMode ? lightTheme : darkTheme}>
      <GlobalStyled />
      <Router />
    </ThemeProvider>
  );
}

export default App;
