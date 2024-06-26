import { NavLink } from "react-router-dom";
import { INavItem } from "../../types/common";

interface ISidebarProps {
  links: INavItem[];
}

const Sidebar = ({ links }: ISidebarProps) => {
  return (
    <aside className="bg-gray-800 text-white p-4 pt-28 h-full space-y-2">
      {links.map((item, index) => (
        <NavLink
          key={index}
          to={item.linkTo}
          className={({ isActive }) =>
            "block px-4 py-2 rounded hover:bg-gray-700 transition-colors" +
            (isActive ? " bg-gray-700" : "")
          }
          target={item.inSameTab ? "_self" : "_blank"}
          rel={!item.inSameTab ? "noopener noreferrer" : undefined}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
