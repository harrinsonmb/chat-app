import ChatController from './controllers/chat.controller';
import ProfileController from './controllers/profile.controller';

const Router = [
    { name: 'chat',
        path: '#view--chat',
        controller: ChatController },
    { name: 'profile',
        path: '#view--profile',
        controller: ProfileController },
    { name: 'default',
        route: 'profile'}
];

module.exports = Router;