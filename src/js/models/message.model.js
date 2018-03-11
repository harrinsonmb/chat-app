const Message = function (params) {
    'use strict';
    this.id = new Date().getTime();
    this.text = params.text || null;
    this.user = params.user || null;
};

module.exports = Message;