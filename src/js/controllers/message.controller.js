let Utils = require('../utils');
let Message = require('../models/message.model');

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

    /**
     * Adds the passed message to the DOM
     * and changes the template if it's
     * and incoming message
     * @param message
     */
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
        Utils.goBottom();
    }

    /**
     * The passed message is saved to in the service
     * and also is rendered
     * @param message
     */
    function addMessage(message){
        MessageService.getInstance().addMessages([message]);
        renderMessage(message);
    }

    /**
     * Function called from main to render
     * the objects in memory in the corresponding
     * template
     */
    function init(){
        let visitedUser = UserService.getInstance().visitedUser;

        let mockedMessage = new Message({
            id: Utils.guid(),
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            user: visitedUser,
            isIncoming: true
        });
        MessageService.getInstance().addMessages([mockedMessage]);

        let messages = MessageService.getInstance().getMessages();

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