import { useState } from 'react';
import { Dayjs } from 'dayjs';
import FilterSidebar from '../../components/filterSidebar/FilterSidebar';
import Header from '../../components/Header';
import StatisticCard from '../../components/statisticCard/StatisticCard';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StackedBarChart from '../../components/stackedBarChart/StackedBarChart';

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
    title: 'Média de Avaliação das Atividades',
    value: '7,5 / 10',
    percentage: 80
  }
];

export default function Dashboard() {
  const [initialDatePeriod1, setInitialDatePeriod1] = useState<Dayjs | null>(null);
  const [finalDatePeriod1, setFinalDatePeriod1] = useState<Dayjs | null>(null);

  const [initialDatePeriod2, setInitialDatePeriod2] = useState<Dayjs | null>(null);
  const [finalDatePeriod2, setFinalDatePeriod2] = useState<Dayjs | null>(null);

  const [initialDatePeriod3, setInitialDatePeriod3] = useState<Dayjs | null>(null);
  const [finalDatePeriod3, setFinalDatePeriod3] = useState<Dayjs | null>(null);

  return (
    <main className="flex flex-col min-h-screen scrollbar">
      <Header headerOptions={defaultHeaderOptions.userManagement} />

      <section className="flex justify-center w-full bg-gradient-to-t from-secondary to-primary">
        <div className="w-full max-w-screen-xxl h-full p-[1.6rem] flex items-center justify-between gap-8">
          {statistics &&
            statistics.map((statistic, index) => <StatisticCard key={index} data={statistic} />)}
        </div>
      </section>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <section className="px-[1.6rem] flex flex-1 w-full max-w-screen-xxl ml-auto mr-auto">
          <FilterSidebar />
          <div className="flex-1 flex flex-col p-4 overflow-x-hidden">
            <div className="flex items-center gap-8 pb-2 overflow-x-scroll scrollbar">
              <div className="flex items-center gap-2">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data Início"
                    value={initialDatePeriod1}
                    onChange={(newValue) => setInitialDatePeriod1(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small'
                      }
                    }}
                  />
                </DemoContainer>

                <span className="w-[0.4rem] h-[0.05rem] rounded bg-zinc-400 mt-2"></span>

                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data Final"
                    value={finalDatePeriod1}
                    onChange={(newValue) => setFinalDatePeriod1(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small'
                      }
                    }}
                  />
                </DemoContainer>
              </div>

              <div className="flex items-center gap-2">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data Início"
                    value={initialDatePeriod2}
                    onChange={(newValue) => setInitialDatePeriod2(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small'
                      }
                    }}
                  />
                </DemoContainer>

                <span className="w-[0.4rem] h-[0.05rem] rounded bg-zinc-400 mt-2"></span>

                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data Final"
                    value={finalDatePeriod2}
                    onChange={(newValue) => setFinalDatePeriod2(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small'
                      }
                    }}
                  />
                </DemoContainer>
              </div>

              <div className="flex items-center gap-2">
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data Início"
                    value={initialDatePeriod3}
                    onChange={(newValue) => setInitialDatePeriod3(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small'
                      }
                    }}
                  />
                </DemoContainer>

                <span className="w-[0.4rem] h-[0.05rem] rounded bg-zinc-400 mt-2"></span>

                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Data Final"
                    value={finalDatePeriod3}
                    onChange={(newValue) => setFinalDatePeriod3(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small'
                      }
                    }}
                  />
                </DemoContainer>
              </div>
            </div>

            <div className="w-full flex-1 flex items-end justify-center">
              <div className="w-[70%] h-[70%]">
                <StackedBarChart />
              </div>
            </div>
          </div>
        </section>
      </LocalizationProvider>
    </main>
  );
}
