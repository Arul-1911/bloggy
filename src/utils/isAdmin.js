const listofAdmins = [
  "test@gmail.com",
  "admin@gmail.com",
  "learningsformyself123@gmail.com",
];

export default async function isAdmin(session) {
  if (!session) return false;

  let emailMatch = listofAdmins.map((email) =>
    email.toLowerCase().trim().includes(session.user.email.toLowerCase().trim())
  );

  if (session.user.role === "admin" || (session?.user?.email && emailMatch)) {
    return true;
  }
  return false;
}
