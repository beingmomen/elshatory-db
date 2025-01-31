export const useGetUserData = () => {
  const config = useRuntimeConfig();
  const images = config.public.images;
  const { data } = useAuth();
  const user = { ...data.value.data.data };

  if (images.isImageLocal) {
    user.photo = `${images.imageLocalPath}${user.photo}`;
  }

  return {
    data: user,
  };
};
