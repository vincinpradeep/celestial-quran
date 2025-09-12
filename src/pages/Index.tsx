import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">
            Quran Mobile App
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Product Requirements Document & Development Suite
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/prd">View PRD Document</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <a href="#features">Explore Features</a>
            </Button>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                📖 Quran Reader
              </CardTitle>
              <CardDescription>
                Complete Quran with Arabic text, translations, and audio recitation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                🧭 Qibla Direction
              </CardTitle>
              <CardDescription>
                Accurate compass and map view pointing toward Mecca
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                🔔 Daily Verses
              </CardTitle>
              <CardDescription>
                Personalized notifications with daily Quranic inspiration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                💫 Bookmarks
              </CardTitle>
              <CardDescription>
                Save and organize your favorite verses for easy access
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                📱 Offline Access
              </CardTitle>
              <CardDescription>
                Download content for uninterrupted spiritual practice
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                🎨 Islamic Design
              </CardTitle>
              <CardDescription>
                Beautiful interface with traditional Islamic aesthetics
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
