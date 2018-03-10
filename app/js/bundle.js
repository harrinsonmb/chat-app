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

	var _user = __webpack_require__(2);

	var _user2 = _interopRequireDefault(_user);

	var _profile = __webpack_require__(3);

	var _profile2 = _interopRequireDefault(_profile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = function () {
	    'use strict';

	    var sophie = new _user2.default({
	        name: 'Sophie',
	        age: 22,
	        city: 'New York',
	        description: 'Lorem ipsum dolor fit amet, consecteur adipiscingelit.\n                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.',
	        profileImage: 'sophie.jpg',
	        isOnline: false
	    });

	    var currentUser = new _user2.default({
	        name: 'Michael',
	        age: 28,
	        city: 'New York',
	        description: 'Lorem ipsum dolor fit amet, consecteur adipiscingelit.\n                      Nulla quam velit, vulputate eu pharetra nec, mattic ac neque.',
	        isOnline: true
	    });

	    // currentUser.addFriend(sophie);
	    // currentUser.toggleFriendship(sophie);
	    // localStorage.setItem('currentUser', JSON.stringify(currentUser));
	    (0, _profile2.default)(currentUser, sophie).render();
	}();

	module.exports = App;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var Router = [{ name: 'profile', path: '#view--profile' }, { name: 'chat', path: '#view--chat' }];

	module.exports = Router;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var User = function User(params) {
	    'use strict';

	    this.id = new Date().getTime();
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
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	var ProfileController = function ProfileController(currentUser, visitedUser) {
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

	        checkFriendship(visitedUser, currentUser);
	        checkPreference(visitedUser, currentUser);

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

/***/ })
/******/ ]);