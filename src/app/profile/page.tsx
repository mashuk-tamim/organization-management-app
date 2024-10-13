"use client";

import { useUser } from "@/provider/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import { IUser } from "@/types/user.interface";


export default function ProfilePage() {
	const { user, loading } = useUser();

	if (loading) {
		return <ProfileSkeleton />;
	}

	if (!user) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				User not found
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 min-h-screen">
			<Card className="max-w-md mx-auto">
				<CardHeader className="flex flex-col items-center gap-4">
					<UserAvatar user={user} />
					<UserInfo user={user} />
				</CardHeader>
				<CardContent className="space-y-4">
					<UserDetails user={user} />
					<Button className="w-full mt-4" variant="outline">
						Edit Profile
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

function UserAvatar({ user }: { user: IUser }) {
	return (
		<Avatar className="w-24 h-24">
			{user.profileImg ? (
				<AvatarImage
					src={user.profileImg}
					alt={`${user.firstName} ${user.lastName}`}
				/>
			) : (
				<AvatarFallback>
					<User className="w-12 h-12" />
				</AvatarFallback>
			)}
		</Avatar>
	);
}

function UserInfo({ user }: { user: IUser }) {
	return (
		<div className="text-center">
			<CardTitle className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</CardTitle>
			<p className="text-muted-foreground">{user.email}</p>
		</div>
	);
}

function UserDetails({ user }: { user: IUser }) {
	return (
		<>
			<div className="flex justify-between">
				<span className="font-medium">Gender:</span>
				<span className="text-muted-foreground capitalize">{user.gender}</span>
			</div>
			<div className="flex justify-between">
				<span className="font-medium">Contact:</span>
				<span className="text-muted-foreground">{user.contactNumber}</span>
			</div>
		</>
	);
}

function ProfileSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8 min-h-screen">
			<Card className="max-w-md mx-auto">
				<CardHeader className="flex flex-col items-center gap-4">
					<Skeleton className="w-24 h-24 rounded-full" />
					<div className="space-y-2 w-full">
						<Skeleton className="h-6 w-3/4 mx-auto" />
						<Skeleton className="h-4 w-1/2 mx-auto" />
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-between">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-4 w-1/4" />
					</div>
					<div className="flex justify-between">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-4 w-1/4" />
					</div>
					<Skeleton className="h-10 w-full mt-4" />
				</CardContent>
			</Card>
		</div>
	);
}
