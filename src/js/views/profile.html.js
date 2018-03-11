/* jslint maxlen: 130 */

const ProfileView = `<div id="view--profile">
                <div class="profile-picture">
                    <a href="#view--chat">
                        <div class="profile-picture__wrapper">
                            <span class="user-status">Online</span>
                            <div class="img-wrapper">
                                <img class="biography__image" src="./img/empty.png" alt="Friend picture">
                            </div>
                        </div>
                    </a>
                </div>
                <div class="biography__wrapper">
                    <div class="biography__title">
                        <button class="btn btn--icon btn--add-as-favorite">
                        <span class="icon--star"></span></button>
                        <span class="biography__name">Name</span>, <span class="biography__age">Age</span>
                    </div>
                    <div class="biography__location">Location</div>
                    <div class="biography__description">Description</div>
                </div>
                <div class="nav-bottom__container">
                    <button class="btn btn--add-as-friend">Add as friend</button>
                </div>
            </div>`;

module.exports = ProfileView;