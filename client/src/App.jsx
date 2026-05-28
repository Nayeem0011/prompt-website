import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import MyPromptsPage from './pages/myPrompts/MyPromptsPage';
import Login from './pages/login/Login';
import SignUp from './pages/register/SignUp';
import ProfilePage from './pages/profile/ProfilePage';
import Saved from './pages/saved/Saved';
import Earnings from './pages/earnings/Earnings';
import SellPromptPage from './pages/sellPrompt/SellPromptPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/featured" element={<Home />} />
          <Route path="/newest" element={<Home />} />
          <Route path="/popular" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-prompts" element={<MyPromptsPage />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sell-prompt" element={<SellPromptPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

