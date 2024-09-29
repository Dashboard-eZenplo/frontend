const UploadDownloadBox = () => {
  return (
    <div className="flex flex-col items-center text-zinc-700">
      <div className="border border-black rounded-lg h-[400px] lg:h-[450px] w-full xl:w-[1300px] flex flex-col items-center justify-between bg-white p-4">
        <div className="flex flex-col items-center">
          <p className="text-[20px] md:text-[20px] lg:text-[40px] font-semibold mb-1">
            Arraste & Solte arquivos aqui
          </p>
          <p className="text-[16px] md:text-[23px] lg:text-[28px] text-center">
            (apenas arquivos .csv baixados do template)
          </p>

          <div className="mt-[90px]">
            <p className="text-[20px] md:text-[30px] lg:text-[35px] font-medium">OU</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="bg-primary text-white rounded-lg text-[20px] md:text-[25px] lg:text-[30px] flex items-center justify-center border-0
                        w-[190px] md:w-[250px] lg:w-[350px] h-[45px] md:h-[60px] lg:h-[70px]"
          >
            Meus Arquivos
          </button>

          <p className="mt-2 text-center text-[18px] md:text-[25px] lg:text-[30px]">
            Faça upload pelos seus arquivos
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadDownloadBox;
