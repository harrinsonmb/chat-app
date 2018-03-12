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
     * the ones saved in local storage
     */
    function getMessagesFromLocalStorage(){
        messages = JSON.parse(localStorage.getItem('messages')) || [];
    }

    /**
     * Updates the messages saved in local storage
     * with the ones saved in memory
     */
    function updateLocalStorage(){
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    /**
     * Add new messages to memory
     * @param {array} newMessages
     */
    function addMessages(newMessages) {
        messages.push(...newMessages);
        updateLocalStorage();
    }

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
        instance.addMessages = addMessages;
        instance.getMessages = getMessages;
        instance.getMessagesFromLocalStorage = getMessagesFromLocalStorage;
    }

    Singleton.getInstance = function () {
        return instance || new Singleton();
    };

    return Singleton;
};

module.exports = new MessageService();