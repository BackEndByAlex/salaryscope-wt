import { createContext, useContext, useState, useEffect } from "react"
import { useApolloClient, useQuery } from "@apollo/client/react"
import { ME_QUERY } from "../../graphql/queries/auth.js"
import { LOGOUT_MUTATION } from "../../graphql/mutation/auth.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)
  const apolloClient = useApolloClient()

  const { data, loading } = useQuery(ME_QUERY, {
    errorPolicy: "ignore",
  })

  useEffect(() => {
    if (!loading) setUser(data?.me ?? null)
  }, [data, loading])

  async function logout() {
    await apolloClient.mutate({ mutation: LOGOUT_MUTATION })
    await apolloClient.clearStore()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading: user === undefined }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
