'use client';

import { ConfigSubmitForm } from './config-submit-form';
import { ConfigTable } from './config-table';
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
import { Config } from '@/db/schema';

type Props = {
  configs: Config[];
};

export function ConfigClient({ configs }: Props) {
  const [editConfigs, setEditConfigs] = useState<Config[]>(configs);
  const [openCommit, setOpenCommit] = useState(false);

  return (
    <>
      <div className="w-full text-right mb-3">
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
              <ConfigSubmitForm configs={editConfigs} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full border-t box-border">
        <ConfigTable configs={editConfigs} setConfigs={setEditConfigs} />
      </div>
    </>
  );
}