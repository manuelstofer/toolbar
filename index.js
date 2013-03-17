'use strict';
module.exports = Toolbar;

var View    = require('koboldmaki'),
    each    = require('each'),
    object  = require('object'),
    event   = require('event'),
    map     = require('map'),
    css     = require('css'),
    offset  = require('offset');

var defaults = {
    position:   'left',
    delay:      300
};

function Toolbar(el, options) {

    var instance = {

        className: 'toolbar',

        events: {
            'click img': 'forwardEvent'
        },

        initialize: function () {
            instance.visible = false;
            instance.bindEvents();
            instance.render();
        },


        forwardEvent: function (evt) {
            var target = evt.target || evt.srcElement,
                key = target.getAttribute('data-key'),
                handler = options.icons[key];

            if (typeof handler === 'function') {
                handler();
            }
            triggerEvent(el, handler);
        },

        bindEvents: function () {

            event.bind(el, 'mouseover', function () {
                instance.overElement = true;
                instance.show();
            });

            event.bind(el, 'mouseout', function () {
                instance.overElement = false;
                instance.hide();
            });

            event.bind(instance.el, 'mouseover', function () {
                instance.overToolbar = true;
            });

            event.bind(instance.el, 'mouseout', function () {
                instance.overToolbar = false;
                instance.hide();
            });
        },

        show: function () {
            document.body.appendChild(instance.el);
            var pos = offset(el),
                alignment = (options.position || defaults.position) === 'right' ?
                    el.clientWidth - instance.el.clientWidth : 0;

            instance.visible = true;
            css(instance.el, {

                top:        pos.top - instance.el.clientHeight + window.scrollY + 'px',
                left:       pos.left + alignment + window.scrollX + 'px'
            });
        },

        hide: function () {
            setTimeout(function () {
                if (!instance.overToolbar && !instance.overElement && instance.visible) {
                    instance.visible = false;
                    document.body.removeChild(instance.el);
                }
            }, options.delay || defaults.delay);
        },

        render: function () {
            instance.el.innerHTML = map(object.keys(options.icons), function (src) {
                return '<img src="' + src + '" data-key="' + src + '" height="' + (options.height || 50) + '"> ';
            }).join('');
        }
    };

    return View(instance);
}



function triggerEvent (element, event) {
    var evt = document.createEvent('Event');
    evt.initEvent(event, true, true);
    element.dispatchEvent(evt);
}