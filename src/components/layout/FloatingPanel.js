'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingPanel({ 
  title, 
  position = 'right', 
  children, 
  isOpen = true, 
  onClose,
  className = ''
}) {
  const isRight = position === 'right';

  const variants = {
    hidden: isRight 
      ? { x: '100%', opacity: 0 } 
      : { y: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: isRight 
      ? { x: '100%', opacity: 0, transition: { duration: 0.2 } } 
      : { y: '100%', opacity: 0, transition: { duration: 0.2 } }
  };

  const positioningClasses = isRight
    ? 'fixed right-4 top-20 bottom-4 w-full max-w-[380px]'
    : 'fixed left-20 right-4 bottom-4 max-h-[200px] w-auto';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className={`glass-panel flex flex-col z-[45] ${positioningClasses} ${className}`}
        >
          <div className="flex flex-row items-center justify-between p-4 border-b border-border shrink-0">
            <h2 className="text-sm font-semibold text-text-primary tracking-wide uppercase">
              {title}
            </h2>
            {onClose && (
              <button 
                onClick={onClose}
                className="p-1 rounded-md hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
