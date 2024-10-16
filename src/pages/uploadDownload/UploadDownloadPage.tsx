import Background from '../../components/Background';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import UploadDownloadBox from '../../components/UploadDownloadBox';
import Download from '../../assets/Download.png';
import { Button } from '@mui/material';

const UploadDownloadPage = () => {
  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.userHeaderOptions} />
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-6">
          <p
            className="text-[16px] md:text-[25px] lg:text-[30px] font-semibold font-sofia-sans mr-2"
            style={{ color: '#333333' }}
          >
            Clique aqui para baixar o template
          </p>
          <img src={Download} alt="Download Icon" className="w-6 h-6 md:w-8 md:h-8 ml-2" />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <UploadDownloadBox />
          <div className="pt-6">
            <Button
              className="w-[300px] h-[35px] md:w-[360px] md:h-[45px] lg:w-[500px] lg:h-[55px] xl:w-[600px] xl:h-[65px]"
              variant="outlined"
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default UploadDownloadPage;
