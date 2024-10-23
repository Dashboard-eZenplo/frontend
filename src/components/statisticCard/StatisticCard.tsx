interface StatisticData {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatisticCard({ data }: { data: StatisticData }) {
  return (
    <div className="flex justify-between items-center py-4 px-6 flex-1 h-2/3 rounded-2xl bg-background-primary text-zinc-800">
      <div className="flex flex-col gap-[0.25rem]">
        <span className="font-medium text-[0.75rem]">{data.title.toUpperCase()}</span>
        <strong className="text-[1.4rem] leading-none">{data.value}</strong>
      </div>
      {data.icon}
    </div>
  );
}
