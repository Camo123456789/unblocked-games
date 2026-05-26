import { useState, useMemo } from 'react';
import { Search, Gamepad2, Info } from 'lucide-react';
import { motion } from 'motion/react';
import gamesData from './games.json';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)]">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white hidden sm:block">
              UNBLOCKED<span className="text-indigo-500">PLAY</span>
            </h1>
          </div>

          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-500" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search unblocked games..."
              className="w-full bg-slate-900/50 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-games"
            />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Games</a>
              <a href="#" className="hover:text-white transition-colors">Popular</a>
              <a href="#" className="hover:text-white transition-colors">New</a>
            </nav>
            <button className="p-2 text-slate-400 hover:text-white transition-colors" id="btn-info">
              <Info size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-8 py-12 md:px-12 md:py-16 shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                Play the Best Web Games, Anywhere.
              </h2>
              <p className="text-indigo-100 text-lg mb-8 opacity-90 max-w-lg">
                Discover a curated library of high-quality unblocked games optimized for desktop and mobile play. No downloads, no hassle.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setSelectedGame(gamesData[0])}
                  className="px-8 py-3.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10"
                >
                  Quick Play
                </button>
                <div className="flex items-center gap-2 text-indigo-100 font-medium">
                  <div className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse" />
                  <span>{gamesData.length * 42} Active players</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-700 rounded-full blur-[100px] opacity-50" />
          </div>
        </section>

        <section className="mb-10 overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-4">
            {['All', 'Puzzle', 'Arcade', 'Strategy', 'Board', 'Platformer'].map((cat) => (
              <button
                key={cat}
                className="whitespace-nowrap px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all font-medium"
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Featured Library
            </h3>
            <span className="text-slate-500 text-sm font-medium">{filteredGames.length} Games found</span>
          </div>

          {filteredGames.length > 0 ? (
            <motion.div 
              layout
              className="games-grid"
            >
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={setSelectedGame} 
                />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
              <Gamepad2 size={48} className="mb-4 opacity-20" />
              <p className="text-lg">No games matching your search.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-indigo-500" size={24} />
            <span className="text-lg font-black tracking-tighter text-white">UNBLOCKEDPLAY</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 UnblockedPlay Portal. Built with local JSON configuration.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <GamePlayer 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
}
