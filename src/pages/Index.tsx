
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("photos");
  const [photos, setPhotos] = useState<any[]>([]);
  const [music, setMusic] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // В реальном приложении здесь был бы API запрос за данными
    // Сейчас просто возвращаем пустой массив, т.к. примеры нужно удалить
    setPhotos([]);
    setMusic([]);
    
    // Анимация для заголовка при загрузке страницы
    const title = document.querySelector('.title-animation');
    if (title) {
      title.classList.add('animate-fade-in');
    }
    
    toast({
      title: "Добро пожаловать",
      description: "Контент будет доступен после публикации администратором",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Фоновые звезды в стиле K-POP (верхний слой) */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          src="https://cdn.poehali.dev/files/df8453c8-47df-4f16-9e42-1721ece3808f.jpg" 
          alt="Stars background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Шапка сайта */}
      <header className="relative z-10 pt-16 pb-10 px-4 text-center bg-gradient-to-r from-sky-100 to-sky-200 shadow-sm">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 title-animation">
          GLOWBYTE
        </h1>
        <p className="text-xl md:text-2xl text-sky-700 italic">
          we're syncing feelings, not files
        </p>
      </header>

      {/* Основное содержимое */}
      <main className="container relative z-10 mx-auto px-4 py-8">
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-sky-100">
              <TabsTrigger
                value="photos"
                className="data-[state=active]:bg-white data-[state=active]:text-sky-600"
              >
                <Icon name="Image" className="mr-2" />
                Фотографии
              </TabsTrigger>
              <TabsTrigger
                value="music"
                className="data-[state=active]:bg-white data-[state=active]:text-sky-600"
              >
                <Icon name="Music" className="mr-2" />
                Музыка
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Вкладка с фотографиями */}
          <TabsContent value="photos" className="space-y-4">
            {selectedPhoto !== null && photos.length > 0 ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-sky-700">
                    {photos[selectedPhoto].title}
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
                    src={photos[selectedPhoto].url}
                    alt={photos[selectedPhoto].title}
                    className="w-full h-auto object-cover transition-all hover:scale-[1.02]"
                  />
                </div>
              </div>
            ) : photos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <Card
                    key={photo.id}
                    className="overflow-hidden hover-scale transition-all duration-300 bg-white/70 backdrop-blur-sm border-sky-100 hover:shadow-md hover:border-sky-200 cursor-pointer"
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
                      <h3 className="mt-2 text-center font-medium text-sky-700">
                        {photo.title}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/70 backdrop-blur-sm border-sky-100 text-center p-10">
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <Icon name="ImageOff" className="h-16 w-16 text-sky-300 mb-4" />
                    <h3 className="text-xl font-semibold text-sky-700 mb-2">Фотографии еще не добавлены</h3>
                    <p className="text-sky-500 mb-6">Администратор скоро добавит контент</p>
                    <div className="relative w-32 h-32 opacity-70">
                      <img 
                        src="https://cdn.poehali.dev/files/376dbfdb-6ac0-4772-a0bb-88e461828687.jpg" 
                        alt="KPOP aesthetic" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Вкладка с музыкой */}
          <TabsContent value="music">
            <Card className="bg-white/70 backdrop-blur-sm border-sky-100">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-sky-700 text-center">
                  Плейлист
                </h2>
                {music.length > 0 ? (
                  <div className="space-y-2">
                    {music.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-sky-50 transition-colors"
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
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Icon name="Music2" className="h-16 w-16 text-sky-300 mb-4" />
                    <h3 className="text-xl font-semibold text-sky-700 mb-2">Треки еще не добавлены</h3>
                    <p className="text-sky-500 mb-6">Администратор скоро добавит музыку</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Кнопка админ-панели (видна только если вы вошли как админ) */}
      <div className="fixed bottom-6 right-6 z-20">
        <Link to="/admin">
          <Button className="rounded-full h-14 w-14 bg-sky-500 hover:bg-sky-600 shadow-lg">
            <Icon name="Shield" className="h-6 w-6" />
            <span className="sr-only">Админ-панель</span>
          </Button>
        </Link>
      </div>

      {/* Подвал сайта */}
      <footer className="relative z-10 py-6 bg-gradient-to-r from-sky-100 to-sky-200 text-center text-sky-700 mt-10">
        <p>© {new Date().getFullYear()} GLOWBYTE • K-POP Group</p>
      </footer>
    </div>
  );
};

export default Index;
