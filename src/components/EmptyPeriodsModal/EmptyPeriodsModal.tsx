export default function EmptyPeriodsModal() {
  return (
    <div className="w-full max-w-[300px] absolute border-[3px] border-primary rounded-[15px] p-6 text-center bg-white shadow-lg shadow-zinc-400">
      <p className="text-zinc-800">
        Adicione um <span className="text-primary">período</span> para poder visualizar o gráfico.
      </p>
    </div>
  );
}
