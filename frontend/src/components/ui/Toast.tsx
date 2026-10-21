import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-et-card border border-et-accent/40 text-et-text text-sm font-medium rounded-[10px] px-4 py-3 flex items-center gap-2 shadow-lg shadow-black/40">
      <CheckCircle2 size={18} className="text-et-accent" />
      {message}
    </div>
  );
}
