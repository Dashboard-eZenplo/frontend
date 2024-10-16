import { Button } from '@mui/material';

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

          <div className="mt-20">
            <p className="text-[20px] md:text-[30px] lg:text-[35px] font-medium">OU</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Button
            className="w-[300px] h-[35px] md:w-[360px] md:h-[45px] lg:w-[500px] lg:h-[55px] xl:w-[600px] xl:h-[65px]"
            variant="contained"
          >
            Meus Arquivos
          </Button>

          <p className="mt-2 text-center text-[18px] md:text-[25px] lg:text-[30px]">
            Faça upload pelos seus arquivos
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadDownloadBox;
