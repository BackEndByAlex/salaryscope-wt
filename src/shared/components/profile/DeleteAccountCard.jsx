import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { useApolloClient } from "@apollo/client/react"
import { useNavigate } from "react-router"
import { DELETE_ACCOUNT_MUTATION } from "../../../graphql/mutation/auth.js"
import { useAuth } from "../../../features/auth/useAuth.js"

export default function DeleteAccountCard() {
  const [confirming, setConfirming] = useState(false)
  const [deleteAccount, { loading }] = useMutation(DELETE_ACCOUNT_MUTATION)
  const apolloClient = useApolloClient()
  const { setUser } = useAuth()
  const navigate = useNavigate()

  async function handleDelete() {
    await deleteAccount()
    await apolloClient.clearStore()
    setUser(null)
    navigate("/")
  }

  return (
    <div className="bg-surface-container p-6 space-y-5">
      <p className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">
        Danger Zone
      </p>

      <div className="border border-error/30 rounded-sm p-4 space-y-3">
        <p className="text-sm text-on-surface">
          Permanently delete your account. This cannot be undone.
        </p>
        <p className="text-xs text-on-surface-variant">
          Your salary records will remain in the dataset but will no longer be linked to your account.
        </p>

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="text-sm text-error border border-error/40 px-4 py-2 rounded-sm hover:bg-error/10 transition-colors"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-error">
              Are you sure? This action is permanent.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-sm bg-error text-on-error px-4 py-2 rounded-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? "Deleting…" : "Yes, delete my account"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={loading}
                className="text-sm text-on-surface-variant border border-outline-variant/30 px-4 py-2 rounded-sm hover:bg-surface-container-highest transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
