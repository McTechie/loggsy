type NavLink = {
  title: string;
  href: string;
  icon: SVG;
}

type Log = {
  id: string;
  timestamp: number;
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
