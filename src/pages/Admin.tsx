
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "@/components/admin/LoginForm";
import AdminHeader from "@/components/admin/AdminHeader";
import ContentTabs from "@/components/admin/ContentTabs";

/**
 * Административная панель GLOWBYTE
 * 
 * Компонент, отвечающий за управление контентом сайта.
 * Включает аутентификацию и интерфейс для управления фотографиями и музыкой.
 */
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  /**
   * Обработчик успешного входа в админ-панель
   */
  const handleLogin = (username: string, password: string) => {
    setIsLoggedIn(true);
  };

  /**
   * Обработчик выхода из админ-панели
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Выход из системы",
      description: "Вы вышли из учетной записи администратора",
    });
  };

  // Если пользователь не авторизован, показываем форму входа
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Для авторизованных пользователей показываем админ-панель
  return (
    <div className="min-h-screen bg-sky-50">
      {/* Фоновое изображение со звездами */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <img 
          src="https://cdn.poehali.dev/files/df8453c8-47df-4f16-9e42-1721ece3808f.jpg" 
          alt="Stars background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Шапка админ-панели */}
      <AdminHeader onLogout={handleLogout} />

      {/* Основное содержимое админ-панели */}
      <main className="container mx-auto px-4 py-8">
        <ContentTabs />
      </main>
    </div>
  );
};

export default Admin;
