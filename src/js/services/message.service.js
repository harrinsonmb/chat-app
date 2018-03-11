let MessageService = function () {
    'use strict';
    let instance;
    let messages = [];

    function getMessages(){
        return messages;
    }

    function addMessages(newMessages) {
        messages.push(...newMessages);
    }

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
        instance.addMessages = addMessages;
        instance.getMessages = getMessages;
    }

    Singleton.getInstance = function () {
        return instance || new Singleton();
    };

    return Singleton;
};

module.exports = new MessageService();