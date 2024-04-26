import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./newcasesbarchart.scss"
import { ApiCovidStats, MonthlyCases, ChartProps} from '../../interfaces';

const CovidBarChart: React.FC<ChartProps> = ({ apiHost, apiKey }) => {
  const [monthlyCases, setMonthlyCases] = useState<MonthlyCases[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://${apiHost}/stats/v1/US/`, {
          headers: {
            'x-rapidapi-host': apiHost,
            'x-rapidapi-key': apiKey
          }
        });

        // Initializing an object with all months set to zero for the year 2020
        const monthlyData: { [key: string]: number } = {};
        for (let i = 0; i < 12; i++) {
          const month = new Date(2020, i).toLocaleString('default', { month: 'long' });
          monthlyData[month] = 0;
        }

        response.data.stats.history
          .filter((stat: ApiCovidStats) => new Date(stat.date).getFullYear() === 2020)
          .forEach((stat: ApiCovidStats) => {
            const month = new Date(stat.date).toLocaleString('default', { month: 'long' });
            monthlyData[month] += stat.confirmed;
          });

        // Converting the object into an array
        setMonthlyCases(Object.entries(monthlyData).map(([month, newCases]) => ({
          month,
          newCases
        })));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [apiHost, apiKey]);

  // Y-axis to display numbers as 'k' for thousands
  const formatYAxis = (tickItem: number) => `${(tickItem / 1000).toFixed(0)}k`;

  return (
    <div className="covidBarChartContainer">
    <h3>COVID-19 Cases 2020</h3>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={monthlyCases}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <XAxis dataKey="month" interval={0} angle={-45} textAnchor="end" height={70} />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Legend />
        <Bar dataKey="newCases" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
   </div>
  );
};

export default CovidBarChart;
