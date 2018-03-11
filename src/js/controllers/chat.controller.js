let template = require('../views/chat.html');
let ChatService = require('../services/chat.service');

import Message from '../models/message.model';
import User from '../models/user.model';


let ChatController = function () {
    'use strict';

    function goBottom() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    let sophie = new User({
        name: 'Sophie',
        age: 22,
        city: 'New York',
        description: `Lorem ipsum dolor fit amet, consecteur adipiscingelit.
                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.`,
        profileImage: 'sophie.jpg',
        isOnline: false
    });

    function init(){
        let mainEl = document.querySelector('main');
        mainEl.innerHTML = '';
        mainEl.insertAdjacentHTML('afterbegin', template);

        goBottom();
        ChatService.getInstance().addMessage(new Message({
            text: 'Lorem ipsum',
            user: sophie
        }));
    }

    return {
        render: init
    };
};

module.exports = ChatController;