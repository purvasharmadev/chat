import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    dp:"https://i.pinimg.com/236x/38/e1/45/38e145f84aa724ae78e92f11932f55d1.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentData: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentData: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "This is second post",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentData: "Nice post!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentData: "Informative",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },

    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "This is second post",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentData: "Nice post!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentData: "Informative",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },

    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "No one is born ugly, problem is that we live in a judgemental society",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kimnamjoon",
    dp:"https://i.pinimg.com/564x/b3/76/76/b376764e2c0553f50c7281bbcbd799c2.jpg",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentData: "Nice post!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentData: "Informative",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },

    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "It is possible for ordinary people to choose to be extra ordinary",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "elonmusk",
    dp:"https://i.pinimg.com/originals/9d/14/00/9d1400eca895ff1cc1a1436642060af1.jpg",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentData: "Nice post!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentData: "Informative",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },

    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Don't be trapped in someone else dream",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "btsv",
    dp:"https://i.pinimg.com/736x/77/a1/7d/77a17d3be91c398de470dd4b13d6e930.jpg",
    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentData: "Nice post!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentData: "Informative",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },

    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Regrets...revisiting what you didn't do well, it won't help you.The past is past.Let's try to be a big person with big heart",
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    username: "itsJk",
    dp:"https://i.pinimg.com/736x/08/f4/40/08f4408fe09028b53eca2de596d04afc.jpg",

    comments: [
      {
        _id: uuid(),
        username: "shubhamsoni",
        commentData: "Nice post!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "sohamshah",
        commentData: "Informative",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },

    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
