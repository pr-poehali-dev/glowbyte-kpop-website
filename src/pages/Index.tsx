
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

// Данные фотографий
const photoData = [
  {
    id: 1,
    title: "Stage Performance",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    title: "Studio Session",
    url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 3,
    title: "Rehearsal",
    url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    title: "Album Cover",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 5,
    title: "Concert",
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 6,
    title: "Backstage",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

// Данные музыкальных треков
const musicData = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "GLOWBYTE",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Digital Heart",
    artist: "GLOWBYTE",
    duration: "4:12",
  },
  {
    id: 3,
    title: "Synth Wave Love",
    artist: "GLOWBYTE",
    duration: "3:28",
  },
  {
    id: 4,
    title: "Electric Emotion",
    artist: "GLOWBYTE",
    duration: "2:56",
  },
  {
    id: 5,
    title: "Virtual Embrace",
    artist: "GLOWBYTE",
    duration: "3:52",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    // Анимация для заголовка при загрузке страницы
    const title = document.querySelector('.title-animation');
    if (title) {
      title.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Шапка сайта */}
      <header className="pt-16 pb-10 px-4 text-center bg-gradient-to-r from-blue-100 to-purple-100 shadow-sm">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 title-animation">
          GLOWBYTE
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 italic">
          we're syncing feelings, not files
        </p>
      </header>

      {/* Основное содержимое */}
      <main className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-blue-100">
              <TabsTrigger
                value="photos"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                <Icon name="Image" className="mr-2" />
                Фотографии
              </TabsTrigger>
              <TabsTrigger
                value="music"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                <Icon name="Music" className="mr-2" />
                Музыка
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Вкладка с фотографиями */}
          <TabsContent value="photos" className="space-y-4">
            {selectedPhoto !== null ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {photoData[selectedPhoto].title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    <Icon name="ArrowLeft" className="mr-2" />
                    Назад к галерее
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={photoData[selectedPhoto].url}
                    alt={photoData[selectedPhoto].title}
                    className="w-full h-auto object-cover transition-all hover:scale-[1.02]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photoData.map((photo, index) => (
                  <Card
                    key={photo.id}
                    className="overflow-hidden hover-scale transition-all duration-300 bg-white/70 backdrop-blur-sm border-blue-100 hover:shadow-md hover:border-blue-200"
                    onClick={() => setSelectedPhoto(index)}
                  >
                    <CardContent className="p-2">
                      <div className="relative aspect-square rounded-md overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-2 text-center font-medium text-blue-700">
                        {photo.title}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Вкладка с музыкой */}
          <TabsContent value="music">
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
                  Плейлист
                </h2>
                <div className="space-y-2">
                  {musicData.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 rounded-full p-0 mr-4"
                        >
                          <Icon name="Play" className="h-4 w-4" />
                          <span className="sr-only">Play</span>
                        </Button>
                        <div>
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-gray-500">{track.artist}</p>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {track.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Подвал сайта */}
      <footer className="py-6 bg-gradient-to-r from-blue-100 to-purple-100 text-center text-gray-600 mt-10">
        <p>© {new Date().getFullYear()} GLOWBYTE • K-POP Group</p>
      </footer>
    </div>
  );
};

export default Index;
