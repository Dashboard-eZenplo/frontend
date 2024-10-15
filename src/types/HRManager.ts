export interface IHRManager {
  id: number;
  cnpj: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  admin?: boolean;
}
