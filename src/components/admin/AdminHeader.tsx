
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
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
            onClick={onLogout}
            className="border-sky-200 hover:bg-sky-50"
          >
            <Icon name="LogOut" className="h-4 w-4 mr-2" />
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
