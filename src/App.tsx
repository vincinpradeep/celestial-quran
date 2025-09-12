import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PRD from "./pages/PRD";
import NotFound from "./pages/NotFound";
import HomePage from "./components/QuranConnect/HomePage";
import QuranReader from "./components/QuranConnect/QuranReader";
import SurahList from "./components/QuranConnect/SurahList";
import QiblaCompass from "./components/QuranConnect/QiblaCompass";
import FavoritesPage from "./components/QuranConnect/FavoritesPage";
import SettingsPage from "./components/QuranConnect/SettingsPage";
import BottomNav from "./components/QuranConnect/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prd" element={<PRD />} />
          <Route path="/demo" element={<Index />} />
          <Route path="/quran" element={<SurahList />} />
          <Route path="/quran/surah/:surahNumber" element={<QuranReader />} />
          <Route path="/qibla" element={<QiblaCompass />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
