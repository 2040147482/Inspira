// Theme configuration for IdeaBox
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      900: '#0f172a',
    },
    accent: {
      purple: '#8b5cf6',
      green: '#10b981',
      orange: '#f59e0b',
      red: '#ef4444',
    },
  },
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Monaco', 'Menlo', 'monospace'],
  },
  spacing: {
    container: {
      padding: '1rem',
      maxWidth: '1200px',
    },
    section: {
      padding: '4rem 0',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
};

// Design tokens
export const tokens = {
  // Typography scale
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  // Component specific tokens
  components: {
    button: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
      },
    },
    card: {
      padding: '1.5rem',
      borderRadius: '0.75rem',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
    input: {
      height: '2.5rem',
      padding: '0.75rem',
      borderRadius: '0.5rem',
    },
  },
};

// Utility functions
export const getColorValue = (colorPath: string) => {
  const keys = colorPath.split('.');
  let value: any = theme.colors;

  for (const key of keys) {
    value = value[key];
    if (!value) break;
  }

  return value;
};

export const generateColorVariables = () => {
  return {
    '--color-primary': theme.colors.primary[500],
    '--color-primary-dark': theme.colors.primary[700],
    '--color-secondary': theme.colors.secondary[500],
    '--color-accent-purple': theme.colors.accent.purple,
    '--color-accent-green': theme.colors.accent.green,
    '--color-accent-orange': theme.colors.accent.orange,
  };
};
