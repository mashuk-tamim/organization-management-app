import { model, models , Schema } from "mongoose";
import { IUser } from "./user.interface";

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
			default: "https://i.ibb.co.com/pJ8HzFy/60111.jpg",
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

const User = models.User || model<IUser>("User", userSchema);
export default User;
/**
 */

// // virtual
// userSchema.virtual("fullName").get(function () {
// 	return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
// });

// // instance method
// // userSchema.methods.isUserExists = async function (id: string) {
// //   const existingUser = await User.findOne({ id });

// //   return existingUser;
// // };

// // pre save middleware/ hook
// userSchema.pre("save", async function (next) {
// 	// console.log(this, "Pre: We will save our data");
// 	// eslint-disable-next-line @typescript-eslint/no-this-alias
// 	const user = this;
// 	user.password = await bcrypt.hash(
// 		user.password,
// 		Number(process.env.BCRYPT_SALT_ROUND)
// 	);
// 	next();
// });

// // post save middleware/ hook
// userSchema.post("save", function (doc, next) {
// 	// console.log(this, "We saved our data");
// 	doc.password = "";
// 	next();
// });

// // query middleware
// userSchema.pre("find", async function (next) {
// 	this.find({ isDeleted: { $ne: true } });
// 	next();
// });

// userSchema.pre("findOne", async function (next) {
// 	this.find({ isDeleted: { $ne: true } });
// 	next();
// });

// userSchema.pre("aggregate", function (next) {
// 	this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
// 	next();
// });

// // static method
// userSchema.statics.isUserExists = async function (id: string) {
// 	const existingUser = await User.findOne({ id });

// 	return existingUser;
// };
