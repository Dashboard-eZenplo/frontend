interface StatisticData {
  title: string;
  value: string;
  percentage: number;
}

export default function StatisticCard({ data }: { data: StatisticData }) {
  return (
    <div className="flex flex-col justify-between gap-[0.25rem] py-2 px-6 flex-1 h-2/3 rounded-2xl bg-background-primary text-zinc-800">
      <span className="font-medium text-[0.75rem]">{data.title.toUpperCase()}</span>
      <strong className="text-[1.3rem] leading-none">{data.value}</strong>
      <div className="flex gap-2 items-center">
        <span className="text-state-success font-bold text-[0.75rem]">+{data.percentage}%</span>
        <p className="text-[0.75rem]">{data.title}</p>
      </div>
    </div>
  );
}
