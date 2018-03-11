import ProfileController from './controllers/profile.controller';
import ChatController from './controllers/chat.controller';

const Router = [
    { name: 'chat', path: '#view--chat', controller: ChatController},
    { name: 'profile', path: '#view--profile', controller: ProfileController},
    { name: 'default', route: 'profile' }
];

module.exports = Router;