import { NavLink } from "react-router-dom";
import { INavItem } from "../../types/common";

interface IBottomNavbarProps {
  links: INavItem[];
}

const BottomNavbar = ({ links }: IBottomNavbarProps) => {
  return (
    <nav className="bg-gray-700 text-white p-4 flex justify-around">
      {links.map((item, index) => (
        <NavLink
          key={index}
          to={item.linkTo}
          className={({ isActive }) =>
            "hover:text-gray-300 transition-colors" +
            (isActive ? " text-gray-300" : "")
          }
          target={item.inSameTab ? "_self" : "_blank"}
          rel={!item.inSameTab ? "noopener noreferrer" : undefined}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavbar;
