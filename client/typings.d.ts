type NavLink = {
  title: string;
  href: string;
  icon: SVG;
}

type Log = {
  timestamp: string | number | Date;
  id: string;
  severity: 1 | 2 | 3 | 4 | 5 | 6;
  source: string;
  message: string;
}

type FilterFormData = {
  fromDate: string;
  toDate: string;
  severity: number;
  source: string;
}

type TimeChartData = {
  type: 'daily' | 'weekly' | 'monthly';
  data: {
    severity: 1 | 2 | 3 | 4 | 5 | 6;
    count: number;
  }[];
}

type AnnualChartData = {
  date: string;
  count: number;
}

type SeverityChartData = {
  severity: 1 | 2 | 3 | 4 | 5 | 6;
  count: number;
}
