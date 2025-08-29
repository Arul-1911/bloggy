const listofAdmins = [
  "test@gmail.com",
  "admin@gmail.com",
  "learningsformyself123@gmail.com",
];

export default async function isAdmin(session) {
  if (!session) return false;
  let user = session.user.email.toLowerCase().trim();
  console.log(user, "user email");

  // let emailMatch = listofAdmins.some((email) =>
  //   email.toLowerCase().trim().includes(session.user.email.toLowerCase().trim())
  // );

  let emailMatch = listofAdmins.includes(user);

  // console.log(session?.user?.email);

  return session.user.role === "admin" || emailMatch;
}
