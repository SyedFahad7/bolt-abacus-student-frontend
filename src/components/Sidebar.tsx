import React, { useEffect, useState } from 'react';
import { House, Calculator, Trophy, Medal, User, SignOut, Flame, VideoCamera, Archive, List, X, ChartLine, MapTrifold, Target, Sword } from '@phosphor-icons/react';

// Dummy Sidebar for dashboard, UI only, no logic, static links
const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dummyUser = {
    initials: 'MM',
    firstName: 'Mohd',
    lastName: 'Mujahed',
  };
  const dummyStreak = 7;
  type NavItem = {
    name: string;
    href: string;
    icon: React.ReactNode;
    isActive: boolean;
    hasMini?: boolean;
  };
  const navigationItems: NavItem[] = [
    { name: 'Dashboard', href: '/student/dashboard', icon: <House size={24} weight="fill" />, isActive: true },
    { name: 'Path of Conquest', href: '/student/path-of-conquest', icon: <MapTrifold size={24} />, isActive: false },
    { name: 'Progress', href: '/student/progress', icon: <ChartLine size={24} />, isActive: false},
    { name: 'Solo Training Ground', href: '/student/solo-training-ground', icon: <Target size={24} />, isActive: false },
    { name: 'Epic Battle Ground', href: '/student/epic-battle-ground', icon: <Sword size={24} />, isActive: false },
    { name: 'Hall of Fame', href: '/student/hall-of-fame', icon: <Trophy size={24} />, isActive: false },
    // { name: 'Achievements', href: '/student/achievements', icon: <Medal size={24} />, isActive: false },
    // { name: 'Profile', href: '/student/profile', icon: <User size={24} />, isActive: false },
  ];

  const publishSidebarWidth = () => {
    const root = document.documentElement;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches; // md breakpoint
    const width = isDesktop ? (isCollapsed ? '4rem' : '16rem') : '0px';
    root.style.setProperty('--sidebar-width', width);
  };

  useEffect(() => {
    publishSidebarWidth();
    const onResize = () => publishSidebarWidth();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    publishSidebarWidth();
  }, [isCollapsed]);

  // handlers
  const handleCollapseToggle = () => setIsCollapsed((prev) => !prev);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={handleMobileMenuToggle}
        className="fixed top-4 left-4 z-[60] md:hidden p-2 rounded-lg bg-[#161618] text-white hover:bg-[#facb25] hover:text-[#000000] transition-all duration-200 border border-[#212124]"
      >
        <List size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-[#161618] text-white transition-all duration-300 z-50 border-r border-[#212124] flex-col hidden md:flex ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-2 border-b border-[#212124] flex-shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center space-x-2">
              <a href="/">
                <img src="../src/assets/images/logo.png" alt="BoltAbacus logo" className="w-3/4 cursor-pointer" />
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
            </div>
          )}
          <button 
            onClick={handleCollapseToggle}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-[#facb25] hover:text-[#000000]"
          >
            {isCollapsed ? <List size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* User Info & Streak */}
        <div className="p-2 border-b border-[#212124] flex-shrink-0">
          {!isCollapsed && (
            <>
              <div className="flex items-center justify-between mb-1 -ml-2 p-1 rounded-lg hover:bg-[#facb25] hover:text-[#000000] transition-all duration-200 group">
                <a href="#" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <div className="w-10 h-10 bg-[#facb25] rounded-full flex items-center justify-center text-[#000000] font-bold text-sm">
                    {dummyUser.initials}
                  </div>
                  <div>
                    <p className="font-medium text-sm group-hover:text-[#000000]">
                      {dummyUser.firstName} {dummyUser.lastName}
                    </p>
                    <p className="text-xs text-white group-hover:text-[#000000]">Student</p>
                  </div>
                </a>
                <button className="p-1.5 rounded-md hover:bg-[#e6b422] transition-all duration-200" title="Logout">
                  <SignOut size={18} color="#fff" />
                </button>
              </div>

              {/* Streak Display with Join Button */}
              <div className="flex items-center justify-between p-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#facb25] rounded-full flex items-center justify-center">
                    <Flame size={18} color="red" weight="fill" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {dummyStreak} Day Streak
                    </p>
                  </div>
                </div>
                <button className="bg-[#facb25] text-[#000000] px-3 py-1.5 rounded-lg font-medium hover:bg-[#e6b422] transition-all duration-200 flex items-center space-x-1">
                  <VideoCamera size={18} color="#000000" weight="fill" />
                  <span className="text-sm text-[#000000]">Join</span>
                </button>
              </div>
            </>
          )}
          {isCollapsed && (
            <div className="flex justify-center p-1">
              <div className="w-8 h-8 bg-[#facb25] rounded-full flex items-center justify-center">
                <Flame size={18} color="#fff" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name} className="relative">
                <a
                  href={item.href}
                  className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 rounded-lg transition-all duration-200 group ${
                    item.isActive
                      ? 'bg-[#facb25] text-[#000000] shadow-lg'
                      : 'text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className={`ml-3 text-sm font-medium ${item.isActive ? 'text-[#000000]' : 'text-white group-hover:text-[#000000]'}`}>
                      {item.name}
                    </span>
                  )}
                </a>
                {!isCollapsed && item.hasMini && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md border border-[#212124] text-white bg-[#212124] hover:bg-[#facb25] hover:text-[#000000]"
                    title="Open mini abacus"
                  >
                    Mini
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-[#212124] flex-shrink-0">
          <ul className="space-y-1">
            <li>
              <a href="#" className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 rounded-lg transition-all duration-200 text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md group`}>
                <Archive size={24} />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium text-white group-hover:text-[#000000]">Archive</span>
                )}
              </a>
            </li>
            <li>
              <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 rounded-lg transition-all duration-200 text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md group`}>
                <SignOut size={24} />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium text-white group-hover:text-[#000000]">Logout</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#161618] text-white border-r border-[#212124] flex-col z-[60] md:hidden transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-2 border-b border-[#212124] flex-shrink-0">
          <div className="flex items-center space-x-2">
            <a href="/">
              <img src="/logo.png" alt="BoltAbacus logo" width={40} height={40} className="cursor-pointer" />
            </a>
            <span className="font-bold text-lg text-white">BoltAbacus</span>
          </div>
          <button onClick={closeMobileMenu} className="p-2 rounded-lg transition-all duration-200 hover:bg-[#facb25] hover:text-[#000000]">
            <X size={18} />
          </button>
        </div>

        {/* User Info & Streak */}
        <div className="p-2 border-b border-[#212124] flex-shrink-0">
          <div className="flex items-center justify-between mb-1 -ml-2 p-1 rounded-lg hover:bg-[#facb25] hover:text-[#000000] transition-all duration-200 group">
            <a href="#" className="flex items-center space-x-3 cursor-pointer flex-1">
              <div className="w-10 h-10 bg-[#facb25] rounded-full flex items-center justify-center text-[#000000] font-bold text-sm">
                {dummyUser.initials}
              </div>
              <div>
                <p className="font-medium text-sm group-hover:text-[#000000]">
                  {dummyUser.firstName} {dummyUser.lastName}
                </p>
                <p className="text-xs text-white group-hover:text-[#000000]">Student</p>
              </div>
            </a>
            <button className="p-1.5 rounded-md hover:bg-[#e6b422] transition-all duration-200" title="Logout">
              <SignOut size={18} color="#fff" />
            </button>
          </div>

          {/* Streak Display with Join Button */}
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#facb25] rounded-full flex items-center justify-center">
                <Flame size={18} color="#fff" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {dummyStreak} Day Streak
                </p>
              </div>
            </div>
            <button className="bg-[#facb25] text-[#000000] px-3 py-1.5 rounded-lg font-medium hover:bg-[#e6b422] transition-all duration-200 flex items-center space-x-1">
              <VideoCamera size={18} color="#000000" />
              <span className="text-sm text-[#000000]">Join</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name} className="relative">
                <a
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 group ${
                    item.isActive
                      ? 'bg-[#facb25] text-[#000000] shadow-lg'
                      : 'text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`ml-3 text-sm font-medium ${item.isActive ? 'text-[#000000]' : 'text-white group-hover:text-[#000000]'}`}>
                    {item.name}
                  </span>
                </a>
                {item.hasMini && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md border border-[#212124] text-white bg-[#212124] hover:bg-[#facb25] hover:text-[#000000]"
                    title="Open mini abacus"
                  >
                    Mini
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-[#212124] flex-shrink-0">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg transition-all duration-200 text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md group">
                <Archive size={24} color="#fff" />
                <span className="ml-3 text-sm font-medium text-white group-hover:text-[#000000]">Archive</span>
              </a>
            </li>
            <li>
              <button className="w-full flex items-center p-2 rounded-lg transition-all duration-200 text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md group">
                <SignOut size={24} color="#fff" />
                <span className="ml-3 text-sm font-medium text-white group-hover:text-[#000000]">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );

}
export default Sidebar;
