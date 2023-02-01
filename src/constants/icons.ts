import { AiOutlineCheck } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import {
  BsBookmarkHeart,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsCursorText,
  BsEnvelope,
  BsEye,
  BsFolder,
  BsGear,
  BsGrid,
  BsHouseDoor,
  BsImages,
  BsMap,
  BsPersonX,
  BsPinMap,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { IoMdPricetag, IoMdSend } from "react-icons/io";

export const ICONS = {
  MENU: FiMenu,
  Envelope: BsEnvelope,
  Favorite: BsBookmarkHeart,
  Posted: BsFolder,
  SignOut: BsPersonX,
  Settings: BsGear,
  Delete: BsTrash,
  Eye: BsEye,
  House: BsHouseDoor,
  Category: BsGrid,
  Map: BsMap,
  Surface: BsPinMap,
  Watch: BiTime,
  Search: BsSearch,
  Check: AiOutlineCheck,
  CHEVRON_DOWN: BsChevronDown,
  CHEVRON_RIGHT: BsChevronRight,
  CHEVRON_LEFT: BsChevronLeft,
  Price: IoMdPricetag,
  Text: BsCursorText,
  Photo: BsImages,
  SEND: IoMdSend,
};
