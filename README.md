# Cursor Gravity
Inspired by [javierbyte/control-user-cursor](https://github.com/javierbyte/control-user-cursor)

This is a small experiment that hijacks the user cursor and makes it attract to or repel from certain elements on the page.

[![gravity-cursor](demos/demo.gif)](http://github.com/artbit/gravity-cursor/)

## How it works?
It makes the user cursor invisible using a simple `cursor: none;` CSS rule, and replaces it with a simple image element, which is moved around the screen to imitate original cursor, but making it react to attractors and deflectors on the page.

## Usage
```js
GravityCursor
    .attract(document.querySelector('a.attractor'))
    .repel(document.querySelector('a.deflector'));

document.querySelector('a.stop').addEventListener('click', function() {
    GravityCursor.remove();
});
```

This will replace the real cursor with the fake one and activate the 'repel' and 'attract' behavior on the selected DOM elements.

## Demo

Try the live demo [here]().

Or test it locally:

```
git clone https://github.com/ArtBIT/gravity-cursor.git
cd gravity-cursor
npm install
npm start
```

## License

MIT