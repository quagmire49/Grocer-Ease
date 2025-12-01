import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    gender: '',
  });

  // Generate random profile data
  const generateRandomData = () => {
    const firstNames = ['Raj', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rohit', 'Kavya', 'Arjun', 'Meera'];
    const lastNames = ['Kumar', 'Sharma', 'Patel', 'Singh', 'Reddy', 'Gupta', 'Verma', 'Joshi', 'Malhotra', 'Agarwal'];
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'];
    const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Rajasthan'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    
    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      address: `${Math.floor(Math.random() * 999) + 1} ${lastName} Street, ${city}`,
      city: city,
      state: state,
      zipCode: `${Math.floor(Math.random() * 900000) + 100000}`,
      dateOfBirth: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/${1980 + Math.floor(Math.random() * 30)}`,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
    };
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load user data or generate random data
    if (user) {
      const randomData = generateRandomData();
      setProfileData({
        name: user.name || randomData.name,
        email: user.email || randomData.email,
        phone: randomData.phone,
        address: randomData.address,
        city: randomData.city,
        state: randomData.state,
        zipCode: randomData.zipCode,
        dateOfBirth: randomData.dateOfBirth,
        gender: randomData.gender,
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically save to your backend
      // For now, we'll just update local state
      setIsEditing(false);
      // You can add API call here to save profile data
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reload original data
    if (user) {
      const randomData = generateRandomData();
      setProfileData({
        name: user.name || randomData.name,
        email: user.email || randomData.email,
        phone: randomData.phone,
        address: randomData.address,
        city: randomData.city,
        state: randomData.state,
        zipCode: randomData.zipCode,
        dateOfBirth: randomData.dateOfBirth,
        gender: randomData.gender,
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">My Profile</h1>
        <p className="text-gray-300 text-lg">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 p-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
              <FaUser className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
              <p className="text-gray-400">{profileData.email}</p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaEdit />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaSave />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="flex items-center space-x-2 text-white">
                <FaUser className="text-primary-400" />
                <span>{profileData.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="flex items-center space-x-2 text-white">
                <FaEnvelope className="text-primary-400" />
                <span>{profileData.email}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="flex items-center space-x-2 text-white">
                <FaPhone className="text-primary-400" />
                <span>{profileData.phone}</span>
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="text"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="text-white">{profileData.dateOfBirth}</div>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="text-white">{profileData.gender}</div>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="flex items-center space-x-2 text-white">
                <FaMapMarkerAlt className="text-primary-400" />
                <span>{profileData.address}</span>
              </div>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">City</label>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="text-white">{profileData.city}</div>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">State</label>
            {isEditing ? (
              <input
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="text-white">{profileData.state}</div>
            )}
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Zip Code</label>
            {isEditing ? (
              <input
                type="text"
                name="zipCode"
                value={profileData.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="text-white">{profileData.zipCode}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

