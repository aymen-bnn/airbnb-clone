import React, { useContext } from 'react';
import { UserContext } from '../hooks/authContext';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from '../../components/PlacesPage';

function AccountPage() {
  const { user, ready, setUser } = useContext(UserContext);
  console.log(user)
  const logout = async () => {
    const data = await axios.post('/logout')
    setUser(null)
    console.log(data)
  } 
  
  if (!ready) {
    return 'loading...';
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const { subpage } = useParams();
  
  const linkClasses = [
    {
      label: 'My Profile',
      to: '/account/account',
    },
    {
      label: 'My Bookings',
      to: '/account/booking',
    },
    {
      label: 'My Accommodations',
      to: '/account/places',
    },
  ];
  
  const [activeLink, setActiveLink] = React.useState(linkClasses[0]);
  
  if (subpage === undefined) {
    setActiveLink(linkClasses[0])
  }
  
  return (
    <div>
      <nav className='w-full flex justify-center gap-4 mt-8'>
        {linkClasses.map((linkClass) => (
          <Link
            key={linkClass.to}
            onClick={() => setActiveLink(linkClass)}
            className={`p-2 text-black rounded-full ${linkClass.to === activeLink.to ? 'bg-primary' : ''}`}
            to={linkClass.to}
          >
            {linkClass.label}
          </Link>
        ))}
      </nav>
      {
        subpage === "account" && (
          <div className='text-center mt-5'>
            <p>logged in as {user.name} {user.email}</p>
            <button onClick={() => logout()} className='mx-auto bg-primary mt-2 w-1/3 p-2 rounded-xl text-white'>
              logout
            </button>
          </div>
        )
      }
      {
        subpage === "booking" && (
          <div className='text-center mt-5'>
            <p>logged in as {user.name} {user.email}</p>
            <button onClick={() => logout()} className='mx-auto bg-primary mt-2 w-1/3 p-2 rounded-xl text-white'>
              logout
            </button>
          </div>
        )
      }
      {
        subpage === "places" && (
          <div className="container mx-auto text-center">
          <div>
            <Link
              className="bg-primary text-white py-2 px-6 flex my-5 rounded-full items-center w-fit mx-auto "
              to="/account/places/new"
            >
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 32 32"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add New place
            </Link>
            <PlacesPage/>
          </div>
        </div>
        )
      }
    </div>
  );
}

export default AccountPage;
