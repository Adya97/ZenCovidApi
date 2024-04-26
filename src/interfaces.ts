export interface User {
    id: number;
    username: string;
    email: string;
    img: string; 
    amount: string; 
  }
  
export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface CovidStats {
  date: string; 
  confirmed: number;
  deaths: number;
  recovered?: number; 
}

export interface ApiCovidStats {
  date: string; 
  confirmed: number;
  deaths: number;
  recovered?: number; 
}

export interface ChartProps {
  apiHost: string;
  apiKey: string;
}

export interface CovidDailyStats {
  date: string;
  confirmed: number;
}

export interface CovidStatsDaily {
  totalConfirmed: number;
  dailyStats: CovidDailyStats[];
}

export interface MonthlyCases {
  month: string;
  newCases: number;
}

export interface MonthlyDeaths {
  month: string;
  deaths: number;
}
