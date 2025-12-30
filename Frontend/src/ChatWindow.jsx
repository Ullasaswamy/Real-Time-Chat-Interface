import './ChatWindow.css';
import Chat from './Chat';
import { Mycontext } from './Mycontext';
import { useContext, useState, useEffect } from 'react';
import {ScaleLoader} from 'react-spinners';

function ChatWindow(){
    const {promt,setPromt,reply,setReply,currThreadID,prevChats,setPrevChats}=useContext(Mycontext);
    const [loading, setLoading] = useState(false);

    let getReply=async()=>{
        setLoading(true);
        console.log("Sending:", { message: promt, threadId: currThreadID });
        const option={
            method: "POST",
            headers: { 
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
            messages: promt,        // ✅ use "message" not "messages"
            threadId: currThreadID,
            })
        };
        try{
            const response=await fetch("http://localhost:8080/api/chat",option);
            const res=await response.json();
            console.log(res);
            setReply(res.reply);
        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    //Append newChat to prevChat
    useEffect(()=>{
        if(promt && reply){
            setPrevChats(prevChats=>(
                [...prevChats,{
                    role:"user",
                    content:promt
                },{
                    role:"assistant",
                    content:reply
                }]
            ))
        }
        setPromt("");
    },[reply])
    return(
        <>
        <div className='chatwindow'>
            <div className="nav-bar">
                <span>ChatGPT<i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIcon">
                    <span className='userIconspan'><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            <Chat/>
            <ScaleLoader color='#fff' loading={loading}></ScaleLoader>
            <div className="chatwindow-Input">
                <div className="input-box">
                    <input type="text" placeholder='Ask anything'
                    value={promt}
                    onChange={(e)=>{setPromt(e.target.value)}}
                    onKeyDown={(e)=>e.key==='Enter'?getReply():''}/>
                    <div id="submit" onClick={getReply}>
                       <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className='info'>ChatGPT can make mistakes. Check important info. See <a href="#">Cookie Preferences</a>.</p>
            </div>
        </div>
        </>
    )
}
export default ChatWindow;