import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, Tooltip } from 'recharts';
import { CovidStats, ApiCovidStats, ChartProps } from '../../interfaces'; 
import "./smallchart.scss"

const CovidTinyLineChart: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [data, setData] = useState<CovidStats[]>([]);
  const [totalConfirmed, setTotalConfirmed] = useState<number>(0);

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
          confirmed: item.confirmed
        }));

        setData(stats);

        // Calculate the total confirmed cases
        const total = stats.reduce((acc: number, item: ApiCovidStats) => acc + item.confirmed, 0);
        setTotalConfirmed(total);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  return (
    <>
    <div className="CovidTinyLineChart">
      <h3>Total Confirmed Cases: {totalConfirmed.toLocaleString()}</h3>
      <LineChart width={300} height={100} data={data}>
        <Tooltip />
        <Line type="monotone" dataKey="confirmed" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
      </div>
    </>
  );
};

export default CovidTinyLineChart;
