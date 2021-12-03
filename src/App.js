
import React, {useState} from "react";
import ChatList from "./Components/ChatList";
import ChatForm from "./Components/ChatForm";
import TopNav from "./Components/TopNav";
import LoginForm from "./Components/LoginForm";

import { Provider } from "react-redux";
import store from './store/index';
import { checkLocal } from "./store/user";
import * as ws from "./API/ws";


store.dispatch(checkLocal());

ws.Connect();

function App() {
  const [loginShow, setLoginShow] = useState(false);

  return(
      <Provider store={store} >
      <div className="App" style={{display:"flex", flexDirection:"column"}}>
        <LoginForm visibility={loginShow} setVisibility={setLoginShow}/>
        <TopNav showLogin={setLoginShow}/>
        <div className={'chat-body'}>
          <ChatList />
          <ChatForm />
        </div>
      </div>
      </Provider>
  );
}

export default App;
