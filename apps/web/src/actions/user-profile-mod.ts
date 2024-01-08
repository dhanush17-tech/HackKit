"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { db } from "db";
import { users, profileData } from "db/schema";
import { eq } from "db/drizzle";
import { put } from "@vercel/blob";
import { clerkClient } from "@clerk/nextjs";

// TODO: Add skill updating
export const modifyUserBioAndSkills = authenticatedAction(
	z.object({ bio: z.string().max(500), skills: z.string().max(100) }),
	async ({ bio, skills }, { userId }) => {
		const user = await db.query.users.findFirst({ where: eq(users.clerkID, userId) });
		if (!user) throw new Error("User not found");
		await db.update(profileData).set({ bio }).where(eq(profileData.hackerTag, user.hackerTag));
		return { success: true, newbio: bio };
	}
);

export const updateProfileImage = authenticatedAction(
	z.object({ image: z.instanceof(File) }),
	async ({ image }, { userId }) => {
		const user = await db.query.users.findFirst({ where: eq(users.clerkID, userId) });
		if (!user) throw new Error("User not found");

		const blobUpload = await put(image.name, image, { access: "public" });

		await db
			.update(profileData)
			.set({ profilePhoto: blobUpload.url })
			.where(eq(profileData.hackerTag, user.hackerTag));
		return { success: true, newImage: image };
	}
);
