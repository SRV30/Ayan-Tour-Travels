import { Car, MapPin, DollarSign, FileText, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Cars", icon: Car, path: "/cars" },
    { name: "Cities", icon: MapPin, path: "/cities" },
    { name: "Pricing", icon: DollarSign, path: "/pricing" },
    { name: "Bookings", icon: FileText, path: "/bookings" },
  ];

  return (
    <div className="bg-black text-white w-64 h-screen p-4 border-r border-gray-800">
      <h2 className="text-2xl font-bold mb-10">🚀 Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {menu.map((item, idx) => (
          <NavLink
            to={item.path}
            key={idx}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-xl transition-all ${
                isActive ? 'bg-gray-800' : 'hover:bg-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
