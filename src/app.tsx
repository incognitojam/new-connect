import { Component, lazy, Suspense } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from '@kobalte/core'

const Login = lazy(() => import('./pages/auth/login'))
const Logout = lazy(() => import('./pages/auth/logout'))
const Auth = lazy(() => import('./pages/auth/auth'))
const Dashboard = lazy(() => import('./pages/dashboard'))

const App: Component = () => {
  const storageManager = createLocalStorageManager('vite-ui-theme')
  return (
    <Router
      root={(props) => (
        <>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            <Suspense>{props.children}</Suspense>
          </ColorModeProvider>
        </>
      )}
    >
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" component={Auth} />

      <Route path="/*dongleId" component={Dashboard} />
    </Router>
  )
}

export default App
