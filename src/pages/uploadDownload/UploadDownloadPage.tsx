import Background from '../../components/Background';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import UploadDownloadBox from '../../components/UploadDownloadBox';
import Download from '../../assets/Download.png';

const UploadDownloadPage = () => {
  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.userManagement} />
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-20 md:mt-20 lg:mt-24">
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
          <button
            className="mt-8 text-blue-500 border border-blue-500 rounded-lg text-[18px] md:text-[20px] lg:text-[25px] xl:text-[30px] flex items-center justify-center
                        w-[300px] h-[35px] md:w-[360px] md:h-[45px] lg:w-[500px] lg:h-[55px] xl:w-[600px] xl:h-[65px] bg-white"
          >
            Enviar
          </button>
        </div>
      </div>
    </Background>
  );
};

export default UploadDownloadPage;
