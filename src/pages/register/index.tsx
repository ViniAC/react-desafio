import React, { useState } from 'react';
import './styles.scss'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { addUser, User, UserList } from '../../redux/userListSlice'
import { Link } from 'react-router-dom';
import { Form, Button, Container, ListGroup, InputGroup, Alert } from 'react-bootstrap'

export default function Register() {
    const dispatch = useDispatch();
    const { userList } = useAppSelector((state: { userList: UserList; }) => state.userList)
    const [userRegistrationData, setUserRegistrationDataData] = useState({ username: "", password: "", confirmPassword: "" });
    const [filter, setFilter] = useState("");
    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState({ success: false, error: false })

    function createAlert(b: boolean) {
        if (b) {
            setAlert({ ...alert, success: true })
            setTimeout(() => {
                setAlert({
                    ...alert,
                    success: false
                })
            }, 5000)
        } else {
            setAlert({ ...alert, error: true })
            setTimeout(() => {
                setAlert({
                    ...alert,
                    error: false
                })
            }, 5000)
        }
    }


    function handleAddUser(e: React.SyntheticEvent | any) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            createAlert(false)
            e.stopPropagation();
        }

        setValidated(true);
        if (userRegistrationData.password === userRegistrationData.confirmPassword) {
            dispatch(addUser({ login: userRegistrationData.username, password: userRegistrationData.password }))
            createAlert(true)
        } else createAlert(false)

    }

    return (
        <Container className='d-flex flex-row justify-content-center align-items-center h-100 w-100 p-5'>

            <Container className='leftContainer h-75 d-flex flex-column justify-content-center'>
                <Form noValidate validated={validated} onSubmit={handleAddUser}>
                    <Alert show={alert.success} key='primary' variant='primary'>
                        Usuário criado!
                    </Alert>
                    <Alert show={alert.error} key='primary' variant='danger'>
                        Erro ao criar usuário!
                    </Alert>
                    <Form.Group className="mb-3 d-flex flex-column" controlId="formUsername">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control id='input-username' required value={userRegistrationData.username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegistrationDataData({ ...userRegistrationData, username: e.target.value })} type="text" placeholder="Nome" />
                        <Form.Label className='mt-3'>Senha</Form.Label>
                        <Form.Control id='input-password' required value={userRegistrationData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegistrationDataData({ ...userRegistrationData, password: e.target.value })} type="password" placeholder="Senha" />
                        <Form.Label className='mt-3'>Confirmar senha</Form.Label>
                        <Form.Control id='input-confirm-password' required value={userRegistrationData.confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserRegistrationDataData({ ...userRegistrationData, confirmPassword: e.target.value })} type="password" placeholder="Senha" />
                        <Button className="mt-5" type="submit">Adicionar</Button>
                    </Form.Group>

                </Form>
                <Link id="to-login" className="btn btn-primary mt-1 "
                    role="button" to={"/"}>voltar</Link>
            </Container>
            <Container className='rightContainer h-75 d-flex flex-column px-5'>
                <Form.Label className='label-size align-self-center'>Lista de usuários</Form.Label>
                <InputGroup>
                    <Form.Control type="text" placeholder="Digite o nome para filtrar" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)} value={filter} />
                </InputGroup>
                <ListGroup className="d-flex mt-4">
                    {userList.filter((user: User) => user.login.startsWith(filter)).map((filteredUser: User, index: React.Key) => (
                        <ListGroup.Item key={index}>
                            {filteredUser.login}
                        </ListGroup.Item>
                    ))}
                </ListGroup>


            </Container>

        </Container>
    )
}


