import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuranStore, Verse, Bookmark } from '@/stores/quranStore';
import { quranAPI } from '@/services/quranApi';
import { 
  Play, 
  Pause, 
  BookmarkPlus, 
  BookmarkCheck, 
  Heart, 
  HeartOff, 
  Share2, 
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuranReader: React.FC = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    surahs,
    verses,
    setVerses,
    setSurahs,
    bookmarks,
    favorites,
    addBookmark,
    removeBookmark,
    addFavorite,
    removeFavorite,
    settings,
    updateSettings,
    isPlaying,
    currentAudio,
    setAudioState,
    setCurrentPosition
  } = useQuranStore();

  const [currentSurah, setCurrentSurah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadSurahs();
  }, []);

  useEffect(() => {
    if (surahNumber && surahs.length > 0) {
      loadSurahVerses(parseInt(surahNumber));
    }
  }, [surahNumber, surahs]);

  const loadSurahs = async () => {
    if (surahs.length === 0) {
      const surahList = await quranAPI.getSurahs();
      setSurahs(surahList);
    }
  };

  const loadSurahVerses = async (surahNum: number) => {
    setLoading(true);
    const surah = surahs.find(s => s.number === surahNum);
    setCurrentSurah(surah);
    
    const surahVerses = await quranAPI.getSurahVerses(surahNum);
    setVerses(surahVerses);
    setCurrentPosition(surahNum, 1);
    setLoading(false);

    toast({
      title: "Surah Loaded",
      description: `${surah?.englishName} (${surah?.name}) loaded successfully`,
    });
  };

  const handlePlayVerse = (verse: Verse) => {
    if (audio) {
      audio.pause();
    }

    if (isPlaying && currentAudio === verse.audio) {
      setAudioState(false);
      return;
    }

    if (verse.audio) {
      const newAudio = new Audio(verse.audio);
      newAudio.play();
      setAudio(newAudio);
      setAudioState(true, verse.audio);

      newAudio.onended = () => {
        setAudioState(false);
      };

      newAudio.onerror = () => {
        toast({
          title: "Audio Error",
          description: "Unable to play audio for this verse",
          variant: "destructive",
        });
        setAudioState(false);
      };
    }
  };

  const handleBookmark = (verse: Verse) => {
    const bookmarkId = `${verse.surah}-${verse.number}`;
    const existingBookmark = bookmarks.find(b => b.id === bookmarkId);

    if (existingBookmark) {
      removeBookmark(bookmarkId);
      toast({
        title: "Bookmark Removed",
        description: `Verse ${verse.number} removed from bookmarks`,
      });
    } else {
      const bookmark: Bookmark = {
        id: bookmarkId,
        surah: verse.surah,
        verse: verse.number,
        text: verse.text,
        translation: verse.translation,
        createdAt: new Date().toISOString(),
      };
      addBookmark(bookmark);
      toast({
        title: "Bookmark Added",
        description: `Verse ${verse.number} added to bookmarks`,
      });
    }
  };

  const handleFavorite = (verse: Verse) => {
    const favoriteId = `${verse.surah}-${verse.number}`;
    const existingFavorite = favorites.find(f => f.id === favoriteId);

    if (existingFavorite) {
      removeFavorite(favoriteId);
      toast({
        title: "Removed from Favorites",
        description: `Verse ${verse.number} removed from favorites`,
      });
    } else {
      const favorite: Bookmark = {
        id: favoriteId,
        surah: verse.surah,
        verse: verse.number,
        text: verse.text,
        translation: verse.translation,
        createdAt: new Date().toISOString(),
      };
      addFavorite(favorite);
      toast({
        title: "Added to Favorites",
        description: `Verse ${verse.number} added to favorites`,
      });
    }
  };

  const handleShare = async (verse: Verse) => {
    const shareText = `${verse.text}\n\n"${verse.translation}"\n\nSurah ${currentSurah?.englishName} (${verse.number}) - Quran Connect`;
    
    if (navigator.share) {
      await navigator.share({
        title: `Quran Verse - ${currentSurah?.englishName}`,
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Verse copied to clipboard",
      });
    }
  };

  const isBookmarked = (verse: Verse) => {
    return bookmarks.some(b => b.id === `${verse.surah}-${verse.number}`);
  };

  const isFavorited = (verse: Verse) => {
    return favorites.some(f => f.id === `${verse.surah}-${verse.number}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-islamic animate-spin flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-islamic-green font-semibold">Loading Surah...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-islamic text-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              {currentSurah && (
                <div>
                  <h1 className="text-xl font-bold font-arabic">{currentSurah.name}</h1>
                  <p className="text-white/90 text-sm">{currentSurah.englishName}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {verses.length} Verses
              </Badge>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateSettings({ showTranslation: !settings.showTranslation })}
                className="text-white hover:bg-white/20"
              >
                {settings.showTranslation ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <div className="container mx-auto px-4 py-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {verses.map((verse) => (
              <Card key={verse.number} className="border-primary/20 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Verse Number */}
                    <div className="flex justify-between items-center">
                      <div className="verse-number">
                        {verse.number}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePlayVerse(verse)}
                          className="text-islamic-green hover:bg-islamic-green/10"
                        >
                          {isPlaying && currentAudio === verse.audio ? 
                            <Pause className="w-4 h-4" /> : 
                            <Play className="w-4 h-4" />
                          }
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleBookmark(verse)}
                          className={isBookmarked(verse) ? 
                            "text-islamic-gold hover:bg-islamic-gold/10" : 
                            "text-muted-foreground hover:bg-muted"
                          }
                        >
                          {isBookmarked(verse) ? 
                            <BookmarkCheck className="w-4 h-4" /> : 
                            <BookmarkPlus className="w-4 h-4" />
                          }
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleFavorite(verse)}
                          className={isFavorited(verse) ? 
                            "text-red-500 hover:bg-red-50" : 
                            "text-muted-foreground hover:bg-muted"
                          }
                        >
                          {isFavorited(verse) ? 
                            <Heart className="w-4 h-4 fill-current" /> : 
                            <HeartOff className="w-4 h-4" />
                          }
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleShare(verse)}
                          className="text-muted-foreground hover:bg-muted"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <div className="arabic-text text-2xl leading-loose p-4 bg-secondary/30 rounded-lg">
                      {verse.text}
                    </div>

                    {/* Translation */}
                    {settings.showTranslation && (
                      <div className="text-muted-foreground italic leading-relaxed">
                        {verse.translation}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default QuranReader;