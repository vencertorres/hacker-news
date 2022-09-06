import Link from "next/link";

const Item = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link href={href}>
        <a>{children}</a>
      </Link>

      <style jsx>{`
        li:nth-child(2) {
          font-weight: 700;
        }

        li:nth-child(n + 3) a::before {
          content: "|";
          margin-right: 0.5rem;
        }

        a:link,
        a:visited {
          color: var(--fg);
          text-decoration: none;
        }
      `}</style>
    </li>
  );
};

const Navigation = () => {
  return (
    <nav>
      <ul>
        <Item href={"/"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/y18.gif" alt="logo" />
        </Item>
        <Item href={"/news"}>Hacker News</Item>
        <Item href={"/newest"}>new</Item>
        <Item href={"/ask"}>ask</Item>
        <Item href={"/show"}>show</Item>
        <Item href={"/jobs"}>jobs</Item>
      </ul>

      <style jsx>{`
        nav {
          padding: 0.15rem;
          background: var(--accent);
        }

        ul {
          display: flex;
          column-gap: 0.5rem;
          align-items: center;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        img {
          display: block;
          border: 1px solid #fff;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
