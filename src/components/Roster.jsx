import { useEvent } from '../context/EventProvider';
import "./Main.css";

const Roster = (props) => {
  const { familyList } = useEvent();
  return(
    <div>
      {props.members.map(member => <button key={member.id} className="homeList">{member.name}</button>)}
    </div>
  );
}

export default Roster;