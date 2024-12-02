import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';  // Import the axios instance for API calls
import SocialCardForm from '../components/Forms/SocialCardForm';
import SocialCard from '../components/SocialCard';
import axios from 'axios';
import { validateForm } from '../utils/formValidation';

function CreateSocialCard() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    location: "",
    profileUrl: "",
    description: "",
    theme: "gradient",
    socialLinks: [],
    category: "",
    isPublic: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(''); // State for auth token
  const [isNewCard, setIsNewCard] = useState(true);  // Track if the card is new or editing an existing one
  const [isValid, setIsValid] = useState(false);

  // Fetch the user's social card data on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      alert('You need to log in to access the dashboard.');
      window.location = '/'; // Redirect to login
    }
    setAuthToken(token);

    const fetchSocialCard = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/social-cards/me');
        console.log('Social card fetched successfully:', response.data);
        setFormData(response.data);  // Populate the form with fetched data
        setIsNewCard(false);  // Indicate that the card already exists
      } catch (error) {
        if (error.response?.status === 404) {
          console.log('No social card found, creating a new one.');
          setIsNewCard(true);  // Indicate that no social card was found
        } else {
          setError('Error fetching social card');
          console.error('Error fetching social card:', error.message);
          alert('An error occurred while fetching your social card.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSocialCard(); // Fetch social card data when component mounts
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    const { isValid } = validateForm(formData);
    setIsValid(isValid);
  }, [formData]);

  // Handle form data change
  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
  };

  // Save the social card (either create or update)
  const saveCard = () => {
    // if (!userId) {
    //   console.error('User ID is null or undefined');
    //   alert('User ID is missing. Please log in again.');
    //   return;  // Exit if userId is missing
    // }
    const { isValid, errors } = validateForm(formData);
    if (isValid) {
      // Here you would typically send the data to your backend
      // Check if it's a new card or an existing one
      setLoading(true);  // Start loading while saving
      const apiCall = isNewCard
        ? axios.post('http://localhost:5000/api/social-cards', formData, {
          headers: { 'auth-token': authToken },
        })
        : axios.put('http://localhost:5000/api/social-cards/me', formData, {
          headers: { 'auth-token': authToken },
        });  // Use dynamic userId for update
      apiCall
        .then((response) => {
          console.log('Card saved:', response.data);
          alert('Social Card Saved Successfully!');
          setIsNewCard(false);  // Set to false as the card now exists
          setFormData(response.data);  // Update form data with saved data
        })
        .catch((error) => {
          // Log formData and error for debugging
          console.log(formData);
          console.error('Error saving card:', error.response?.data || error.message);

          if (error.response?.status === 400 && error.response?.data?.error === 'Invalid card ID') {
            alert('Invalid card ID. Please check the existing card ID if updating.');
          } else {
            alert('Failed to save the card. Please check the required fields.');
          }
        })
        .finally(() => {
          setLoading(false);  // Stop loading once the operation is done
        });
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation errors:', errors);
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
    </div>
  );
}

export default CreateSocialCard;
