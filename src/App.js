
import React, {useState} from "react";
import ChatList from "./Components/ChatList";
import ChatForm from "./Components/ChatForm";
import TopNav from "./Components/TopNav";
import LoginForm from "./Components/LoginForm";

import { Provider } from "react-redux";
import store from './store/index';
import { checkLocal } from "./store/user";

store.dispatch(checkLocal());

function App() {
  
  const [currentChat, setCurrentChat] = useState(null);
  const [loginShow, setLoginShow] = useState(false);
  
  console.log('draw App');

  return(
      <Provider store={store} >
      <div className="App" style={{display:"flex", flexDirection:"column"}}>
        <LoginForm visibility={loginShow} setVisibility={setLoginShow}/>
        <TopNav showLogin={setLoginShow}/>
        <div className={'chat-body'}>
          <ChatList changeChat={setCurrentChat}/>
          <ChatForm currentChat={currentChat}/>
        </div>
      </div>
      </Provider>
  );
}

export default App;
