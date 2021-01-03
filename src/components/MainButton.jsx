import './Main.css';
import arrow from '../ArrowIcon.png';

const MainButton = (props) => {
  const { onClick, children, icon} = props;
  return (
    <button onClick={onClick} className="iconButton">
      <img src={icon} width="42px" height="42px" className="icons"/>
      <p>{children}</p>
      <img src={arrow} width="32px" height="32px" className="arrows"/>
    </button>
  )
}

export default MainButton;