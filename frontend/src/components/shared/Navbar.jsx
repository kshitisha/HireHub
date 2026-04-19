import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='bg-black text-white'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16 px-4'>

                {/* LEFT - LOGO */}
                <Link to="/">
                    <h1 className='text-xl font-bold'>HireHub</h1>
                </Link>

                {/* CENTER - NAV LINKS */}
                <div className='flex-1 flex justify-center'>
                    <ul className='flex items-center gap-8 font-medium'>
                        {user?.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                                <li><Link to="/saved">Saved</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* RIGHT - AUTH */}
                <div className='flex items-center gap-3'>
                    {!user ? (
                        <>
                            <Button
                                onClick={() => navigate("/login")}
                                className="bg-white text-black hover:bg-gray-200"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate("/signup")}
                                className="bg-gray-200 text-black hover:bg-white"
                            >
                                Signup
                            </Button>
                        </>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Avatar
                                className="w-9 h-9 cursor-pointer border-2 border-white"
                                onClick={() => navigate("/profile")}
                            >
                                <AvatarImage src={user?.profile?.profilePhoto} />
                                <AvatarFallback className="bg-gray-600 text-white">
                                    {user?.fullname?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                onClick={logoutHandler}
                                className="bg-white text-black hover:bg-gray-200"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Navbar