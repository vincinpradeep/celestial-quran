import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Verse {
  number: number;
  text: string;
  translation: string;
  surah: number;
  audio?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Bookmark {
  id: string;
  surah: number;
  verse: number;
  text: string;
  translation: string;
  createdAt: string;
}

export interface Settings {
  showTranslation: boolean;
  notificationTime: string;
  notificationEnabled: boolean;
  verseType: 'random' | 'daily' | 'themed';
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

interface QuranState {
  // Data
  surahs: Surah[];
  verses: Verse[];
  dailyVerse: Verse | null;
  bookmarks: Bookmark[];
  favorites: Bookmark[];
  
  // UI State
  settings: Settings;
  currentSurah: number;
  currentVerse: number;
  isPlaying: boolean;
  currentAudio: string | null;
  
  // Actions
  setSurahs: (surahs: Surah[]) => void;
  setVerses: (verses: Verse[]) => void;
  setDailyVerse: (verse: Verse) => void;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  addFavorite: (favorite: Bookmark) => void;
  removeFavorite: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setCurrentPosition: (surah: number, verse: number) => void;
  setAudioState: (isPlaying: boolean, audioUrl?: string) => void;
}

const defaultSettings: Settings = {
  showTranslation: true,
  notificationTime: '08:00',
  notificationEnabled: true,
  verseType: 'random',
  darkMode: false,
  fontSize: 'medium',
};

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      // Initial state
      surahs: [],
      verses: [],
      dailyVerse: null,
      bookmarks: [],
      favorites: [],
      settings: defaultSettings,
      currentSurah: 1,
      currentVerse: 1,
      isPlaying: false,
      currentAudio: null,
      
      // Actions
      setSurahs: (surahs) => set({ surahs }),
      
      setVerses: (verses) => set({ verses }),
      
      setDailyVerse: (verse) => set({ dailyVerse: verse }),
      
      addBookmark: (bookmark) => 
        set((state) => ({ 
          bookmarks: [...state.bookmarks, bookmark] 
        })),
      
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(b => b.id !== id)
        })),
      
      addFavorite: (favorite) =>
        set((state) => ({
          favorites: [...state.favorites, favorite]
        })),
      
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(f => f.id !== id)
        })),
      
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      
      setCurrentPosition: (surah, verse) =>
        set({ currentSurah: surah, currentVerse: verse }),
      
      setAudioState: (isPlaying, audioUrl) =>
        set({ isPlaying, currentAudio: audioUrl || null }),
    }),
    {
      name: 'quran-connect-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        favorites: state.favorites,
        settings: state.settings,
        currentSurah: state.currentSurah,
        currentVerse: state.currentVerse,
      }),
    }
  )
);