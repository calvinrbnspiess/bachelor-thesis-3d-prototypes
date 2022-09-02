import type { NextPage } from "next";
import Head from "next/head";
import classnames from "classnames";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Übersicht Prototypen</title>
        <meta name="description" content={"Übersicht"} />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main>
        <nav className={classnames("navigation", "navigation__container")}>
          <div
            className={classnames("navigation__logo")}
            data-prototype-id={"/"}
          />
        </nav>
        <section
          className={classnames(
            "section",
            "section__container",
            "flex",
            "flex--column"
          )}
        >
          <ul className={classnames("list")}>
            <li>
              <Link href={"pv"}>
                <a>Vergleichsvariante</a>
              </Link>
            </li>
            <li>
              <Link href={"p1"}>
                <a>Prototyp 1</a>
              </Link>
            </li>
            <li>
              <Link href={"p2"}>
                <a>Prototyp 2</a>
              </Link>
            </li>
            <li>
              <Link href={"p3"}>
                <a>Prototyp 3</a>
              </Link>
            </li>
            <li>
              <Link href={"p4"}>
                <a>Prototyp 4</a>
              </Link>
            </li>
            <li>
              <Link href={"p5"}>
                <a>Prototyp 5</a>
              </Link>
            </li>
            <li>
              <Link href={"p6"}>
                <a>Prototyp 6</a>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
