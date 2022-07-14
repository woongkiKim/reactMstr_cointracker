import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fecthCoins } from "../api";
import { ICoin } from "../atom";

const Container = styled.div`
  max-width: 400px;
  height: 100vh;
  padding: 120px 0 0;
  margin: 0 auto;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  margin-bottom: 15px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 15px;
  background-color: ${(props) => props.theme.bgColor};
  transition: 0.2s ease-in;
  a {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    color: ${(props) => props.theme.textColor};
    transition: 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    border-color: ${(props) => props.theme.accentColor};
  }
`;

const CoinSymbol = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const Loading = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 30px;
  text-align: center;
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fecthCoins);
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <CoinSymbol
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
