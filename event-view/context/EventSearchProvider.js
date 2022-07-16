import { createContext, useState } from "react";
import { dateKeyFormattedStr } from "../util/DateUtil";

export const EventSearchContext = createContext({
  master: undefined,
  setMaster: () => {},
  location: "tokyo",
  setLocation: () => {},
  eventDate: dateKeyFormattedStr(new Date()), // 今日日付を初期設定
  setEventDate: () => {},
  selectSite: "",
  setSelectSite: () => {},
});

export const EventSearchProvider = ({ children }) => {
  const [master, setMaster] = useState(undefined);
  const [location, setLocation] = useState("tokyo");
  const [eventDate, setEventDate] = useState(dateKeyFormattedStr(new Date()));
  const [selectSite, setSelectSite] = useState("");

  return (
    <EventSearchContext.Provider
      value={{
        master,
        setMaster,
        location,
        setLocation,
        eventDate,
        setEventDate,
        selectSite,
        setSelectSite,
      }}
    >
      {children}
    </EventSearchContext.Provider>
  );
};
