import ChatView from './../templates/Chat';

class ChatApp{
    constructor() {
        this.socket = new WebSocket("ws://127.0.0.1:8081");
        this.onlineUsers = [];
        this._setupBehaviour();
    }

    _setupBehaviour() {
        this._setSendEvent();

        this.socket.onopen = () => {
            this.addUser();
        };

        this.socket.onmessage = function(event) {
            ChatView.appendMessage(event.data);
        };
    }

    _setSendEvent() {
        const _sendMessage = () => {
            let msg = ChatView.getInputMessage();
            this.sendMessage(msg);
            ChatView.clearInput();
        };

        ChatView.setEvents(ChatView.getButton(), 'click', _sendMessage);
    }

    addUser() {
        this.onlineUsers.push({
            id: this.onlineUsers.length
        });

        ChatView.setOnline(this.onlineUsers.length);
    }

    sendMessage(msg, id = -1) {
        this.socket.send(`anonymous ${id}: ${msg}`);
    }
}

export default ChatApp;
