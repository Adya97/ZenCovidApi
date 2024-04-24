import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, Tooltip } from 'recharts';
import { CovidStats, ApiCovidStats, ChartProps } from '../../interfaces'; 
import "./activechart.scss"

const CovidTinyLineChart: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [data, setData] = useState<CovidStats[]>([]);
  const [totalActive, setTotalActive] = useState<number>(0);

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
          active: item.confirmed - ((item.recovered ?? 0) + (item.deaths ?? 0)) // Calculate active cases
        }));

        setData(stats);

        // Calculate the current active cases based on the last entry
        const currentActive = stats[stats.length - 1]?.active ?? 0;
        setTotalActive(currentActive);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  return (
    <div className="covid-tiny-line-chart">
      <h3>Total Active Cases: <br></br> {totalActive.toLocaleString()}</h3>
      <LineChart width={300} height={100} data={data}>
        <Tooltip />
        <Line type="monotone" dataKey="active" stroke="#ffc658" strokeWidth={2} />
      </LineChart>
      </div>    
  );
};

export default CovidTinyLineChart;
