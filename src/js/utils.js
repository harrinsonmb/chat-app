let Utils = {
    /**
     * Generates a GUID string.
     * @returns {String} The generated GUID.
     * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
     * @author Slavik Meltser (slavik@meltser.info).
     * @link http://slavik.meltser.info/?p=142
     */
    guid : function() {
        'use strict';
        function _p8(s) {
            let p = (Math.random().toString(16)+'000000000').substr(2,8);
            return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    },
    /**
     * Function to scroll down in chat view
     */
    goBottom: function () {
        'use strict';
        window.scrollTo(0,document.body.scrollHeight);
    }
};

module.exports = Utils;