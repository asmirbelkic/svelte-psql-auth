import type { User } from '@prisma/client';

import type { getUser } from '$lib/server/services/user';
import type formatUserForFrontend from '$lib/utils/formatUserForFrontend';

/* User types */
export type UserForUpdate = Partial<User> & { id: string };

export type UserData = NonNullable<Awaited<ReturnType<typeof getUser>>['data']>;

export type UserDataSafe = ReturnType<typeof formatUserForFrontend>;

/* Form errors */
export type FormErrors = Record<string, string[] | undefined> | null | undefined;