import './App.css'
import Sidebar from './Sidebar'
import ChatWindow from './chatWindow'
import {Mycontext} from './Mycontext'
import { use, useState } from 'react'
import {v1 as uuidv1} from 'uuid';

function App() {
  const [promt,setPromt]=useState("");
  const [reply,setReply]=useState("");
  const [currThreadID,setCurrThreadId]=useState(uuidv1());
  const [prevChats,setPrevChats]=useState([]);
  const [newChat,setNewChat]=useState(true);
  const providerValues={
    promt,setPromt,
    reply,setReply,
    currThreadID,setCurrThreadId,
    newChat,setNewChat,
    prevChats,setPrevChats
  };
  return (
    <>
    <div className='app'>
      <Mycontext.Provider value={providerValues}>
        <Sidebar/>
        <ChatWindow/>
      </Mycontext.Provider>
    </div>
    </>
  )
}

export default App
   