import "./ShinyText.css";

const ShinyText = ({ text, displayprop_shiny, speed }) => {
  return (
    <span
      className={`shiny-text ${displayprop_shiny}`}
      style={{
        "--animation-speed": `${speed}s`,
        color: 'var(--color-text)'
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;