import { User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-300">
      <div className="w-full px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-bold text-blue-600">
              ⚡ OOORION X
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-blue-600 font-semibold text-base border-b-2 border-blue-600 pb-2">
              Billeteras
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2 text-base font-medium">
              Comprar / Vender
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2 text-base font-medium">
              Exchange
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2 text-base font-medium">
              Ajustes
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 pb-2 text-base font-medium">
              Historial
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-base text-gray-600 font-medium">Mi Cuenta</span>
            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};