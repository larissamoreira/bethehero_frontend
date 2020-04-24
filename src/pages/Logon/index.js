import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (err) {
            alert('error');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Logon</h1>

                    <input 
                        type="text" 
                        placeholder="Your ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Log in</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Subscribe
                    </Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}