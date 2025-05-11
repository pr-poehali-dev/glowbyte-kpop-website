
import { useRef, useState, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  file: File;
}

const MusicManager = () => {
  const [music, setMusic] = useState<Track[]>([]);
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("GLOWBYTE");
  const { toast } = useToast();
  const audioInputRef = useRef<HTMLInputElement>(null);

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

  const handleDeleteTrack = (id: number) => {
    setMusic(music.filter(track => track.id !== id));
    toast({
      title: "Трек удален",
      description: "Композиция успешно удалена из плейлиста",
    });
  };

  return (
    <>
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
    </>
  );
};

export default MusicManager;
