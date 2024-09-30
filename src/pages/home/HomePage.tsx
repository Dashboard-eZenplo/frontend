import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';

function HomePage() {
  return (
    <div>
      <Header headerOptions={defaultHeaderOptions.userHeaderOptions} />
    </div>
  );
}

export default HomePage;
