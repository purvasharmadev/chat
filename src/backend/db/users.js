import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio:"the most adarsh girl",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id:uuid(),
    firstName:"Guest",
    lastName:"User",
    username:"guest",
    password:"guest",
    bio:"i m just the guest",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  }
];
