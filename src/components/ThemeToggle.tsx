import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/80 rounded-xl border border-border shadow-inner">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'light' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Tema Claro"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'dark' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Tema Escuro"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'system' 
            ? 'bg-accent text-accent-foreground shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Seguir Sistema"
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
