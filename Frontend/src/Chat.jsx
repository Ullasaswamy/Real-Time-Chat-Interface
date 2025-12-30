import './Chat.css';
import { useContext, useState, useEffect} from 'react';
import { Mycontext } from './Mycontext';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

function Chat(){
    const {newChat,prevChats,reply}=useContext(Mycontext);
    const [latestReply,setLatestReply]=useState(null);

    useEffect(()=>{
        if(!prevChats?.length) return;

        const content=reply.split(" ");
        let idx=0;
        const intervel=setInterval(()=>{
            setLatestReply(content.slice(0,idx+1).join(" "));

            idx++;
            if(idx>=content.length){
                clearInterval(intervel);
            }
        },40);

        return ()=>clearInterval(intervel);
    },[prevChats,reply]);
    return(
        <>
            {newChat && <h1>Start a new Chat</h1>}
                <div className="chats">
                {
                    prevChats?.slice(0,-1).map((chat,idx)=>
                        <div className={chat.role==='user'?"userDiv":"GptDiv"} key={idx} >
                            {
                                chat.role==="user"?
                                <p className='userMsg'>{chat.content}</p> :
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }
                {
                    prevChats.length > 0 && latestReply !== null &&
                    <div className="GptDiv" key={"typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                    </div>
                }
            </div>
            
            
        </>
    )
}
export default Chat;