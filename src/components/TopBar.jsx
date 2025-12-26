import "./TopBar.css"
import ShinyText from "./ShinyText";
import DecryptedText from "./Decrypting";

const TopBar = () => {
  return (
    <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8 font-mono"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)'
      }}>

      {/* Primary Title (Name) */}
      <h1 className="flex justify-center items-end gap-1 sm:gap-2 overflow-visible">
        <ShinyText
          text="SRINIVASAN M"
          displayprop_shiny={"text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter overflow-visible"}
          speed={12}
        />
      </h1>

      {/* Secondary Title (Role) */}
      <div className="font-bold tracking-widest decrypted-container text-center 
                      text-xs sm:text-sm md:text-lg lg:text-3xl mt-2 sm:mt-3 uppercase"
        style={{ color: 'var(--color-primary)' }}>

        <span className="mr-2" style={{ color: 'var(--color-text-muted)' }}>[</span>

        <DecryptedText
          text="Full Stack Developer"
          speed={0.5}
          maxIterations={1000}
          characters="01"
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
          animateOn="view"
          revealDirection="center"
        />

        <span className="ml-2" style={{ color: 'var(--color-text-muted)' }}>]</span>
      </div>
    </div>
  );
};

export default TopBar;