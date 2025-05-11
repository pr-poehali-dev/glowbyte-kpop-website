
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "password") {
      onLogin(username, password);
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
};

export default LoginForm;
