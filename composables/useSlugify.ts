export const useSlugify = () => {
  const slugToString = (slug: string) => {
    // Replace hyphens with spaces
    return slug.replace(/-/g, " ");
  };

  const slugToStringUppercase = (slug: string) => {
     // Replace hyphens with spaces and capitalize the first letter of each word
    return slug
      .split("-") // Split the slug by hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back with a space
  };

  return { slugToString, slugToStringUppercase };
};
