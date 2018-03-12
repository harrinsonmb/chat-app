import ChatController from './controllers/chat.controller';
import ProfileController from './controllers/profile.controller';

/* Each hash route contains a controller and a name*/
const Router = [
    { name: 'chat', path: '#view--chat', controller: ChatController },
    { name: 'profile', path: '#view--profile', controller: ProfileController },
    { name: 'default', route: 'profile'}
];

module.exports = Router;