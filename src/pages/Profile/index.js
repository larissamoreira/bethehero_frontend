import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err) {
            alert('Error. Try again.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="be the hero" />
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new">Register new case</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Registered cases</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASE:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>COST:</strong>
                        <p>{Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}