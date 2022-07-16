import axios from "axios";

import ENV_VALUE from "../../env";

// マスター情報を取得するAPI
export async function getSearchMaster() {
  const result = await axios.get(
    `${ENV_VALUE.API_DOMAIN}/get_event_info_master`
  );
  if (result.status === 200) {
    return result.data;
  }
}

// イベント情報を取得するAPI
export async function searchEvents(location, eventDate) {
  const result = await axios.get(
    `${ENV_VALUE.API_DOMAIN}/get_event_list?location_key=${location}&event_date=${eventDate}`
  );
  if (result.status === 200) {
    return result.data;
  }
}
