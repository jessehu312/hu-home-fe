import { useEvent } from '../context/EventProvider';
import "./Main.css";

const Roster = (props) => {
  let members = props.members.slice();
  if (props.user.geofenceslength) {
    let me = members.find(member => member.id === props.user.userId)
    me.place = 'home'
  }
  const { familyList } = useEvent();
  if (familyList) {
    let activeList = familyList.members;
    for (const key of Object.keys(activeList)) {
      let member = members.find(member=>member.id === key);
      if (!member) {
        continue;
      }
      member.place = 'home';
    }
  }

  return(
    <div>
      {members.map(member => <button key={member.id} className={member.place ? `${member.place} homeList` : "homeList"}>{member.name}</button>)}
    </div>
  );
}

export default Roster;