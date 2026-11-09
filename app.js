const categories = ["All", "Racing", "Sports", "Adventure", "Platformer", "Puzzle", "Strategy", "Survival", "Multiplayer", "Simulation", "Idle", "Arcade", "Casual"];
const games = [
  // Add verified, permitted games here. See README.md for the format.

];
const searchInput = document.querySelector("#search");
const gameGrid = document.querySelector("#game-grid");
const favoriteGrid = document.querySelector("#favorite-grid");
const categoryList = document.querySelector("#category-list");
const emptyState = document.querySelector("#empty-state");
const favoriteEmpty = document.querySelector("#favorite-empty");
let selectedCategory = "All";
let query = "";

function getFavorites() {
  try { return JSON.parse(localStorage.getItem("mangoFavorites") || "[]"); }
  catch { return []; }
}
function saveFavorites(ids) {
  localStorage.setItem("mangoFavorites", JSON.stringify(ids));
}
function makeCard(game) {
  const card = document.createElement("article");
  card.className = "game-card";
  const art = document.createElement("div");
  art.className = "game-art";
  art.textContent = game.icon || "🎮";
  const info = document.createElement("div");
  info.className = "game-info";
  const row = document.createElement("div");
  row.className = "game-title-row";
  const title = document.createElement("h3");
  title.className = "game-title";
  title.textContent = game.title;
  const fav = document.createElement("button");
  fav.className = "favorite-button";
  fav.type = "button";
  fav.setAttribute("aria-label", "Toggle favorite");
  const updateFav = () => {
    const isFav = getFavorites().includes(game.id);
    fav.textContent = isFav ? "★" : "☆";
    fav.setAttribute("aria-pressed", String(isFav));
  };
  fav.addEventListener("click", () => {
    const ids = getFavorites();
    saveFavorites(ids.includes(game.id) ? ids.filter(id => id !== game.id) : [...ids, game.id]);
    render();
  });
  updateFav();
  row.append(title, fav);
  const category = document.createElement("p");
  category.className = "game-category";
  category.textContent = game.category;
  const link = document.createElement("a");
  link.className = "play-link";
  link.textContent = "Play game";
  link.href = game.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  info.append(row, category, link);
  card.append(art, info);
  return card;
}
function renderCategories() {
  categoryList.replaceChildren();
  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "category-button" + (selectedCategory === category ? " selected" : "");
    button.textContent = category;
    button.addEventListener("click", () => { selectedCategory = category; render(); });
    categoryList.append(button);
  });
}
function render() {
  renderCategories();
  const filtered = games.filter(game =>
    (selectedCategory === "All" || game.category === selectedCategory) &&
    game.title.toLowerCase().includes(query)
  );
  gameGrid.replaceChildren(...filtered.map(makeCard));
  emptyState.hidden = filtered.length !== 0;
  document.querySelector("#result-count").textContent = `${filtered.length} games`;
  const favoriteGames = games.filter(game => getFavorites().includes(game.id));
  favoriteGrid.replaceChildren(...favoriteGames.map(makeCard));
  favoriteEmpty.hidden = favoriteGames.length !== 0;
  document.querySelector("#favorite-count").textContent = getFavorites().length;
}
searchInput.addEventListener("input", event => { query = event.target.value.trim().toLowerCase(); render(); });
document.querySelector("#year").textContent = new Date().getFullYear();
render();
