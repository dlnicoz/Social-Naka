import React, { useState, useEffect, useCallback } from 'react';
import SocialCardForm from '../components/Forms/SocialCardForm';
import SocialCard from '../components/SocialCard';
import { validateForm } from '../utils/formValidation';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/Toast/ToastContainer';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

function CreateSocialCard() {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    location: '',
    profileUrl: '',
    description: '',
    theme: 'gradient',
    socialLinks: [],
    category: '',
    slug: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewCard, setIsNewCard] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const shareableLink = formData.slug ? `${window.location.origin}/user/${formData.slug}` : '';

  useEffect(() => {
    if (!user) {
      addToast('You need to log in to access the dashboard.', 'error');
      navigate('/');
      return;
    }

    const fetchSocialCard = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('social_cards')
          .select('id, name, profession, location, profileUrl, description, theme, socialLinks, category, slug, user_id')          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          console.log('No social card found.');
          setIsNewCard(true);
        } else {
          setFormData(data);
          setIsNewCard(false);
        }
      } catch (error) {
        setError('Error fetching social card.');
        addToast('An error occurred while fetching your social card.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchSocialCard();
  }, [user]);

  const validateInput = useCallback(() => {
    const { isValid } = validateForm(formData);
    setIsValid(isValid);
  }, [formData]);

  useEffect(() => {
    validateInput();
  }, [validateInput]);

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
  };

  const saveCard = async () => {
    const { isValid, errors } = validateForm(formData);
    if (!isValid) {
      addToast('Please fill out all required fields correctly.', 'error');
      return;
    }

    setLoading(true);
    
    try {
      if (isNewCard || formData.slug !== prevSlug) {
      const { data: existingSlug } = await supabase
      .from('social_cards')
      .select('id')
      .eq('slug', formData.slug)
      .neq('user_id', user.id)
      .single();

    if (existingSlug) {
      addToast('This slug is already taken. Please choose another.', 'error');
      setLoading(false);
      return;
    }
  }

      let response;
      if (isNewCard) {
        response = await supabase
          .from('social_cards')
          .insert([{ ...formData, user_id: user.id }])
          .select()
          .single();
      } else {
        response = await supabase
          .from('social_cards')
          .update({ ...formData })
          .eq('user_id', user.id)
          .select()
          .single();
      }

      if (response.error) throw response.error;

      addToast('Social Card Saved Successfully!', 'success');
      setIsNewCard(false);
      setFormData(response.data);
      navigate(`/user/${response.data.slug}`);
    } catch (error) {
      console.error('Error saving card:', error.message);
      addToast('Failed to save the card. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Create or Edit Your Social Card
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <SocialCardForm data={formData} onChange={handleFormChange} />
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

          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Live Preview</h2>
            <SocialCard profile={formData} />
          </div>
        </div>

        {shareableLink && (
          <div className="text-center mt-6">
            <p className="text-green-600 font-semibold">Your Profile Link:</p>
            <a href={shareableLink} className="text-blue-500">{shareableLink}</a>
          </div>
        )}
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default CreateSocialCard;
