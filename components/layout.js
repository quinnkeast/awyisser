import Meta from "../components/meta";
import Header from "../components/header";
import Footer from "../components/footer";

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
