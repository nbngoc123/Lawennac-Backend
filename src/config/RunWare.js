import { Runware } from "@runware/sdk-js";
const api_key = mysql.createConnection(process.env.RUNWARE_API_KEY);
export const runware = new Runware({ apiKey: api_key });

