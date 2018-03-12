let Utils = require('../utils');
import User from '../models/user.model';

let UserService = function () {
    'use strict';
    let instance;
    let currentUser;
    let visitedUser;

    /* Mocked user when application loads for first time*/
    const mockedVisitedUser = new User({
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

    /* Mocked user when application loads for first time*/
    const mockedCurrentUser = new User({
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

    /**
     * Returns a mocked "visited" user
     * for using it in several controllers
     * @returns {User}
     */
    function getVisitedUser(){
        let savedUser = sessionStorage.getItem('visitedUser');
        if(savedUser){
            visitedUser = new User(JSON.parse(savedUser));
        }else{
            visitedUser = mockedVisitedUser;
        }
        return visitedUser;
    }

    /**
     * Returns a mocked the "visited" user
     * for using it in several controllers
     * @returns {User}
     */
    function getCurrentUser() {
        let savedUser = sessionStorage.getItem('user');
        if(savedUser){
            currentUser = new User(JSON.parse(savedUser));
        }else{
            currentUser = mockedCurrentUser;
        }
        return currentUser;
    }

    /**
     * Update the mocked "currentUser"
     * in the memory and session storage
     * @param {User} modifiedUser
     */
    function updateCurrentUser(modifiedUser) {
        currentUser = modifiedUser;
        sessionStorage.setItem('user', JSON.stringify(modifiedUser));
    }

    /**
     * Save the visited user too
     * for avoiding problems with random ids
     * Suddenly suddenly I did not remember
     * the friend who just added xD
     * @param {User} modifiedUser
     */
    function saveVisitedUser(modifiedUser){
        visitedUser = modifiedUser;
        sessionStorage.setItem('visitedUser', JSON.stringify(visitedUser));
    }

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
        instance.getVisitedUser = getVisitedUser;
        instance.getCurrentUser = getCurrentUser;
        instance.updateCurrentUser = updateCurrentUser;
        instance.saveVisitedUser = saveVisitedUser;
    }

    Singleton.getInstance = function () {
        return instance || new Singleton();
    };

    return Singleton;
};

module.exports = new UserService();