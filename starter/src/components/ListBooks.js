import { Link } from "react-router-dom";
import Header from "./Header";
import Shelves from "./Shelves";

const ListBooks = ({ books, changeShelf }) => {
  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <Shelves books={books} changeShelf={changeShelf} />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
export default ListBooks;
