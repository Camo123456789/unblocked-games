import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, RotateCcw } from "lucide-react";
import { useState, useRef } from "react";

export function GamePlayer({ game, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  if (!game) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReload = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) iframe.src = game.iframeUrl;
  };

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950 flex flex-col"
          id="game-player-overlay"
        >
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                id="btn-close-player"
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-bold text-white tracking-tight">{game.title}</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleReload}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                title="Reload Game"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                title="Toggle Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          <div ref={containerRef} className="flex-1 bg-black relative">
            <iframe
              id="game-iframe"
              src={game.iframeUrl}
              className="w-full h-full border-0"
              title={game.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
