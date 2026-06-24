
import { ConfigClient } from "./config-client";
import { getConfig } from '@/db/queries';
import { Config } from '@/db/schema';

export default async function ConfigManage() {
 
  const configs: Config[] = await getConfig();

  return <ConfigClient configs={configs} />;
}
