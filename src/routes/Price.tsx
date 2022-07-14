import { useQuery } from "react-query";
import styled from "styled-components";
import { fecthCoinPrice } from "../api";
import { coinIdProps, IPrice } from "../atom";

const PriceContainer = styled.div``;
const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 15px 20px;
  color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  background-color: ${(props) => props.theme.textColor};
  span:first-child {
    font-size: 14px;
  }
`;
const PriceRate = styled.span<{ isMinus: boolean }>`
  color: ${(props) =>
    props.isMinus ? props.theme.accentColor : props.theme.subColor};
  font-size: 18px;
  font-weight: bold;
`;

function Price({ coinId }: coinIdProps) {
  const { isLoading, data } = useQuery<IPrice>(["todayPrice", coinId], () =>
    fecthCoinPrice(coinId)
  );
  return (
    <PriceContainer>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <PriceItem>
            <span>Current Price:</span>
            <PriceRate
              isMinus={data?.quotes.USD.price.toString().slice(0, 1) !== "-"}
            >
              {`$${data?.quotes.USD.price.toFixed(3)}`}
            </PriceRate>
          </PriceItem>
          <PriceItem>
            <span>Percent Change 12 Hours:</span>
            <PriceRate
              isMinus={
                data?.quotes.USD.percent_change_12h.toString().slice(0, 1) !==
                "-"
              }
            >
              {`${data?.quotes.USD.percent_change_12h}%`}
            </PriceRate>
          </PriceItem>
          <PriceItem>
            <span>Percent Change 24 Hours:</span>
            <PriceRate
              isMinus={
                data?.quotes.USD.percent_change_24h.toString().slice(0, 1) !==
                "-"
              }
            >
              {`${data?.quotes.USD.percent_change_24h}%`}
            </PriceRate>
          </PriceItem>
          <PriceItem>
            <span>Percent Change 7 days:</span>
            <PriceRate
              isMinus={
                data?.quotes.USD.percent_change_7d.toString().slice(0, 1) !==
                "-"
              }
            >
              {`${data?.quotes.USD.percent_change_7d}%`}
            </PriceRate>
          </PriceItem>
          <PriceItem>
            <span>Volume Change 24 Hours:</span>
            <PriceRate
              isMinus={
                data?.quotes.USD.volume_24h_change_24h
                  .toString()
                  .slice(0, 1) !== "-"
              }
            >
              {`${data?.quotes.USD.volume_24h_change_24h}%`}
            </PriceRate>
          </PriceItem>
        </>
      )}
    </PriceContainer>
  );
}

export default Price;
