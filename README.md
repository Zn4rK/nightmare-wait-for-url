nightmare-wait-for-url
======================

Add .waitForUrl() to your [Nightmare](http://github.com/segmentio/nightmare) scripts.

## Usage
Require the library:

```js
require('nightmare-wait-for-url')
```

### .waitForUrl(string)
Waits for the navigation to match the provided string

### .waitForUrl(regex)
Wait for the navigation to match the provided regex

## Example

```js
var google = yield nightmare
    .goto('https://www.google.com')
    .type('input[label="Search"]', 'Alexander the great')
    .click('input[name="btnK"]')
    .waitForUrl(/https:\/\/www\.google\.com\/.*q=Alexander\+the\+great/);
```
