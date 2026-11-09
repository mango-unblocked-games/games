# Mango Unblocked Games

A static browser-game directory built for GitHub Pages.

## Current features
- Responsive homepage
- Category filters
- Search by game title
- Favorites saved in the visitor's browser using localStorage
- Suggestion email link (replace `YOUR_EMAIL_HERE` in `index.html`)

## Add a game
Open `js/app.js` and add an object inside the `games` array:

```js
{
  id: "unique-game-id",
  title: "Game title",
  category: "Puzzle",
  icon: "🧩",
  url: "https://official-permitted-game-url.example"
}
```

Use a unique `id`. The category must exactly match one of the categories listed near the top of `app.js`.

The `url` should be a legitimate playable page that the developer permits you to link to. Do not copy another site's game files, bypass school/network restrictions, or embed games without permission. Verify the game's terms and test it in a browser before listing it.

## Publish with GitHub Pages
1. Upload the contents of this folder to the root of your `games` repository (not the enclosing folder).
2. Keep `index.html`, `css`, and `js` at the repository root.
3. In Settings → Pages, select Deploy from a branch, `main`, and `/(root)`.
4. Wait for the `pages build and deployment` workflow to finish successfully.
5. Visit https://mango-unblocked-games.github.io/games/

## Important limitations
- This is a static site. Favorites are stored only in each visitor's browser.
- The suggestion link opens the visitor's email app; it does not store submissions on a server.
- There is no administrator dashboard or user account system.
- The sample catalog is intentionally empty. Add only games whose linking, hosting, or embedding terms you have checked.
