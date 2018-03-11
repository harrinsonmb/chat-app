import Router from './router';

let App = (function () {
    'use strict';

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
            initialPage.controller().render();
        }else{
            route.controller().render();
        }
    }

    window.onhashchange = locationHashChanged;
    window.onload = locationHashChanged;
}());

module.exports = App;