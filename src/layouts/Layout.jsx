import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="footer">푸터</footer>
    </>
  );
};

export default Layout;
