import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reaction } from '../types/conference';

interface ReactionOverlayProps {
  reactions: Reaction[];
}

export function ReactionOverlay({ reactions }: ReactionOverlayProps) {
  const [visibleReactions, setVisibleReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    // Показываем только последние реакции (последние 3 секунды)
    const now = new Date();
    const recent = reactions.filter(
      r => now.getTime() - r.timestamp.getTime() < 3000
    );
    setVisibleReactions(recent);
  }, [reactions]);

  return (
    <div className="absolute bottom-20 left-0 right-0 pointer-events-none flex justify-center z-20">
      <div className="flex gap-4">
        <AnimatePresence>
          {visibleReactions.map((reaction) => (
            <motion.div
              key={reaction.id}
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="text-6xl"
            >
              {reaction.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
