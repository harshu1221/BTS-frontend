const users = [
  {
    _id: "u1",
    username: "johndoe",
    email: "johndoe@example.com",
    password: "hashedpassword123",
    profilePicture: "https://ui-avatars.com/api/?name=First+User&background=2b7fff&color=fff&format=svg",
    bio: "Tech enthusiast and coffee lover.",
    savedBlogs: ["b2"],
    likedBlogs: ["b1", "b3"],
  },
  {
    _id: "u2",
    username: "janedoe",
    email: "janedoe@example.com",
    password: "hashedpassword456",
    profilePicture: "https://ui-avatars.com/api/?name=Second+User&background=2b7fff&color=fff&format=svg",
    bio: "Travel blogger and foodie.",
    savedBlogs: ["b1"],
    likedBlogs: ["b2"],
  },
];

export default users;