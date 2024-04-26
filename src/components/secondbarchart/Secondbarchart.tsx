import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./secondbarchart.scss";
import { ApiCovidStats, MonthlyDeaths, ChartProps } from "../../interfaces";

const CovidDeathsBarChart2020: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [monthlyDeaths, setMonthlyDeaths] = useState<MonthlyDeaths[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://${apiHost}/stats/v1/US/`, {
          headers: {
            "x-rapidapi-host": apiHost,
            "x-rapidapi-key": apiKey,
          },
        });

        // Initializing an object with all months set to zero for the year 2020
        const monthlyData: { [key: string]: number } = {};
        for (let i = 0; i < 12; i++) {
          const month = new Date(2020, i).toLocaleString("default", {
            month: "long",
          });
          monthlyData[month] = 0;
        }

        // Aggregating deaths by month for the year 2020
        response.data.stats.history
          .filter(
            (stat: ApiCovidStats) => new Date(stat.date).getFullYear() === 2020
          )
          .forEach((stat: ApiCovidStats) => {
            const month = new Date(stat.date).toLocaleString("default", {
              month: "long",
            });
            monthlyData[month] += stat.deaths;
          });

        // Converting the object into an array
        setMonthlyDeaths(
          Object.entries(monthlyData).map(([month, deaths]) => ({
            month,
            deaths,
          }))
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  const formatYAxis = (tickItem: number) => `${(tickItem / 1000).toFixed(0)}k`;

  return (
    <div className="covidBarChartContainer">
      <h3>COVID-19 Deaths 2020</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={monthlyDeaths}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <XAxis
            dataKey="month"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip />
          <Legend />
          <Bar dataKey="deaths" fill="#cf3821" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidDeathsBarChart2020;
