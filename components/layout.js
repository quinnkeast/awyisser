import Meta from "./meta";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Header />
      <div className="container mx-auto px-4 xl:max-w-screen-xl">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
