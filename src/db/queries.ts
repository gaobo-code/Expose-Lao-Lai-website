'use server';

import 'server-only'
import { and, desc, eq, ilike, or, sql, gt } from 'drizzle-orm';
import { db } from './drizzle';
import { groupTable, commentTable, configTable, opRecordTable } from './schema';

const TIME_MIN = 2 * 60 * 60 * 1000;
const OP_MAX = 10;

export async function getGroup() {
    const rows = await db
        .select()
        .from(groupTable)
        .orderBy(
            desc(groupTable.order)        
        );

    return rows;
}

export async function getComment() {
    const rows = await db
        .select()
        .from(commentTable)
        .orderBy(
            desc(commentTable.order)        
        );

    return rows;
}

export async function getConfig() {
    const rows = await db
        .select()
        .from(configTable)
        
    return rows;
}

export async function isOpBlocked() {
  const TimeAgo = Date.now() - TIME_MIN;

  const failedAttempts = await db
    .select()
    .from(opRecordTable)
    .where(gt(opRecordTable.createdat, new Date(TimeAgo)));

  return failedAttempts.length >= OP_MAX;
}

