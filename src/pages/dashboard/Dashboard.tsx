import FilterSidebar from '../../components/filterSidebar/FilterSidebar';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import StackedBarChart from '../../components/stackedBarChart/StackedBarChart';
import DateRangePicker, { DateRange, RangeType } from 'rsuite/DateRangePicker';
import '../../styles/rsuite/styles.css';
import { useEffect, useState } from 'react';
import * as dateFns from 'date-fns';
import { useChartFilters } from '../../contexts/ChartFiltersContext';
import { format } from 'date-fns';
import { getPossibleFilters } from '../../services/filters/filtersService';
import { usePossibleFilters } from '../../contexts/PossibleFiltersContext';
import { getEmployees } from '../../services/employees/employeeService';
import { useNavigate } from 'react-router-dom';
import StatisticsBar from '../../components/statisticsBar/StatisticsBar';

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

export default function Dashboard() {
  const { applyFilters, fetchChartData } = useChartFilters();
  const { setPossibleFilters } = usePossibleFilters();
  const navigate = useNavigate();

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
      value: [dateFns.startOfDay(dateFns.subDays(new Date(), 29)), dateFns.endOfDay(new Date())]
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await getEmployees();
        if (employees.length === 0) navigate('/upload');

        const response = await getPossibleFilters();
        setPossibleFilters(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return (
    <main className="flex flex-col min-h-screen scrollbar">
      <Header headerOptions={defaultHeaderOptions.userHeaderOptions} />

      <StatisticsBar />

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

          <div className="w-full flex-1 flex flex-col items-center justify-center max-h-[500px]">
            <div className="w-[80%] 2xl:w-[70%] flex-1 max-h-[380px]">
              <div className=" h-full max-h-[300px]">
                <StackedBarChart />
              </div>
              <div className="w-full flex justify-around  ml-[3%] mt-8">
                <div className="text-black flex items-center justify-center w-24 h-10 border border-1 rounded-lg font-bold">
                  6,5
                </div>
                <div className="text-black flex items-center justify-center w-24 h-10 border border-1 rounded-lg font-bold">
                  7,1
                </div>
                <div className="text-black flex items-center justify-center w-24 h-10 border border-1 rounded-lg font-bold">
                  8,4
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
