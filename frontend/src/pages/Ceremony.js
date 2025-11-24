import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assest/Sir syedirfanullah.jpg'; // Ensure the image has a transparent background
import image2 from '../assest/Sir-junaid.jpg';
import image3 from '../assest/thanks.gif';
import image4 from '../assest/Sir Haseeb.JPG'; // Ensure this GIF also has a transparent background

const Ceremony = () => {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);

  const handleClose = () => {
    setShowThankYou(true); // Show the thank-you message
    setTimeout(() => {
      navigate('/'); // Navigate to the home page after 2 seconds
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-center p-4">
      {showThankYou ? (
        // Thank-you message
        <div className="flex flex-col justify-center items-center h-screen">
          <img
            src={image3}
            alt="Thank You"
            className="h-96 w-auto object-contain animate-bounce"
          />
          <h1 className="text-4xl font-bold text-green-700 mt-6 text-center">
            Thank you for being part of this journey!
          </h1>
        </div>
      ) : (
        // Ceremony content
        <div className="flex flex-row justify-between items-center">
          {/* Left column for images */}
          <div className="flex flex-col justify-center items-center w-1/2">
            <div className="flex flex-row justify-center gap-14 border">
              {/* Image 1 with its name */}
              <div className="flex flex-col items-center">
                <img src={image1} className="h-36 w-36" />
                <h2 className="text-base font-semibold mt-2 w-36 text-center break-words">
                  Dr. Syed Irfan Ullah HOD / Associate Professor
                </h2>
              </div>

              {/* Image 2 with its name */}
              <div className="flex flex-col items-center">
                <img src={image4} className="h-36 w-36" />
                <h2 className="text-base font-semibold mt-2 w-36 text-center break-words">
                  Abdul Haseeb
                  <br />
                  Supervisor
                  <br />
                  Lecturer
                </h2>
              </div>

              {/* Image 3 with its name */}
              <div className="flex flex-col items-center">
                <img src={image2} className="h-36 w-36" />
                <h2 className="text-base font-semibold mt-2 w-36 text-center break-words">
                  Junaid Arshad
                  <br />
                  FYP Coordinator
                  <br />
                  Lecturer
                </h2>
              </div>
            </div>

            {/* Thank you GIF */}
            <img
              src={image3}
              className="h-96 w-full object-contain mx-auto animate-shake"
              style={{ maxWidth: '2500px' }}
            />
          </div>

          {/* Right column for text */}
          <div className="flex flex-col justify-start text-left w-1/2 p-10 bg-white shadow-2xl rounded-2xl">
            <p className="text-2xl text-gray-800 font-semibold mb-8 leading-relaxed">
              We would like to extend our heartfelt congratulations to everyone
              involved in the success of this project. Your hard work and
              dedication have brought us this far, and today we celebrate this
              remarkable achievement together.
            </p>
            <p className="text-3xl font-semibold leading-relaxed text-center bg-gradient-to-r from-green-800 to-green-600 text-white p-4 rounded-lg shadow-lg animate-shake">
              Big thanks to our Head of Department for their support as this is
              the first batch on this journey!
            </p>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ceremony;
