import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 text-gray-600 text-sm mt-auto">
      <span>© {new Date().getFullYear()} CareerCrafter. All rights reserved.</span>
    </footer>
  );
}

export default Footer;
