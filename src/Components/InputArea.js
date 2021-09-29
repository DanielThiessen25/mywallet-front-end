import styled from 'styled-components';

const InputArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;

    input{
        width: 100%;
        height: 60px;
        border: none;
        padding: 18px 0 18px 15px;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        margin-bottom: 15px;
        border-radius: 5px;
    }
    button{
        width: 100%;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        border: none;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        margin-bottom: 36px;
        cursor: pointer;
        
    }
`;

export default InputArea;