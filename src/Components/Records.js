import Screen from "./Screen";
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { IoExitOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export default function Records() {

    const { user, setUser } = useContext(UserContext);
    const [list, setList] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + user.token
            }
        }
        const requisicao = axios.get("http://localhost:4000/records", config);

        requisicao.then(resposta => {
            setList(resposta.data);
        });
    }, []);

    function printRecords(){
        if(list != null && list.length != 0){
            console.log(list);
            return(
                list.map(item => 
                    <Item>
                    <h3>{item.date}</h3>
                    <h2>{item.description}</h2>
                    {(item.operation === 'in')? 
                    <h4>{item.value}</h4>
                    : <h5>{item.value}</h5>}
                    </Item>
                )
                );
        }
        else{
            return(<p>Não há registros de entrada ou saída</p>);
        }
    }

    function sumRecords(){
        let sum = 0;
        if(list != null && list.length != 0){
            for(let i =0; i<list.length; i++){
                if(list[i].operation === 'in'){
                    sum = sum +  parseFloat(list[i].value);
                    console.log(sum);
                }
                else{
                    sum = sum - list[i].value;
                    console.log(sum);
                }
            }
            if(sum>=0){
                return(<h4>{sum.toFixed(2)}</h4>);
            }
            else{
                return(<h5>{sum.toFixed(2)}</h5>);
            }
        }
    }


    return (
        <Screen>
            <Heading>
                {"Olá, " + user.name}
                <Link to="/"><IoExitOutline color="#FFFFFF" size="1.4em" /></Link>
            </Heading>
            <RecordsArea>
                {printRecords()}
                {(list != null && list.length != 0)?
                <>
                <Fill></Fill>
                <Total>
                <h2>SALDO</h2>
                <h4>{sumRecords()}</h4>
                </Total>
                </>
                :''}
            </RecordsArea>
            <OptionsContainer>
                <Link  to="/nova-entrada" style={{ textDecoration: 'none'}}>
                    <Option>
                        <IoAddCircleOutline color="#FFFFFF" size="1.8em" />
                        <p>Nova entrada</p>
                    </Option>
                </Link>
                <Link to="/nova-saida" style={{ textDecoration: 'none'}}>
                    <Option>
                        <IoRemoveCircleOutline color="#FFFFFF" size="1.8em" />
                        <p>Nova saída</p>

                    </Option>
                </Link>
            </OptionsContainer>
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

const RecordsArea = styled.div`
    padding: 30px 12px 12px 12px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

    p{
        width:70%;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    }
    
`;

const OptionsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

`;

const Option = styled.div`
    width: 156px;
    height: 114px;
    padding: 10px;
    background: #A328D6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p{
        word-spacing: 9999rem;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;

    }
`;

const Item = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    position: relative;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    h2{
        color: #000000;
    }
    h3{
        color:#C6C6C6;
        margin-right: 7px;
    }

    h4{
        position:absolute;
        right: 0px;
        color: #03AC00;
    }
    h5{
        position:absolute;
        right: 0px;
        color: #C70000;
    }

`;

const Total = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    h2{
        color: #000000;
    }
    h4{
        position:absolute;
        right: 0px;
        color: #03AC00;
    }
    h5{
        position:absolute;
        right: 0px;
        color: #C70000;
    }

`;

const Fill = styled.div`
    width: 100%;
    height: 100%;
`;