var Nightmare = require('nightmare'),
    debug = require('debug')('nightmare:wait-for-url');

Nightmare.action(
    'waitForUrl',
    function(ns, options, parent, win, renderer, done) {
        var navigationHistory = [];

        win.webContents.on('navigation-entry-commited', function(event, url, inPage, replaceEntry) {
            navigationHistory.push(url);
        });

        // Get the latest url
        parent.on('waitForUrl', function() {
            parent.emit('waitForUrl', navigationHistory[navigationHistory.length-1]);
        });

        done();
    },
    function(matchUrl, done) {
        var self = this;

        var timeout = setTimeout(function() {
            return done(new Error('.waitForUrl(): timed out after ' + self.options.waitTimeout + 'ms - could not find a matching url'));
        }, self.options.waitTimeout);

        // Our event handler
        var handler = function(latestUrl) {
            if(latestUrl.match(matchUrl)) {
                self.child.removeListener('waitForUrl', handler);

                clearTimeout(timeout);
                done(null, true);
            } else {
                // If we don't match, emit again
                self.child.emit('waitForUrl');
            }
        };

        // Callback on waitForUrl
        self.child.on('waitForUrl', handler);
        self.child.emit('waitForUrl');
    }
);
