/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _router = __webpack_require__(1);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = function () {
	    'use strict';

	    var defaultPage = _router2.default.find(function (x) {
	        return x.name === 'default';
	    });

	    var initialPage = _router2.default.find(function (x) {
	        return x.name === defaultPage.route;
	    });

	    function locationHashChanged() {
	        var route = _router2.default.find(function (x) {
	            return x.path === location.hash;
	        });
	        if (typeof route === 'undefined') {
	            location.hash = initialPage.path;
	            initialPage.controller().render();
	        } else {
	            route.controller().render();
	        }
	    }

	    window.onhashchange = locationHashChanged;
	    window.onload = locationHashChanged;
	}();

	module.exports = App;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _chat = __webpack_require__(2);

	var _chat2 = _interopRequireDefault(_chat);

	var _profile = __webpack_require__(11);

	var _profile2 = _interopRequireDefault(_profile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Router = [{ name: 'chat',
	    path: '#view--chat',
	    controller: _chat2.default }, { name: 'profile',
	    path: '#view--profile',
	    controller: _profile2.default }, { name: 'default',
	    route: 'profile' }];

	module.exports = Router;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _message = __webpack_require__(3);

	var _message2 = _interopRequireDefault(_message);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChatTemplate = __webpack_require__(9);
	var UserService = __webpack_require__(5);
	var Message = __webpack_require__(10);


	var ChatController = function ChatController() {
	    'use strict';

	    var chatMessagesList = '.chat__messages',
	        chatInput = '.input__field';

	    function goBottom() {
	        window.scrollTo(0, document.body.scrollHeight);
	    }

	    function renderNewMessage(currentUser, incoming, event) {
	        if (event.which === 13 || event.keyCode === 13) {
	            var inputEl = event.target;
	            var inputMessage = inputEl.value;
	            if (inputMessage !== '') {
	                var message = new Message({
	                    text: inputMessage,
	                    user: currentUser,
	                    incoming: incoming
	                });
	                inputEl.value = '';
	                (0, _message2.default)().addMessage(message);
	                goBottom();
	            }
	        }
	    }

	    function renderAllMessages() {
	        var messagesListEl = document.querySelectorAll(chatMessagesList);
	        messagesListEl.innerHTML = '';
	        (0, _message2.default)().render();
	        goBottom();
	    }

	    function renderTemplate() {
	        var mainEl = document.querySelector('main');
	        mainEl.innerHTML = '';
	        mainEl.insertAdjacentHTML('afterbegin', ChatTemplate);
	    }

	    function attachListener(currentUser) {
	        var inputEl = document.querySelector(chatInput);
	        inputEl.addEventListener('keyup', renderNewMessage.bind(this, currentUser, false));
	    }

	    function init() {
	        var currentUser = UserService.getInstance().currentUser;
	        renderTemplate();
	        renderAllMessages();
	        attachListener(currentUser);
	    }

	    return {
	        render: init
	    };
	};

	module.exports = ChatController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _message = __webpack_require__(4);

	var _message2 = _interopRequireDefault(_message);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UserService = __webpack_require__(5);
	var MessageService = __webpack_require__(8);

	var MessageController = function MessageController() {
	    'use strict';

	    var chatList = '.chat__messages';
	    var chatMessageItem = '.message';
	    var chatMessageLink = '.message__link';
	    var chatMessageText = '.message__text';
	    var chatMessagePicture = '.message__picture';
	    var classIsIncomingMessage = 'is-incoming-message';

	    function renderMessage(message) {
	        var containerEl = document.querySelector(chatList);
	        containerEl.insertAdjacentHTML('beforeend', _message2.default);
	        var messagesEL = containerEl.querySelectorAll(chatMessageItem);
	        var lastAdded = messagesEL[messagesEL.length - 1];
	        var lastAddedLink = lastAdded.querySelector(chatMessageLink);
	        if (message.isIncoming) {
	            lastAdded.classList.add(classIsIncomingMessage);
	        } else {
	            lastAddedLink.parentNode.removeChild(lastAddedLink);
	        }

	        var textEl = lastAdded.querySelector(chatMessageText);
	        textEl.innerHTML = message.text;

	        var imageEl = lastAdded.querySelector(chatMessagePicture);
	        imageEl.src = './img/' + message.user.chatImage;
	    }

	    function addMessage(message) {

	        renderMessage(message);
	    }

	    function init() {
	        var currentUser = UserService.getInstance().currentUser;
	        var visitedUser = UserService.getInstance().visitedUser;
	        var messages = [{
	            id: new Date().getTime(),
	            text: 'Texto Uno',
	            user: currentUser,
	            isIncoming: false
	        }, {
	            id: new Date().getTime(),
	            text: 'Texto Dos',
	            user: visitedUser,
	            isIncoming: true
	        }];

	        var messagesToRender = [];
	        if (messages.length <= 20) {
	            messagesToRender = messages;
	        } else {
	            messagesToRender = messages.slice(messages.length - 20, messages.length);
	        }

	        for (var i = 0; i < messagesToRender.length; i++) {
	            renderMessage(messagesToRender[i]);
	        }
	    }

	    return {
	        addMessage: addMessage,
	        render: init
	    };
	};

	module.exports = MessageController;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	var MessageView = "<li class=\"message\">\n\t<div class=\"image-wrapper\">\n\t\t<a href=\"#view--profile\"  class=\"message__link\"></a>\n\t\t<img class=\"message__picture\" src=\"./img/empty.png\" />\n\t</div>\n\t<div class=\"message__text\">Text</div>\n</li>";

	module.exports = MessageView;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _user = __webpack_require__(6);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Utils = __webpack_require__(7);


	var UserService = function UserService() {
	    'use strict';

	    var instance = void 0;

	    function getVisitedUser() {
	        return new _user2.default({
	            id: Utils.guid(),
	            name: 'Sophie',
	            age: 22,
	            city: 'New York',
	            description: 'Lorem ipsum dolor fit amet, consecteur adipiscingelit.\n                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.',
	            profileImage: 'sophie.jpg',
	            chatImage: 'sophie-profile.jpg',
	            isOnline: true
	        });
	    }

	    function getCurrentUser() {
	        return new _user2.default({
	            id: Utils.guid(),
	            name: 'Michael',
	            age: 28,
	            city: 'New York',
	            description: 'Lorem ipsum dolor fit amet, consecteur adipiscingelit.\n                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.',
	            isOnline: true,
	            profileImage: 'profile-1.jpg',
	            chatImage: 'profile-1.jpg'
	        });
	    }

	    function Singleton() {
	        if (instance) {
	            return instance;
	        }
	        instance = this;
	        instance.visitedUser = getVisitedUser();
	        instance.currentUser = getCurrentUser();
	    }

	    Singleton.getInstance = function () {
	        return instance || new Singleton();
	    };

	    return Singleton;
	};

	module.exports = new UserService();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	var User = function User(params) {
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
	        return this.friends.some(function (x) {
	            return x.user.id === user.id;
	        });
	    };

	    this.toggleFavorite = function (friend) {
	        if (this.isFriend(friend)) {
	            this.getFriend(friend).isFavorite = !this.getFriend(friend).isFavorite;
	        }
	    };

	    this.isFavorite = function (friend) {
	        if (this.isFriend(friend)) {
	            return this.getFriend(friend).isFavorite;
	        }
	    };

	    this.getFriend = function (friend) {
	        if (this.isFriend(friend)) {
	            return this.friends.filter(function (x) {
	                return x.user.id === friend.id;
	            })[0] || null;
	        }
	    };

	    this.addFriend = function (user) {
	        if (!this.isFriend(user)) {
	            this.friends.push({
	                user: user,
	                isFavorite: false
	            });
	        }
	    };

	    this.removeFriend = function (user) {
	        if (this.isFriend(user)) {
	            this.friends = this.friends.filter(function (x) {
	                return x.user.id !== user.id;
	            });
	        }
	    };
	};

	module.exports = User;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	var Utils = {
	    /**
	     * Generates a GUID string.
	     * @returns {String} The generated GUID.
	     * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
	     * @author Slavik Meltser (slavik@meltser.info).
	     * @link http://slavik.meltser.info/?p=142
	     */
	    guid: function guid() {
	        'use strict';

	        function _p8(s) {
	            var p = (Math.random().toString(16) + '000000000').substr(2, 8);
	            return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
	        }
	        return _p8() + _p8(true) + _p8(true) + _p8();
	    }
	};

	module.exports = Utils;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	var MessageService = function MessageService() {
	    'use strict';

	    var instance = void 0;
	    var messages = [];

	    function addMessage(message) {
	        messages.push(message);
	    }

	    function Singleton() {
	        if (instance) {
	            return instance;
	        }
	        instance = this;
	        instance.addMessage = addMessage;
	    }

	    Singleton.getInstance = function () {
	        return instance || new Singleton();
	    };

	    return Singleton;
	};

	module.exports = new MessageService();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	/* jslint maxlen: 130 */

	var ChatTemplate = "<div id=\"view--chat\">\n                <div class=\"chat__container\">\n                    <ul class=\"chat__messages\">\n                        <!-- Chats are loaded here -->\n                    </ul>\n                </div>\n                \n                <div class=\"nav-bottom__container\">\n                    <div class=\"input__wrapper\">\n                        <div class=\"arrow--left\"></div>\n                        <input class=\"input__field\" type=\"text\" placeholder=\"Write a Message...\" />\n                    </div>\n                </div>\n            </div> ";

	module.exports = ChatTemplate;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	var Message = function Message(params) {
	    'use strict';

	    this.id = new Date().getTime();
	    this.text = params.text || null;
	    this.user = params.user || null;
	    this.isIncoming = params.isIncoming || null;
	};

	module.exports = Message;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var ProfileTemplate = __webpack_require__(12);
	var UserService = __webpack_require__(5);

	var ProfileController = function ProfileController() {
	    'use strict';

	    var biographyName = '.biography__name',
	        biographyAge = '.biography__age',
	        biographyLocation = '.biography__location',
	        biographyDescription = '.biography__description',
	        biographyImage = '.biography__image',
	        btnAddFriend = '.btn--add-as-friend',
	        btnFavorite = '.btn--add-as-favorite',
	        classBodyIsFriend = 'is-friend',
	        classBodyIsFavorite = 'is-favorite';

	    function checkFriendship(currentUser, visitedUser) {
	        var bodyEl = document.querySelector('body');
	        var btnEl = document.querySelector(btnAddFriend);
	        var btnMessage = 'Add As friend';

	        if (currentUser.isFriend(visitedUser)) {
	            bodyEl.classList.add(classBodyIsFriend);
	            btnMessage = 'Remove friend';
	        } else {
	            bodyEl.classList.remove(classBodyIsFriend);
	        }

	        btnEl.innerHTML = btnMessage;
	    }

	    function checkPreference(currentUser, visitedUser) {
	        var bodyEl = document.querySelector('body');
	        if (currentUser.isFavorite(visitedUser)) {
	            bodyEl.classList.add(classBodyIsFavorite);
	        } else {
	            bodyEl.classList.remove(classBodyIsFavorite);
	        }
	    }

	    function toggleFriendShip(currentUser, visitedUser) {
	        if (currentUser.isFriend(visitedUser)) {
	            currentUser.removeFriend(visitedUser);
	        } else {
	            currentUser.addFriend(visitedUser);
	        }
	        checkFriendship(currentUser, visitedUser);
	        checkPreference(currentUser, visitedUser);
	    }

	    function toggleFavorite(currentUser, visitedUser) {
	        currentUser.toggleFavorite(visitedUser);
	        checkPreference(currentUser, visitedUser);
	    }

	    function init() {
	        var currentUser = UserService.getInstance().currentUser;
	        var visitedUser = UserService.getInstance().visitedUser;

	        var mainEl = document.querySelector('main');
	        mainEl.innerHTML = '';
	        mainEl.insertAdjacentHTML('afterbegin', ProfileTemplate);

	        var nameEl = document.querySelector(biographyName);
	        nameEl.innerHTML = visitedUser.name;

	        if (visitedUser.age !== null) {
	            var ageEl = document.querySelector(biographyAge);
	            ageEl.innerHTML = visitedUser.age;
	        }

	        if (visitedUser.city !== null) {
	            var locationEl = document.querySelector(biographyLocation);
	            locationEl.innerHTML = visitedUser.city;
	        }

	        if (visitedUser.description !== null) {
	            var descriptionEL = document.querySelector(biographyDescription);
	            descriptionEL.innerHTML = visitedUser.description;
	        }

	        if (visitedUser.profileImage !== null) {
	            var imageEl = document.querySelector(biographyImage);
	            imageEl.src = './img/' + visitedUser.profileImage;
	        }

	        checkFriendship(currentUser, visitedUser);
	        checkPreference(currentUser, visitedUser);

	        var btnAddUserEl = document.querySelector(btnAddFriend);
	        btnAddUserEl.addEventListener('click', toggleFriendShip.bind(null, currentUser, visitedUser));

	        var btnAddFavorite = document.querySelector(btnFavorite);
	        btnAddFavorite.addEventListener('click', toggleFavorite.bind(null, currentUser, visitedUser));
	    }

	    return {
	        render: init
	    };
	};

	module.exports = ProfileController;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	/* jslint maxlen: 130 */

	var ProfileView = "<div id=\"view--profile\">\n                <div class=\"profile-picture\">\n                    <a href=\"#view--chat\">\n                        <div class=\"profile-picture__wrapper\">\n                            <span class=\"user-status\">Online</span>\n                            <div class=\"img-wrapper\">\n                                <img class=\"biography__image\" src=\"./img/empty.png\" alt=\"Friend picture\">\n                            </div>\n                        </div>\n                    </a>\n                </div>\n                <div class=\"biography__wrapper\">\n                    <div class=\"biography__title\">\n                        <button class=\"btn btn--icon btn--add-as-favorite\">\n                        <span class=\"icon--star\"></span></button>\n                        <span class=\"biography__name\">Name</span>, <span class=\"biography__age\">Age</span>\n                    </div>\n                    <div class=\"biography__location\">Location</div>\n                    <div class=\"biography__description\">Description</div>\n                </div>\n                <div class=\"nav-bottom__container\">\n                    <button class=\"btn btn--add-as-friend\">Add as friend</button>\n                </div>\n            </div>";

	module.exports = ProfileView;

/***/ })
/******/ ]);