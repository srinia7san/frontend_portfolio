import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const HomeParicles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      // --- CRITICAL FIX: Disables default full-screen behavior ---
      fullScreen: {
        enable: false,
        zIndex: 0, // optional
      },
      // -----------------------------------------------------------
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
  color: { value: "#fff700ff" },
  shadow: {
    enable: true,
    color: "#fff700ff",
    blur: 10,
    offset: { x: 0, y: 0 }
  },
        links: {
          color: "#5a5a5aff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
    value: 0.5,
    animation: {
      enable: true,
      speed: 1,
      minimumValue: 0.1,
      sync: false
    }
  },
        shape: {
    type: "star",
    options: {
      star: { sides: 5 }
    }
  },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        // This style ensures it fills the PARENT container (the sidebar)
        className="absolute inset-0 w-full h-full" 
      />
    );
  }

  return <></>;
};

export default HomeParicles;