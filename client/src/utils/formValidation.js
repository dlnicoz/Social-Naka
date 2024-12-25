export const validateForm = (data) => {
  const errors = {};
  let isValid = true; // Declare isValid with an initial value of true

  // Required fields
  if (!data.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  if (!data.category) {
    errors.category = 'Category is required';
    isValid = false;
  }

  if (!data.profession) {
    errors.profession = 'Profession is required';
    isValid = false;
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
    isValid = false;
  }

  // Profile Image validation
  if (!data.profileImage) {
    errors.profileImage = 'Profile image is required';
    isValid = false; // Set isValid to false if profile image is missing
  }

  // Social links validation
  if (Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
    data.socialLinks.forEach((link, index) => {
      const linkErrors = {};
      if (!link.platform?.trim()) {
        linkErrors.platform = 'Platform is required';
      }
      if (!link.url?.trim()) {
        linkErrors.url = 'URL is required';
      } else if (!isValidUrl(link.url)) {
        linkErrors.url = 'URL is not valid';
      }
      if (Object.keys(linkErrors).length > 0) {
        errors[`socialLink_${index}`] = linkErrors; // Use a descriptive key for each link
      }
    });
  } else {
    errors.socialLinks = 'At least one social link is required';
    isValid = false;
  }

  return {
    isValid,  // Return the isValid flag
    errors,   // Return the errors object
  };
};

// Helper function to validate URL format
const isValidUrl = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\\.)+[a-z]{2,}|' + // domain name
    'localhost|' + // localhost
    '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP address
    '\\[?[a-f0-9]*:[a-f0-9:%.~+\\-]*\\]?)' + // IPv6
    '(\\:\\d+)?(\\/[-a-z0-9+&@#/%=~_|\\?\\.:,]*)*$', 'i'); // path
  return !!pattern.test(url);
};