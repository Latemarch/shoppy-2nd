import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { IValue, useAuthContext } from "../context/AuthContextProvider";

export default function ProtectedRoute({
	children,
	adminRequired,
}: {
	children: ReactNode;
	adminRequired: boolean | null;
}) {
	const { user } = useAuthContext() as IValue;
	if (!user || (adminRequired && !user.isAdmin)) {
		return <Navigate to="/" replace />;
	}
	return <>{children}</>;
}
