let ProfileController = function (currentUser, visitedUser) {
    'use strict';
    const   biographyName = '.biography__name',
            biographyAge = '.biography__age',
            biographyLocation = '.biography__location',
            biographyDescription = '.biography__description',
            biographyImage = '.biography__image',
            btnAddFriend = '.btn--add-as-friend',
            btnFavorite = '.btn--add-as-favorite',
            classBodyIsFriend = 'is-friend',
            classBodyIsFavorite = 'is-favorite';

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

    function checkPreference(currentUser, visitedUser){
        let bodyEl = document.querySelector('body');
        if(currentUser.isFavorite(visitedUser)){
            bodyEl.classList.add(classBodyIsFavorite);
        }else{
            bodyEl.classList.remove(classBodyIsFavorite);
        }
    }

    function toggleFriendShip(currentUser, visitedUser){
        if(currentUser.isFriend(visitedUser)){
            currentUser.removeFriend(visitedUser);
        }else{
            currentUser.addFriend(visitedUser);
        }
        checkFriendship(currentUser, visitedUser);
        checkPreference(currentUser, visitedUser);
    }

    function toggleFavorite(currentUser, visitedUser){
        currentUser.toggleFavorite(visitedUser);
        checkPreference(currentUser, visitedUser);
    }

    function init(){
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

        checkFriendship(visitedUser, currentUser);
        checkPreference(visitedUser, currentUser);

        let btnAddUserEl = document.querySelector(btnAddFriend);
        btnAddUserEl.addEventListener('click', toggleFriendShip.bind(
            null, currentUser, visitedUser
        ));

        let btnAddFavorite = document.querySelector(btnFavorite);
        btnAddFavorite.addEventListener('click', toggleFavorite.bind(
            null, currentUser, visitedUser
        ));
    }

    return {
        render: init
    };
};

module.exports = ProfileController;