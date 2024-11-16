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
import ChartModal from '../../components/ChartModal/ChartModal';

const getNumberOfDaysInPeriod = (period: Period) => {
  if (period && period[0] && period[1]) {
    const [startDate, endDate] = period;
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return 0;
};

type Period = [Date, Date] | null;

export default function Dashboard() {
  const { applyFilters, fetchChartData, hasMoreThanTwenty, means, labels } = useChartFilters();
  const { setPossibleFilters } = usePossibleFilters();
  const navigate = useNavigate();

  const [period1, setPeriod1] = useState<Period>(null);
  const [period2, setPeriod2] = useState<Period>(null);
  const [period3, setPeriod3] = useState<Period>(null);

  const hasAllPeriods = !!(period1 || period2 || period3);

  const [averages, setAverages] = useState<number[]>([0, 0, 0]);

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

  const calculateMeans = () => {
    if (!labels || !means) return;

    const periodAverages: number[] = [];

    for (let i = 0; i < 3; i++) {
      let totalMean = 0;
      let totalQuantity = 0;

      if (!means[i]) continue;

      if (labels.includes('Bom')) {
        totalMean += means[i].good_mean.mean;
        totalQuantity += means[i].good_mean.quantity;
      }

      if (labels.includes('Razoável')) {
        totalMean += means[i].neutral_mean.mean;
        totalQuantity += means[i].neutral_mean.quantity;
      }

      if (labels.includes('Ruim')) {
        totalMean += means[i].bad_mean.mean;
        totalQuantity += means[i].bad_mean.quantity;
      }

      const periodAverage = totalQuantity > 0 ? totalMean / totalQuantity : 0;
      const periodAverageRounded = parseFloat(periodAverage.toFixed(2));

      periodAverages.push(periodAverageRounded);
    }

    setAverages(periodAverages);
  };

  useEffect(() => {
    const formattedPeriods = {
      period1:
        period1 && dateFns.isValid(period1[0]) && dateFns.isValid(period1[1])
          ? {
              initial_date: format(period1[0], 'yyyy-MM-dd'),
              final_date: format(period1[1], 'yyyy-MM-dd')
            }
          : {},
      period2:
        period2 && dateFns.isValid(period2[0]) && dateFns.isValid(period2[1])
          ? {
              initial_date: format(period2[0], 'yyyy-MM-dd'),
              final_date: format(period2[1], 'yyyy-MM-dd')
            }
          : {},
      period3:
        period3 && dateFns.isValid(period3[0]) && dateFns.isValid(period3[1])
          ? {
              initial_date: format(period3[0], 'yyyy-MM-dd'),
              final_date: format(period3[1], 'yyyy-MM-dd')
            }
          : {}
    };

    applyFilters({ periods: formattedPeriods });
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

  useEffect(() => {
    calculateMeans();
  }, [labels, means]);

  return (
    <main className="flex flex-col min-h-screen scrollbar">
      <Header headerOptions={defaultHeaderOptions.userHeaderOptions} />
      <StatisticsBar />
      <section className="px-6 flex flex-1 w-full max-w-[1440px] ml-auto mr-auto">
        <FilterSidebar />
        <div className="flex-1 flex flex-col p-4 overflow-x-hidden">
          <div className="flex items-start justify-center gap-4 date-ranges h-14">
            {[period1, period2, period3].map((period, index) => (
              <div className="flex flex-col items-center" key={index}>
                <DateRangePicker
                  key={index}
                  value={period as DateRange | null}
                  onChange={index === 0 ? setPeriod1 : index === 1 ? setPeriod2 : setPeriod3}
                  placeholder={`Período ${index + 1}`}
                  size="md"
                  format="dd/MM/yy"
                  preventOverflow
                  ranges={ranges}
                  disabled={!hasMoreThanTwenty}
                />
                {period && <p className="text-black">{getNumberOfDaysInPeriod(period)} dias</p>}
              </div>
            ))}
          </div>
          <div className="w-full flex-1 flex flex-col items-center justify-center max-h-[500px]">
            <div className="w-[80%] 2xl:w-[70%] flex-1 max-h-[380px]">
              <div className="h-full max-h-[300px] relative flex justify-center items-center">
                {hasMoreThanTwenty ? (
                  !hasAllPeriods && (
                    <ChartModal text="Adicione um período para poder visualizar o gráfico." />
                  )
                ) : (
                  <ChartModal text="É necessário ter 20 ou mais funcionários para realizar o filtro." />
                )}
                <StackedBarChart />
              </div>
              <div className="w-full flex justify-around ml-[3%] mt-8">
                {[averages[0], averages[1], averages[2]].map((value, idx) => (
                  <div
                    key={idx}
                    className="text-black flex items-center justify-center w-24 h-10 border border-1 rounded-lg font-bold"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
