let MessagesService = require('./services/message.service');
let Utils = require('./utils');
import Router from './router';

let App = (function () {
    'use strict';

    let defaultPage = Router.find( x => {
       return x.name === 'default';
    });

    let initialPage = Router.find( x => {
        return x.name === defaultPage.route;
    });

    /**
     * This function looks for the current asked route
     * And render the corresponding controller,
     * if no routes detected, we try to render the default
     * route.
     */
    function locationHashChanged() {
        let route = Router.find( x => {
            return x.path === location.hash;
        });
        if(typeof route === 'undefined'){
            location.hash = initialPage.path;
            initialPage.controller().render();
        }else{
            route.controller().render();
        }
    }

    /* Event listeners for the whole application attached */
    document.addEventListener('DOMContentLoaded', function () {
        // When app is loaded first time or refreshed
        // We update messaged with the ones saved in local storage
        MessagesService.getInstance().getMessagesFromLocalStorage();

        // We go down when page is reloaded (TODO go down only if loaded page is chat view)
        setTimeout(function () { Utils.goBottom(); }, 500);
    });

    window.onhashchange = locationHashChanged;
    window.onload = locationHashChanged;
}());

module.exports = App;