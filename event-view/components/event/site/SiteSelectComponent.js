import { useContext, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { EventSearchContext } from "../../../context/EventSearchProvider";

export default function SiteSelectComponent() {
  const ALL_SITE = { key: "", label: "全選択" };
  const [sites, setSites] = useState([]);
  const { master, selectSite, setSelectSite } = useContext(EventSearchContext);

  useEffect(() => {
    if (master?.sites) {
      setSites([ALL_SITE, ...master.sites]);
    } else {
      setSites([ALL_SITE]);
    }
  }, [master?.sites]);

  return (
    <Picker
      selectedValue={selectSite}
      onValueChange={(itemValue) => setSelectSite(itemValue)}
    >
      {sites.map((s) => (
        <Picker.Item label={s.label} value={s.key} />
      ))}
    </Picker>
  );
}
