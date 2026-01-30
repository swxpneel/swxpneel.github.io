import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, AlertCircle } from 'lucide-react';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const Toast = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([]);

  useImperativeHandle(ref, () => ({
    add: (message, type = 'success') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000);
    }
  }));

  return (
    <div className="fixed bottom-4 right-4 z-[110] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
              toast.type === 'error' ? 'bg-red-500' : 'bg-green-600'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

export default Toast;
