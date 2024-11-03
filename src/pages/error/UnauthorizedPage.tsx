import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-dark-primary">
      <h2>Acesso Não Autorizado</h2>
      <p>Você não tem permissão para acessar esta página.</p>
      <Link to="/">Voltar para o login</Link>
    </div>
  );
};

export default UnauthorizedPage;
