import { model, models, Schema } from "mongoose";
import { IUser } from "../../types/user.interface";

export const userSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
			minLength: [2, "First name must be at least 2 characters"],
			maxLength: [30, "First name must be less than or equal to 30 characters"],
		},

		lastName: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
			minLength: [2, "Last name must be at least 2 characters"],
			maxLength: [30, "Last name must be less than or equal to 30 characters"],
		},

		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
		},

		password: {
			type: String,
			// required: [true, "Password is required"],
			select: false,
			minlength: [8, "Password must be more than or equal to 8 characters"],
		},

		gender: {
			type: String,
			enum: {
				values: ["male", "female"],
				message:
					"{VALUE} is not supported. Only 'male' and 'female' are supported.",
			},
		},
		contactNumber: {
			type: String,
			trim: true,
			required: [true, "Contact number is required"],
		},
		profileImg: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

const User = models?.User || model<IUser>("User", userSchema);
export default User;
