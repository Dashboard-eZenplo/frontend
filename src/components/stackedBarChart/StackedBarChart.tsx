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

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

Chart.defaults.color = '#333333';
Chart.defaults.font.family = "'Inter', system-ui, 'Avenir', Helvetica, 'Arial', sans-serif";

export default function StackedBarChart() {
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
        label: 'Dataset 1',
        data: [14, 24, 36],
        backgroundColor: '#ff5353'
      },
      {
        label: 'Dataset 2',
        data: [16, 22, 32],
        backgroundColor: '#ffff1e'
      },
      {
        label: 'Dataset 3',
        data: [12, 26, 34],
        backgroundColor: '#22ec73'
      }
    ]
  };

  return <Bar options={stackedBarOptions} data={stackedBarData} />;
}
