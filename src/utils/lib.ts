export const imageUrl = (id: number) => {
  return process.env.NEXT_PUBLIC_BACKEND_URL + "/pictures/" + id;
};
