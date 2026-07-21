import logo from "../../../assets/logo.svg";

function Logo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="Contri"
      className={`w-72 ${className}`}
    />
  );
}

export default Logo;