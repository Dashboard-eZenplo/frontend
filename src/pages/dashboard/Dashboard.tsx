import FilterSidebar from '../../components/filterSidebar/FilterSidebar';
import Header from '../../components/Header';
import StatisticCard from '../../components/statisticCard/StatisticCard';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import StackedBarChart from '../../components/stackedBarChart/StackedBarChart';
import DateRangePicker, { DateRange, RangeType } from 'rsuite/DateRangePicker';
import '../../styles/rsuite/styles.css';
import { useEffect, useState } from 'react';
import * as dateFns from 'date-fns';
import { useChartFilters } from '../../contexts/ChartFiltersContext';
import { format } from 'date-fns';
import { AccessTime, EditCalendar, People, StarBorder } from '@mui/icons-material';

type Period = [Date, Date];

const getNumberOfDaysInPeriod = (period: Period) => {
  if (period) {
    const [startDate, endDate] = period;
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return 0;
};

const statistics = [
  {
    title: 'Usuários Ativos',
    value: '87 / 110',
    icon: <People fontSize="large" />
  },
  {
    title: 'Atividades Registradas',
    value: '1.042',
    icon: <EditCalendar fontSize="large" />
  },
  {
    title: 'Horas Registradas',
    value: '3.545',
    icon: <AccessTime fontSize="large" />
  },
  {
    title: 'Média Avaliação Atividades',
    value: '7,5 / 10',
    icon: <StarBorder fontSize="large" />
  }
];

export default function Dashboard() {
  const { applyFilters } = useChartFilters();

  const [period1, setPeriod1] = useState<Period | null>(null);
  const [period2, setPeriod2] = useState<Period | null>(null);
  const [period3, setPeriod3] = useState<Period | null>(null);

  const ranges: RangeType<DateRange>[] = [
    {
      label: 'Hoje',
      value: [dateFns.startOfDay(new Date()), dateFns.endOfDay(new Date())]
    },
    {
      label: 'Ontem',
      value: [
        dateFns.startOfDay(dateFns.addDays(new Date(), -1)),
        dateFns.endOfDay(dateFns.addDays(new Date(), -1))
      ]
    },
    {
      label: 'Últimos 7 dias',
      value: [dateFns.startOfDay(dateFns.subDays(new Date(), 6)), dateFns.endOfDay(new Date())]
    },
    {
      label: 'Últimos 30 dias',
      value: [dateFns.startOfDay(dateFns.subDays(new Date(), 6)), dateFns.endOfDay(new Date())]
    }
  ];

  useEffect(() => {
    const periods = [period1, period2, period3]
      .filter((p): p is Period => p !== null)
      .map(([startDate, endDate]) => ({
        initial_date: format(startDate, 'yyyy-MM-dd'),
        final_date: format(endDate, 'yyyy-MM-dd')
      }));

    applyFilters({ periods });
  }, [period1, period2, period3]);

  return (
    <main className="flex flex-col min-h-screen scrollbar">
      <Header headerOptions={defaultHeaderOptions.userHeaderOptions} />

      <section className="flex justify-center w-full bg-gradient-to-t from-secondary to-primary">
        <div className="w-full max-w-[1440px] h-full py-5 px-6 flex items-center justify-between gap-8">
          {statistics &&
            statistics.map((statistic, index) => <StatisticCard key={index} data={statistic} />)}
        </div>
      </section>

      <section className="px-6 flex flex-1 w-full max-w-[1440px] ml-auto mr-auto">
        <FilterSidebar />
        <div className="flex-1 flex flex-col p-4 overflow-x-hidden">
          <div className="flex items-start justify-center gap-4 date-ranges h-14">
            <div className="flex flex-col items-center">
              <DateRangePicker
                value={period1}
                onChange={setPeriod1}
                placeholder="Período 1"
                size="md"
                format="dd/MM/yy"
                preventOverflow
                ranges={ranges}
              />
              {period1 && <p className="text-black">{getNumberOfDaysInPeriod(period1)} dias</p>}
            </div>
            <div className="flex flex-col items-center">
              <DateRangePicker
                value={period2}
                onChange={setPeriod2}
                placeholder="Período 2"
                size="md"
                format="dd/MM/yy"
                preventOverflow
                ranges={ranges}
              />
              {period2 && <p className="text-black">{getNumberOfDaysInPeriod(period2)} dias</p>}
            </div>
            <div className="flex flex-col items-center">
              <DateRangePicker
                value={period3}
                onChange={setPeriod3}
                placeholder="Período 3"
                size="md"
                format="dd/MM/yy"
                preventOverflow
                ranges={ranges}
              />
              {period3 && <p className="text-black">{getNumberOfDaysInPeriod(period3)} dias</p>}
            </div>
          </div>

          <div className="w-full flex-1 flex items-center justify-center max-h-[500px]">
            <div className="w-[80%] 2xl:w-[70%] h-[70%] max-h-[380px]">
              <StackedBarChart />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
