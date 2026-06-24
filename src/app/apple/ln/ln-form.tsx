'use client';

import { useActionState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authenticate } from '@/db/actions';
import { useSearchParams } from 'next/navigation';

export function LnForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || `/apple`;
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  if (isPending) {
    return (
      <div className="h-116.5 flex flex-col items-center justify-center gap-6">

        {/* Spinner */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-slate-600 dark:text-slate-100 border-t-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <p className="text-slate-600 dark:text-slate-100 text-sm tracking-widest animate-pulse">
          LOADING
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" autoComplete="off">
      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <div className="space-y-3">
        <Label htmlFor="username">用户名</Label>
        <div className="flex items-center">
          <div className="relative flex-1">
            <Input type="password" id="username" name="username" defaultValue={state?.username} placeholder="输入用户名" required minLength={6} maxLength={10} autoComplete="new-password" autoFocus />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="password">密码</Label>
        <div className="flex items-center">
          <div className="relative flex-1">
            <Input type="password" id="password" name="password" defaultValue={state?.password} placeholder="输入密码" required minLength={6} maxLength={10} autoComplete="new-password" />
          </div>
        </div>
      </div>

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
        <span>登&nbsp;&nbsp;录</span>
      </Button>
    </form>
  );
}
