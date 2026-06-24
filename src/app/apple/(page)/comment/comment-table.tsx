'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Comment } from '@/db/schema';

type Props = {
  comments: Comment[];
  onEdit: (comment: Comment) => void;
  onDelete: (id: number) => void;
};

export function CommentTable({ comments, onEdit, onDelete }: Props) {

  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold text-maincolor w-1/10">ID</TableHead>
          <TableHead className="text-center font-bold text-maincolor break-words whitespace-normal w-3/10">内容</TableHead>
          <TableHead className="text-center font-bold text-maincolor break-words whitespace-normal w-3/10">回复</TableHead>
          <TableHead className="text-center font-bold text-maincolor break-words whitespace-normal w-1/10">顺序</TableHead>
          <TableHead className="text-center font-bold text-maincolor w-2/10">行为</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comments.map((item) => (
          <TableRow key={item.id} className="hover:bg-blue-100 dark:hover:bg-red-800">
            <TableCell className="text-center">{item.id}</TableCell>
            <TableCell className="text-center break-words whitespace-normal">{item.content}</TableCell>
            <TableCell className="text-center break-words whitespace-normal">{item.reply}</TableCell>
            <TableCell className="text-center break-words whitespace-normal">{item.order}</TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center items-center">
                <Button
                  size="sm"
                  className="tracking-wide mr-2 cursor-pointer"
                  onClick={() => onEdit(item)}
                >
                  修改
                </Button>
                <Button
                  size="sm"
                  className="tracking-wide cursor-pointer"
                  onClick={() => onDelete(item.id)}
                >
                  删除
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
