import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useChartFilters } from '../../contexts/ChartFiltersContext';

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

Chart.defaults.color = '#333333';
Chart.defaults.font.family = "'Inter', system-ui, 'Avenir', Helvetica, 'Arial', sans-serif";

export default function StackedBarChart() {
  const { good, neutral, bad } = useChartFilters();

  const stackedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  const stackedBarData = {
    labels: ['Período 1', 'Período 2', 'Período 3'],
    datasets: [
      {
        label: 'Ruim',
        data: bad,
        backgroundColor: '#ff5050'
      },
      {
        label: 'Razoável',
        data: neutral,
        backgroundColor: '#fdfa20'
      },
      {
        label: 'Bom',
        data: good,
        backgroundColor: '#3be07d'
      }
    ]
  };

  return <Bar options={stackedBarOptions} data={stackedBarData} />;
}
