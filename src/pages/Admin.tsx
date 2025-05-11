
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("photos");
  const [photos, setPhotos] = useState<any[]>([]);
  const [music, setMusic] = useState<any[]>([]);
  const [photoTitle, setPhotoTitle] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("GLOWBYTE");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь была бы настоящая проверка авторизации
    // Для демонстрации используем упрощенный вариант
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      toast({
        title: "Успешный вход",
        description: "Вы вошли как администратор",
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверные учетные данные",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    toast({
      title: "Выход из системы",
      description: "Вы вышли из учетной записи администратора",
    });
  };

  const handlePhotoUpload = (e: FormEvent) => {
    e.preventDefault();
    const fileInput = fileInputRef.current;
    
    if (fileInput && fileInput.files && fileInput.files.length > 0 && photoTitle) {
      const file = fileInput.files[0];
      const imageUrl = URL.createObjectURL(file);
      
      const newPhoto = {
        id: Date.now(),
        title: photoTitle,
        url: imageUrl,
        file: file,
      };
      
      setPhotos([...photos, newPhoto]);
      setPhotoTitle("");
      fileInput.value = "";
      
      toast({
        title: "Фото загружено",
        description: `"${photoTitle}" успешно добавлено в галерею`,
      });
    } else {
      toast({
        title: "Ошибка загрузки",
        description: "Убедитесь, что вы выбрали файл и указали название",
        variant: "destructive",
      });
    }
  };

  const handleMusicUpload = (e: FormEvent) => {
    e.preventDefault();
    const audioInput = audioInputRef.current;
    
    if (audioInput && audioInput.files && audioInput.files.length > 0 && songTitle) {
      const file = audioInput.files[0];
      
      // Расчет продолжительности аудио (в реальном приложении)
      // Здесь просто пример для демонстрации
      const duration = "3:45";
      
      const newTrack = {
        id: Date.now(),
        title: songTitle,
        artist: artist,
        duration: duration,
        file: file,
      };
      
      setMusic([...music, newTrack]);
      setSongTitle("");
      audioInput.value = "";
      
      toast({
        title: "Трек загружен",
        description: `"${songTitle}" успешно добавлен в плейлист`,
      });
    } else {
      toast({
        title: "Ошибка загрузки",
        description: "Убедитесь, что вы выбрали файл и указали название",
        variant: "destructive",
      });
    }
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    toast({
      title: "Фото удалено",
      description: "Фотография успешно удалена из галереи",
    });
  };

  const handleDeleteTrack = (id: number) => {
    setMusic(music.filter(track => track.id !== id));
    toast({
      title: "Трек удален",
      description: "Композиция успешно удалена из плейлиста",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src="https://cdn.poehali.dev/files/df8453c8-47df-4f16-9e42-1721ece3808f.jpg" 
            alt="Stars background" 
            className="w-full h-full object-cover"
          />
        </div>
        <Card className="w-full max-w-md mx-4 bg-white/90 backdrop-blur-sm border-sky-200 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-sky-700">
              Админ-панель GLOWBYTE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input 
                  id="username" 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="border-sky-200 focus-visible:ring-sky-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="border-sky-200 focus-visible:ring-sky-400"
                />
              </div>
              <div className="pt-2 flex gap-2">
                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
                  Войти
                </Button>
                <Link to="/">
                  <Button variant="outline" className="border-sky-200 hover:bg-sky-50">
                    Назад
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-center mt-4 text-sky-600">
                <p>Для демо используйте:</p>
                <p>Логин: admin / Пароль: password</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <img 
          src="https://cdn.poehali.dev/files/df8453c8-47df-4f16-9e42-1721ece3808f.jpg" 
          alt="Stars background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Шапка админ-панели */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm border-b border-sky-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <Icon name="ArrowLeft" className="h-5 w-5 text-sky-600" />
            </Link>
            <h1 className="text-xl font-bold text-sky-700">GLOWBYTE Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-sky-600 hidden md:inline-block">
              Вы вошли как <strong>admin</strong>
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-sky-200 hover:bg-sky-50"
            >
              <Icon name="LogOut" className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Основное содержимое админ-панели */}
      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-sky-100 mx-auto mb-8">
            <TabsTrigger
              value="photos"
              className="data-[state=active]:bg-white data-[state=active]:text-sky-600"
            >
              <Icon name="Image" className="mr-2 h-4 w-4" />
              Управление фото
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="data-[state=active]:bg-white data-[state=active]:text-sky-600"
            >
              <Icon name="Music" className="mr-2 h-4 w-4" />
              Управление музыкой
            </TabsTrigger>
          </TabsList>

          {/* Вкладка управления фотографиями */}
          <TabsContent value="photos" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-sky-200">
              <CardHeader>
                <CardTitle className="text-sky-700">Добавить новое фото</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePhotoUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="photo-title">Название фотографии</Label>
                    <Input
                      id="photo-title"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      placeholder="Например: Выступление в Сеуле"
                      className="border-sky-200 focus-visible:ring-sky-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photo-file">Выберите изображение</Label>
                    <Input
                      id="photo-file"
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="border-sky-200 focus-visible:ring-sky-400"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                    <Icon name="Upload" className="mr-2 h-4 w-4" />
                    Загрузить фото
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-sky-200">
              <CardHeader>
                <CardTitle className="text-sky-700">Управление галереей ({photos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {photos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group overflow-hidden rounded-lg border border-sky-100">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                          <div className="text-white font-medium truncate">{photo.title}</div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="self-end"
                            onClick={() => handleDeletePhoto(photo.id)}
                          >
                            <Icon name="Trash2" className="h-4 w-4" />
                            <span className="sr-only">Удалить</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-sky-500">
                    <Icon name="Image" className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Фотографии еще не добавлены</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Вкладка управления музыкой */}
          <TabsContent value="music" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-sky-200">
              <CardHeader>
                <CardTitle className="text-sky-700">Добавить новый трек</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMusicUpload} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="song-title">Название трека</Label>
                      <Input
                        id="song-title"
                        value={songTitle}
                        onChange={(e) => setSongTitle(e.target.value)}
                        placeholder="Например: Neon Dreams"
                        className="border-sky-200 focus-visible:ring-sky-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="artist">Исполнитель</Label>
                      <Input
                        id="artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="GLOWBYTE"
                        className="border-sky-200 focus-visible:ring-sky-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audio-file">Выберите аудиофайл</Label>
                    <Input
                      id="audio-file"
                      type="file"
                      ref={audioInputRef}
                      accept="audio/*"
                      className="border-sky-200 focus-visible:ring-sky-400"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                    <Icon name="Upload" className="mr-2 h-4 w-4" />
                    Загрузить трек
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-sky-200">
              <CardHeader>
                <CardTitle className="text-sky-700">Управление плейлистом ({music.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {music.length > 0 ? (
                  <div className="space-y-2">
                    {music.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-sky-50 transition-colors border border-sky-100"
                      >
                        <div className="flex items-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 rounded-full p-0 mr-4 text-sky-600"
                          >
                            <Icon name="Play" className="h-4 w-4" />
                            <span className="sr-only">Play</span>
                          </Button>
                          <div>
                            <p className="font-medium">{track.title}</p>
                            <p className="text-sm text-gray-500">{track.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm mr-2">
                            {track.duration}
                          </span>
                          <Button
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteTrack(track.id)}
                          >
                            <Icon name="Trash2" className="h-4 w-4" />
                            <span className="sr-only">Удалить</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-sky-500">
                    <Icon name="Music" className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Треки еще не добавлены</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
