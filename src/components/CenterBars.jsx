import { Link } from "react-router-dom";
import downloadResume from "./Resume.jsx";
import "./CenterBars.css";

const CenterBars = () => {

  const HackerBtn = ({ to, label, onClick }) => {

    const ButtonContent = (
      <button
        onClick={onClick}
        className="hacker-btn group m-2 relative px-4 py-3 sm:px-6 sm:py-3.5 font-mono text-sm sm:text-lg font-bold tracking-widest uppercase"
      >
        {/* Corner Decorations */}
        <span className="hacker-btn-corner top-0 left-0 border-t-2 border-l-2"></span>
        <span className="hacker-btn-corner bottom-0 right-0 border-b-2 border-r-2"></span>

        {/* Text Content */}
        <span className="flex items-center justify-center">
          <span className="hacker-btn-arrow mr-2">&gt;</span>
          {label}
        </span>
      </button>
    );

    if (to) {
      return <Link to={to}>{ButtonContent}</Link>;
    }
    return ButtonContent;
  };

  return (
    <div className="w-full py-6 md:py-10" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="flex justify-center px-4 sm:px-0">
        <div className="p-0 text-center inline-block max-w-full">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <HackerBtn to="/contact" label="Contact" />
            <HackerBtn to="/skills" label="Skills" />
            <HackerBtn to="/projects" label="Projects" />
            <HackerBtn label="Resume" onClick={downloadResume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterBars;