import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Import the axios instance for API calls
import SocialCardForm from '../components/Forms/SocialCardForm'; // Import the form component
import SocialCard from '../components/SocialCard'; // Import the social card preview component
import axios from 'axios'; // Axios for API calls
import { validateForm } from '../utils/formValidation'; // Import form validation utility
import { useToast } from '../hooks/useToast'; // Import useToast hook
import ToastContainer from '../components/Toast/ToastContainer'; // Import ToastContainer for displaying toasts

function CreateSocialCard() {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    location: '',
    profileImage: null,
    description: '',
    theme: 'gradient',
    socialLinks: [],
    category: '',
    isPublic: true,
  });

  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const apiUrl = import.meta.env.VITE_API_URL; // API base URL
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages
  const [authToken, setAuthToken] = useState(''); // State for auth token
  const [isNewCard, setIsNewCard] = useState(true); // Track if the card is new or editing an existing one
  const [isValid, setIsValid] = useState(false); // Track if the form is valid
  const { toasts, addToast, removeToast } = useToast(); // Toast handling

  // Generate the shareable link
  const userName = localStorage.getItem('username') || 'User';
  const shareableLink = `${window.location.origin}/user/${userName}`;

  // Define handleFileChange to handle file input
  const handleFileChange = (event) => {
    console.log(event);  // Log the event to check if it has the expected properties
    const fileInput = event.target;
    const file = fileInput ? fileInput.files[0] : null;
    if (file) {
      setFormData({
        ...formData,
        profileImage: file,
      });
    } else {
      console.log("No file selected");
    }
  };
  // Fetch the user's social card data on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      addToast('You need to log in to access the dashboard.', 'error');
      window.location = '/'; // Redirect to login
    }
    setAuthToken(token);

    const fetchSocialCard = async () => {
      try {
        setLoading(true); // Show loading indicator
        const response = await axiosInstance.get('/social-cards/me'); // Fetch the user's social card
        console.log('Social card fetched successfully:', response.data);
        setFormData(response.data); // Populate the form with fetched data
        setIsNewCard(false); // Indicate that the card already exists
      } catch (error) {
        if (error.response?.status === 404) {
          console.log('No social card found, creating a new one.');
          setIsNewCard(true); // Indicate that no social card was found
        } else {
          setError('Error fetching social card');
          console.error('Error fetching social card:', error.message);
          addToast('An error occurred while fetching your social card.', 'error');
        }
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchSocialCard(); // Fetch social card data when component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Revalidate the form whenever formData changes
  useEffect(() => {
    const { isValid } = validateForm({ ...formData, profileImage });
    setIsValid(isValid); // Update the validity state
  }, [formData, profileImage]);

  useEffect(() => { setIsValid(true) })

  // Handle form data change
  const handleFormChange = (updatedData) => {
    setFormData(updatedData); // Update form data
  };

  // Save the social card (either create or update)
  const saveCard = async () => {
    const { isValid, errors } = validateForm(formData); // Validate form data

    if (isValid) {
      setLoading(true); // Start loading while saving
      try {
        // Form data to send to the backend
        const formDataToSend = new FormData();

        // Add form fields to FormData (not just plain object, since we need to upload files)
        formDataToSend.append('name', formData.name); // Name field
        formDataToSend.append('category', formData.category); // Category field
        formDataToSend.append('profession', formData.profession); // Profession field
        formDataToSend.append('location', formData.location); // Location field
        formDataToSend.append('description', formData.description); // Description field
        formDataToSend.append('theme', formData.theme); // Theme field
        formDataToSend.append('isPublic', formData.isPublic); // Public setting
        // Append socialLinks correctly
        formData.socialLinks.forEach(link => {
          formDataToSend.append('socialLinks[]', JSON.stringify(link)); // Append each link as a JSON string
        });
        // Handle file upload (Profile image)
        if (profileImage) {
          formDataToSend.append('profileImage', profileImage); // Add the image file
        }

        // Choose the right API call based on whether it's a new or existing card
        const apiCall = isNewCard
          ? axios.post(`${apiUrl}/social-cards`, formDataToSend, {
            headers: {
              'auth-token': authToken,
              'Content-Type': 'multipart/form-data', // Set multipart form data for file upload
            },
          })
          : axios.put(`${apiUrl}/social-cards/me`, formDataToSend, {
            headers: {
              'auth-token': authToken,
              'Content-Type': 'multipart/form-data', // Set multipart form data for file upload
            },
          });

        // Make the API request
        const response = await apiCall;
        console.log('Card saved:', response.data);
        addToast('Social Card Saved Successfully!', 'success');
        setIsNewCard(false); // Set to false as the card now exists
        setFormData(response.data); // Update form data with the saved data
        window.location.href = shareableLink; // Redirect to the shareable link after saving

      } catch (error) {
        console.log(formData);
        console.error('Error saving card:', error.response?.data || error.message);

        if (error.response?.status === 400 && error.response?.data?.error === 'Invalid card ID') {
          addToast('Invalid card ID. Please check the existing card ID if updating.', 'error');
        } else {
          addToast('Failed to save the card. Please check the required fields.', 'error');
        }
      } finally {
        setLoading(false); // Stop loading once the operation is done
      }

      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation errors:', errors);
      addToast('Please fill out all required fields correctly.', 'error');
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Create or Edit Your Social Card
        </h1>

        {/* Loading and Error Messages */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <SocialCardForm
              data={formData}
              onChange={handleFormChange}
              onFileChange={handleFileChange}  // Pass handleFileChange as a prop
              loading={false}
            />

            {isValid && (
              <div className="text-center mt-8">
                <button
                  onClick={saveCard}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                  disabled={loading}
                >
                  {isNewCard ? 'Create Social Card' : 'Update Social Card'}
                </button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Live Preview</h2>
            <SocialCard profile={formData} />
          </div>
        </div>
      </div>

      {/* Add Toast Container to render toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default CreateSocialCard;
