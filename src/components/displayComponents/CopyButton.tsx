import { ReactComponent as CopyIcon } from "../../assets/icons/copy-icon.svg";
import { smallIconStyle } from "../../styles/iconStyle";

function CopyButton(props) {
  const handleClick = () => {
    navigator.clipboard.writeText(props.text);
  };

  return <CopyIcon style={smallIconStyle} onClick={handleClick} />;
}

export default CopyButton;
