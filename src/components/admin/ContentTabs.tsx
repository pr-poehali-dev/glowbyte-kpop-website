
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import PhotoManager from "./PhotoManager";
import MusicManager from "./MusicManager";

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState("photos");

  return (
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

      <TabsContent value="photos" className="space-y-6">
        <PhotoManager />
      </TabsContent>

      <TabsContent value="music" className="space-y-6">
        <MusicManager />
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
