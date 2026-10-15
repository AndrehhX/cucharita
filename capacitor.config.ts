import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cucharita.app',
  appName: 'Cucharita',
  webDir: 'dist',
  backgroundColor: '#F9F3E9',
  android: {
    allowMixedContent: false,
  },
};

export default config;
