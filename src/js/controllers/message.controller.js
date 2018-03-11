let UserService = require('../services/user.service');
let MessageService = require('../services/message.service');

import MessageTemplate from '../views/message.html';

let MessageController = function () {
    'use strict';
    const chatList = '.chat__messages';
    const chatMessageItem = '.message';
    const chatMessageLink= '.message__link';
    const chatMessageText= '.message__text';
    const chatMessagePicture= '.message__picture';
    const classIsIncomingMessage = 'is-incoming-message';

    function renderMessage(message){
        let containerEl = document.querySelector(chatList);
        containerEl.insertAdjacentHTML('beforeend', MessageTemplate);
        let messagesEL = containerEl.querySelectorAll(chatMessageItem);
        let lastAdded = messagesEL[messagesEL.length-1];
        let lastAddedLink = lastAdded.querySelector(chatMessageLink);
        if(message.isIncoming){
            lastAdded.classList.add(classIsIncomingMessage);
        }else{
            lastAddedLink.parentNode.removeChild(lastAddedLink);
        }

        let textEl = lastAdded.querySelector(chatMessageText);
        textEl.innerHTML = message.text;

        let imageEl = lastAdded.querySelector(chatMessagePicture);
        imageEl.src= './img/'+message.user.chatImage;
    }

    function addMessage(message){

        renderMessage(message);
    }

    function init(){
        let currentUser = UserService.getInstance().currentUser;
        let visitedUser = UserService.getInstance().visitedUser;
        const messages = [
            {
                id: new Date().getTime(),
                text: 'Texto Uno',
                user: currentUser,
                isIncoming: false
            },
            {
                id: new Date().getTime(),
                text: 'Texto Dos',
                user: visitedUser,
                isIncoming: true
            }
        ];

        let messagesToRender = [];
        if(messages.length <= 20){
            messagesToRender = messages;
        }else{
            messagesToRender = messages.slice((messages.length-20), messages.length);
        }

        for(let i = 0 ; i < messagesToRender.length ; i++){
            renderMessage(messagesToRender[i]);
        }
    }

    return {
        addMessage: addMessage,
        render: init
    };
};

module.exports = MessageController;