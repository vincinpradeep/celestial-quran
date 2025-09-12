import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useQuranStore } from '@/stores/quranStore';
import { 
  ArrowLeft, 
  Settings, 
  Bell, 
  Eye, 
  Type, 
  Moon, 
  Sun,
  Heart,
  BookOpen,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings, updateSettings, bookmarks, favorites } = useQuranStore();

  const handleNotificationTimeChange = (time: string) => {
    updateSettings({ notificationTime: time });
    toast({
      title: "Notification Time Updated",
      description: `Daily verse will be sent at ${time}`,
    });
  };

  const handleVerseTypeChange = (type: 'random' | 'daily' | 'themed') => {
    updateSettings({ verseType: type });
    toast({
      title: "Verse Type Updated",
      description: `Daily verse type changed to ${type}`,
    });
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updateSettings({ fontSize: size });
  };

  const toggleDarkMode = () => {
    const newDarkMode = !settings.darkMode;
    updateSettings({ darkMode: newDarkMode });
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleFeedback = () => {
    const subject = 'Quran Connect Feedback';
    const body = 'Hello,\n\nI would like to share the following feedback about Quran Connect:\n\n';
    window.open(`mailto:feedback@quranconnect.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
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
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-white/90">Customize your reading experience</p>
              </div>
            </div>
            
            <Settings className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {/* Reading Preferences */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-islamic-green flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Reading Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Show Translation */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Show Translation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Display English translation alongside Arabic text
                    </p>
                  </div>
                  <Switch
                    checked={settings.showTranslation}
                    onCheckedChange={(checked) => updateSettings({ showTranslation: checked })}
                  />
                </div>

                {/* Font Size */}
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Font Size
                  </Label>
                  <Select value={settings.fontSize} onValueChange={handleFontSizeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium flex items-center gap-2">
                      {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme for comfortable reading
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-islamic-green flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Daily Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Enable Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">
                      Enable Daily Verse
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily Quranic verse notification
                    </p>
                  </div>
                  <Switch
                    checked={settings.notificationEnabled}
                    onCheckedChange={(checked) => updateSettings({ notificationEnabled: checked })}
                  />
                </div>

                {settings.notificationEnabled && (
                  <>
                    {/* Notification Time */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">
                        Notification Time
                      </Label>
                      <Select value={settings.notificationTime} onValueChange={handleNotificationTimeChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Verse Type */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">
                        Verse Type
                      </Label>
                      <Select value={settings.verseType} onValueChange={handleVerseTypeChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="random">Random Verse</SelectItem>
                          <SelectItem value="daily">Daily Surah Progression</SelectItem>
                          <SelectItem value="themed">Themed Collections</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-islamic-green">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold text-islamic-green mb-1">
                      {bookmarks.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Bookmarks</div>
                  </div>
                  
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <div className="text-2xl font-bold text-red-500 mb-1 flex items-center justify-center gap-1">
                      <Heart className="w-5 h-5" />
                      {favorites.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Favorites</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support & Feedback */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-islamic-green flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Support & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  onClick={handleFeedback}
                  className="w-full justify-start"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
                
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <h4 className="font-semibold text-islamic-green mb-2">About Quran Connect</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A spiritual companion for your daily Quranic reading journey. 
                    Built with love for the Muslim community worldwide.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SettingsPage;