import React from "react";
import {
  DASHBOARD_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/navigation/navigation";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout, authDataAssign } from "../../../store/user/authSlice";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../api/auth/auth";

export default function Sidebar() {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const sidebarWidth = isSmallScreen ? "w-20" : "w-60";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { access_token, role } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await AuthService.logout(access_token);
      dispatch(logout());
      navigate("/login");
      dispatch(
        authDataAssign({
          access_token: "",
          refresh_token: "",
          email: "",
          role: "",
          firstname: "",
          lastname: "",
        })
      );
    } catch (error) {
      console.error("Error logout:", error.message);
    }
  };

  return (
    <div className={`bg-blue-950 ${sidebarWidth} p-3 flex flex-col text-white`}>
      <div className="flex items-center gap-4 px-2 py-3">
        <Link to={"/"} key="logo">
          {/* <img src={require("../../../assets/icon/logo.png")} alt="logo" /> */}
        </Link>
        <Link to={"/"} className="no-underline" key="app_name">
          <span
            className={`hidden md:flex font-sans font-bold text-3xl hover:text-4xl duration-200 
                hover:underline text-transparent bg-gradient-to-r bg-clip-text from-white to-blue-600 tracking-wide`}
          >
            Route <br /> BOOK
          </span>
        </Link>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item, index) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>

      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-100">
        {role === "ADMIN" && (
          <SidebarLink
            key={DASHBOARD_BOTTOM_LINKS[0].key}
            item={DASHBOARD_BOTTOM_LINKS[0]}
          />
        )}

        {DASHBOARD_BOTTOM_LINKS.map(
          (item, index) =>
            index !== 0 && <SidebarLink key={item.key} item={item} />
        )}
      </div>
      <button
        className={`${linkClasses} hover:bg-blue-700/100  no-underline text-red-500 text-lg`}
        onClick={handleLogout}
        key={"logout"}
      >
        <span className="text-xl">
          <FiLogOut key={"logout"} />
        </span>
        <span className="hidden md:flex">Logout</span>
      </button>
    </div>
  );
}

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:no-underline rounded-md test-base";

function SidebarLink({ item }) {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const active = location.pathname.includes(item.path);

  return (
    <div>
      <Link
        to={item.path}
        className={`${linkClasses} hover:bg-blue-700/100  
          ${active ? "bg-blue-900/100" : ""}  
            no-underline`}
      >
        <span> {item.icon}</span>
        <span
          className={`hidden md:flex  
            ${active ? "text-sky-400/100 font-bold" : "text-teal-50/100 font-semibold text-sm"}`}
        >
          {item.label}
        </span>
      </Link>
      {isSmallScreen ? null : (
        <div className="flex-1">
          {item.subdirector &&
            item.subdirector.map((subitem) => (
              <div key={subitem.key}>
                <Link
                  to={subitem.path}
                  className={`flex no-underline rounded-md gap-2`}
                >
                  {active ? (
                    <div
                      className={`flex-1 rounded-md text-center ml-12 mt-1 hover:bg-blue-700/100  
                    ${
                      location.pathname === subitem.path
                        ? "text-sky-400/100 bg-blue-900/100 font-semibold"
                        : "text-sky-200/100 bg-blue-900/25"
                    }`}
                    >
                      <span className="hidden text-sm font-semibold md:flex justify-center ml-2">
                        {subitem.label}
                      </span>
                    </div>
                  ) : null}
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
