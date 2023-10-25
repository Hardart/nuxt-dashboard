import { provideApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin(nuxtApp => {
  const { clients } = useApollo()
  const apolloClient = clients?.default
  if (!apolloClient) return
  provideApolloClient(apolloClient)
})
