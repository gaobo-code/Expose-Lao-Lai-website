'use client';

import { CommentTable } from './comment-table';
import { CommentForm } from './comment-form';
import { CommentSubmitForm } from './comment-submit-form';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Comment } from '@/db/schema';

type Props = {
  comments: Comment[];
};

const idArray: number[] = [];

function generateId() {
  if (idArray.length === 0) {
    idArray.push(-1);
    return -1;
  }

  const last = idArray[idArray.length - 1];
  const newId = last - 1;
  idArray.push(newId);
  return newId;
}

export function CommentClient({ comments }: Props) {
  const [editComments, setEditComments] = useState<Comment[]>(comments);
  const [editItem, setEditItem] = useState<Comment | null>(null);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCommit, setOpenCommit] = useState(false);

  const onDelete = (id: number) => {
    setEditComments(prev => prev.filter((item => item.id !== id)));
  };

  const onAdd = () => {
    const id = generateId();
    const comment: Comment = {
      id: id,
      content: "",
      reply: null,
      order: null
    }
    setEditItem(comment);
    setEditFlag(false);
  };

  const onEdit = (comment: Comment) => {
    setEditItem(comment);
    setOpenAdd(true);
    setEditFlag(true);
  }

  const onSave = (comment: Comment) => {
    if (editFlag) {
      setEditComments(prevItems =>
        prevItems.map(item =>
          item.id === comment.id ? comment : item
        )
      ); 
    } else {
      setEditComments(prevItems => [...prevItems, comment]);
    }
  };

  return (
    <>
      <div className="w-full text-right mb-3">
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button variant="outline" className="tracking-wide cursor-pointer text-maincolor !border-maincolor bg-gray-100 dark:bg-gray-700 mr-4" onClick={onAdd}>新增</Button>
          </DialogTrigger>
          <DialogOverlay className="bg-black/80 dark:bg-white/80" />
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>新增评论</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center p-4">
              <CommentForm editItem={editItem} onSave={onSave} onCloseAdd={setOpenAdd} />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={openCommit} onOpenChange={setOpenCommit}>
          <DialogTrigger asChild>
            <Button variant="outline" className="tracking-wide cursor-pointer text-maincolor !border-maincolor bg-gray-100 dark:bg-gray-700">提交</Button>
          </DialogTrigger>
          <DialogOverlay className="bg-black/80 dark:bg-white/80" />
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>提交</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center p-4">
              <CommentSubmitForm comments={editComments} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-900 border-1 rounded-sm min-h-100">
        <CommentTable comments={editComments} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </>
  );
}