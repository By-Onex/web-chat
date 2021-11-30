import ChatList from "./Components/ChatList";
import {React, useState, useEffect} from "react";
import ChatForm from "./Components/ChatForm";
import { UserContext } from "./Context/UserContext";
import * as ApiDB from "./API/ApiDB";
import TopNav from "./Components/TopNav";

import LoginForm from "./Components/LoginForm";

function App() {
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [loginShow, setLoginShow] = useState(false);
  //Проверка локального пользователя
  useEffect(() => {
    console.log('get local user');
    if (currentUser) return;
    const token = localStorage.getItem('token');
    
    if (!token) return;
    ApiDB.SetToken(token);
    
    setCurrentUser({
      id: ~~localStorage.getItem('id'),
      name: localStorage.getItem('name')
    })

  }, []);
  
  //Получение текущих чатов
  useEffect(() => {
    console.log('Получение текущих чатов', currentUser);
    if(!currentUser) {
      setChats([]);
      setCurrentChat(null)
      return;
    };
    const fetchData = async() => {
    
      setIsLoadingChats(true);
      setChats(await ApiDB.GetUserChats(currentUser.id));
      setIsLoadingChats(false);
    }
    fetchData();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <div className="App" style={{display:"flex", flexDirection:"column"}}>
        <LoginForm visibility={loginShow} setVisibility={setLoginShow}/>
        <TopNav showLogin={setLoginShow}/>
        <div className={'chat-body'}>
          <ChatList isLoading={isLoadingChats} chats={chats} currentChat={currentChat}  changeChat={setCurrentChat}/>
          <ChatForm currentChat={currentChat}/>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
