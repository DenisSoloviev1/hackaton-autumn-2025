import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Обновленная основная палитра - более мягкие и современные тона
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Основной акцент
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        
        // Нейтральные цвета оптимизированы для долгого просмотра
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        
        // Функциональные цвета с улучшенной доступностью
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Более мягкий зеленый
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        
        // Специализированные цвета для видео-платформы
        video: {
          // Статусы участников
          online: '#10b981',
          offline: '#6b7280',
          away: '#f59e0b',
          dnd: '#ef4444',
          
          // Индикаторы активности
          speaking: '#3b82f6',
          speakingGlow: 'rgba(59, 130, 246, 0.3)',
          muted: '#ef4444',
          presenting: '#8b5cf6',
          
          // Фоны для видео
          videoBg: '#1e293b',
          videoBgHover: '#334155',
          gridBg: '#0f172a',
          
          // Элементы интерфейса
          controlBg: 'rgba(15, 23, 42, 0.8)',
          controlBorder: 'rgba(255, 255, 255, 0.1)',
          overlay: 'rgba(0, 0, 0, 0.7)',
        },
        
        // Новые градиенты для современных акцентов
        gradient: {
          primary: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          success: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
          premium: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      
      // Расширенные анимации для видео-интерфейса
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'connect': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'speaking': 'pulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      
      // Дополнительные утилиты для видео-интерфейса
      backdropBlur: {
        xs: '2px',
      },
      
      boxShadow: {
        'video-control': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'video-tile': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'speaking-glow': '0 0 0 3px rgba(59, 130, 246, 0.3)',
      }
    },
  },
  
  darkMode: "class",
  
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#ffffff",
          foreground: "#18181b",
          default: {
            100: "#f4f4f5",
            200: "#e4e4e7",
            300: "#d4d4d8",
            400: "#a1a1aa",
            500: "#71717a",
          },
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            DEFAULT: '#0ea5e9',
            foreground: '#ffffff',
          },
          focus: '#0ea5e9',
        }
      },
      dark: {
        colors: {
          background: "#09090b",
          foreground: "#fafafa",
          default: {
            100: "#27272a",
            200: "#3f3f46",
            300: "#52525b",
            400: "#71717a",
            500: "#a1a1aa",
          },
          primary: {
            50: '#082f49',
            100: '#0c4a6e',
            200: '#075985',
            300: '#0369a1',
            400: '#0284c7',
            500: '#0ea5e9',
            600: '#38bdf8',
            700: '#7dd3fc',
            800: '#bae6fd',
            900: '#e0f2fe',
            DEFAULT: '#0ea5e9',
            foreground: '#ffffff',
          },
          focus: '#38bdf8',
        }
      }
    }
  })],
};