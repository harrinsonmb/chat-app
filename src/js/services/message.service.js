let MessageService = function () {
    'use strict';
    let instance;
    let messages = [];

    /**
     * Returns the messages saved in memory
     * @returns {Array}
     */
    function getMessages(){
        return messages;
    }

    /**
     * Updates the messages saved in memory with
     * the ones saved in session storage
     */
    function getMessagesFromSessionStorage(){
        messages = JSON.parse(sessionStorage.getItem('messages')) || [];
    }

    /**
     * Updates the messages saved in session storage
     * with the ones saved in memory
     */
    function updateSessionStorage(){
        sessionStorage.setItem('messages', JSON.stringify(messages));
    }

    /**
     * Add new messages to memory
     * @param {array} newMessages
     */
    function addMessages(newMessages) {
        messages.push(...newMessages);
        updateSessionStorage();
    }

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
        instance.addMessages = addMessages;
        instance.getMessages = getMessages;
        instance.getMessagesFromSessionStorage = getMessagesFromSessionStorage;
    }

    Singleton.getInstance = function () {
        return instance || new Singleton();
    };

    return Singleton;
};

module.exports = new MessageService();