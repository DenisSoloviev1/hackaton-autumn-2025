import { useState } from 'react';
import { Button } from './ui/button';
import { Smile } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface ReactionsPickerProps {
  onReaction: (emoji: string) => void;
}

const REACTIONS = ['👍', '❤️', '😂', '🎉', '👏', '🔥', '💯', '🚀'];

export function ReactionsPicker({ onReaction }: ReactionsPickerProps) {
  const [open, setOpen] = useState(false);

  const handleReaction = (emoji: string) => {
    onReaction(emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full bg-slate-700 hover:bg-slate-600 text-white"
        >
          <Smile className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" side="top">
        <div className="grid grid-cols-4 gap-2">
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className="text-2xl p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
