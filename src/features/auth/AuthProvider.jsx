import { createContext, useContext, useState, useEffect } from "react"
import { useApolloClient, useQuery } from "@apollo/client/react"
import { useLocation } from "react-router"
import { ME_QUERY } from "../../graphql/queries/auth.js"
import { LOGOUT_MUTATION } from "../../graphql/mutation/auth.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const apolloClient = useApolloClient()
  const location = useLocation()

  const shouldCheckSession =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/profile"

  const { data, loading } = useQuery(ME_QUERY, {
    skip: !shouldCheckSession,
    errorPolicy: "ignore",
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    if (!shouldCheckSession || loading) return
    setUser(data?.me ?? null)
  }, [data, loading, shouldCheckSession])

  async function logout() {
    await apolloClient.mutate({ mutation: LOGOUT_MUTATION })
    await apolloClient.clearStore()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading: shouldCheckSession && loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
