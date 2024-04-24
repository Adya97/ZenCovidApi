import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CovidStats, ApiCovidStats } from '../../interfaces'; 
import "./chartbox.scss"

const formatYAxis = (tickItem: number) => {
  return `${(tickItem / 1000).toFixed(0)}k`;
};

const CovidChart: React.FC = () => {
  const [data, setData] = useState<CovidStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://coronavirus-smartable.p.rapidapi.com/stats/v1/US/', {
          headers: {
            'x-rapidapi-host': 'coronavirus-smartable.p.rapidapi.com',
            'x-rapidapi-key': '458a59c65amsh41181a971e743a4p1204d0jsn77ed08dc1f68'
          }
        });
        const stats: CovidStats[] = response.data.stats.history.map((item: ApiCovidStats) => ({
          date: item.date.substring(0, 4),
          confirmed: item.confirmed,
          deaths: item.deaths,
          recovered: item.recovered
        }));

        setData(stats);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="CovidChartContainer">
      <h2>Survival Analysis</h2><br />
      <AreaChart width={630} height={400} data={data} margin={{ top: 30, right: 10, left: 0, bottom: 40 }}>
        <defs>
          <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>     
        </defs>
        <XAxis dataKey="date" interval="preserveStartEnd" angle={-45} textAnchor="end" tickMargin={10} />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Area type="monotone" dataKey="confirmed" stroke="#8884d8" fillOpacity={1} fill="url(#colorConfirmed)" />
        <Area type="monotone" dataKey="deaths" stroke="#cf3821" fillOpacity={1} fill="url(#colorDeaths)" />
      </AreaChart>
      </div>
    </>
  );
};

export default CovidChart;
