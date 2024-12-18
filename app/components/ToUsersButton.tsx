import { useNavigate, useNavigation } from "react-router";

export const ToUsersButton = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isNavigatingUsers = navigation.location?.pathname === "/users";

  return (
    <button onClick={() => navigate("/users")}>
      {isNavigatingUsers ? "Loading..." : "to Users"}
    </button>
  );
};
