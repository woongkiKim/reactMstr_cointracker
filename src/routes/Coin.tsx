import { useQuery } from "react-query";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fecthCoinInfo, fecthCoinPrice } from "../api";
import { IInfo, IPrice, RouteState } from "../atom";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  max-width: 400px;
  padding: 120px 0 60px;
  margin: 0 auto;
`;

const CoinName = styled.h2`
  margin-bottom: 30px;
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const Loading = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 30px;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.textColor};
`;

const OverviewItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${(props) => props.theme.bgColor};
  font-weight: bold;
  span:first-child {
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 10px;
  }
`;

const Description = styled.p`
  margin: 30px 0;
  line-height: 1.2;
  color: ${(props) => props.theme.textColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 50px 0 30px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 5px;
  color: ${(props) =>
    props.isActive ? props.theme.bgColor : props.theme.textColor};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  border-radius: 20px;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  a {
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const name = location.state as RouteState;
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(
    ["info", coinId],
    () => fecthCoinInfo(coinId!)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPrice>(
    ["Price", coinId],
    () => fecthCoinPrice(coinId!)
  );
  const loading = infoLoading || priceLoading;
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfo>();
  // const [price, setPrice] = useState<IPrice>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPrice(priceData);
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <CoinName>
        {name?.name ? (
          name.name
        ) : loading ? (
          <Loading>Loading...</Loading>
        ) : (
          infoData?.name
        )}
      </CoinName>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>{priceData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Suply</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>CHART</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>PRICE</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="price" element={<Price coinId={coinId!} />} />
            <Route path="chart" element={<Chart coinId={coinId!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
