import './index.css';
import gamesData from './games.json';

const grid = document.getElementById('games-grid');
const searchInput = document.getElementById('search-input');
const overlay = document.getElementById('player-overlay');
const iframe = document.getElementById('game-iframe');
const title = document.getElementById('current-game-title');
const closeBtn = document.getElementById('close-player');

function renderGames(games) {
  grid.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = "group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.02]";
    card.innerHTML = `
      <div class="aspect-video w-full overflow-hidden relative">
        <img src="${game.thumbnailUrl}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div class="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
           <div class="bg-indigo-600 p-3 rounded-full text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
           </div>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors">${game.title}</h3>
          <span class="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded border border-indigo-400/20">${game.category}</span>
        </div>
        <p class="text-slate-400 text-sm line-clamp-2">${game.description}</p>
      </div>
    `;
    card.onclick = () => openGame(game);
    grid.appendChild(card);
  });
}

function openGame(game) {
  title.innerText = game.title;
  iframe.src = game.iframeUrl;
  overlay.classList.remove('hidden');
}

function closeGame() {
  overlay.classList.add('hidden');
  iframe.src = '';
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = gamesData.filter(g => 
    g.title.toLowerCase().includes(query) || 
    g.category.toLowerCase().includes(query)
  );
  renderGames(filtered);
});

closeBtn.onclick = closeGame;

// Initial Draw
renderGames(gamesData);
