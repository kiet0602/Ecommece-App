import { useState, useContext, createContext } from "react";

/* tìm kiếm theo keyword trả về results */
/* tìm kiếm trong ô input */
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });
  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};
// custom hook
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };
