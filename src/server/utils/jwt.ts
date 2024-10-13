import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

export async function signJWT(userId: string) {
	return new SignJWT({userId})
		.setProtectedHeader({ alg })
		.setSubject(userId)
		.setExpirationTime("720h")
		.sign(secret);
}

export async function verifyJWT(token: string) {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload;
	} catch (error:any) {
    console.log(error);
		return null;
	}
}
