import React from 'react';
import imageo from '../assest/Cer-.gif';  // Make sure the path is correct
import { Link } from 'react-router-dom';
 

const Giftcermonony = () => {
  return (
    <Link to="/ceremony" className="gift-link">
      <div className="gift-container p-4">
        <img src={imageo} alt="Ceremony GIF" className="gift-image animate-shake-gift" />
      </div>
    </Link>
  );
};

export default Giftcermonony;
