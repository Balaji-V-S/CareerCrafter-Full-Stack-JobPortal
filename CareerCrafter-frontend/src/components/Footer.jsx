import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} CareerCrafter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
