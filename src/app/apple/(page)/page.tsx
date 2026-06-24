
import { GroupClient } from "./group-client";
import { getGroup } from '@/db/queries';
import { Group } from '@/db/schema';

export default async function GroupManage() {
 
  const groups: Group[] = await getGroup();

  return <GroupClient groups={groups} />;
}
