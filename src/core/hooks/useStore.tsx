import { createStore, StoreContext, useStore as useZustandStore } from '../store/store'
import { useContext } from 'react'

export const useStore = () => {
  const api = useContext(StoreContext)
  return useZustandStore(api)
}

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = createStore()
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
