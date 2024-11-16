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
  LegendItem,
  ChartEvent,
  LegendElement,
} from 'chart.js';
import { useChartFilters } from '../../contexts/ChartFiltersContext';
import { useRef } from 'react';

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

Chart.defaults.color = '#333333';
Chart.defaults.font.family = "'Inter', system-ui, 'Avenir', Helvetica, 'Arial', sans-serif";

export default function StackedBarChart() {
  const { good, neutral, bad, setLabels } = useChartFilters();
  const chartRef = useRef<Chart<'bar'> | null>(null);

  function handleLegendClick(this: LegendElement<'bar'>, e: ChartEvent, legendItem: LegendItem) {
    const chartInstance = chartRef.current;
    const datasetIndex = legendItem.datasetIndex;

    if (chartInstance && datasetIndex !== undefined) {
      const meta = chartInstance.getDatasetMeta(datasetIndex);
      meta.hidden = !meta.hidden;
      chartInstance.update();

      setLabels((prev) => {
        const label = legendItem.text;
        return meta.hidden ? prev.filter((item) => item !== label) : [...prev, label];
      });
    }
  }
  
  const stackedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: handleLegendClick
      }
    },
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
