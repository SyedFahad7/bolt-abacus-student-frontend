import type { FC } from 'react';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import BrandLogo from './BrandLogo';
import NavBarLink from './NavBarLink';
import ProfileIcon from './ProfileIcon';

export interface StudentNavBarProps {}

const StudentNavBar: FC<StudentNavBarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy user and actions (replaces store usage)
  const user = { name: { first: 'Alex', last: 'Chen' } };
  const logout = () => console.log('logout clicked');

  const handleMenuClick = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full h-24 max-h-24">
      <div className="flex items-center justify-between w-full h-full px-4 tablet:px-10 desktop:px-20">
        <BrandLogo link="/" />
        <div>
          <ul className="items-center hidden tablet:flex desktop:flex">
            {user && (
              <>
                <NavBarLink type="desktop" href="/dashboard">Dashboard</NavBarLink>
                <NavBarLink type="desktop" href="/progress">Progress</NavBarLink>
                <NavBarLink type="desktop" href="/login" onclick={logout}>Log out</NavBarLink>
                <NavBarLink type="desktop" href="/profile">
                  <ProfileIcon text={user.name.first.charAt(0) + user.name.last.charAt(0)} />
                </NavBarLink>
              </>
            )}
          </ul>
        </div>
        <button
          type="button"
          onClick={handleMenuClick}
          className={`cursor-pointer tablet:hidden desktop:hidden ${menuOpen ? 'hidden' : ''}`}
        >
          <AiOutlineMenu size={28} className="text-gold" />
        </button>
        <div
          className={`fixed z-[99] w-[100%] h-screen overflow-hidden p-10 top-0 tablet:hidden desktop:hidden bg-black ease-in duration-500 ${menuOpen ? 'left-0' : 'left-[100%] opacity-0'}`}
        >
          <div className="flex items-center justify-end w-full">
            <button type="button" onClick={handleMenuClick} className="cursor-pointer">
              <AiOutlineClose size={28} className="text-gold" />
            </button>
          </div>
          <div className="flex-col">
            <ul>
              <NavBarLink type="mobile" href="/" onclick={handleMenuClick}>Home</NavBarLink>
              {user && (
                <>
                  <NavBarLink type="mobile" href="/dashboard">Dashboard</NavBarLink>
                  <NavBarLink type="mobile" href="/progress">Progress</NavBarLink>
                  <NavBarLink type="mobile" href="/login" onclick={logout}>Log out</NavBarLink>
                  <NavBarLink type="mobile" href="/profile">
                    <ProfileIcon text={user.name.first.charAt(0) + user.name.last.charAt(0)} />
                  </NavBarLink>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavBar;
