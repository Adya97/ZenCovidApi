import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { CovidStats, ApiCovidStats, ChartProps } from "../../interfaces";
import "./tinychart.scss";

const CovidTinyLineChart: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [data, setData] = useState<CovidStats[]>([]);
  const [totalDeaths, setTotalDeaths] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://coronavirus-smartable.p.rapidapi.com/stats/v1/US/`,
          {
            headers: {
              "x-rapidapi-host": apiHost,
              "x-rapidapi-key": apiKey,
            },
          }
        );

        const stats = response.data.stats.history.map(
          (item: ApiCovidStats) => ({
            date: item.date,
            deaths: item.deaths,
          })
        );

        setData(stats);

        // Calculating the total deaths
        const total = stats.reduce(
          (acc: number, item: CovidStats) => acc + item.deaths,
          0
        );
        setTotalDeaths(total);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  return (
    <>
      <div className="CovidTinyLineChart">
        <h3>
          Total Deaths: <br></br>
          {totalDeaths.toLocaleString()}
        </h3>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart width={300} height={100} data={data}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="deaths"
              stroke="#cf3821"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CovidTinyLineChart;
