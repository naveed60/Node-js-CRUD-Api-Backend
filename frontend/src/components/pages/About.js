import React from 'react';

function About() {
  return (
    <div className="bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to our Contact Management System! Our platform allows users to efficiently manage their contacts with ease. Whether you need to create, update, or delete contacts, our system provides a seamless experience tailored to your needs.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Create Contacts:</strong> Easily add new contacts to your list. Just fill in the necessary details, and your contact will be saved securely in our system.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Update Contacts:</strong> Keep your contact information up-to-date by editing existing entries. Our intuitive interface makes it simple to make changes whenever needed.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Delete Contacts:</strong> Need to remove a contact? No problem! Our system allows you to quickly delete any contacts that are no longer needed, ensuring your list stays organized and relevant.
        </p>
      </div>
    </div>
  );
}

export default About;
