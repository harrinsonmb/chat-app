let ChatTemplate = require('../views/chat.html');
let UserService = require('../services/user.service');
let Message = require('../models/message.model');
import MessageController from './message.controller';

let ChatController = function () {
    'use strict';
    const chatMessagesList = '.chat__messages',
        chatInput = '.input__field';

    function goBottom() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    function renderNewMessage(currentUser, incoming, event){
        if (event.which === 13 || event.keyCode === 13) {
            let inputEl = event.target;
            let inputMessage = inputEl.value;
            if(inputMessage !== ''){
                let message = new Message({
                    text: inputMessage,
                    user: currentUser,
                    incoming: incoming
                });
                inputEl.value = '';
                MessageController().addMessage(message);
                goBottom();
            }
        }
    }

    function renderAllMessages(){
        let messagesListEl = document.querySelectorAll(chatMessagesList);
        messagesListEl.innerHTML = '';
        MessageController().render();
        goBottom();
    }

    function renderTemplate(){
        let mainEl = document.querySelector('main');
        mainEl.innerHTML = '';
        mainEl.insertAdjacentHTML('afterbegin', ChatTemplate);
    }

    function attachListener(currentUser) {
        let inputEl = document.querySelector(chatInput);
        inputEl.addEventListener('keyup', renderNewMessage.bind(this, currentUser, false) );
    }

    function init(){
        let currentUser = UserService.getInstance().currentUser;
        renderTemplate();
        renderAllMessages();
        attachListener(currentUser);
    }

    return {
        render: init
    };
};

module.exports = ChatController;