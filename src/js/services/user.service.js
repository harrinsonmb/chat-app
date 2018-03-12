let Utils = require('../utils');
import User from '../models/user.model';

let UserService = function () {
    'use strict';
    let instance;

    /**
     * Returns a mocked the "visited" user
     * for using it in several controllers
     * @returns {User}
     */
    function getVisitedUser(){
        return new User({
            id: Utils.guid(),
            name: 'Sophie',
            age: 22,
            city: 'New York',
            description: `Lorem ipsum dolor fit amet, consecteur adipiscingelit.
                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.`,
            profileImage: 'sophie.jpg',
            chatImage: 'sophie-profile.jpg',
            isOnline: true
        });
    }

    /**
     * Returns a mocked the "visited" user
     * for using it in several controllers
     * @returns {User}
     */
    function getCurrentUser() {
        return new User({
            id: Utils.guid(),
            name: 'Michael',
            age: 28,
            city: 'New York',
            description: `Lorem ipsum dolor fit amet, consecteur adipiscingelit.
                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.`,
            isOnline: true,
            profileImage: 'profile-1.jpg',
            chatImage: 'profile-1.jpg',
        });
    }

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
        instance.visitedUser = getVisitedUser();
        instance.currentUser = getCurrentUser();
    }

    Singleton.getInstance = function () {
        return instance || new Singleton();
    };

    return Singleton;
};

module.exports = new UserService();