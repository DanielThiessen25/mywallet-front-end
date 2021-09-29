import Screen from "./Screen";
import { useState, useContext } from 'react';
import styled from 'styled-components';
import InputArea from "./InputArea";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import { render } from "react-dom";

export default function AddIn() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [finish, setFinish] = useState(false);
    


    function doAddIn(event){
        const config = {
            headers: {
                Authorization: "Bearer " + user.token
            }
        }
        event.preventDefault();
        let amountNumber = parseFloat(amount.replace(/,/, '.'));
        if(!isNaN(amountNumber)){
            const body = {value: amountNumber.toFixed(2), description:description};
            const requisicao = axios.post("http://localhost:4000/nova-entrada", body, config);
            requisicao.then(loadRecords);
            requisicao.catch();
        }
        else{
            setAmount('');
            setDescription('');
        }
        
    }

    function loadRecords(){
        setAmount('');
        setDescription('');
        setFinish(true);
    }

    function render(){
        if(finish === true){
            return (<Redirect to={"/records"} />);
        }
    }


    return (
        <Screen>
            <Heading>
                Nova entrada
            </Heading>
            <InputArea>
            <form onSubmit={doAddIn}>
                    <input placeholder="Valor" required type="text" value={amount} onChange={e => setAmount(e.target.value)} />
                    <input placeholder="Descrição" required type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    <button type="submit">Salvar entrada</button>
            </form>
            {render()}
            </InputArea>
            <Fill></Fill>
        </Screen>
    );
}

const Heading = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom: 23px;
`;

const Fill = styled.div`
    width: 100%;
    height: 100%;
`;