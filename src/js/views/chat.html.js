/* jslint maxlen: 130 */

const ChatTemplate = `<div id="view--chat">
                <div class="chat__container">
                    <ul class="chat__messages">
                        <li class="chat__message is-incoming-message">
                            <a href=#view--profile>
                                <img class="message__picture" src="./img/sophie-profile.jpg" />
                            </a>                                   
                            <div class="message__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </li>
                        <li class="chat__message">
                            <img class="message__picture" src="./img/profile-1.jpg" />
                            <div class="message__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </li>
                        <li class="chat__message">                       
                            <img class="message__picture" src="./img/profile-1.jpg" />
                            <div class="message__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </li>
                        <li class="chat__message is-incoming-message">
                            <a href=#view--profile>
                                <img class="message__picture" src="./img/sophie-profile.jpg" />
                            </a>                            
                            <div class="message__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </li>
                        <li class="chat__message">                       
                            <img class="message__picture" src="./img/profile-1.jpg" />
                            <div class="message__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        </li>
                    </ul>
                </div>
                
                <div class="nav-bottom__container">
                    <div class="input__wrapper">
                        <div class="arrow--left"></div>
                        <input class="input__field" type="text" placeholder="Write a Message..." />
                    </div>
                </div>
            </div> `;

module.exports = ChatTemplate;