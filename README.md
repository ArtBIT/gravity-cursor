[![GitHub stars](https://img.shields.io/github/stars/ArtBIT/gravity-cursor.svg)](https://github.com/ArtBIT/gravity-cursor) [![GitHub license](https://img.shields.io/github/license/ArtBIT/gravity-cursor.svg)](https://github.com/ArtBIT/gravity-cursor) [![GitHub issues](https://img.shields.io/github/issues/ArtBIT/gravity-cursor.svg)](https://github.com/ArtBIT/gravity-cursor/issues)

# Cursor Gravity

This is a small experiment that hijacks the user cursor and makes it attract to or repel from certain elements on the page.

Try the live demo [here](https://artbit.github.io/gravity-cursor/demos/).

[![gravity-cursor](demos/assets/demo.gif)](http://github.com/artbit/gravity-cursor/)

## How it works?
It makes the user cursor invisible using a simple `cursor: none;` CSS rule, and replaces it with a simple image element, which is moved around the screen to imitate original cursor, but making it react to attractors and deflectors on the page.

## Usage
```js
GravityCursor
    .attract(document.querySelector('a.attractor'))
    .repel(document.querySelector('a.deflector'))
    .start();

document.querySelector('a.stop').addEventListener('click', function() {
    GravityCursor.stop();
});
```

This will replace the real cursor with the fake one and activate the 'repel' and 'attract' behavior on the selected DOM elements.

## Local Build
```
git clone https://github.com/ArtBIT/gravity-cursor.git
cd gravity-cursor
npm install
npm start
```

## License

MIT


## Credits

Inspired by [javierbyte/control-user-cursor](https://github.com/javierbyte/control-user-cursor)
