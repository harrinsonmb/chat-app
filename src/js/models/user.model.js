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
    this.friends = params.friends || [];

    /**
     * Checks that the passed user is
     * friend
     * @param user
     * @returns {boolean}
     */
    this.isFriend = function (user) {
        return this.friends.some( x => {
            return x.user.id === user.id;
        });
    };

    /**
     * Toggle the status of passed user if it's friend
     * to favorite
     * @param friend
     */
    this.toggleFavorite = function(friend){
        if(this.isFriend(friend)){
            this.getFriend(friend).isFavorite = !this.getFriend(friend).isFavorite;
        }
    };

    /**
     * Checks if the passed user is favorite
     * @param friend
     * @returns {*|boolean}
     */
    this.isFavorite = function(friend){
        if(this.isFriend(friend)){
            return this.getFriend(friend).isFavorite;
        }
    };

    /**
     * Checks if passed user is in the
     * friends list and it is returned if true
     * @param friend
     * @return {User|null}
     */
    this.getFriend = function(friend){
        if(this.isFriend(friend)){
            return this.friends.filter( x => {
                return x.user.id === friend.id;
            })[0] || null;
        }
    };

    /**
     * Add a user to the friends list
     * and mark it as not favorite
     * @param user
     */
    this.addFriend = function(user){
        if(!this.isFriend(user)){
            this.friends.push({
                user: user,
                isFavorite: false
            });
        }
    };

    /**
     * If passed user is friend
     * then is removed from the list
     * @param user
     */
    this.removeFriend = function(user){
        if(this.isFriend(user)){
            this.friends = this.friends.filter( x=>{
               return x.user.id !== user.id;
            });
        }
    };
};

module.exports = User;