import Screen from "./Screen";
import styled from 'styled-components';
import { useState, useContext} from 'react';
import InputArea from "./InputArea";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import UserContext from '../contexts/UserContext';


export default function Login(){
    const { user, setUser } = useContext(UserContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [check, setCheck] = useState('');
    
    function doLogin(event) {
        event.preventDefault();
        const body = {
            email: email,
            password: password
        }

        const requisicao = axios.post("http://localhost:4000/", body);
        requisicao.then(loadUser);
        requisicao.catch(tratarErro);
    }
    function tratarErro(error) {
        alert("Dados Incorretos!");
        setEmail("");
        setPassword("");
    }   
    function loadUser(object){
        alert("DEU CERTO");
        console.log(object.data);
        setUser(object.data);
        setCheck(true);
    }

    function render(){
        if(check === true){
            return (<Redirect to={"/records"} />);
        }
    }

    return(
        <Screen>
            <InputArea>
                <Logo>MyWallet</Logo>
                <form onSubmit={doLogin}>
                <input placeholder="E-mail" required type="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder="Senha" required type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Entrar</button>
                </form>
                <Link to="/sign-up" style={{ textDecoration: 'none'}}><LinkText>Primeira vez? Cadastre-se!</LinkText></Link>
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