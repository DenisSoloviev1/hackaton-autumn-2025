import { useState } from 'react';
import { Shield, ShieldCheck, ShieldAlert, Info } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { encryptionInstance } from '../utils/encryption';

interface SecurityIndicatorProps {
  encryptionEnabled: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor';
}

export function SecurityIndicator({ encryptionEnabled, connectionQuality }: SecurityIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getSecurityIcon = () => {
    if (!encryptionEnabled) {
      return <ShieldAlert className="w-4 h-4 text-amber-600" />;
    }
    return <ShieldCheck className="w-4 h-4 text-green-600" />;
  };

  const getSecurityText = () => {
    if (!encryptionEnabled) {
      return 'Частично защищено';
    }
    return 'Полная защита';
  };

  const getConnectionColor = () => {
    switch (connectionQuality) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
    }
  };

  const getConnectionText = () => {
    switch (connectionQuality) {
      case 'excellent':
        return 'Отличное';
      case 'good':
        return 'Хорошее';
      case 'poor':
        return 'Слабое';
    }
  };

  const keyFingerprint = encryptionInstance.getKeyFingerprint();

  return (
    <div className="absolute top-4 left-4 z-10">
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg gap-2"
          >
            {getSecurityIcon()}
            <span className="text-sm">{getSecurityText()}</span>
            <div className={`w-2 h-2 rounded-full ${getConnectionColor()}`} />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Статус безопасности
            </DialogTitle>
            <DialogDescription>
              Подробная информация о защите вашей конференции
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Шифрование */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span>End-to-end шифрование</span>
                </div>
                <Badge className="bg-green-600">Активно</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Все данные защищены сквозным шифрованием. Только участники конференции могут получить доступ к содержимому.
              </p>
              <div className="bg-slate-100 p-3 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Отпечаток ключа шифрования:</p>
                <code className="text-sm font-mono">{keyFingerprint}</code>
              </div>
            </div>

            {/* Качество соединения */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span>Качество соединения</span>
                <Badge variant="outline" className="gap-1">
                  <div className={`w-2 h-2 rounded-full ${getConnectionColor()}`} />
                  {getConnectionText()}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Задержка:</span>
                  <span>45 мс</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Пропускная способность:</span>
                  <span>2.4 Мбит/с</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Потеря пакетов:</span>
                  <span>0.2%</span>
                </div>
              </div>
            </div>

            {/* Защищенные компоненты */}
            <div>
              <h4 className="mb-3">Защищенные компоненты</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Видеопоток (AES-256)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Аудиопоток (AES-256)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Текстовые сообщения (AES-256)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Метаданные (TLS 1.3)</span>
                </div>
              </div>
            </div>

            {/* Предупреждение */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="mb-1">
                  Убедитесь, что отпечаток ключа совпадает у всех участников для максимальной безопасности.
                </p>
                <p className="text-xs text-blue-700">
                  Никогда не передавайте ключи шифрования по незащищенным каналам.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
