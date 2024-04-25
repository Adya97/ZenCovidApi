import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { CovidStats, ApiCovidStats, ChartProps } from '../../interfaces'; 
import "./recoveredchart.scss"

const CovidTinyLineChart: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [data, setData] = useState<CovidStats[]>([]);
  const [totalRecovered, setTotalRecovered] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://${apiHost}/stats/v1/US/`, {
          headers: {
            'x-rapidapi-host': apiHost,
            'x-rapidapi-key': apiKey
          }
        });

        const stats = response.data.stats.history.map((item: ApiCovidStats) => ({
          date: item.date, // Format the date if necessary
          recovered: item.recovered // Change confirmed to recovered
        }));

        setData(stats);

        // Calculate the total recovered cases
        const total = stats.reduce((acc: number, item: ApiCovidStats) => acc + (item.recovered ?? 0), 0);
        setTotalRecovered(total);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  return (
    <>
        <div className="CovidRocoveredChart">
      <h4>Total Recovered Patients: {totalRecovered.toLocaleString()}</h4>
      <ResponsiveContainer width="100%" height={100}>
      <LineChart width={300} height={100} data={data}>
        <Tooltip />
        <Line type="monotone" dataKey="recovered" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
      </ResponsiveContainer>
      </div>
    </>
  );
};

export default CovidTinyLineChart;
