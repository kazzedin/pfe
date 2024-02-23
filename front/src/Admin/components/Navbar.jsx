import React ,{useContext} from 'react';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import MessageContext from '../MessageProvider';



export default function Navbar(props) {
  const navigate = useNavigate();

  const Profile = (e) => {
    e.preventDefault();
    navigate('/Admin/Profile');
  }

  const LogOut = (e) => {
    e.preventDefault();
    axios.get('http://localhost:3001/admin/logout')
      .then(res => {
        if (res.data.response) {
          alert('Logged out');
          navigate('/');
        } else {
          alert('Failed to logout');
        }
      })
      .catch(err => console.log(err));
  }

  const toggleSidebar = (e) => {
    e.preventDefault();
    props.sidebareFunc(!props.sidebar);
  };

  const { unreadMessages } = useContext(MessageContext);
  
  return (
    <nav className={`bg-gray-800 bg-opacity-50 opacity-9 px-4 py-3 flex justify-between w-full fixed top-0 left-0 transition-transform duration-500 ${!props.sidebar ? 'translate-x-64' : 'translate-x-0'}`}>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white mr-4 cursor-pointer' onClick={toggleSidebar} />
        <span className='text-white font-semibold'>Pfe A Distance</span>
      </div>

      <div className={`flex items-center transition-transform duration-500 ${!props.sidebar ? ' mr-64' : ''}`}>
        <div className={`text-white mr-4 ${unreadMessages ? "unread-indicator": "unread-dot"} `}>
          <FaBell className='w-6 h-6' />
        </div>
        <div className={`text-white mr-4  `}>
          <button className='text-white group' onClick={Profile} >
            <FaUserCircle className='w-6 h-6 mt-1' />
          </button>
        </div>
        <div>
          <button className={`text-white group bg-red-500 hover:bg-red-700 p-1 rounded-2xl `} onClick={LogOut}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
