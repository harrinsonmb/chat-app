import Router from './router';
import User from './models/user.model';

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

    let defaultPage = Router.find( x => {
       return x.name === 'default';
    });

    let initialPage = Router.find( x => {
        return x.name === defaultPage.route;
    });

    function locationHashChanged() {
        let route = Router.find( x => {
            return x.path === location.hash;
        });
        if(typeof route === 'undefined'){
            location.hash = initialPage.path;
            initialPage.controller(currentUser, sophie).render();
        }else{
            route.controller(currentUser, sophie).render();
        }
    }

    window.onhashchange = locationHashChanged;
    window.onload = locationHashChanged;
}());

module.exports = App;