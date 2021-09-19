import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import "../App.css"
import { v4 as uuidV4 } from "uuid";
import {Redirect} from "react-router-dom";
import io, { Socket } from "socket.io-client"

const Button=styled.button`
width: 135px;
  height: 40px;
  border-width: 0;
  cursor:pointer;
  margin-left:10px;
`
const Container=styled.div`
display:flex;justify-Content:center;flex-direction:column;
align-items: center;
height:100vh;
`
const Input=styled.input`
width: 35%;
height:25px;
border-radius: 5px;
border-width: 0;
 margin:10px;
`
const Title=styled.h1`
text-align: center;
 font-size: 34px;
 font-family: serif;
`
const Mdiv=styled.div`
width: 50%;
height:50%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: #D3CCE3; 
background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  
background: linear-gradient(to right, #E9E4F0, #D3CCE3);
padding: 10px;
`
const id=uuidV4();

const Login= () => {


    const [register,setregister]=useState(1);
    const [page,setpage]=useState(0);
    const f=()=>{
        if(register)
        {
            setregister(0);
        }
        else
            setregister(1);
        document.getElementById("input").value="";
        document.getElementById("pass").value="";
    }


    const next=()=>{
        setpage(1);
    }
    return (
        <Container>
            <Mdiv>
                <Title>{register?"Register":"Login"}</Title>
                <Input id="input" type="text" placeholder="UserName"></Input>
                <Input id="pass" type="password" placeholder="Password"></Input>
                <div>
                {register?<Button onClick={f}>Sign In</Button>:<Button>Login</Button>}
                {register?<Button onClick={next}>Click This</Button>:(<Button onClick={f}>Register</Button>)}
                {page!==0?<Redirect to={`User/${id}`} />:<></>}
                </div>
            </Mdiv>
        </Container>
    )
}

export default Login;