import LogoBlue from "../assets/images/logo-blue.png"
import "../css/components/HeaderOrange.css"

function HeaderOrange() {
  
  return (
    <div className="blueheaderWrapper">
      <img className="blueheaderImg" src={LogoBlue} alt=""/>
    </div>
  );
}

export default HeaderOrange;
