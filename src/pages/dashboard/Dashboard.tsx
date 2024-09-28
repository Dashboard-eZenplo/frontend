import FilterSidebar from '../../components/filterSidebar/FilterSidebar';
import Header from '../../components/Header';
import StatisticCard from '../../components/statisticCard/StatisticCard';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import StackedBarChart from '../../components/stackedBarChart/StackedBarChart';
import DateRangePicker, { DateRange, RangeType } from 'rsuite/DateRangePicker';
import '../../styles/rsuite/styles.css';
import { useState } from 'react';
import * as dateFns from 'date-fns';

const statistics = [
  {
    title: 'Usuários Ativos',
    value: '87 / 110',
    percentage: 80
  },
  {
    title: 'Atividades Registradas',
    value: '1.042',
    percentage: 75
  },
  {
    title: 'Horas Registradas',
    value: '3.545',
    percentage: 90
  },
  {
    title: 'Média Avaliação Atividades',
    value: '7,5 / 10',
    percentage: 80
  }
];

export default function Dashboard() {
  const [period1, setPeriod1] = useState<[Date, Date] | null>(null);
  const [period2, setPeriod2] = useState<[Date, Date] | null>(null);
  const [period3, setPeriod3] = useState<[Date, Date] | null>(null);

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

  return (
    <main className="flex flex-col min-h-screen scrollbar">
      <Header headerOptions={defaultHeaderOptions.userManagement} />

      <section className="flex justify-center w-full bg-gradient-to-t from-secondary to-primary">
        <div className="w-full max-w-[1440px] h-full py-5 px-6 flex items-center justify-between gap-8">
          {statistics &&
            statistics.map((statistic, index) => <StatisticCard key={index} data={statistic} />)}
        </div>
      </section>

      <section className="px-6 flex flex-1 w-full max-w-[1440px] ml-auto mr-auto">
        <FilterSidebar />
        <div className="flex-1 flex flex-col p-4 overflow-x-hidden">
          <div className="flex items-center justify-center gap-4 date-ranges">
            <DateRangePicker
              value={period1}
              onChange={setPeriod1}
              placeholder="Período 1"
              size="md"
              format="dd/MM/yy"
              preventOverflow
              ranges={ranges}
            />
            <DateRangePicker
              value={period2}
              onChange={setPeriod2}
              placeholder="Período 2"
              size="md"
              format="dd/MM/yy"
              preventOverflow
              ranges={ranges}
            />
            <DateRangePicker
              value={period3}
              onChange={setPeriod3}
              placeholder="Período 3"
              size="md"
              format="dd/MM/yy"
              preventOverflow
              ranges={ranges}
            />
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
