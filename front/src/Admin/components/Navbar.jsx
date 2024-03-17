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
    <nav className={`bg-white border  px-4 py-3 flex justify-between w-full fixed top-0 left-0 shadow-md  z-50`}>
      <div className='flex items-center text-xl'>
      <button
        onClick={toggleSidebar}
        className="fixed top-2 left-3 z-50 flex items-center   justify-center w-10  h-10 text-black bg-white  rounded-md "
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
        <div className={`text-black mr-4 ${unreadMessages ? "unread-indicator": "unread-dot"} `}>
          <FaBell className='w-6 h-6' />
        </div>
        <div className={`text-black mr-4  `}>
          <button className='text-black group' onClick={Profile} >
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
