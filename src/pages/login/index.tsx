import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'

export default function Login() {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    return (
        <div className='container'>
            <h1>Username</h1>
            <input value={loginData.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, username: e.target.value })} type="text" placeholder="Username" />
            <h1>password</h1>
            <input value={loginData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, password: e.target.value })} type="text" placeholder="Password" />
            <button ><Link to="register">Cadastrar usuário</Link></button>
        </div>
    )
}