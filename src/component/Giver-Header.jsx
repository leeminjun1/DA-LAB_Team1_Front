import Exit from "../assets/exit.png";
import Clover_Btn from "../assets/clover_btn.png";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToMain = () => {
    if (location.pathname === "/groupcreate") {
      navigate("/giver-main");
    } else {
      navigate("/main");
    }
  };

  const goToCreate = () => {
    navigate("/groupcreate");
  };

  const isLookBookPage = location.pathname === "/groupstatistics";
  const isGroupCreatePage = location.pathname === "/groupcreate";

  return (
    <div className="header-grid">
      <img src={Exit} alt="exit icon" className="exit" onClick={goToMain} />

      {(!isGroupCreatePage) && (
        <img
          src={Clover_Btn}
          alt="cloverbtn icon"
          className="cloverbtn"
          onClick={goToCreate}
        />
      )}
    </div>
  );
}
