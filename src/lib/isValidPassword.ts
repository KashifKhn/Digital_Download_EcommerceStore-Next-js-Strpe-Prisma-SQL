export const isValidPassword = async (
  password: string,
  hashedPassword: string
) => {
  return (await hashPassword(password)) === hashedPassword;
};

const hashPassword = async (password: string) => {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
};
