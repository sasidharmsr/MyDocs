import {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams,useLocation } from "react-router-dom"
import io, { Socket } from "socket.io-client"


const Container=styled.div`
display:flex;
`;

const Select = styled.select`
    border:1px solid grey;
  padding: 10px;
  font-size: 13px;
  margin-top: 2px;
`;
const Option = styled.option``;

const fontSizes = [
    { text: '1'},
    { text: '2'},
    { text: '3'},
    { text: '4'},
    { text: '5'},
    { text: '6'},
    { text: '7'},
  ];
const Box=styled.button`
display: flex;
width:40px;
justify-content: center;
align-items: center;
font-size: 25px;
font-family: serif;
cursor:pointer;
font-weight:300;
background-color:transparent;
border:none;
`
const Boxdiv=styled.div`
margin-left:10px;
display:flex;
height: 40px;
width:190px;
margin-top: 2px;
border-radius: 5px;
justify-content: space-between;
background-color: #c8cccb;
`
const Table=styled.div`
	height: 400px; 
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
	margin: 1rem;
	padding: 1rem;
`

const Options = () => {

    let {id:docid}=useParams();
    const loc=useLocation();
    console.log(loc);
    let s="";
    let docname="";
    let count=0;
    let name="";
    for(let i of loc.pathname)
    {
        if(i==='/')
        {
            count++;
        }
        else if(count===4)
        {
            s+=i;
        }
        else if(count===3)
        {
            docname+=i;
        }
        else if(count===2)
        {
            name+=i;
        }
    }
    docid=s;
    console.log(name);
    console.log(docname);
    const [socket,setsocket]=useState();

    const fun=(e)=>{
        let y=e.target;
        var sel = document.getSelection();
        const value=sel.baseNode.data;
       let present=y.childNodes.length;
       let count=0;
       let z=y.textContent
       if(y.lastChild.outerHTML!=undefined)
            z=y.lastChild.outerHTML;
       if(y!==undefined && y!=null && y.lastChild.textContent!==value){
       for(let i of y.childNodes)
       {
            count++;
           if(i.textContent===sel.baseNode.data)
           {
               present=count;
               z=i.outerHTML;
               break;
           }
       }
    }
        console.log(y.childNodes.length);
        
        console.log(docid);
        let data={msg:z,num:present,id:docid}
        if(socket!==null)
            socket.emit("send",data);
    }

    

    useEffect(()=>{
        const data=io("http://localhost:8000");
        const obj={id:docid,name:name,docname:docname}
        data.emit("join",obj);
        data.on("first",(ms)=>{
            let msg=ms[docname];
            console.log(msg);
            const x=document.createElement("div");
            const y=document.getElementById("table");
            x.innerHTML=msg.trim();
            for(let i of x.childNodes)
            {
                y.appendChild(i);
            }
           y.appendChild(x);
           console.log(y);
        })
        setsocket(data);
        return ()=>{
            data.disconnect();
        }
    },[])

    const handler=(data)=>{
        const {msg,num}=data;
        let x=document.getElementById("table");
        let y=document.createElement('div');
        if(msg===undefined || num===0)
            return;
        const n=x.childNodes.length;
        y.innerHTML=msg.trim();
        if(x.lastChild!==null && n===num){
            x.removeChild(x.lastChild);
            x.appendChild(y.firstChild);
        }
        else if(num-1===n)
        {
            x.appendChild(y.firstChild);
        }
        else if(x.lastChild===null)
        {
            x.appendChild(y.firstChild);
        }
        else if(num!=n)
        {
            x.replaceChild(y.firstChild,x.childNodes[num-1]);
        }  
    }

    useEffect(()=>{
        const x=document.getElementById("table");
        if(socket===undefined || socket===null || x===null)return;
        const y=setInterval(()=>{
            const obj={id:docid,data:x.innerHTML,name:name,docname:docname}
            socket.emit("save",obj);
        },2000);
        return (()=>{
            clearInterval(y);
        })
    },[socket]);


    if(socket!==undefined)
        socket.on("se",handler);

    const fontsize=(e)=>{
        let x=document.getElementById("selected");
        const y=x.value;
        document.execCommand('fontSize',false,y);
    }

    const bold=()=>{
        document.execCommand('bold',false,null);
    }
    const italic=()=>{
        document.execCommand('italic',false,null);
    }
    const underline=()=>{
        document.execCommand('underline',false,null);
    }

    const tocenter=()=>{
        document.execCommand('justifyCenter',false,null);
    }
    const toleft=()=>{
        document.execCommand('justifyLeft',false,null);
    }

    const toright=()=>{
        document.execCommand('justifyRight',false,null);
    }

    const copy=()=>{
        document.execCommand('copy',false,null);
    }
    const ul=()=>{
        document.execCommand('insertUnorderedList',false,null);
    }

    const ol=()=>{
        document.execCommand('insertOrderedList',false,null);
    }

    const link=()=>{
        let url = prompt("Enter the link here: ", "http:\/\/");
        document.execCommand('createlink',false,url);
    }

    return (
        <div>
        <Container>
            <Select id="selected" onChange={fontsize}>
            <Option disabled selected>
              Size
            </Option>
            {fontSizes.map((i)=>(<Option>{i.text}</Option>))}
            </Select>
            <Boxdiv>
            <Box onClick={underline}><i className="fas fa-underline"></i></Box>
            <Box onClick={italic}><i className="fas fa-italic"></i></Box>
            <Box onClick={bold}><i className="fas fa-bold"></i></Box>
            </Boxdiv>
            <Boxdiv style={{width:40}}>
            <Box onClick={copy}><i className="far fa-copy"></i></Box>
            </Boxdiv>
            <Boxdiv>
                <Box onClick={toleft}><i className="fas fa-align-left" style={{fontStyle:"italic"}}></i></Box>
                <Box onClick={tocenter}><i className="fas fa-align-center" style={{fontStyle:"italic"}}></i></Box>
                <Box onClick={toright}><i className="fas fa-align-right" style={{fontStyle:"italic"}}></i></Box>
            </Boxdiv>
            <Boxdiv style={{width:150}}>
                <Box onClick={ul}><i className="fas fa-list-ul"></i></Box>
                <Box onClick={ol}><i className="fas fa-list-ol"></i></Box>
                <Box onClick={link}><i className="fas fa-link"></i></Box>
            </Boxdiv>
        </Container>
        <Table id="table" contentEditable="true" spellCheck="false" onInput={fun}>
            </Table>
        </div>
    )
}

export default Options
