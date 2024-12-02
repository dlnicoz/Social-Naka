export const validateForm = (data) => {
    const errors = {};
    
    // Required fields
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!data.category) {
      errors.category = 'Category is required';
    }
    
    if (!data.profession) {
      errors.profession = 'Profession is required';
    }
    
    if (!data.description.trim()) {
      errors.description = 'Description is required';
    }
    
    // URL validation
    if (!data.profileUrl.trim()) {
      errors.profileUrl = 'Profile image URL is required';
    } else if (!/^https?:\/\/.+/.test(data.profileUrl)) {
      errors.profileUrl = 'Please enter a valid URL';
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
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };