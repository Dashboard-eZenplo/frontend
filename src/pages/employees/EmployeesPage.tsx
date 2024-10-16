import EmployeesTable from '../../components/EmployeesTable';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import Background from '../../components/Background';

function EmployeesPage() {
  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.logoutOnly} />
      <div className="relative flex flex-col items-center p-3 min-h-screen">
        <div className="flex justify-center w-full mb-8">
          <EmployeesTable />
        </div>
      </div>
    </Background>
  );
}

export default EmployeesPage;
