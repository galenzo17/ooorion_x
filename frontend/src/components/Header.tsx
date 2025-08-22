import { User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              ⚡ OOORION X
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Billeteras
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2">
              Comprar / Vender
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2">
              Exchange
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2">
              Ajustes
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2">
              Historial
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Mi Cuenta</span>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};