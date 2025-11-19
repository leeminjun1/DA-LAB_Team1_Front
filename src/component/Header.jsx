import Exit from "../assets/exit.png";
import Clover_Btn from "../assets/clover_btn.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/main");
  };
  const goToLookbook = () =>{
    navigate("/look-book");
  };
  return (
    <div className="header-grid">
      <img src={Exit} alt="exit icon" className="exit" onClick={goToMain} />
      <img src={Clover_Btn} alt="cloverbtn icon" className="cloverbtn" onClick={goToLookbook}/>
    </div>
  );
}
