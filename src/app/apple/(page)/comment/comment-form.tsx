'use client';

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from 'react';
import { z } from 'zod';
import { Comment } from '@/db/schema';

type Props = {
  editItem: Comment | null;
  onSave: (comment: Comment) => void;
  onCloseAdd: (openAdd: boolean) => void;
};

export function CommentForm({ editItem, onSave, onCloseAdd }: Props) {

  if (!editItem) return;

  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const replyRef = useRef<HTMLTextAreaElement | null>(null);
  const orderRef = useRef<HTMLInputElement | null>(null);

  const passData = () => {
    if (!contentRef.current) return;
    if (!replyRef.current) return;
    if (!orderRef.current) return;

    const comment = {
      id: editItem.id,
      content: contentRef.current.value ?? "",
      reply: replyRef.current.value || null,
      order: orderRef.current.value || null
    }

    const parsed = z
      .object({ id: z.number().int(), content: z.string().min(4).max(300), reply: z.string().min(4).max(300).nullable().optional(), order: z.coerce.number().int().min(0).max(10000).nullable().optional() })
      .safeParse(comment);

    if (!parsed.success) {
      contentRef.current.value = "";
      replyRef.current.value = "";
      orderRef.current.value = "";
      return;
    }

    const temp: Comment = {
      ...parsed.data,
      reply: parsed.data.reply ?? null,
      order: parsed.data.order ?? null,
    };

    onSave(temp);
    onCloseAdd(false);
  }

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="form-id" className="w-15">ID</FieldLabel>
        <Input
          value={editItem.id ?? ""}
          type="text"
          disabled
        />
      </Field>

      <Field orientation="horizontal">
        <FieldLabel htmlFor="form-content" className="w-15">内容</FieldLabel>
        <Textarea
          ref={contentRef}
          placeholder="输入内容"
          required
          defaultValue={editItem.content ?? ""}
          minLength={4}
          maxLength={300}
          autoFocus
        />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="form-reply" className="w-15">回复</FieldLabel>
        <Textarea
          ref={replyRef}
          placeholder="输入回复"
          defaultValue={editItem.reply ?? ""}
          minLength={4}
          maxLength={300}
        />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="form-order" className="w-15">顺序</FieldLabel>
        <Input
          ref={orderRef}
          type="text"
          placeholder="输入顺序"
          defaultValue={editItem.order ?? ""}
          maxLength={4}
        />
      </Field>
      <Field orientation="horizontal" className="w-full">
        <Button className="w-full tracking-wide cursor-pointer" onClick={passData}>保&nbsp;&nbsp;存</Button>
      </Field>
    </FieldGroup>
  );
}
