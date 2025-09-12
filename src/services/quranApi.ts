import axios from 'axios';
import { Surah, Verse } from '@/stores/quranStore';

const API_BASE = 'https://api.alquran.cloud/v1';

class QuranAPI {
  async getSurahs(): Promise<Surah[]> {
    try {
      const response = await axios.get(`${API_BASE}/surah`);
      return response.data.data.map((surah: any) => ({
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        numberOfAyahs: surah.numberOfAyahs,
        revelationType: surah.revelationType,
      }));
    } catch (error) {
      console.error('Error fetching surahs:', error);
      return this.getFallbackSurahs();
    }
  }

  async getSurahVerses(surahNumber: number): Promise<Verse[]> {
    try {
      // Get Arabic text
      const arabicResponse = await axios.get(`${API_BASE}/surah/${surahNumber}`);
      // Get English translation
      const englishResponse = await axios.get(`${API_BASE}/surah/${surahNumber}/en.asad`);
      
      const arabicVerses = arabicResponse.data.data.ayahs;
      const englishVerses = englishResponse.data.data.ayahs;
      
      return arabicVerses.map((ayah: any, index: number) => ({
        number: ayah.numberInSurah,
        text: ayah.text,
        translation: englishVerses[index]?.text || '',
        surah: surahNumber,
        audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`,
      }));
    } catch (error) {
      console.error('Error fetching surah verses:', error);
      return this.getFallbackVerses(surahNumber);
    }
  }

  async getRandomVerse(): Promise<Verse | null> {
    try {
      const randomSurah = Math.floor(Math.random() * 114) + 1;
      const surahInfo = await axios.get(`${API_BASE}/surah/${randomSurah}`);
      const maxVerse = surahInfo.data.data.numberOfAyahs;
      const randomVerse = Math.floor(Math.random() * maxVerse) + 1;
      
      const verses = await this.getSurahVerses(randomSurah);
      return verses.find(v => v.number === randomVerse) || null;
    } catch (error) {
      console.error('Error fetching random verse:', error);
      return this.getFallbackDailyVerse();
    }
  }

  async searchVerses(query: string): Promise<Verse[]> {
    try {
      const response = await axios.get(`${API_BASE}/search/${query}/all/en`);
      return response.data.data.matches.map((match: any) => ({
        number: match.numberInSurah,
        text: match.text,
        translation: match.englishText || '',
        surah: match.surah.number,
      }));
    } catch (error) {
      console.error('Error searching verses:', error);
      return [];
    }
  }

  // Fallback data for offline/error scenarios
  private getFallbackSurahs(): Surah[] {
    return [
      { number: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', numberOfAyahs: 7, revelationType: 'Meccan' },
      { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', numberOfAyahs: 286, revelationType: 'Medinan' },
      { number: 3, name: 'آل عمران', englishName: 'Ali \'Imran', numberOfAyahs: 200, revelationType: 'Medinan' },
      // Add more fallback surahs as needed
    ];
  }

  private getFallbackVerses(surahNumber: number): Verse[] {
    if (surahNumber === 1) {
      return [
        {
          number: 1,
          text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
          surah: 1,
        },
        {
          number: 2,
          text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          translation: '[All] praise is [due] to Allah, Lord of the worlds.',
          surah: 1,
        },
      ];
    }
    return [];
  }

  private getFallbackDailyVerse(): Verse {
    return {
      number: 1,
      text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      surah: 1,
    };
  }
}

export const quranAPI = new QuranAPI();