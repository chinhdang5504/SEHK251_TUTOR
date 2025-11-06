import { useEffect, useState } from "react";
import userApi from "@/api/userApi";
import { mockUser } from "@/mocks/user.mock";

export const useUserProfile = (useApi = false) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (useApi) {
          const res = await userApi.getProfile();
          setUser(res.data);
        } else {
          setUser(mockUser);
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        setUser(mockUser);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [useApi]);

  return { user, loading, setUser };
};
