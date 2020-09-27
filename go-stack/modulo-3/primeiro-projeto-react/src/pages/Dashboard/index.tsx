import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>

    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
      <a href="teste">
        <img
          src="https://avatars1.githubusercontent.com/u/25985806?s=460&u=db46f8da38f28d102aa76ced192934c7b643183f&v=4"
          alt="Kauan Polydoro"
        />
        <div>
          <strong>rocketseat/unform</strong>
          <p>Easy peasy highly scalable ReactJS forms</p>
        </div>
        <FiChevronRight size={20} />
      </a>
      <a href="teste">
        <img
          src="https://avatars1.githubusercontent.com/u/25985806?s=460&u=db46f8da38f28d102aa76ced192934c7b643183f&v=4"
          alt="Kauan Polydoro"
        />
        <div>
          <strong>rocketseat/unform</strong>
          <p>Easy peasy highly scalable ReactJS forms</p>
        </div>
        <FiChevronRight size={20} />
      </a>
      <a href="teste">
        <img
          src="https://avatars1.githubusercontent.com/u/25985806?s=460&u=db46f8da38f28d102aa76ced192934c7b643183f&v=4"
          alt="Kauan Polydoro"
        />
        <div>
          <strong>rocketseat/unform</strong>
          <p>Easy peasy highly scalable ReactJS forms</p>
        </div>
        <FiChevronRight size={20} />
      </a>
    </Repositories>
  </>
);

export default Dashboard;
