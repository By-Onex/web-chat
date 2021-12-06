const urlAPI = 'http://localhost:9000';

let reqOpt = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'token': ''
    },
};

let postReqOpt = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'token': ''
    },
};

/**
 * @param {String} token
 */
export const SetToken = token => {
    //tokenAPI = token;
    postReqOpt.headers['token'] = token;
    reqOpt.headers['token'] = token;
};

/**
 * @param {Number} user_id

export const UserAuth = async (user_id) => {
    const response = await fetch(urlAPI + `/user/${user_id}`, reqOpt);
    const users = await response.json();
    return users;
}
 */

/**
 * Получить всех пользователей чата
 */
export const GetAllUsers = async () => {
    const response = await fetch(urlAPI + `/user/all`, reqOpt);
    const users = await response.json();
    return users;
}

/**
 * Поиск всех пользователей состоящих в чате
 * @param {Number} chat_id
 */
export const GetUsersInChat = async (chat_id) => {
    const response = await fetch(urlAPI + `/chat/${chat_id}/users`, reqOpt);
    const users = await response.json();
    return users;
}

/**
 * Поиск всех чатов в которых состоит пользователь
 * @param {Number} user_id
 */
export const GetUserChats = async (user_id) => {
    const response = await fetch(urlAPI + `/user/${user_id}/chats`, reqOpt);
    const chats = await response.json();
    return chats;
}

/**
 * Получить все сообщения в чате
 * @param {Number} chat_id
 */
export const GetChatMessages = async (chat_id) => {
    const response = await fetch(urlAPI + `/chat/${chat_id}/messages`, reqOpt);
    const messages = await response.json();
    return messages;
}

/**
 * Отправить сообщение на сервер
 * @param {Number} chat_id
 * @param {Number} user_id
 * @param {String} text
 */
export const SendServerMessage = async (chat_id, user_id, text) => {
    const body = {
        chat_id,
        user_id,
        text,
        date: new Date()
    };
    const response = await fetch(urlAPI + `/chat/${chat_id}/create_message`, {
        body: JSON.stringify(body),
        ...postReqOpt
    });
    const result = await response.json();
    return result;
}
/**
 * Отправить запрос на создание чата
 * @param {String} name
 * @param {Array.<Number>} users
 */
export const CreateChat = async (name, users) => {
    const body = {
        name, users
    }
    const response = await fetch(urlAPI + `/chat/create`, {
        body: JSON.stringify(body),
        ...postReqOpt
    });
    const result = await response.json();
    return result;
}
/**
 *  Авторизация
 * @param {String} user_name
 */
export const UserLogin = async (user_name) => {
    try {
        const response = await fetch(urlAPI + `/auth/login`, {
            body: JSON.stringify({
                user_name: user_name
            }),
            ...postReqOpt
        });

        const body = await response.json();
        return body;

    } catch (err) { return { error: err } }
};