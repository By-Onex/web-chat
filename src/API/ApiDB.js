const urlAPI = 'http://localhost:9000';

const reqOpt = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
};

const postReqOpt = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
};

/**
 * @param {Number} user_id
 */
export const UserAuth = async (user_id) => {
    const response = await fetch(urlAPI+`/user/${user_id}`,reqOpt);
    const users = await response.json();
    return users;
}

/**
 * @param {Number} chat_id
 */
export const GetUsersInChat = async (chat_id) => {
    const response = await fetch(urlAPI+`/chat/${chat_id}/users`,reqOpt);
    const users = await response.json();
    return users;
}

/**
 * @param {Number} user_id
 */
export const GetUserChats = async (user_id) => {
    const response = await fetch(urlAPI+`/user/${user_id}/chats`,reqOpt);
    const chats = await response.json();
    return chats;
}

/**
 * @param {Number} chat_id
 */
 export const GetChatMessages = async (chat_id) => {
    const response = await fetch(urlAPI+`/chat/${chat_id}/messages`,reqOpt);
    const messages = await response.json();
    return messages;
}

/**
 * @param {Number} chat_id
 * @param {Number} user_id
 * @param {String} text
 */
 export const SendServerMessage = async (chat_id, user_id, text) => {
    const body = {chat_id, user_id, text, date: new Date()};
    const response = await fetch(urlAPI+`/chat/${chat_id}/create_message`, {body: JSON.stringify(body), ...postReqOpt});
    const result = await response.json();
    return result;
}
