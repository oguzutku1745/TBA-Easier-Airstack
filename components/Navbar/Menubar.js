import Navbar from './Navbar';

const Menubar = ({ children, resetPage }) => {
  return (
    <div>
      <Navbar resetPage={resetPage} />
      <main>{children}</main>
    </div>
  );
};

export default Menubar;
