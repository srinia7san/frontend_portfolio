import React from 'react';
import ShinyText from "./ShinyText";
import { Link, useLocation } from "react-router-dom";
import HomeParicles from "./HomeParicles";
import { Home, User, Code2, Cpu, Mail, FileText, Activity } from 'lucide-react';

const SideBar = () => {
  const location = useLocation();

  const details = [
    { id: 1, section: "Home", routes: "/", icon: <Home className="w-5 h-5" /> },
    { id: 6, section: "About", routes: "/about", icon: <User className="w-5 h-5" /> },
    { id: 2, section: "Resume", routes: "/resume", icon: <FileText className="w-5 h-5" /> },
    { id: 3, section: "Skills", routes: "/skills", icon: <Cpu className="w-5 h-5" /> },
    { id: 4, section: "Projects", routes: "/projects", icon: <Code2 className="w-5 h-5" /> },
    { id: 5, section: "Contact", routes: "/contact", icon: <Mail className="w-5 h-5" /> },
  ];

  // Desktop Sidebar
  const DesktopSideBar = (
    <div className='hidden md:flex h-screen w-1/5 flex-col items-center relative overflow-hidden font-mono'
      style={{
        backgroundColor: 'var(--color-bg)',
        borderRight: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
        boxShadow: '10px 0 40px -10px color-mix(in srgb, var(--color-primary) 15%, transparent)'
      }}>

      {/* Background Particles Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <HomeParicles />
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-[1px]"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 20%, transparent)' }}></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-between py-10">

        {/* Header / Name */}
        <div className="flex flex-col items-center">
          <div className="mb-2 p-3 rounded-full"
            style={{
              border: '1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)',
              backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
              boxShadow: '0 0 15px color-mix(in srgb, var(--color-primary) 20%, transparent)'
            }}>
            <User className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
          </div>
          <ShinyText
            text="SRINIVASAN M"
            displayprop_shiny={"text-xl lg:text-2xl font-bold tracking-widest"}
            speed={12}
          />
          <div className="text-xs mt-2 tracking-[0.3em] uppercase opacity-70"
            style={{ color: 'var(--color-text-muted)' }}>
            [FULL STACK DEVELOPER]
          </div>
        </div>

        {/* Navigation Links */}
        <div className="w-full flex flex-col gap-4 px-6">
          {details.map(item => {
            const isActive = location.pathname === item.routes;

            return (
              <Link to={`${item.routes}`} key={item.id} className="w-full">
                <div className="group flex items-center gap-4 px-4 py-3 border-l-2 transition-all duration-300 ease-out"
                  style={{
                    borderColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                    backgroundColor: isActive
                      ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)'
                      : 'transparent',
                    color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                    boxShadow: isActive
                      ? 'inset 10px 0 20px -10px color-mix(in srgb, var(--color-primary) 30%, transparent)'
                      : 'none'
                  }}>

                  {/* Icon */}
                  <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>

                  {/* Text */}
                  <span className="text-lg tracking-wider font-bold uppercase">
                    {item.section}
                  </span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        boxShadow: '0 0 10px var(--color-primary)'
                      }}></span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* System Footer Info */}
        <div className="w-full px-8 opacity-60">
          <div className="pt-4 flex flex-col gap-2 text-[10px] tracking-widest"
            style={{
              borderTop: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
              color: 'var(--color-text-muted)'
            }}>
            <div className="flex justify-between">
              <span>CPU</span>
              <span style={{ color: 'var(--color-primary)' }}>12%</span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-border) 30%, transparent)' }}>
              <div className="h-full w-[12%]" style={{ backgroundColor: 'var(--color-primary)' }}></div>
            </div>

            <div className="flex justify-between mt-1">
              <span>MEM</span>
              <span style={{ color: 'var(--color-primary)' }}>42%</span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-border) 30%, transparent)' }}>
              <div className="h-full w-[42%]" style={{ backgroundColor: 'var(--color-primary)' }}></div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Activity className="w-3 h-3 animate-bounce" style={{ color: 'var(--color-primary)' }} />
              <span>NET_SECURE</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  // Mobile Navigation
  const MobileNavBar = (
    <div className='md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm'
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-bg) 95%, transparent)',
        borderTop: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
        boxShadow: '0 -5px 20px color-mix(in srgb, var(--color-primary) 10%, transparent)'
      }}>
      <div className="flex justify-around items-center h-16 w-full px-2">
        {details.map(item => {
          const isActive = location.pathname === item.routes;
          return (
            <Link to={`${item.routes}`} key={item.id} className="flex-1 text-center">
              <div className="flex flex-col items-center justify-center p-1 rounded-md transition-all duration-300"
                style={{ color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}>
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-[10px] mt-1 uppercase font-semibold">
                  {item.section}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {DesktopSideBar}
      {MobileNavBar}
    </>
  );
}

export default SideBar;