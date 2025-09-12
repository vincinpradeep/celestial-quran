import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { qiblaService } from '@/services/qiblaService';
import { ArrowLeft, MapPin, Navigation, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface QiblaData {
  direction: number;
  distance: number;
  accuracy: 'high' | 'medium' | 'low';
}

const QiblaCompass: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [qiblaData, setQiblaData] = useState<QiblaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    checkLocationPermission();
    startCompass();
    
    return () => {
      stopCompass();
    };
  }, []);

  const checkLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(result.state);
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const calculateQibla = async () => {
    setLoading(true);
    try {
      const position = await qiblaService.getCurrentPosition();
      const qibla = qiblaService.calculateQiblaDirection(position);
      setQiblaData(qibla);
      
      toast({
        title: "Qibla Direction Found",
        description: `Distance to Mecca: ${qiblaService.formatDistance(qibla.distance)}`,
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to get your location. Please enable location services.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startCompass = () => {
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
  };

  const stopCompass = () => {
    if ('DeviceOrientationEvent' in window) {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    }
  };

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setDeviceHeading(360 - event.alpha);
    }
  };

  const getQiblaDirection = () => {
    if (!qiblaData) return 0;
    return qiblaData.direction - deviceHeading;
  };

  const getAccuracyColor = (accuracy: string) => {
    switch (accuracy) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAccuracyText = (accuracy: string) => {
    switch (accuracy) {
      case 'high': return 'High Accuracy';
      case 'medium': return 'Medium Accuracy';
      case 'low': return 'Low Accuracy - Move closer to Mecca for better precision';
      default: return 'Unknown';
    }
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
                <h1 className="text-2xl font-bold">Qibla Direction</h1>
                <p className="text-white/90">Find the direction to Mecca</p>
              </div>
            </div>
            
            <Compass className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Location Status */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-islamic-green" />
                <span className="font-medium">Location Services</span>
              </div>
              
              <Badge 
                variant={permissionStatus === 'granted' ? 'default' : 'destructive'}
                className={permissionStatus === 'granted' ? 'bg-green-100 text-green-800' : ''}
              >
                {permissionStatus === 'granted' ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            
            {permissionStatus !== 'granted' && (
              <p className="text-sm text-muted-foreground mt-2">
                Location access is required to determine Qibla direction accurately.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Compass Card */}
        <Card className="border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-islamic-green flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" />
              Digital Compass
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="relative">
              {/* Compass Circle */}
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-4 border-islamic-green/30 bg-gradient-to-br from-islamic-green/5 to-islamic-teal/5">
                  {/* Compass Directions */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-islamic-green font-bold">N</div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-islamic-green font-bold">E</div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-islamic-green font-bold">S</div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-islamic-green font-bold">W</div>
                  
                  {/* Center Point */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-islamic-gold"></div>
                  
                  {/* Qibla Arrow */}
                  {qiblaData && (
                    <div 
                      className="absolute top-1/2 left-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-300 ease-out"
                      style={{ 
                        transform: `translate(-50%, -100%) rotate(${getQiblaDirection()}deg)`,
                        height: '140px'
                      }}
                    >
                      <div className="w-1 h-full bg-gradient-to-t from-islamic-gold to-islamic-gold/80 rounded-full relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-islamic-gold"></div>
                        
                        {/* Kaaba Symbol */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-islamic-gold rounded-sm flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Device Heading Indicator */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-primary rounded-full"></div>
                </div>
              </div>

              {/* Compass Info */}
              <div className="mt-8 text-center space-y-4">
                {qiblaData ? (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-islamic-green">
                      {Math.round(qiblaData.direction)}°
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Direction to Mecca
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`${getAccuracyColor(qiblaData.accuracy)} border-current`}
                    >
                      {getAccuracyText(qiblaData.accuracy)}
                    </Badge>
                    
                    <div className="text-sm text-muted-foreground">
                      Distance: {qiblaService.formatDistance(qiblaData.distance)}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-lg text-muted-foreground">
                      Calculate Qibla direction
                    </div>
                    <Button 
                      onClick={calculateQibla}
                      disabled={loading}
                      className="bg-gradient-islamic hover:opacity-90"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Finding Direction...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Navigation className="w-4 h-4" />
                          <span>Find Qibla</span>
                        </div>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-islamic-green text-lg">How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-islamic-gold text-white text-sm flex items-center justify-center font-bold">1</div>
              <p className="text-sm">Enable location services and tap "Find Qibla"</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-islamic-gold text-white text-sm flex items-center justify-center font-bold">2</div>
              <p className="text-sm">Hold your device flat and point the blue arrow north</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-islamic-gold text-white text-sm flex items-center justify-center font-bold">3</div>
              <p className="text-sm">The golden arrow points toward the Kaaba in Mecca</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-islamic-gold text-white text-sm flex items-center justify-center font-bold">4</div>
              <p className="text-sm">Face the direction of the golden arrow for prayer</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QiblaCompass;