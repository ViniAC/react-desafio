import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useAppSelector } from '../../redux/hooks';
import { UserList } from '../../redux/userListSlice';

export default function Login() {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState({ success: false, error: false })
    const { userList } = useAppSelector((state: { userList: UserList; }) => state.userList)

    function handleLogin(e: React.SyntheticEvent | any) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        const result = userList.filter(function (el) {
            return el.login === loginData.username && el.password === loginData.password
        })
        if (result.length > 0) {
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




    return (
        <Container className='h-100'>

            <Container className='container d-flex justify-content-center h-100 align-items-center'>
                <Form noValidate validated={validated} onSubmit={handleLogin} className='h-50 w-75 p-5 border border-secondary rounded'>
                    <Alert show={alert.success} key='primary' variant='primary'>
                        Usuário logado!
                    </Alert>
                    <Alert show={alert.error} key='primary' variant='danger'>
                        Usuário não existe!
                    </Alert>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, username: e.target.value })} type="text" placeholder="Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control required type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, password: e.target.value })} placeholder="Password" />
                    </Form.Group>
                    <Container className='d-flex flex-column h-25'>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Link className="btn btn-primary mt-2"
                            role="button"
                            to="/register">Cadastrar usuário</Link>
                    </Container>
                </Form>
            </Container>
        </Container >
    )
}
