'use client';

import { GroupTable } from './group-table';
import { GroupForm } from './group-form';
import { GroupSubmitForm } from './group-submit-form';
import { useState } from 'react';
import { Group } from '@/db/schema';
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

type Props = {
  groups: Group[];
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

export function GroupClient({ groups }: Props) {
  const [editGroups, setEditGroups] = useState<Group[]>(groups);
  const [editItem, setEditItem] = useState<Group | null>(null);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCommit, setOpenCommit] = useState(false);

  const onDelete = (id: number) => {
    setEditGroups(prev => prev.filter((item => item.id !== id)));
  };

  const onAdd = () => {
    const id = generateId();
    const group: Group = {
      id: id,
      groupname: "",
      groupnumber: "",
      groupowner: "",
      groupownernumber: "",
      order: null
    }
    setEditItem(group);
    setEditFlag(false);
  };

  const onEdit = (group: Group) => {
    setEditItem(group);
    setOpenAdd(true);
    setEditFlag(true);
  }

  const onSave = (group: Group) => {
    if (editFlag) {
      setEditGroups(prevItems =>
        prevItems.map(item =>
          item.id === group.id ? group : item
        )
      ); 
    } else {
      setEditGroups(prevItems => [...prevItems, group]);
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
              <DialogTitle>新增QQ群</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center p-4">
              <GroupForm editItem={editItem} onSave={onSave} onCloseAdd={setOpenAdd} />
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
              <GroupSubmitForm groups={editGroups} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-900 border-1 rounded-sm min-h-100">
        <GroupTable groups={editGroups} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </>
  );
}