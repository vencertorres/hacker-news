import styles from "./layout.module.css";
import Navigation from "./navigation";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navigation />
    <main className={styles.layout}>{children}</main>
  </>
);

export default Layout;
