import React, { useContext, useEffect } from 'react';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DataAdminContext } from '../DataAdminProvider';
import MessageContext from '../MessageProvider';
import { AdminUserContext } from '../AdminUserProvider';
import axios from 'axios';

export default function Navbar(props) {
  const navigate = useNavigate();
  const { image, setImage} = useContext(DataAdminContext);
  const { adminUserEmail} = useContext(AdminUserContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/admin/fetch-profile/${adminUserEmail}`)
      .then(response => {
        setImage(response.data.image);
      })
      .catch(err => console.log(err));
  }, []);

  const Profile = (e) => {
    e.preventDefault();
    navigate('/Admin/Profile');
  }

  const toggleSidebar = (e) => {
    e.preventDefault();
    props.sidebareFunc(!props.sidebar);
  };

  const { unreadMessages } = useContext(MessageContext);

  return (
    <nav className={`bg-white border px-4 py-3 flex justify-between w-full fixed top-0 left-0 shadow-md z-50`}>
      <div className='flex items-center text-xl'>
        <button
          onClick={toggleSidebar}
          className="fixed top-2 left-3 z-50 flex items-center justify-center w-10 h-10 text-black bg-white rounded-md "
        >
          <svg
            className="w-6 h-6"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d={!props.sidebar ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <span className='text-black font-semibold text-2xl ml-11'>Pfe A Distance</span>
      </div>

      <div className={`flex items-center `}>
        <div className={`text-black mr-4 ${unreadMessages ? "unread-indicator" : "unread-dot"} `}>
          <FaBell className='w-6 h-6' />
        </div>
        <div className={`text-black mr-4`} onClick={(e) => Profile(e)}>
          {image ? (
            <img className="w-9 h-9 rounded-full cursor-pointer" src={`http://localhost:3001/images/${image}`} alt="profile"/>
          ) : (
            <img key="default-image" src='/public/profil.jpg' alt='Par défaut' className='h-full w-full object-cover' />
          )}
        </div>
      </div>
    </nav>
  );
}
