import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuranStore } from '@/stores/quranStore';
import { quranAPI } from '@/services/quranApi';
import { BookOpen, Compass, Star, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { dailyVerse, setDailyVerse, favorites, settings } = useQuranStore();

  useEffect(() => {
    loadDailyVerse();
  }, []);

  const loadDailyVerse = async () => {
    if (!dailyVerse) {
      const verse = await quranAPI.getRandomVerse();
      if (verse) {
        setDailyVerse(verse);
      }
    }
  };

  const handleShareVerse = async () => {
    if (dailyVerse) {
      const shareText = `${dailyVerse.text}\n\n"${dailyVerse.translation}"\n\n- Quran Connect`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Daily Verse - Quran Connect',
          text: shareText,
        });
      } else {
        // Fallback for browsers without native sharing
        navigator.clipboard.writeText(shareText);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-islamic text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <BookOpen size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-arabic">
              قُرآن كونِيكت
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Quran Connect
            </h2>
            <p className="text-white/90 max-w-md mx-auto">
              Your daily companion for Quranic reading, reflection, and spiritual growth
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Daily Verse Widget */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-islamic-gold" />
              <CardTitle className="text-islamic-green">Daily Verse</CardTitle>
              <Star className="w-5 h-5 text-islamic-gold" />
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent"></div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {dailyVerse ? (
              <div className="space-y-4">
                {/* Arabic Text */}
                <div className="text-center">
                  <div className="arabic-text text-2xl md:text-3xl leading-loose p-4 bg-secondary/30 rounded-lg">
                    {dailyVerse.text}
                  </div>
                  <Badge variant="outline" className="mt-2">
                    Surah {dailyVerse.surah} : Verse {dailyVerse.number}
                  </Badge>
                </div>

                {/* Translation */}
                {settings.showTranslation && (
                  <div className="text-center">
                    <p className="text-muted-foreground italic text-lg leading-relaxed">
                      "{dailyVerse.translation}"
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => navigate(`/quran/surah/${dailyVerse.surah}`)}
                    className="bg-gradient-islamic hover:opacity-90"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Full Surah
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleShareVerse}
                    className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Verse
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-pulse space-y-4">
                  <div className="h-16 bg-secondary rounded-lg"></div>
                  <div className="h-4 bg-secondary rounded w-2/3 mx-auto"></div>
                  <div className="h-10 bg-secondary rounded w-1/3 mx-auto"></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Access Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 group"
            onClick={() => navigate('/quran')}
          >
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="w-16 h-16 rounded-full bg-gradient-islamic flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-islamic-green mb-1">
                  Read Quran
                </h3>
                <p className="text-muted-foreground">
                  Browse by Surah or Juz with audio recitation
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-primary/20 group"
            onClick={() => navigate('/qibla')}
          >
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-islamic-gold mb-1">
                  Qibla Direction
                </h3>
                <p className="text-muted-foreground">
                  Find the direction to Mecca from your location
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorites Preview */}
        {favorites.length > 0 && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-islamic-green flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Favorites ({favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {favorites.slice(0, 3).map((favorite) => (
                  <div 
                    key={favorite.id}
                    className="p-3 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => navigate(`/quran/surah/${favorite.surah}`)}
                  >
                    <div className="arabic-text text-lg">{favorite.text}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Surah {favorite.surah} : Verse {favorite.verse}
                    </div>
                  </div>
                ))}
                {favorites.length > 3 && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/favorites')}
                    className="w-full"
                  >
                    View All Favorites
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomePage;