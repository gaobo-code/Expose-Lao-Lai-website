'use server';

import 'server-only'
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { groupTable, commentTable, opRecordTable, configTable } from './schema';
import { db } from './drizzle';
import { and, desc, eq, ilike, or, sql, inArray } from 'drizzle-orm';
import { isOpBlocked, getGroup, getComment } from './queries'
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';

type ActionState = {
    error?: string;
    username?: string;
    password?: string;
    secretName?: string;
    secretPass?: string;
    code?: string;
};

async function requireAdminSession() {
    const session = await auth();
    if (!session?.user) {
        return {
            error: "Unauthorized."
        };
    }
    return null;
}

export async function authenticate(
    prevState: ActionState | undefined,
    formData: FormData,
): Promise<ActionState> {

    let blockFlag = await isOpBlocked();
    if (blockFlag) {
        return { error: "Block." };
    }
    await addOpRecord();

    const data = {
        username: formData.get("username"),
        password: formData.get("password"),
        secretName: formData.get("secretName"),
        secretPass: formData.get("secretPass"),
        code: formData.get("code")
    };

    // 防止 File 类型问题
    if (
        typeof data.username !== "string" ||
        typeof data.password !== "string" ||
        typeof data.secretName !== "string" ||
        typeof data.secretPass !== "string" ||
        typeof data.code !== "string"
    ) {
        return { error: "Invalid form data." };
    }

    const parsed = z
        .object({ username: z.string().min(6).max(10), password: z.string().min(6).max(10), secretName: z.string().min(10).max(15), secretPass: z.string().min(10).max(15), code: z.string().length(6) })
        .safeParse(data);

    if (!parsed.success) {
        return {
            error: "Validation failed.",
            username: data.username,
            password: data.password,
            secretName: data.secretName,
            secretPass: data.secretPass,
            code: data.code
        };
    }

    try {
        const result = await signIn("credentials", {
            username: parsed.data.username,
            password: parsed.data.password,
            secretName: parsed.data.secretName,
            secretPass: parsed.data.secretPass,
            code: parsed.data.code,
            redirect: false,
        });

        if (result?.error) {
            return { error: "Invalid credentials." };
        }

    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Auth error." };
        }
        throw error;
    }

    // ✅ redirect 必须在 try 外面
    redirect("/apple");
}

export async function saveGroup(
    prevState: ActionState | undefined,
    formData: FormData,
): Promise<ActionState> {
    const authError = await requireAdminSession();
    if (authError) return authError;

    let blockFlag = await isOpBlocked();
    if (blockFlag) {
        return { error: "Block." };
    }
    await addOpRecord();

    const data = {
        items: formData.get("items"),
        secretName: formData.get("secretName"),
        secretPass: formData.get("secretPass"),
        code: formData.get("code")
    };

    // 防止 File 类型问题
    if (
        typeof data.items !== "string" ||
        typeof data.secretName !== "string" ||
        typeof data.secretPass !== "string" ||
        typeof data.code !== "string"
    ) {
        return { error: "Invalid form data." };
    }

    const parsed = z
        .object({ items: z.string(), secretName: z.string().min(10).max(15), secretPass: z.string().min(10).max(15), code: z.string().length(6) })
        .safeParse(data);

    if (!parsed.success) {
        return {
            error: "Validation failed.",
            secretName: data.secretName,
            secretPass: data.secretPass,
            code: data.code
        };
    }

    let res;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        res = await fetch('http://localhost:9766/football', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coca: parsed.data.secretName,
                sugar: parsed.data.secretPass
            }),
            signal: controller.signal,
            cache: 'no-store',
        });
    } catch (e) {
        // 网络错误（服务没开 / 连接失败）
        return { error: "Network error." };
    } finally {
        clearTimeout(timeout);
    }

    // ✅ 先检查 HTTP 状态
    if (!res.ok) {
        return { error: `HTTP error: ${res.status}` };
    }

    // ✅ 再安全解析 JSON
    let resdata;
    try {
        resdata = await res.json();
    } catch {
        return { error: "Invalid JSON response." };
    }

    // ✅ 业务校验
    if (resdata.code !== 200) {
        return { error: "API error." };
    }

    if (resdata.message !== parsed.data.code) {
        return { error: "Code mismatch." };
    }

    let parsedItems;

    try {
        parsedItems = JSON.parse(parsed.data.items);
    } catch {
        return { error: "Invalid JSON." };
    }

    const groupSchema = z.object({
        id: z.number().int(),
        groupname: z.string().min(2).max(15),
        groupnumber: z.string().min(4).max(15),
        groupowner: z.string().min(2).max(15),
        groupownernumber: z.string().min(4).max(15),
        order: z.number().int().min(0).max(10000).nullable().optional()
    });

    const dataSchema = z.array(groupSchema);

    const itemsParsed = dataSchema.safeParse(parsedItems);

    if (!itemsParsed.success) {
        return {
            error: "Items validation failed."
        };
    }

    const groupArr = itemsParsed.data;
    if (groupArr.length > 5) {
        return {
            error: "Length exceed."
        };
    }

    const originArr = await getGroup();

    const negativeGroupArr = groupArr.filter(item => item.id < 0);
    const negativeGroupArrRemoveId = negativeGroupArr.map(({ id, ...rest }) => rest);

    const positiveGroupArr = groupArr.filter(item => item.id > 0);

    const ids2 = new Set(positiveGroupArr.map(item => item.id));

    const diffIds = originArr
        .map(item => item.id)
        .filter(id => !ids2.has(id));

    await db.transaction(async (tx) => {
        if (diffIds.length > 0) {
            await tx.delete(groupTable)
                .where(inArray(groupTable.id, diffIds));
        }

        if (negativeGroupArrRemoveId.length > 0) {
            await tx.insert(groupTable).values(negativeGroupArrRemoveId);
        }

        if (positiveGroupArr.length > 0) {
            for (const item of positiveGroupArr) {
                await tx
                    .update(groupTable)
                    .set({
                        groupname: item.groupname,
                        groupnumber: item.groupnumber,
                        groupowner: item.groupowner,
                        groupownernumber: item.groupownernumber,
                        order: item.order
                    })
                    .where(eq(groupTable.id, item.id));
            }
        }
    });

    redirect("/apple");
}

export async function saveComment(
    prevState: ActionState | undefined,
    formData: FormData,
): Promise<ActionState> {
    const authError = await requireAdminSession();
    if (authError) return authError;

    let blockFlag = await isOpBlocked();
    if (blockFlag) {
        return { error: "Block." };
    }
    await addOpRecord();

    const data = {
        items: formData.get("items"),
        secretName: formData.get("secretName"),
        secretPass: formData.get("secretPass"),
        code: formData.get("code")
    };

    // 防止 File 类型问题
    if (
        typeof data.items !== "string" ||
        typeof data.secretName !== "string" ||
        typeof data.secretPass !== "string" ||
        typeof data.code !== "string"
    ) {
        return { error: "Invalid form data." };
    }

    const parsed = z
        .object({ items: z.string(), secretName: z.string().min(10).max(15), secretPass: z.string().min(10).max(15), code: z.string().length(6) })
        .safeParse(data);

    if (!parsed.success) {
        return {
            error: "Validation failed.",
            secretName: data.secretName,
            secretPass: data.secretPass,
            code: data.code
        };
    }

    let res;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        res = await fetch('http://localhost:9766/football', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coca: parsed.data.secretName,
                sugar: parsed.data.secretPass
            }),
            signal: controller.signal,
            cache: 'no-store',
        });
    } catch (e) {
        // 网络错误（服务没开 / 连接失败）
        return { error: "Network error." };
    } finally {
        clearTimeout(timeout);
    }

    // ✅ 先检查 HTTP 状态
    if (!res.ok) {
        return { error: `HTTP error: ${res.status}` };
    }

    // ✅ 再安全解析 JSON
    let resdata;
    try {
        resdata = await res.json();
    } catch {
        return { error: "Invalid JSON response." };
    }

    // ✅ 业务校验
    if (resdata.code !== 200) {
        return { error: "API error." };
    }

    if (resdata.message !== parsed.data.code) {
        return { error: "Code mismatch." };
    }

    let parsedItems;

    try {
        parsedItems = JSON.parse(parsed.data.items);
    } catch {
        return { error: "Invalid JSON." };
    }

    const commentSchema = z.object({
        id: z.number().int(),
        content: z.string().min(4).max(300),
        reply: z.string().min(4).max(300).nullable().optional(),
        order: z.number().int().min(0).max(10000).nullable().optional()
    });

    const dataSchema = z.array(commentSchema);

    const itemsParsed = dataSchema.safeParse(parsedItems);

    if (!itemsParsed.success) {
        return {
            error: "Items validation failed."
        };
    }

    const commentArr = itemsParsed.data;
    if (commentArr.length > 300) {
        return {
            error: "Length exceed."
        };
    }

    const originArr = await getComment();

    const negativeCommentArr = commentArr.filter(item => item.id < 0);
    const negativeCommentArrRemoveId = negativeCommentArr.map(({ id, ...rest }) => rest);

    const positiveCommentArr = commentArr.filter(item => item.id > 0);

    const ids2 = new Set(positiveCommentArr.map(item => item.id));

    const diffIds = originArr
        .map(item => item.id)
        .filter(id => !ids2.has(id));

    await db.transaction(async (tx) => {
        if (diffIds.length > 0) {
            await tx.delete(commentTable)
                .where(inArray(commentTable.id, diffIds));
        }

        if (negativeCommentArrRemoveId.length > 0) {
            await tx.insert(commentTable).values(negativeCommentArrRemoveId);
        }

        if (positiveCommentArr.length > 0) {
            for (const item of positiveCommentArr) {
                await tx
                    .update(commentTable)
                    .set({
                        content: item.content,
                        reply: item.reply,
                        order: item.order
                    })
                    .where(eq(commentTable.id, item.id));
            }
        }
    });

    redirect("/apple/comment");
}

export async function saveConfig(
    prevState: ActionState | undefined,
    formData: FormData,
): Promise<ActionState> {
    const authError = await requireAdminSession();
    if (authError) return authError;

    let blockFlag = await isOpBlocked();
    if (blockFlag) {
        return { error: "Block." };
    }
    await addOpRecord();

    const data = {
        items: formData.get("items"),
        secretName: formData.get("secretName"),
        secretPass: formData.get("secretPass"),
        code: formData.get("code")
    };

    // 防止 File 类型问题
    if (
        typeof data.items !== "string" ||
        typeof data.secretName !== "string" ||
        typeof data.secretPass !== "string" ||
        typeof data.code !== "string"
    ) {
        return { error: "Invalid form data." };
    }

    const parsed = z
        .object({ items: z.string(), secretName: z.string().min(10).max(15), secretPass: z.string().min(10).max(15), code: z.string().length(6) })
        .safeParse(data);

    if (!parsed.success) {
        return {
            error: "Validation failed.",
            secretName: data.secretName,
            secretPass: data.secretPass,
            code: data.code
        };
    }

    let res;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        res = await fetch('http://localhost:9766/football', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coca: parsed.data.secretName,
                sugar: parsed.data.secretPass
            }),
            signal: controller.signal,
            cache: 'no-store',
        });
    } catch (e) {
        // 网络错误（服务没开 / 连接失败）
        return { error: "Network error." };
    } finally {
        clearTimeout(timeout);
    }

    // ✅ 先检查 HTTP 状态
    if (!res.ok) {
        return { error: `HTTP error: ${res.status}` };
    }

    // ✅ 再安全解析 JSON
    let resdata;
    try {
        resdata = await res.json();
    } catch {
        return { error: "Invalid JSON response." };
    }

    // ✅ 业务校验
    if (resdata.code !== 200) {
        return { error: "API error." };
    }

    if (resdata.message !== parsed.data.code) {
        return { error: "Code mismatch." };
    }

    let parsedItems;

    try {
        parsedItems = JSON.parse(parsed.data.items);
    } catch {
        return { error: "Invalid JSON." };
    }

    const configSchema = z.object({
        id: z.number().int(),
        attr: z.string().min(1).max(20),
        value: z.string().min(1).max(20)
    });

    const dataSchema = z.array(configSchema);

    const itemsParsed = dataSchema.safeParse(parsedItems);

    if (!itemsParsed.success) {
        return {
            error: "Items validation failed."
        };
    }

    const configArr = itemsParsed.data;
    if (configArr.length > 20) {
        return {
            error: "Length exceed."
        };
    }

    await db.transaction(async (tx) => {
        await tx.delete(configTable)

        if (configArr.length > 0) {
            await tx.insert(configTable).values(configArr);
        }
    });

    redirect("/apple/config");
}

export async function addOpRecord() {
    await db.insert(opRecordTable).values({
        createdat: new Date()
    });
}
