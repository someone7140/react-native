import { createContext, useState } from "react";

export const SearchPlaceContext = createContext({
  searchInfo: undefined,
  setSearchInfo: () => {},
});

export const SearchPlaceProvider = ({ children }) => {
  const [searchInfo, setSearchInfo] = useState(undefined);

  return (
    <SearchPlaceContext.Provider value={{ searchInfo, setSearchInfo }}>
      {children}
    </SearchPlaceContext.Provider>
  );
};
