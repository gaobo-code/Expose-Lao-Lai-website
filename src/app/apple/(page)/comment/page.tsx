
import { CommentClient } from "./comment-client";
import { getComment } from '@/db/queries';
import { Comment } from '@/db/schema';

export default async function CommentManage() {
 
  const comments: Comment[] = await getComment();

  return <CommentClient comments={comments} />;
}
