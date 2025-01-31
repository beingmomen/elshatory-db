import { useGetUserData } from "../useGetUserData";

export const useProfile = () => {
  const { signOut } = useAuth();
  const { data, refreshUserData } = useGetUserData();
  const { patch, loading } = useApiRequest();

  const saveProfileChanges = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.photo) {
      formData.append("photo", data.photo);
    }
    await patch("/users/updateMe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Refresh user data after successful update
    refreshUserData();
  };

  const savePasswordChanges = async (data) => {
    await patch("/users/updateMyPassword", data);
    signOut();
  };

  return {
    data,
    loading,
    saveProfileChanges,
    savePasswordChanges,
  };
};
