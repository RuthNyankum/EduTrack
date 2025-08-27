import React, { createContext, useState } from "react";

export const ParentContext = createContext();

export const ParentProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    id: 1,
    name: "Vida Amoah",
    email: "vida@example.com",
    phone: "123-456-7890",
    profileImage: "",
    children: [
      { id: 1, name: "Vida Jr.", classLevel: "Class 2", profileImage: "" },
      {
        id: 2,
        name: "Kofi Amoah",
        classLevel: "Kindergarten 1",
        profileImage: "",
      },
    ],
  });

  // Actions
  const updateParentProfile = (updatedData) => {
    setProfile((prev) => ({
      ...prev,
      phone: updatedData.phone,
      profileImage: updatedData.profileImage,
    }));
  };

  const addChild = (child) => {
    setProfile((prev) => ({
      ...prev,
      children: [...prev.children, child],
    }));
  };

  const removeChild = (id) => {
    setProfile((prev) => ({
      ...prev,
      children: prev.children.filter((child) => child.id !== id),
    }));
  };

  const updateChild = (childData) => {
    setProfile((prev) => ({
      ...prev,
      children: prev.children.map((child) =>
        child.id === childData.id ? { ...child, ...childData } : child
      ),
    }));
  };

  return (
    <ParentContext.Provider
      value={{
        profile,
        updateParentProfile,
        addChild,
        removeChild,
        updateChild,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};
