const HamburgerMenuIcon = ({
  width = "16px",
  height = "16px",
  color = "#000000",
  strokeWidth = "4",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      id="Editable-line"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        fill="none"
        id="XMLID_103_"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        x1="7"
        x2="25"
        y1="16"
        y2="16"
      />
      <line
        fill="none"
        id="XMLID_102_"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        x1="7"
        x2="25"
        y1="25"
        y2="25"
      />
      <line
        fill="none"
        id="XMLID_101_"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        x1="7"
        x2="25"
        y1="7"
        y2="7"
      />
    </svg>
  );
};

export default HamburgerMenuIcon;
