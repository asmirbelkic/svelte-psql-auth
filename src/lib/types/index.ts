import type { User } from '@prisma/client';

import type { getUser } from '$lib/server/services/user';

/* User types */
export type UserForUpdate = Partial<User> & { id: string };

export type UserData = NonNullable<Awaited<ReturnType<typeof getUser>>['data']>;

/* Form errors */
export type FormErrors = Record<string, string[] | undefined> | null | undefined;