const User = function (params) {
    'use strict';
    this.id = params.id || null;
    this.name = params.name || null;
    this.age = params.age || null;
    this.city = params.city || null;
    this.description = params.description || null;
    this.profileImage = params.profileImage || null;
    this.chatImage = params.chatImage || null;
    this.isOnline = params.isOnline || null;
    this.friends = [];

    this.isFriend = function (user) {
        return this.friends.some( x => {
            return x.user.id === user.id;
        });
    };

    this.toggleFavorite = function(friend){
        if(this.isFriend(friend)){
            this.getFriend(friend).isFavorite = !this.getFriend(friend).isFavorite;
        }
    };

    this.isFavorite = function(friend){
        if(this.isFriend(friend)){
            return this.getFriend(friend).isFavorite;
        }
    };

    this.getFriend = function(friend){
        if(this.isFriend(friend)){
            return this.friends.filter( x => {
                return x.user.id === friend.id;
            })[0] || null;
        }
    };

    this.addFriend = function(user){
        if(!this.isFriend(user)){
            this.friends.push({
                user: user,
                isFavorite: false
            });
        }
    };

    this.removeFriend = function(user){
        if(this.isFriend(user)){
            this.friends = this.friends.filter( x=>{
               return x.user.id !== user.id;
            });
        }
    };
};

module.exports = User;