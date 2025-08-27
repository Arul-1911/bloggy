const listofAdmins = [
  "test@gmail.com",
  "admin@gmail.com",
  "learningsformyself123@gmail.com",
];

export default async function isAdmin(session) {
  if (!session) return false;

  let emailMatch = listofAdmins.some((email) =>
    email.toLowerCase().trim().includes(session.user.email.toLowerCase().trim())
  );

  console.log(session?.user?.email);

  if (
    session.user.role === "admin" ||
    (Boolean(session?.user?.email) && emailMatch)
  ) {
    return true;
  }
  return false;
}
