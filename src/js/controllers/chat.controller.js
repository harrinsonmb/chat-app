let ChatTemplate = require('../views/chat.html');
let UserService = require('../services/user.service');
let Message = require('../models/message.model');
import MessageController from './message.controller';

let ChatController = function () {
    'use strict';
    const chatMessagesList = '.chat__messages',
        chatInput = '.input__field';

    /**
     * Gets the text sent by input
     * and creates a message with the passed user
     * marking it as incoming, finally, message is sent
     * to message controller
     * @param currentUser
     * @param incoming
     * @param event
     */
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
            }
        }
    }

    /**
     * Deletes the DOM inside chat list
     * and later call to message controller
     * for rendering all the messages
     */
    function renderAllMessages(){
        let messagesListEl = document.querySelectorAll(chatMessagesList);
        messagesListEl.innerHTML = '';
        MessageController().render();
    }

    /**
     * Renders the corresponding template
     */
    function renderTemplate(){
        let mainEl = document.querySelector('main');
        mainEl.innerHTML = '';
        mainEl.insertAdjacentHTML('afterbegin', ChatTemplate);
    }

    /**
     * Attach the corresponding
     * listener to the input message
     * @param currentUser
     */
    function attachListener(currentUser) {
        let inputEl = document.querySelector(chatInput);
        inputEl.addEventListener('keyup', renderNewMessage.bind(this, currentUser, false) );
    }

    /**
     * Function called from main to render
     * the objects in memory in the corresponding
     * template
     */
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