import store from '../store/index';
import {
    addMessage,
    changeMessage,
    changeSocketStatus
} from "../store/chatSlice";

const url = "ws://localhost:9000/";
let wsServer;

export const Send = (type, data) => {
    if(store.getState().chat.wsStatus === 'connected')
        wsServer.send(JSON.stringify({type, body:data}));
}

export const Connect = () => {
    wsServer = new WebSocket(url);
    wsServer.onopen = () => {
        wsServer.send(JSON.stringify({
            token: localStorage.getItem('token')
        }));
    }

    wsServer.onmessage = (ev) => {
        
        const data = JSON.parse(ev.data);
        console.log(data);
        switch (data.type) {
            case 'CONN':
                if (data.connection) {
                    store.dispatch(changeSocketStatus('connected'));
                }
                break;
            case 'NEW_MESSAGE':
                store.dispatch(addMessage(data.body));
                break;
            case 'NOTIFY_READ_MESSAGE':
                store.dispatch(changeMessage(data.body));
                break;
            default:
                console.log(data);
        }
    }

    wsServer.onclose = (ev) => {
        console.log(ev);
        store.dispatch(changeSocketStatus('closed'));
    }

    wsServer.onerror = (ev) => {
        console.log(ev);
        store.dispatch(changeSocketStatus('error'));
    }
    
}

export const Close = () => {
    wsServer.close(1000, 'exit')
}
