import defaultImg from "../assets/images/profileImg.png";

export const getProfileImageUrl = (profile) => {
  const path = profile.profileImage;
  if (!path) return defaultImg;
  return path.startsWith("http") ? path : `http://localhost:8000/${path}`;
};
