import React, { useState } from 'react';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePictrue } from './styled';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  React.useEffect(() => {
    async function getData() {
      const resp = await axios.get('/alunos');
      setAlunos(resp.data);
    }
    getData();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <ProfilePictrue>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePictrue>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
