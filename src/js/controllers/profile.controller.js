let ProfileTemplate = require('../views/profile.html');
let UserService = require('../services/user.service');

let ProfileController = function () {
    'use strict';
    const   biographyName = '.biography__name',
            biographyAge = '.biography__age',
            biographyLocation = '.biography__location',
            biographyDescription = '.biography__description',
            biographyImage = '.biography__image',
            btnAddFriend = '.btn--add-as-friend',
            btnFavorite = '.btn--add-as-favorite',
            classBodyIsFriend = 'is-friend',
            classBodyIsFavorite = 'is-favorite',
            classButtonNavbar = '.btn--nav-bar';

    /**
     * Checks if the visited user is friend or not
     * and depending on it, the user interface is changed
     * @param {User} currentUser
     * @param {User} visitedUser
     */
    function checkFriendship(currentUser, visitedUser){
        let bodyEl = document.querySelector('body');
        let btnEl = document.querySelector(btnAddFriend);
        let btnMessage = 'Add As friend';

        if(currentUser.isFriend(visitedUser)){
            bodyEl.classList.add(classBodyIsFriend);
            btnMessage = 'Remove friend';
        }else{
            bodyEl.classList.remove(classBodyIsFriend);
        }

        btnEl.innerHTML = btnMessage;
    }

    /**
     * Checks if the visited user is favorite or not
     * and changes the user interface depending on it
     * @param {User} currentUser
     * @param {User} visitedUser
     */
    function checkPreference(currentUser, visitedUser){
        let bodyEl = document.querySelector('body');
        if(currentUser.isFavorite(visitedUser)){
            bodyEl.classList.add(classBodyIsFavorite);
        }else{
            bodyEl.classList.remove(classBodyIsFavorite);
        }
    }

    /**
     * Checks if the visited user is friend
     * and depending on it, the visited user
     * is added or removed and the user interface
     * changes too.
     * Also update the mocked users and the currentUser
     * in session storage
     * @param {User} currentUser
     * @param {User} visitedUser
     */
    function toggleFriendShip(currentUser, visitedUser){
        if(currentUser.isFriend(visitedUser)){
            currentUser.removeFriend(visitedUser);
        }else{
            currentUser.addFriend(visitedUser);
        }
        checkFriendship(currentUser, visitedUser);
        checkPreference(currentUser, visitedUser);
        UserService.getInstance().updateCurrentUser(currentUser);
        UserService.getInstance().saveVisitedUser(visitedUser);
    }

    /**
     *
     * @param {User} currentUser
     * @param {User} visitedUser
     */
    function toggleFavorite(currentUser, visitedUser){
        currentUser.toggleFavorite(visitedUser);
        checkPreference(currentUser, visitedUser);
        UserService.getInstance().updateCurrentUser(currentUser);
        UserService.getInstance().saveVisitedUser(visitedUser);
    }

    /**
     * This function should be replaced
     * the back button should be injected
     * to the top navbar when profile view renders
     */
    function showBackButton(){
        document.querySelector(classButtonNavbar).classList.remove('hidden');
    }

    /**
     * Function called from main to render
     * the objects in memory in the corresponding
     * template
     */
    function init(){
        let currentUser = UserService.getInstance().getCurrentUser();
        let visitedUser = UserService.getInstance().getVisitedUser();

        let mainEl = document.querySelector('main');
        mainEl.innerHTML = '';
        mainEl.insertAdjacentHTML('afterbegin', ProfileTemplate);

        let nameEl = document.querySelector(biographyName);
        nameEl.innerHTML = visitedUser.name;

        if(visitedUser.age !== null){
            let ageEl = document.querySelector(biographyAge);
            ageEl.innerHTML = visitedUser.age;
        }

        if(visitedUser.city !== null){
            let locationEl = document.querySelector(biographyLocation);
            locationEl.innerHTML = visitedUser.city;
        }

        if(visitedUser.description !== null){
            let descriptionEL = document.querySelector(biographyDescription);
            descriptionEL.innerHTML = visitedUser.description;
        }

        if(visitedUser.profileImage !== null){
            let imageEl = document.querySelector(biographyImage);
            imageEl.src = './img/'+visitedUser.profileImage;
        }

        checkFriendship(currentUser, visitedUser);
        checkPreference(currentUser, visitedUser);

        let btnAddUserEl = document.querySelector(btnAddFriend);
        btnAddUserEl.addEventListener('click', toggleFriendShip.bind(
            null, currentUser, visitedUser
        ));

        let btnAddFavorite = document.querySelector(btnFavorite);
        btnAddFavorite.addEventListener('click', toggleFavorite.bind(
            null, currentUser, visitedUser
        ));

        showBackButton();
    }

    return {
        render: init
    };
};

module.exports = ProfileController;