import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ec7bbe777a8f4611abcb476ad9fe45e2',
  appName: 'Quran Connect',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'https://ec7bbe77-7a8f-4611-abcb-476ad9fe45e2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'beep.wav',
    },
    Geolocation: {
      permissions: ['location'],
    },
  },
};

export default config;