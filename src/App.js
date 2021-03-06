
import React, {useState} from "react";
import ChatList from "./Components/ChatList";
import ChatForm from "./Components/ChatForm";
import TopNav from "./Components/TopNav";
import LoginForm from "./Components/LoginForm";

import { Provider } from "react-redux";
import store from './store/index';
import { checkLocal } from "./store/user";
import CreateChatModal from "./Components/CreateChatModal";



store.dispatch(checkLocal());

function App() {
  const [loginShow, setLoginShow] = useState(false);

  return(
      <Provider store={store} >
      <div className="App" style={{display:"flex", flexDirection:"column"}}>
        <LoginForm visibility={loginShow} setVisibility={setLoginShow}/>
        <CreateChatModal />
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
