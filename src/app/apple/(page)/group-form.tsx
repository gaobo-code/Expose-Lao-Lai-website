'use client';

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRef } from 'react';
import { z } from 'zod';
import { Group } from '@/db/schema';

type Props = {
  editItem: Group | null;
  onSave: (group: Group) => void;
  onCloseAdd: (openAdd: boolean) => void;
};

export function GroupForm({ editItem, onSave, onCloseAdd }: Props) {

  if (!editItem) return;

  const groupnameRef = useRef<HTMLInputElement | null>(null);
  const groupnumberRef = useRef<HTMLInputElement | null>(null);
  const groupownerRef = useRef<HTMLInputElement | null>(null);
  const groupownernumberRef = useRef<HTMLInputElement | null>(null);
  const orderRef = useRef<HTMLInputElement | null>(null);

  const passData = () => {
    if (!groupnameRef.current) return;
    if (!groupnumberRef.current) return;
    if (!groupownerRef.current) return;
    if (!groupownernumberRef.current) return;
    if (!orderRef.current) return;

    const group = {
      id: editItem.id,
      groupname: groupnameRef.current.value ?? "",
      groupnumber: groupnumberRef.current.value ?? "",
      groupowner: groupownerRef.current.value ?? "",
      groupownernumber: groupownernumberRef.current.value ?? "",
      order: orderRef.current.value || null
    }

    const parsed = z
      .object({ id: z.number().int(), groupname: z.string().min(2).max(15), groupnumber: z.string().min(4).max(15), groupowner: z.string().min(2).max(15), groupownernumber: z.string().min(4).max(15), order: z.coerce.number().int().min(0).max(10000).nullable().optional() })
      .safeParse(group);

    if (!parsed.success) {
      groupnameRef.current.value = "";
      groupnumberRef.current.value = "";
      groupownerRef.current.value = "";
      groupownernumberRef.current.value = "";
      orderRef.current.value = "";
      return;
    }

    const temp: Group = {
      ...parsed.data,
      order: parsed.data.order ?? null
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
        <FieldLabel htmlFor="form-name" className="w-15">群名称</FieldLabel>
        <Input
          ref={groupnameRef}
          type="text"
          placeholder="输入QQ群名称"
          required
          defaultValue={editItem.groupname ?? ""}
          minLength={2}
          maxLength={15}
          autoFocus
        />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="form-number" className="w-15">群号</FieldLabel>
        <Input
          ref={groupnumberRef}
          type="text"
          placeholder="输入QQ群号"
          required
          defaultValue={editItem.groupnumber ?? ""}
          minLength={4}
          maxLength={15}
        />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="form-owner" className="w-15">群主</FieldLabel>
        <Input
          ref={groupownerRef}
          type="text"
          placeholder="输入QQ群群主"
          required
          defaultValue={editItem.groupowner ?? ""}
          minLength={2}
          maxLength={15}
        />
      </Field>
      <Field orientation="horizontal">
        <FieldLabel htmlFor="form-ownernumber" className="w-15">群主号</FieldLabel>
        <Input
          ref={groupownernumberRef}
          type="text"
          placeholder="输入QQ群群主号"
          required
          defaultValue={editItem.groupownernumber ?? ""}
          minLength={4}
          maxLength={15}
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
