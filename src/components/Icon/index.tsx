import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faMinus,
  faPlus,
  faTrashAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faPlus, faMinus, faTrashAlt, faUserPlus, faCheck);

export default FontAwesomeIcon;
