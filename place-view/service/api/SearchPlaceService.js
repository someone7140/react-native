import axios from "axios";

import ENV_VALUE from "../../env";

// 検索条件を取得するAPI
export async function getSearchCondition() {
  const result = await axios.get(
    `${ENV_VALUE.API_DOMAIN}/get_search_condition`
  );
  if (result.status === 200) {
    return result.data;
  } else {
    throw "Status is " + result.status;
  }
}
