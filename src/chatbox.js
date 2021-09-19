import {useState,useEffect} from 'react'
import { io } from "socket.io-client"

const displaymessage=(message)=>{
    const x=document.getElementById("text");
    const pa=document.createElement("p");
    pa.textContent=message; 
    x.appendChild(pa);
}

let roomval="";

const socket=io("http://localhost:8000");

socket.on('connect',()=>{
    const y=document.getElementById("id");
    y.textContent=`your connected with id ${socket.id}`;
})


socket.on("se",mes=>{
    displaymessage(mes);
})

const Chatbox = () => {
    const [chane,setchane]=useState(0);
    const fun=()=>{
        setchane((prev)=>prev+1);
        const mes=document.getElementById("message").value;
        console.log("clicked");
        if(mes!=='')
        {
            displaymessage(mes);
            document.getElementById("message").value='';
            socket.emit("type2",mes,roomval);
        }
    }
    const fu=(obj)=>{
        if(obj.target.value!=='' && obj.key==='Enter')
        {
            displaymessage(obj.target.value);
            socket.emit("type2",obj.target.value,roomval);
            obj.target.value="";
        }
    }
    const gun=()=>{
        const mes=document.getElementById("room").value;
        console.log(mes);
        roomval=mes;
        socket.emit("join",mes,(x)=>{
            displaymessage(x);
        });
    }


    return (
        <div style={{padding:"20px"}}>
            <h1 style={{textAlign:"center"}}>Chating With GirlFriend</h1>
            <p id="id" style={{textAlign:"center",fontSize:19,color:"skyblue"}}></p>
            <div id="text" style={{height:"60vh",border:"3px solid black",padding:"20px"}}></div>
            <div style={{padding:"20px"}}>
            <input id="message" placeholder="message" onKeyDown={(obj)=>fu(obj)} style={{height:"30px",width:"35%"}}></input>
            <button id="sendbtn" onClick={fun}  style={{width:"60px",marginLeft:20}}>Send</button>
            <input id="room" placeholder="room id" style={{height:"30px",width:"35%",marginLeft:20}}></input>
            <button id="joinbtn" onClick={gun} style={{width:"60px",marginLeft:20}}>join</button>
            </div>
        </div>
    )
}

export default Chatbox
