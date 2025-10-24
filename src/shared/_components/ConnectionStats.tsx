import { useState, useEffect } from 'react';
import { ConnectionStats as Stats } from '../types/conference';
import { Button } from './ui/button';
import { Activity } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Progress } from './ui/progress';

interface ConnectionStatsProps {
  stats: Stats;
}

export function ConnectionStats({ stats }: ConnectionStatsProps) {
  const [open, setOpen] = useState(false);

  const getQualityColor = (value: number, thresholds: { good: number; medium: number }) => {
    if (value <= thresholds.good) return 'text-green-500';
    if (value <= thresholds.medium) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPingColor = () => getQualityColor(stats.ping, { good: 50, medium: 150 });
  const getPacketLossColor = () => getQualityColor(stats.packetLoss, { good: 1, medium: 3 });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full bg-slate-700 hover:bg-slate-600 text-white"
        >
          <Activity className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2">Статистика соединения</h4>
          </div>

          <div className="space-y-3">
            {/* Ping */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Задержка (Ping)</span>
                <span className={getPingColor()}>{stats.ping} мс</span>
              </div>
              <Progress value={Math.min((stats.ping / 200) * 100, 100)} />
            </div>

            {/* Jitter */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Джиттер</span>
                <span className="text-slate-600">{stats.jitter} мс</span>
              </div>
              <Progress value={Math.min((stats.jitter / 50) * 100, 100)} />
            </div>

            {/* Packet Loss */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Потеря пакетов</span>
                <span className={getPacketLossColor()}>{stats.packetLoss.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(stats.packetLoss * 10, 100)} />
            </div>

            {/* Bitrate */}
            <div>
              <div className="flex justify-between text-sm">
                <span>Битрейт</span>
                <span className="text-slate-600">{(stats.bitrate / 1000).toFixed(0)} Кбит/с</span>
              </div>
            </div>

            {/* Resolution & FPS */}
            <div className="pt-3 border-t">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-slate-500">Разрешение</div>
                  <div>{stats.resolution}</div>
                </div>
                <div>
                  <div className="text-slate-500">FPS</div>
                  <div>{stats.fps}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
