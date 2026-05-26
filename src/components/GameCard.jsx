import { motion } from "motion/react";
import { Play } from "lucide-react";

export function GameCard({ game, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(game)}
      className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
      id={`game-card-${game.id}`}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={game.thumbnailUrl}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <div className="bg-indigo-600 p-3 rounded-full text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded border border-indigo-400/20">
            {game.category}
          </span>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}
