
const mongoose=require('mongoose');
const Document=require('./data');
mongoose.connect('mongodb://localhost:27017/User',{ useNewUrlParser: true })

const io=require("socket.io")(8000,{
    cors:{
        origin:['http://localhost:3000']
    },
})
let Initialval="";

io.on("connection",(socket)=>{
    
    socket.on("send",msg=>{
        console.log(msg)
        socket.broadcast.to(msg.id).emit("se",msg);
    })

   
    socket.on("user",async(data)=>{
        const document=await createid(data);
        console.log(document);
        socket.emit("res",document);
    });

    socket.on("save",async data=>{
        try{
           // console.log(data.data);
            const y=data.data;
            const docname=data.docname;
            const name=data.name;
          const document=await createid(data);
          let ob=document.data;
        ob[docname]=data.data;
        await Document.findByIdAndUpdate(data.id,{data:ob,name:name});
        }
        catch(err)
        {
            console.log(`error ${err}`);
        }
    })

    
    socket.on("join",async (data)=>{
        const id=data.id;
        const name=data.name;
        console.log(data);
        const docname=data.docname;
        socket.join(id);
       const document=await createid(data);
        console.log(document);
       socket.emit("first",document.data);
    });
})


async function createid(da)
{
    
    const id=da.id;
    const name=da.name;
    const docname=da.docname;
    const ob={};
        ob[docname]="";
    try{
    if(id===null)return;
    const document=await Document.findById(id);
    if(document)
    {
        console.log(docname);
        if(document.data[docname]==null || document.data[docname]==undefined)
        {
            console.log("Yes");
            document.data[docname]='';
            let y=document.data;
           return document;
            
        }
        else
        {
            return document;
        }
    }
    console.log(ob);

    return await Document.create(({_id:id,data:ob,name:name,}));
    }
    catch(err)
    {
        console.log(`error ${err}`);
    }
}