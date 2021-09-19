import {useState} from 'react'
import styled from 'styled-components'
import { useParams,Redirect,useLocation } from 'react-router';
const Nav=styled.div`
    display:flex;
    height:50px;
    background-color: cadetblue;
    justify-content: flex-start;
    align-items: center;
    margi
`;
const Title=styled.div`
color:black;
font-family: serif;
font-size:34px;
text-align: center;
`
const Button=styled.button`
height: 30px;
width: 30px;
margin:5px;
display: flex;
justify-content: center;
align-items: center;
border: none;
background-color: cornsilk;
cursor:pointer;
`;

export const Navcontainer = () => {
    const io=useLocation();
    let s="";
    let count=0;let name="";
    for(let i of io.pathname)
    {
        if(i==='/')
        {
            count++;
        }
        else if(count===4)
        {
            s+=i;
        }
        else if(count==2)
            name+=i;
    }
    const [page,setpage]=useState(0);
    const next=(e)=>{
        console.log(s);
        setpage(1);
    }
    return (
            <Nav>
                {page!==0?<Redirect to={`/User/${name}/${s}`} />:<></>}
                <Button onClick={next}><i class="fas fa-arrow-left"></i></Button>
                <div style={{flex:1}}>
                <Title>Title Of the Doc</Title>
                </div>
                <Button><i class="far fa-trash-alt"></i></Button>
            </Nav>
    
    )
}

