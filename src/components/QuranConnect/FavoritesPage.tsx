import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useQuranStore } from '@/stores/quranStore';
import { ArrowLeft, Heart, Share2, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { favorites, removeFavorite, settings } = useQuranStore();

  const handleShare = async (favorite: any) => {
    const shareText = `${favorite.text}\n\n"${favorite.translation}"\n\nSurah ${favorite.surah} : Verse ${favorite.verse} - Quran Connect`;
    
    if (navigator.share) {
      await navigator.share({
        title: `Favorite Verse - Quran Connect`,
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

  const handleRemove = (favorite: any) => {
    removeFavorite(favorite.id);
    toast({
      title: "Removed from Favorites",
      description: `Verse ${favorite.verse} removed from favorites`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-islamic text-white">
        <div className="container mx-auto px-4 py-6">
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
              
              <div>
                <h1 className="text-2xl font-bold">My Favorites</h1>
                <p className="text-white/90">Your saved verses for reflection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-300" />
              <Badge variant="secondary" className="bg-white/20 text-white">
                {favorites.length}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-islamic/10 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-islamic-green/50" />
            </div>
            <h2 className="text-2xl font-bold text-islamic-green mb-4">
              No Favorites Yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start reading the Quran and save your favorite verses by tapping the heart icon. 
              They'll appear here for easy access.
            </p>
            <Button 
              onClick={() => navigate('/quran')}
              className="bg-gradient-islamic hover:opacity-90"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Start Reading
            </Button>
          </div>
        ) : (
          /* Favorites List */
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {favorites.map((favorite) => (
                <Card key={favorite.id} className="border-primary/20 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-islamic flex items-center justify-center text-white font-bold text-sm">
                          {favorite.verse}
                        </div>
                        <div>
                          <CardTitle className="text-islamic-green text-lg">
                            Surah {favorite.surah}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Verse {favorite.verse}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleShare(favorite)}
                          className="text-muted-foreground hover:text-islamic-green"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(favorite)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Arabic Text */}
                    <div 
                      className="arabic-text text-xl leading-loose p-4 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                      onClick={() => navigate(`/quran/surah/${favorite.surah}`)}
                    >
                      {favorite.text}
                    </div>

                    {/* Translation */}
                    {settings.showTranslation && (
                      <div className="text-muted-foreground italic leading-relaxed">
                        "{favorite.translation}"
                      </div>
                    )}

                    {/* Saved Date */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Saved on {new Date(favorite.createdAt).toLocaleDateString()}
                      </span>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigate(`/quran/surah/${favorite.surah}`)}
                        className="text-islamic-green hover:text-islamic-green/80 p-0 h-auto"
                      >
                        Read Full Surah →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;