import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";

import prisma from "../prisma";

const authAccount = async (data: { email: string; password: string }): Promise<User> => {
	if (!data.email || !data.password) throw new Error("Invalid data");

	const user = await prisma.user.findUnique({ where: { email: data.email } });
	if (!user) throw new Error("User not found");

	const userPassword = await bcrypt.compare(data.password, user.password);
	if (!userPassword) throw new Error("Invalid password");

	return user!;
};

export default authAccount;
