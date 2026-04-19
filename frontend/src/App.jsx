import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

//  Components
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import CompanyProfile from './components/CompanyProfile'
import SavedJobs from './components/SavedJobs'

// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

// UI
import { Toaster } from 'sonner'


// ================= LAYOUT =================
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


// ================= ROUTER =================
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/browse', element: <Browse /> },
      { path: '/profile', element: <Profile /> },
      { path: '/description/:id', element: <JobDescription /> },
      { path: '/company/:id', element: <CompanyProfile /> },
      { path: '/saved', element: <SavedJobs /> },

      // ADMIN
      {
        path: "/admin/companies",
        element: <ProtectedRoute><Companies/></ProtectedRoute>
      },
      {
        path: "/admin/companies/create",
        element: <ProtectedRoute><CompanyCreate/></ProtectedRoute>
      },
      {
        path: "/admin/companies/:id",
        element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
      },
      {
        path: "/admin/jobs",
        element: <ProtectedRoute><AdminJobs/></ProtectedRoute>
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoute><PostJob/></ProtectedRoute>
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: <ProtectedRoute><Applicants/></ProtectedRoute>
      },
    ]
  }
])


// ================= APP =================
function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9CA3AF]"></div>
          </div>
        } 
        persistor={persistor}
      >
        <div className="min-h-screen bg-gray-50">
          <RouterProvider router={appRouter} />
          <Toaster />
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App