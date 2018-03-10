import Router from './router';
import User from './models/user.model';
import ProfileController from './controllers/profile.controller';

let App = (function () {
    'use strict';
    let sophie = new User({
        name: 'Sophie',
        age: 22,
        city: 'New York',
        description: `Lorem ipsum dolor fit amet, consecteur adipiscingelit.
                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.`,
        profileImage: 'sophie.jpg',
        isOnline: false
    });

    let currentUser = new User({
        name: 'Michael',
        age: 28,
        city: 'New York',
        description: `Lorem ipsum dolor fit amet, consecteur adipiscingelit.
                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.`,
        isOnline: true
    });

    // currentUser.addFriend(sophie);
    // currentUser.toggleFriendship(sophie);
    // localStorage.setItem('currentUser', JSON.stringify(currentUser));
    ProfileController(currentUser, sophie).render();
}());

module.exports = App;