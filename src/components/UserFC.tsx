import { User } from "firebase/auth";
import React from "react";

export default function UserFC({ user }: { user: User }) {
	return (
		<div className="flex items-center shrink-0">
			<img
				className="w-8 h-8 rounded-full"
				src={user.photoURL ?? undefined}
				alt={user.displayName ?? undefined}
			/>
			<span className="hidden md:block ml-1">{user.displayName}</span>
		</div>
	);
}
