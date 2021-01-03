import logo from "./home.png";
import "../components/loading.css";

const Loading = (props) => {
  return (
    <div>
      <img src={logo} width="96px" height="96px" className="loadLogo"/>
      <p className="loadScreen">Loading...</p>
    </div>
  );
}

export default Loading;