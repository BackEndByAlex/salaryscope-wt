import { createContext, useContext, useEffect, useState } from "react"
import { useApolloClient, useQuery } from "@apollo/client/react"
import { ME_QUERY } from "../../graphql/queries/auth.js"
import { LOGOUT_MUTATION } from "../../graphql/mutation/auth.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState("unknown")
  const apolloClient = useApolloClient()

  const { data, loading, error } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    if (loading) return

    if (data?.me) {
      setUser(data.me)
      setStatus("authenticated")
      return
    }

    if (error) {
      const isUnauthenticated = error.graphQLErrors?.some(
        (e) => e.extensions?.code === "UNAUTHENTICATED",
      )
      if (isUnauthenticated) {
        setUser(null)
        setStatus("unauthenticated")
        return
      }
      // Transient/network error: resolve status so the app isn't stuck on a
      // blank screen, but don't clobber an already-established session.
      setStatus((prev) => (prev === "authenticated" ? prev : "unauthenticated"))
      return
    }

    // Successful response with `me: null` — server explicitly says no session.
    setUser(null)
    setStatus("unauthenticated")
  }, [data, loading, error])

  async function completeAuth(nextUser) {
    setUser(nextUser)
    setStatus("authenticated")
    await apolloClient.refetchQueries({ include: ["Me"] })
  }

  function clearAuth() {
    setUser(null)
    setStatus("unauthenticated")
  }

  async function logout() {
    await apolloClient.mutate({ mutation: LOGOUT_MUTATION })
    await apolloClient.clearStore()
    clearAuth()
  }

  return (
    <AuthContext.Provider value={{ user, completeAuth, clearAuth, logout, status }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
