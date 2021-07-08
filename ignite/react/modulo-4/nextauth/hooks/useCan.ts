import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams): Boolean {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  return validateUserPermissions({ user, permissions, roles })

}