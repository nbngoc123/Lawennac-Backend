import { Runware } from "@runware/sdk-js";
import dotenv from 'dotenv';
dotenv.config()
const api_key = process.env.RUNWARE_API_KEY;
export const runware = new Runware({ apiKey: api_key });

