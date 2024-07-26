export const isValidPassword = async (
  password: string,
  adminPassword: string
) => {
  return (await hashPassword(password)) === (await hashPassword(adminPassword));
};

const hashPassword = async (password: string) => {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
};
