import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className="container mx-auto p-3">
  <p
    className="text-center font-bold text-3xl md:text-5xl relative professional-animation"
    title="Abasyn University Peshawar"
  >
    Abasyn Incubation Center
  </p>
</div>

<style>
  {`
    /* Keyframes for smooth fade-in with scaling */
    @keyframes fadeInScale {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Keyframes for alternating glow between green and white */
    @keyframes greenWhiteGlow {
      0% {
        text-shadow: 0 0 10px #006634, 0 0 20px #006634, 0 0 30px #006634;
        color: #ffffff;
      }
      50% {
        text-shadow: 0 0 15px #ffffff, 0 0 25px #ffffff, 0 0 35px #ffffff;
        color: #006634;
      }
      100% {
        text-shadow: 0 0 10px #006634, 0 0 20px #006634, 0 0 30px #006634;
        color: #ffffff;
      }
    }

    /* Styling for the text */
    .professional-animation {
      animation: fadeInScale 2s ease-in-out, greenWhiteGlow 3s ease-in-out infinite alternate;
      font-size: 2rem;
      line-height: 1.5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-transform: uppercase;
      font-weight: bold;
    }

    /* Hover effect for added polish */
    .professional-animation:hover {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
    }
  `}
</style>

      
    </footer>
  )
}

export default Footer