import { Button } from './ui/button';
import { Grid3x3, User } from 'lucide-react';
import { ViewMode } from '../types/conference';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface ViewModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ mode, onModeChange }: ViewModeToggleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => onModeChange(mode === 'grid' ? 'speaker' : 'grid')}
            className="rounded-full bg-slate-700 hover:bg-slate-600 text-white"
          >
            {mode === 'grid' ? (
              <User className="w-5 h-5" />
            ) : (
              <Grid3x3 className="w-5 h-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{mode === 'grid' ? 'Режим докладчика' : 'Режим сетки'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
