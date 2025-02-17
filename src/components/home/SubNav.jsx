import { MENU_ITEMS } from "@/shared/constants/menuItems";
import { Link } from "react-router-dom";

export const SubNav = () => {
  return (
    <>
      <div className="sub_nav">
        <ul>
          {MENU_ITEMS.map((item) => {
            return (
              <li key={item.id}>
                <Link to={item.link}>
                  <img src={item.img} alt={item.alt} />
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
