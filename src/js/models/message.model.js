const Message = function (params) {
    'use strict';
    this.id = params.id || null;
    this.text = params.text || null;
    this.user = params.user || null;
    this.isIncoming = params.isIncoming || null;
};

module.exports = Message;