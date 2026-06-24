'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useActionState } from 'react';
import { saveGroup } from '@/db/actions';
import { Group } from '@/db/schema';

type Props = {
  groups: Group[];
};

export function GroupSubmitForm({ groups }: Props) {

  const [state, formAction, isPending] = useActionState(
    saveGroup,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-8 w-full" autoComplete="off">
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(groups)}
      />

      <div className="space-y-3">
        <Label htmlFor="password">密钥名称</Label>
        <div className="flex items-center">
          <div className="relative flex-1">
            <Input type="password" id="secretName" name="secretName" defaultValue={state?.secretName} placeholder="输入密钥名称" required minLength={10} maxLength={15} autoComplete="new-password" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="password">密钥密码</Label>
        <div className="flex items-center">
          <div className="relative flex-1">
            <Input type="password" id="secretPass" name="secretPass" defaultValue={state?.secretPass} placeholder="输入密钥密码" required minLength={10} maxLength={15} autoComplete="new-password" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="password">验证码</Label>
        <div className="flex items-center">
          <div className="relative flex-1">
            <Input type="password" id="code" name="code" defaultValue={state?.code} placeholder="输入验证码" required minLength={6} maxLength={6} autoComplete="new-password" />
          </div>
        </div>
      </div>

      {state?.error && (
        <div className="text-sm text-red-500">{state?.error}</div>
      )}

      <Button type="submit" className="w-full tracking-wider cursor-pointer" disabled={isPending}>
        <span>提&nbsp;&nbsp;交</span>
      </Button>
    </form>
  );
}
