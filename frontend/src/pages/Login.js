import React, {useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login( { history }) {
  const [username, setUsername] = useState('');
  async function handleSubmit(e) {
    e.preventDefault(); //Evita redirecionamento do Submit

    const response = await api.post('/devs', {
      username,
    })
    const { _id } = response.data;

    history.push( `/dev/${_id}` );
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo Tindev"/>
        <input
          placeholder="Digite seu Usuário do Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}