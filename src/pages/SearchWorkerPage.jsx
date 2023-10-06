import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import SearchWorker from "../components/SearchWorker";

export default function SearchWorkerPage() {
  return (
    <>
      <div className="bg-fourth">
        <HeaderApp></HeaderApp>
        <main className="flex flex-col h-full w-auto md:px-10 py-5 m-auto gap-10">
          <SearchWorker></SearchWorker>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
