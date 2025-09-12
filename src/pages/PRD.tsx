import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const PRD = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-emerald-950 dark:via-background dark:to-amber-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-600 to-amber-600 mb-6">
            <span className="text-2xl font-bold text-white">📖</span>
          </div>
          <h1 className="text-4xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
            Quran Mobile App
          </h1>
          <p className="text-xl text-emerald-700 dark:text-emerald-300 mb-2">
            Product Requirements Document
          </p>
          <Badge variant="secondary" className="text-sm">Version 1.0</Badge>
        </div>

        <ScrollArea className="h-[80vh]">
          <div className="space-y-8">
            {/* Purpose & Goal */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  🎯 Purpose & Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Create a comprehensive Quran reading app that serves as a daily spiritual companion for Muslims worldwide. 
                  The app aims to make Quran reading accessible, engaging, and spiritually enriching through modern technology 
                  while maintaining reverence for the sacred text.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Primary Goals:</h4>
                  <ul className="list-disc list-inside text-sm text-emerald-700 dark:text-emerald-300 space-y-1">
                    <li>Facilitate daily Quran reading and reflection</li>
                    <li>Provide accurate Arabic text with reliable translations</li>
                    <li>Enable offline access for uninterrupted spiritual practice</li>
                    <li>Foster consistent engagement through personalized features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Target Audience */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  👥 Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-300">Primary Users</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600">•</span>
                        <span>Practicing Muslims seeking daily spiritual guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600">•</span>
                        <span>New Muslims learning to read and understand the Quran</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600">•</span>
                        <span>Students and scholars requiring quick verse references</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-300">Demographics</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Age: 16-65 years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Global Muslim community (1.8B+ potential users)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Tech-savvy individuals comfortable with mobile apps</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature List */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  ⭐ Core Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Homepage */}
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">🏠 Homepage</h4>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2">
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Company branding (logo, mission statement, about page link)</li>
                      <li>• Daily verse display (Arabic + English translation)</li>
                      <li>• "Read Full Surah" quick action button</li>
                      <li>• Navigation shortcuts: "Read Quran" and "Qibla Direction"</li>
                    </ul>
                  </div>
                </div>

                {/* Quran Reader */}
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">📖 Quran Reader</h4>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2">
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Dual navigation: Browse by Surah (chapters) or Juz/Para (sections)</li>
                      <li>• Bilingual display: Arabic text with English translation toggle</li>
                      <li>• Audio recitation: Verse-by-verse playback with professional reciters</li>
                      <li>• Smart bookmarking: Auto-save reading progress and manual favorites</li>
                      <li>• Offline capability: Download audio files for internet-free listening</li>
                    </ul>
                  </div>
                </div>

                {/* Qibla Feature */}
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">🧭 Qibla Direction</h4>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2">
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Compass view: Accurate direction indicator toward Mecca</li>
                      <li>• Map integration: Visual representation with current location</li>
                      <li>• Accuracy status: Real-time GPS precision feedback</li>
                    </ul>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">🔔 Smart Notifications</h4>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2">
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Customizable daily verse notifications</li>
                      <li>• User-selected timing preferences</li>
                      <li>• Content options: Random verses, daily surah progression, or themed collections</li>
                    </ul>
                  </div>
                </div>

                {/* Engagement Features */}
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">💫 Engagement Features</h4>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2">
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Social sharing: Export verses as text or beautifully designed images</li>
                      <li>• Favorites collection: Personal library of saved verses with quick access</li>
                      <li>• Onboarding flow: Guided introduction for new users</li>
                      <li>• Feedback system: In-app support and suggestion submission</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Guidelines */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  🎨 Design Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">Visual Identity</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Islamic calligraphy-inspired headers</li>
                      <li>• Ornamental dividers and borders</li>
                      <li>• Premium Arabic typography</li>
                      <li>• Minimalist, reverent interface</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">Color Palette</h4>
                    <div className="flex gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-600"></div>
                      <div className="w-6 h-6 rounded-full bg-amber-500"></div>
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300"></div>
                    </div>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Primary: Emerald green (Islamic tradition)</li>
                      <li>• Accent: Gold/Amber (elegance)</li>
                      <li>• Base: White/Off-white (readability)</li>
                      <li>• Support for light & dark themes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Notes */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  ⚙️ Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">Platform</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Cross-platform: iOS & Android</li>
                      <li>• Framework: Flutter or React Native</li>
                      <li>• Alternative: Capacitor for web-to-mobile</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">Data & Storage</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Local storage only (V1)</li>
                      <li>• No user authentication required</li>
                      <li>• Offline-first architecture</li>
                      <li>• Audio file caching system</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  📊 Success Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">Engagement</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Daily active users (target: 70%+ retention)</li>
                      <li>• Average session duration (target: 15+ minutes)</li>
                      <li>• Daily verse notification open rate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">Usage</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Number of verses read per session</li>
                      <li>• Audio playback completion rates</li>
                      <li>• Bookmark and favorites usage</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Enhancements */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  🚀 Future Enhancements (V2)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-900/20 dark:to-amber-900/20 p-4 rounded-lg">
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>• <strong>Cloud Sync:</strong> Cross-device bookmark synchronization</li>
                    <li>• <strong>Community Features:</strong> Study groups and discussion forums</li>
                    <li>• <strong>Advanced Audio:</strong> Multiple reciter options and playback speeds</li>
                    <li>• <strong>Learning Tools:</strong> Tajweed rules and pronunciation guides</li>
                    <li>• <strong>Prayer Integration:</strong> Full Salah times and reminders</li>
                    <li>• <strong>Personalization:</strong> Reading plans and progress tracking</li>
                    <li>• <strong>Multilingual:</strong> Additional translation languages</li>
                    <li>• <strong>Analytics:</strong> Reading habits and spiritual growth insights</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Document prepared for development team • Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PRD;