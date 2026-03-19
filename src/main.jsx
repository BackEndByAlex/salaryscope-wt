import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ApolloProvider } from "@apollo/client/react"
import "./style/globals.css"
import App from "./App.jsx"
import { client } from "./lib/Apollo.js"

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
