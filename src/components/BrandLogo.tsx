import type { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

export interface BrandLogoProps {
  link: string;
}

const BrandLogo: FC<BrandLogoProps> = ({ link }) => {
  return (
    <Link to={link}>
      <img
        src={logo}
        alt="BoltAbacus logo"
        width={200}
        height={50}
        className="cursor-pointer"
      />
    </Link>
  );
};

export default BrandLogo;
