import Apexchart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api";
import { coinIdProps, IPriceData, themeAtom } from "../atom";

function Chart({ coinId }: coinIdProps) {
  const themeMode = useRecoilValue(themeAtom);
  const { isLoading, data } = useQuery<IPriceData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {
        isLoading ? (
          "Loading chart..."
        ) : (
          <Apexchart
            type="candlestick"
            series={[
              {
                name: "price",
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      price.open.toFixed(2),
                      price.high.toFixed(2),
                      price.low.toFixed(2),
                      price.close.toFixed(2),
                    ],
                  };
                }) as [],
              },
            ]}
            options={{
              chart: {
                height: 300,
                background: "transparent",
                toolbar: { show: false },
              },
              theme: { mode: themeMode ? "dark" : "light" },
              yaxis: { show: true, labels: { style: { colors: "#888" } } },
              xaxis: {
                labels: { show: true, style: { colors: "#888" } },
                categories: data?.map((price) => price.time_close),
                type: "datetime",
              },
              grid: { show: true, borderColor: "#999" },
              tooltip: { y: { formatter: (value) => `$${value.toFixed(3)}` } },
            }}
          />
        )
        // <Apexchart
        //   type="line"
        //   series={[
        //     { name: "price", data: data?.map(price => price.close) as number[] }
        //   ]}
        //   options={{
        //     chart: {
        //       height: 300, background: "transparent",
        //       toolbar: { show: false }
        //     },
        //     theme: { mode: themeMode ? "dark" : "light" },
        //     stroke: { curve: "smooth", width: 3 },
        //     colors: ["#55B466"],
        //     yaxis: { show: false },
        //     xaxis: {
        //       axisBorder: { show: false }, axisTicks: { show: false },
        //       labels: { show: false }, categories: data?.map(price => price.time_close), type: "datetime",
        //     },
        //     grid: { show: false },
        //     tooltip: { y: { formatter: (value) => `$${value.toFixed(3)}` } },
        //   }}
        // />
      }
    </div>
  );
}

export default Chart;
