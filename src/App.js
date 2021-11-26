import UserList from "./Components/UserList";
import {React, useState, useEffect} from "react";
import ChatForm from "./Components/ChatForm";
import { UserContext } from "./Context/UserContext";

const userData = [
  {id: 1, name: "Dima"},
  {id: 2, name: "Roma"},
  {id: 3, name: "Андрей"},
  {id: 4, name: "KSd asdqwe qwesfdd dfgd wer wqqqqqqqqqq"},
];

const messagesData = [
  {id:1, from:1, to:0, text: "hello 1"},
  {id:11, from:1,to:0, text: "hello 1"},
  {id:12, from:1,to:0, text: "hello 1"},
  {id:13, from:1,to:0, text: "hello 1"},
  {id:2, from:1,to:0, text: "hello 2"},
  {id:3, from:2,to:0, text: "hello asd"},
  {id:4, from:3,to:0, text: "hello qwert"},
  {id:51, from:1,to:0, text: "hello 3"},
  {id:52, from:1,to:0, text: "hello 3"},
  {id:53, from:1,to:0, text: "hello 3"},
  {id:54, from:1,to:0, text: "hello 3"},
  {id:55, from:1,to:0, text: "hello 3"},
  {id:56, from:1,to:0, text: "hello 3"},

  {id:21, from:0, to:1, text: "is my message"},
  {id:22, from:0, to:1, text: "is my message"},
  {id:23, from:0, to:1, text: "is my message"},
  {id:24, from:0, to:1, text: "is my message"},
];


function App() {
  const [currentChat, setCurrentChat] = useState(2);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const pushMessage = newMessage => {
    setMessages([...messages, newMessage]);
  }

  useEffect(() => {
    const reqOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch("http://localhost:9000/user/1", reqOpt)
      .then(res => res.json(), (error) => console.log(error))
      .then(data => setCurrentUser(data), (error) => console.log(error))
  }, []);

  useEffect(() => {
    const reqOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch("http://localhost:9000/all", reqOpt)
      .then(res => res.json(), (error) => console.log(error))
      .then(data => setUsers(data), (error) => console.log(error))
  }, []);

  useEffect(() => {
    const reqOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch("http://localhost:9000/chats", reqOpt)
      .then(res => res.json(), (error) => console.log(error))
      .then(data => setChats(data), (error) => console.log(error))
  }, []);

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
    <div className="App" style={{display:"flex"}}>
      <UserList chats={chats} currentChat={currentChat}  changeChat={setCurrentChat}/>
      <ChatForm messages={messages} setMessages={setMessages} users={users} currentChat={currentChat} pushMessage={pushMessage}/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
