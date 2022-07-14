import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { themeAtom } from "./atom";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: ${(props) => props.theme.bgColor};
  box-shadow: 2px 2px 4px #99999953;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 25px;
  font-weight: bold;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 5px;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 22px;
  text-align: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  all: unset;
  display: inline-block;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColor};
`;

const Span = styled.span`
  color: ${(props) => props.theme.textColor};
  margin: 0 5px 0 10px;
`;

function ThemeBtn() {
  const [themeMode, setThemeMode] = useRecoilState(themeAtom);
  const toggleDark = () => setThemeMode((current) => !current);

  return (
    <Header>
      <Link to="/">
        <Title>Coin Tracker</Title>
      </Link>
      <Label onClick={toggleDark}>
        <Checkbox type="checkbox"></Checkbox>
        <Span onClick={toggleDark}>{themeMode ? "Dark" : "Light"}</Span>
      </Label>
    </Header>
  );
}

export default ThemeBtn;
