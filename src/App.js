import ChatList from "./Components/ChatList";
import {React, useState, useEffect} from "react";
import ChatForm from "./Components/ChatForm";
import { UserContext } from "./Context/UserContext";
import * as ApiDB from "./API/ApiDB";

function App() {
  
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  
  //Аутентификация пользователя
  useEffect(() => {

    const fetchData = async() => {
      console.log("Start autch");
      setCurrentUser(await ApiDB.UserAuth(1));
    }
    fetchData();
  }, []);
  
  //Получение текущих чатов
  useEffect(() => {
    if(!currentUser) return;
    const fetchData = async() => {
      setChats(await ApiDB.GetUserChats(currentUser.id));
    }
    fetchData();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <div className="App" style={{display:"flex"}}>
        <ChatList chats={chats} currentChat={currentChat}  changeChat={setCurrentChat}/>
        <ChatForm currentChat={currentChat}/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
