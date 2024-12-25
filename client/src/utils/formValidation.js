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
  const socialLinksErrors = [];
  data.socialLinks.forEach((link, index) => {
    const linkErrors = {};
    if (!link.platform) {
      linkErrors.platform = 'Platform is required';
    }
    if (!link.url) {
      linkErrors.url = 'URL is required';
    }
    if (Object.keys(linkErrors).length > 0) {
      socialLinksErrors[index] = linkErrors;
    }
  });

  if (socialLinksErrors.length > 0) {
    errors.socialLinks = socialLinksErrors;
    isValid = false; // Set isValid to false if there are errors in social links
  }

  return {
    isValid,  // Return the isValid flag
    errors,   // Return the errors object
  };
};
