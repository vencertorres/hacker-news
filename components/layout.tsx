import Navigation from "./navigation";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="page">
    <Navigation />
    <main>{children}</main>

    <style jsx>{`
      .page {
        width: 85%;
        margin: 0 auto;
        background: #f6f6ef;
      }

      main {
        padding: 1rem;
      }

      @media only screen and (min-width: 300px) and (max-width: 750px) {
        .page {
          width: 100%;
          min-width: 0;
        }
      }
    `}</style>
  </div>
);

export default Layout;
