/**
 * Module dependencies.
 */

require('mocha-generators').install();

var Nightmare = require('nightmare');
var should = require('chai').should();
var server = require('./server');

/**
 * Get rid of a warning.
 */

process.setMaxListeners(0);

/**
 * Locals.
 */
var base = 'http://localhost:7500/';

describe('Nightmare Wait For Url', function() {
    before(function(done) {
        require('../nightmare-wait-for-url');
        server.listen(7501, function() {
            server.listen(7500, done);
        });
    });

    it('should be constructable', function * () {
        var nightmare = Nightmare();
        nightmare.should.be.ok;
        yield nightmare.end();
    });

    describe('waiting', function() {
        var nightmare;

        beforeEach(function() {
            nightmare = Nightmare();
        });

        afterEach(function * () {
            yield nightmare.end();
        });

        it('should wait for anchor1', function * () {
            var anchor = yield nightmare
                .goto(base)
                .click('#anchor-1')
                .waitForUrl('#anchor1');

            anchor.should.be.true;
        });

        it('should wait for random anchor with regular expression', function * () {
            var target = Math.floor(Math.random() * (3 - 1) + 1);

            var regex = yield nightmare
                .goto(base)
                .click('#anchor-' + target)
                .waitForUrl(/#anchor\d+/);

            regex.should.be.true;
        });

    });
});
