import Header from "@/app/_components/Header/Header";
import BookMain from "@/app/book/BookMain";
import SearchMain from "@/app/search/SearchMain";
import ServiceMain from "@/app/service/ServiceMain";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <SearchMain></SearchMain>
    </div>
  );
}
