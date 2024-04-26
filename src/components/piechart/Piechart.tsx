import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { CovidStats, ChartProps } from '../../interfaces';
import "./piechart.scss"

const CovidPieChart: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [covidData, setCovidData] = useState<CovidStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://${apiHost}/stats/v1/US/`, {
          headers: {
            'x-rapidapi-host': apiHost,
            'x-rapidapi-key': apiKey
          }
        });

        // Assume the response contains an array of daily stats with confirmed, recovered, and death counts
        setCovidData(response.data.stats.history);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  
  // Calculate the latest total stats
  const latestData = covidData[covidData.length - 1];
  const totalConfirmed = latestData?.confirmed ?? 0;
  const totalDeaths = latestData?.deaths ?? 0;
  const totalRecovered = latestData?.recovered ?? 0;
  const totalActive = totalConfirmed - totalDeaths - totalRecovered;

  const pieData = [
    { name: 'Total Deaths', value: totalDeaths },
    { name: 'Total Confirmed Cases', value: totalConfirmed },
    { name: 'Total Recovered Patients', value: totalRecovered },
    { name: 'Total Active Cases', value: totalActive },
  ];

  // Colors for each slice
  const COLORS = ['#cf3821', '#8884d8', '#00C49F', '#FFBB28'];

  return (
    <>
    <div className="covid-pie-chart">
    <h2>Leads by Sources</h2>  
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}  
          labelLine={false}
          innerRadius="70%"
          outerRadius="90%"
          dataKey="value"
          paddingAngle={5}
        >
          {covidData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
    </>
  );
};

export default CovidPieChart;
