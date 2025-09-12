import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useQuranStore } from '@/stores/quranStore';
import { quranAPI } from '@/services/quranApi';
import { ArrowLeft, Search, BookOpen, MapPin, Clock } from 'lucide-react';

const SurahList: React.FC = () => {
  const navigate = useNavigate();
  const { surahs, setSurahs, currentSurah, currentVerse } = useQuranStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    if (surahs.length === 0) {
      const surahList = await quranAPI.getSurahs();
      setSurahs(surahList);
    }
    setLoading(false);
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.name.includes(searchTerm) ||
    surah.number.toString().includes(searchTerm)
  );

  // Group surahs by Juz (approximate - simplified for demo)
  const getJuzForSurah = (surahNumber: number): number => {
    if (surahNumber <= 2) return 1;
    if (surahNumber <= 4) return 2;
    if (surahNumber <= 5) return 3;
    if (surahNumber <= 7) return 4;
    if (surahNumber <= 9) return 5;
    if (surahNumber <= 11) return 6;
    if (surahNumber <= 13) return 7;
    if (surahNumber <= 15) return 8;
    if (surahNumber <= 17) return 9;
    if (surahNumber <= 20) return 10;
    if (surahNumber <= 23) return 11;
    if (surahNumber <= 25) return 12;
    if (surahNumber <= 27) return 13;
    if (surahNumber <= 29) return 14;
    if (surahNumber <= 33) return 15;
    if (surahNumber <= 36) return 16;
    if (surahNumber <= 39) return 17;
    if (surahNumber <= 41) return 18;
    if (surahNumber <= 45) return 19;
    if (surahNumber <= 51) return 20;
    if (surahNumber <= 57) return 21;
    if (surahNumber <= 62) return 22;
    if (surahNumber <= 68) return 23;
    if (surahNumber <= 76) return 24;
    if (surahNumber <= 83) return 25;
    if (surahNumber <= 90) return 26;
    if (surahNumber <= 96) return 27;
    if (surahNumber <= 106) return 28;
    if (surahNumber <= 110) return 29;
    return 30;
  };

  const groupSurahsByJuz = () => {
    const juzGroups: { [key: number]: typeof surahs } = {};
    
    filteredSurahs.forEach(surah => {
      const juz = getJuzForSurah(surah.number);
      if (!juzGroups[juz]) {
        juzGroups[juz] = [];
      }
      juzGroups[juz].push(surah);
    });
    
    return juzGroups;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-islamic animate-spin flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-islamic-green font-semibold">Loading Surahs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-islamic text-white sticky top-0 z-10">
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
                <h1 className="text-2xl font-bold">Holy Quran</h1>
                <p className="text-white/90">Choose a Surah to begin reading</p>
              </div>
            </div>
            
            <BookOpen className="w-8 h-8" />
          </div>
          
          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <Input
              placeholder="Search surahs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
            />
          </div>
        </div>
      </div>

      {/* Continue Reading */}
      {currentSurah > 1 && (
        <div className="container mx-auto px-4 py-4">
          <Card className="border-islamic-gold/50 bg-gradient-to-r from-islamic-gold/10 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-islamic-gold flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-islamic-green">Continue Reading</p>
                    <p className="text-sm text-muted-foreground">
                      Surah {currentSurah}, Verse {currentVerse}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/quran/surah/${currentSurah}`)}
                  className="bg-islamic-gold hover:bg-islamic-gold/90"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs for Surah/Juz navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="surah" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="surah" className="data-[state=active]:bg-islamic-green data-[state=active]:text-white">
              By Surah
            </TabsTrigger>
            <TabsTrigger value="juz" className="data-[state=active]:bg-islamic-green data-[state=active]:text-white">
              By Juz
            </TabsTrigger>
          </TabsList>

          {/* Surah List */}
          <TabsContent value="surah">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid gap-3">
                {filteredSurahs.map((surah) => (
                  <Card
                    key={surah.number}
                    className="cursor-pointer hover:shadow-md transition-all duration-300 border-primary/20 group"
                    onClick={() => navigate(`/quran/surah/${surah.number}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-islamic flex items-center justify-center text-white font-bold">
                            {surah.number}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-islamic-green">
                                {surah.englishName}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {surah.revelationType}
                              </Badge>
                            </div>
                            <p className="font-arabic text-lg text-islamic-gold mb-1">
                              {surah.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {surah.numberOfAyahs} verses
                            </p>
                          </div>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <BookOpen className="w-5 h-5 text-islamic-green" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Juz List */}
          <TabsContent value="juz">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-6">
                {Object.entries(groupSurahsByJuz())
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([juzNumber, juzSurahs]) => (
                    <Card key={juzNumber} className="border-primary/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-islamic-green flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Juz {juzNumber}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid gap-2">
                          {juzSurahs.map((surah) => (
                            <div
                              key={surah.number}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                              onClick={() => navigate(`/quran/surah/${surah.number}`)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-islamic-green/20 flex items-center justify-center text-islamic-green font-semibold text-sm">
                                  {surah.number}
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{surah.englishName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {surah.numberOfAyahs} verses
                                  </p>
                                </div>
                              </div>
                              <p className="font-arabic text-islamic-gold">
                                {surah.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SurahList;