import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { CovidStats, ApiCovidStats, ChartProps } from "../../interfaces";
import "./smallchart.scss";

const CovidTinyLineChart: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [data, setData] = useState<CovidStats[]>([]);
  const [totalConfirmed, setTotalConfirmed] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://${apiHost}/stats/v1/US/`, {
          headers: {
            "x-rapidapi-host": apiHost,
            "x-rapidapi-key": apiKey,
          },
        });

        const stats = response.data.stats.history.map(
          (item: ApiCovidStats) => ({
            date: item.date,
            confirmed: item.confirmed,
          })
        );

        setData(stats);

        // Calculating total confirmed cases
        const total = stats.reduce(
          (acc: number, item: ApiCovidStats) => acc + item.confirmed,
          0
        );
        setTotalConfirmed(total);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  return (
    <>
      <div className="CovidTinyLineChart">
        <h3>Total Confirmed Cases: {totalConfirmed.toLocaleString()}</h3>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={data}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CovidTinyLineChart;