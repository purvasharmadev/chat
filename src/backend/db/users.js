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
    _id: uuid(),
    firstName: "Elon",
    lastName: "Musk",
    username: "elonmusk",
    password: "admin",
    bio:"real life iron man",
    dp:"https://i.pinimg.com/originals/9d/14/00/9d1400eca895ff1cc1a1436642060af1.jpg",
    url:"https://purvasharma.netlify.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Kim",
    lastName: "Namjoon",
    username: "kimnamjoon",
    password: "admin",
    bio:"just namjooning",
    dp:"https://i.pinimg.com/564x/b3/76/76/b376764e2c0553f50c7281bbcbd799c2.jpg",
    url:"https://purvasharma.netlify.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Jeon",
    lastName: "Jungkook",
    username: "itsJk",
    password: "admin",
    bio:"still with you",
    dp:"https://i.pinimg.com/736x/08/f4/40/08f4408fe09028b53eca2de596d04afc.jpg",
    url:"https://purvasharma.netlify.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Kim",
    lastName: "Taehyung",
    username: "btsv",
    password: "admin",
    bio:"winter bear",
    dp:"https://i.pinimg.com/736x/77/a1/7d/77a17d3be91c398de470dd4b13d6e930.jpg",
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
