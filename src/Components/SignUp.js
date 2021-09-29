import Screen from "./Screen";
import styled from 'styled-components';
import { useState} from 'react';
import InputArea from "./InputArea";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

export default function SignUp(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirm, setPasswordConfirm ] = useState('');
    const [ name, setName] = useState('');
    const [check, setCheck] = useState(false);

    function doSignUp(event) {
        event.preventDefault();

        const body = {
            name: name,
            email: email,
            password: password
        }
        const request = axios.post("http://localhost:4000/sign-up", body);
        request.then(loadUser);
        request.catch(tratarErro);
    }

    function tratarErro(erro){
        alert("Dados Incorretos!");
        setEmail("");
        setPassword("");
        setName("");
    }

    function loadUser(object) {
        alert("DEU CERTO");
        setCheck(true);
    }

    function render(){
        if(check === true){
            return (<Redirect to={"/"} />);
        }
    }

    return(
        <Screen>
            <InputArea>
                <Logo>MyWallet</Logo>

                <form onSubmit={doSignUp}>
                <input placeholder="Nome" required type="text" value={name} onChange={e => setName(e.target.value)}/>
                <input placeholder="E-mail" required type="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder="Senha" required type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input placeholder="Confirme a senha..." required type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/" style={{ textDecoration: 'none'}}><LinkText>Já tem uma conta? Entre agora!</LinkText></Link>  
                {render()}
            </InputArea>
            
        </Screen>
    );
}

const Logo = styled.div`
    font-family: 'Saira Stencil One', cursive;
    font-style: normal; 
    font-weight: normal;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 25px;
`;

const LinkText = styled.div`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
`;