import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  LegendItem
} from 'chart.js';
import { useChartFilters } from '../../contexts/ChartFiltersContext';
import { useState } from 'react';

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

Chart.defaults.color = '#333333';
Chart.defaults.font.family = "'Inter', system-ui, 'Avenir', Helvetica, 'Arial', sans-serif";

export default function StackedBarChart() {
  const { good, neutral, bad, setLabels } = useChartFilters();
  const [visibleLabels, setVisibleLabels] = useState(['Ruim', 'Razoável', 'Bom']);

  const handleLegendClick = (_e: ChartEvent, legendItem: LegendItem) => {
    const label = legendItem.text;

    setVisibleLabels((prevLabels) => {
      const updatedLabels = prevLabels.includes(label)
        ? prevLabels.filter((item) => item !== label)
        : [...prevLabels, label];

      setLabels(updatedLabels);
      return updatedLabels;
    });
  };

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
    },
    plugins: {
      legend: {
        onClick: handleLegendClick
      }
    }
  };

  const stackedBarData = {
    labels: ['Período 1', 'Período 2', 'Período 3'],
    datasets: [
      {
        label: 'Pode melhorar',
        data: bad,
        backgroundColor: '#ff5050',
        hidden: !visibleLabels.includes('Ruim')
      },
      {
        label: 'Quase lá',
        data: neutral,
        backgroundColor: '#fdfa20',
        hidden: !visibleLabels.includes('Razoável')
      },
      {
        label: 'Muito bom',
        data: good,
        backgroundColor: '#3be07d',
        hidden: !visibleLabels.includes('Bom')
      }
    ]
  };

  return <Bar options={stackedBarOptions} data={stackedBarData} />;
}
