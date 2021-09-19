
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "../App.css"
import { v4 as uuidV4 } from "uuid";
import {Redirect,useParams,useLocation} from "react-router-dom";
import io, { Socket } from "socket.io-client"

const Title=styled.h1`
text-align: center;
 font-size: 34px;
 font-family: serif;
 font-weight:300;
 margin:20px;
`
const Container=styled.div`
margin:50px;

`
const Input=styled.input`
background-color: white;
width: 100%;
border-style: solid;
border-width: 1px;
border-color: #e4e7eb;
border-radius: 10px;
margin-top: 10px;
padding: 15px;
font-size:16px;
`
const Button=styled.button`
color: white;
background-color: #4c63b6;
font-family: "Roboto";
font-size: 22px;
border-width: 0px;
border-radius: 4px;
margin-top: 20px;
margin-bottom: 10px;
padding-top: 5px;
padding-bottom: 5px;
padding-right: 20px;
padding-left: 20px;
cursor:pointer;
`
const Listitem=styled.div`
    background-color: #e6f6ff;
    width: 80%;
    height:50px;
    display:flex;
    padding:5px;
    justify-content: space-between;
    align-items: center;
    border-style: solid;
    border-width: 5px;
    border-color: #096f92;
    border-right: none;
    border-top: none;
    border-bottom: none;
    border-radius: 4px;
    margin-top:10px;
    cursor:pointer;
  
`
const Listdiv=styled.div`

`
const socket=io("http://localhost:8000");



let z=0;

const Main = () => {
    const [list,setlist]=useState([]);
    console.log(list);
    const loca=useLocation();
    console.log(loca);
    let name="";let c=0;
    let id="";
    for(let i of loca.pathname)
    {
        if(i==='/')c++;
        else if(c===2)
        {
            name+=i;
        }
        else if(c===3)
            id+=i;
    }
    const [last,setlast]=useState(-1);
    const [page,setpage]=useState(0);
    
    

    const fun=(e)=>{
        const index=e.target.id;
        const x=document.getElementById("main");
        const y=document.getElementById(index);
        console.log(x);
        x.removeChild(y);
    }
    console.log(list);
    const next=(e)=>{
        const index=e.target.id;
        setpage(index);
    }
    
    useEffect(()=>{
        let arr=[];
        const ob={id:id,name:name,docname:"Msr00"};
    socket.emit("user",ob);
        socket.on("res",(data)=>{
            for(let i of Object.keys(data.data))
            {
                if(i!="Msr00")
                    arr.push(i);
            }
        })
        setlist(arr);
        setlast("okjib");
    },[]);


    const add=()=>{
        const x=document.getElementById("input");
        if(x.value!==''){
            console.log(document.getElementById("main"));
        let p=list.length;
        console.log(document.getElementById("main"));
        list.push(x.value);
        setlast(x.value);
        console.log(list);
        }
        else
        {
            setlast("clk");
        }
    }
    const ad=()=>{
        setlast("coi");
    }
    const but=document.getElementById("but");
    console.log(z,but);
        if(but!==undefined && but!==null && z===0){but.click();z++;}
    console.log(list);
    return (
        <div className="bg-con">
         {page!==0?<Redirect to={`/Msrdocs/${name}/${page}/${id}`} />:<></>}
            <Title>MSr Docs</Title>
            <Container>
            <h1 style={{fontWeight:300}}><span style={{fontWeight:"bold"}}>Create </span>docs</h1>
            <Input id="input" placeholder="Title of your Docs" type="text"></Input>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Button id="but" onClick={add}>Add</Button>
            <Button onClick={ad}>Refresh</Button>
            </div>
            <Title style={{fontSize:28,margin:"1px"}}>Yours List</Title>
            <hr color="Black" style={{marginLeft:20,marginRight:20,fontWeight:500}}></hr>
            <Listdiv id="main">
                {
                    list.map((is,p)=>(
                    <div style={{display:"flex",alignItems:"center"}} id={p}>
                        <button style={{backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={fun}>
                        <i id={p} class="far fa-trash-alt" style={{fontSize:18}}></i>
                        </button>
                    <Listitem id={is} onClick={next}>
                        <Title style={{fontSize:20}} >{is}</Title>
                        <i class="far fa-file-alt" style={{width:50,fontSize:25,fontWeight:100}}></i>
                    </Listitem>
                    </div>))}
                                    
            </Listdiv>
            </Container>
        </div>
    )
}

export default Main
