import logo from "../../../assets/logo.svg";

function Logo({
  size = "md",
  className = "",
}) {

  const sizes = {
    sm: "w-40",
    md: "w-60",
    lg: "w-80",
  };

  return (
    <img
      src={logo}
      alt="Contri"
      className={`${sizes[size]} ${className}`}
    />
  );
}

export default Logo;