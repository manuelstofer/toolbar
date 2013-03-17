var toolbar = require('toolbar');

var initToolbar = function (el, pos) {

    toolbar(el, {
        height: 30,
        position: pos,
        icons: {
            "../resources/add.svg":     "add",
            "../resources/remove.svg":  "remove",
            "../resources/edit.svg":    function () {
                console.log('edit');
            }
        }
    });

    el.addEventListener('add', function () {
        console.log('add');
    });

    el.addEventListener('remove', function () {
        console.log('remove');
    });
};

initToolbar(document.getElementById('toolbar-left'), 'left');
initToolbar(document.getElementById('toolbar-right'), 'right');



