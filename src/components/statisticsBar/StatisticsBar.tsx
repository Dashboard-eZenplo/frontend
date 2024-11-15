import { AccessTime, People, StarBorder, TrendingUp, TrendingDown } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ISuperiorBar } from '../../types/superiorBar';
import { getSuperiorBarData } from '../../services/superiorBar/superiorBar';
import { CircularProgress } from '@mui/material';
import { useChartFilters } from '../../contexts/ChartFiltersContext';

export default function StatisticsBar() {
  const [superiorBarData, setSuperiorBarData] = useState<ISuperiorBar>({
    users: [],
    improved: [],
    hours: 0,
    mean: 0
  });
  const { setHasMoreThanTwentyEmployees, filtersRequest } = useChartFilters();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSuperiorBarData(filtersRequest.periods);

        if (response.message) {
          setHasMoreThanTwentyEmployees(false);
        } else {
          setSuperiorBarData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex justify-center w-full bg-gradient-to-t from-secondary to-primary">
      <div className="w-full max-w-[1440px] h-full py-5 px-6 flex items-center justify-between gap-8">
        <div className="flex justify-between items-center py-4 px-6 flex-1 rounded-2xl bg-background-primary text-zinc-600">
          <div className="flex flex-col gap-[0.25rem]">
            <span className="font-medium text-[0.7rem]">USUÁRIOS ATIVOS</span>
            <strong className="text-[1.3rem] leading-none">
              {superiorBarData.users.length ? (
                `${superiorBarData.users[0]}/${superiorBarData.users[1]}`
              ) : (
                <CircularProgress size={20} />
              )}
            </strong>
          </div>
          <People fontSize="large" />
        </div>

        <div className="flex justify-between items-center py-4 px-6 flex-1 rounded-2xl bg-background-primary text-zinc-600">
          <div className="flex flex-col gap-[0.25rem]">
            <span className="font-medium text-[0.7rem]">FUNCIONÁRIOS MELHORARAM</span>
            <strong className="text-[1.3rem] leading-none">
              {superiorBarData.improved.length ? (
                superiorBarData.improved[0]
              ) : (
                <CircularProgress size={20} />
              )}
            </strong>
          </div>
          <TrendingUp fontSize="large" className="text-state-success" />
        </div>

        <div className="flex justify-between items-center py-4 px-6 flex-1 rounded-2xl bg-background-primary text-zinc-600">
          <div className="flex flex-col gap-[0.25rem]">
            <span className="font-medium text-[0.7rem]">FUNCIONÁRIOS PIORARAM</span>
            <strong className="text-[1.3rem] leading-none">
              {superiorBarData.improved.length ? (
                superiorBarData.improved[1]
              ) : (
                <CircularProgress size={20} />
              )}
            </strong>
          </div>
          <TrendingDown fontSize="large" className="text-state-error" />
        </div>

        <div className="flex justify-between items-center py-4 px-6 flex-1 rounded-2xl bg-background-primary text-zinc-600">
          <div className="flex flex-col gap-[0.25rem]">
            <span className="font-medium text-[0.7rem]">HORAS REGISTRADAS</span>
            <strong className="text-[1.3rem] leading-none">
              {superiorBarData.hours ? (
                superiorBarData.hours.toFixed(0)
              ) : (
                <CircularProgress size={20} />
              )}
            </strong>
          </div>
          <AccessTime fontSize="large" />
        </div>

        <div className="flex justify-between items-center py-4 px-6 flex-1 rounded-2xl bg-background-primary text-zinc-600">
          <div className="flex flex-col gap-[0.25rem]">
            <span className="font-medium text-[0.7rem]">MÉDIA AVALIAÇÃO ATIVIDADES</span>
            <strong className="text-[1.3rem] leading-none">
              {superiorBarData.mean ? (
                superiorBarData.mean.toFixed(2)
              ) : (
                <CircularProgress size={20} />
              )}
            </strong>
          </div>
          <StarBorder fontSize="large" />
        </div>
      </div>
    </section>
  );
}
