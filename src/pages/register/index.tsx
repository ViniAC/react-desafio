import React, { useState } from 'react';
import './styles.scss'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/userListSlice'
import { Link } from 'react-router-dom';

export default function Register() {
    const dispatch = useDispatch();
    const { userList } = useAppSelector(state => state.userList)
    const [userRegistrationData, setUserRegistrationDataData] = useState({ username: "", password: "", confirmPassword: "" });
    const [filter, setFilter] = useState("");
    function handleAddUser(e: React.SyntheticEvent) {
        e.preventDefault();
        dispatch(addUser(userRegistrationData.username))
    }

    return (
        <div className='container'>
            <div className='leftContainer'>
                <form onSubmit={handleAddUser}>
                    <h1>Nome</h1>
                    <input value={userRegistrationData.username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegistrationDataData({ ...userRegistrationData, username: e.target.value })} type="text" placeholder="Nome" />
                    <h1>Senha</h1>
                    <input value={userRegistrationData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegistrationDataData({ ...userRegistrationData, password: e.target.value })} type="text" placeholder="Senha" />
                    <h1>Confirmar senha</h1>
                    <input value={userRegistrationData.confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegistrationDataData({ ...userRegistrationData, confirmPassword: e.target.value })} type="text" placeholder="Senha" />
                    <button type="submit">Adicionar</button>
                </form>
                <button ><Link to={"/"}>voltar</Link></button>
            </div>
            <div className='rightContainer'>
                <h1>Lista de usuários</h1>
                <input type="text" placeholder="Digite o nome para filtrar" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)} value={filter} />
                <ul className="user-list" >
                    {userList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    <h1>lista filtrada</h1>
                    {userList.filter(name => name.startsWith(filter)).map(filteredName => (
                        <li>
                            {filteredName}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}


