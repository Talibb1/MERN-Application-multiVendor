import '../../app/globals.css';
import Image from 'next/image';

const Logo = () => (
  <div className="logo-container">
    <Image
      src="/logo.png"
      alt="Logo"
      width={100}
      height={100}
      className="text-blue-500"
    />
  </div>
);

export default Logo;
