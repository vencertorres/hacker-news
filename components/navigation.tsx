import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navigation.module.css";

const Navigation = () => {
  const { query } = useRouter();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link href="/top/1">
            <a className={query.stories === "top" ? styles.active : ""}>top</a>
          </Link>
        </li>
        <li>
          <Link href="/new/1">
            <a className={query.stories === "new" ? styles.active : ""}>new</a>
          </Link>
        </li>
        <li>
          <Link href="/ask/1">
            <a className={query.stories === "ask" ? styles.active : ""}>ask</a>
          </Link>
        </li>
        <li>
          <Link href="/show/1">
            <a className={query.stories === "show" ? styles.active : ""}>show</a>
          </Link>
        </li>
        <li>
          <Link href="/jobs/1">
            <a className={query.stories === "jobs" ? styles.active : ""}>jobs</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
