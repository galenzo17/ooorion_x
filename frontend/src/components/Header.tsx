import { User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white">
      {/* Top white section with logo and user */}
      <div className="w-full px-8 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              ⚡ ORIONX
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Mi Cuenta</span>
            <div className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center">
              <User className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Blue navigation tabs */}
      <div className="bg-blue-600">
        <div className="w-full px-8">
          <nav className="flex">
            <a href="#" className="bg-blue-500 text-white px-6 py-3 text-sm font-medium">
              Billeteras
            </a>
            <a href="#" className="text-blue-100 hover:text-white px-6 py-3 text-sm font-medium">
              Comprar / Vender
            </a>
            <a href="#" className="text-blue-100 hover:text-white px-6 py-3 text-sm font-medium">
              Exchange
            </a>
            <a href="#" className="text-blue-100 hover:text-white px-6 py-3 text-sm font-medium">
              Ajustes
            </a>
            <a href="#" className="text-blue-100 hover:text-white px-6 py-3 text-sm font-medium">
              Historial
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};