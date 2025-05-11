import { useRef, useState, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Photo {
  id: number;
  title: string;
  url: string;
  file: File;
}

const PhotoManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoTitle, setPhotoTitle] = useState("");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: FormEvent) => {
    e.preventDefault();
    const fileInput = fileInputRef.current;

    if (
      fileInput &&
      fileInput.files &&
      fileInput.files.length > 0 &&
      photoTitle
    ) {
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

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
    toast({
      title: "Фото удалено",
      description: "Фотография успешно удалена из галереи",
    });
  };

  return (
    <>
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
          <CardTitle className="text-sky-700">
            Управление галереей ({photos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group overflow-hidden rounded-lg border border-sky-100"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="text-white font-medium truncate">
                      {photo.title}
                    </div>
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
              <Icon
                name="Image"
                className="h-12 w-12 mx-auto mb-3 opacity-50"
              />
              <p>Фотографии еще не добавлены</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PhotoManager;
