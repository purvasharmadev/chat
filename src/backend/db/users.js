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
    dp:"https://i.pinimg.com/236x/38/e1/45/38e145f84aa724ae78e92f11932f55d1.jpg",
    url:"https://purvasharma.netlify.app/",
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
    dp:"https://i.pinimg.com/550x/3a/24/7a/3a247a1cf0d07c518be83dd64b99bccf.jpg",
    url:"https://purvasharma.netlify.app/",
  }
];
