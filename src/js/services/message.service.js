let MessageService = function () {
    'use strict';
    let instance;
    let messages = [];

    function addMessage(message) {
        messages.push(message);
    }

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
        instance.addMessage = addMessage;
    }

    Singleton.getInstance = function () {
        return instance || new Singleton();
    };

    return Singleton;
};

module.exports = new MessageService();