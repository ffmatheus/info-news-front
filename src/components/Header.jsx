import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import '../styles/Header.css';
import '../styles/Buttons.css';

const Header = () => {
  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="header">
      <h1 class="text">Info News</h1>
        <div class="header-right">
          {token && (
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
    </div>
  );
};

export default Header;