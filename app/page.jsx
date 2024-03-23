"use client"

import { useEffect, useState } from 'react';

const Page = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    const onAnimationLoad = () => {
      setAnimationLoaded(true);
    };

    // Add event listener to detect when the animation is loaded
    window.addEventListener('load', onAnimationLoad);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('load', onAnimationLoad);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen pt-20 items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to <span style={{ color: 'purple', background: 'linear-gradient(45deg, #7928CA, #FF0080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>WillowCare</span>
      </h1>
      <p className="mb-8 text-center">Enjoy an all-in-one elder care management software that <br/>tracks your tasks, residents, compliance, and more!</p>
      <a href="/service" className="button text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-32 mb-8 text-center">
        Get Started
      </a>
      <div className={`flex w-full justify-center mb-12 ${animationLoaded ? 'fade-in' : ''}`}>
        <a href="/" className="bg-white rounded-lg py-8 px-10 w-1/4 mr-4 text-center">Track your compliance</a>
        <div className="w-1/6"></div>
        <a href="/" className="bg-white rounded-lg py-8 px-10 w-1/4 text-center">Manage residents and move-ins</a>
      </div>
      <div className={`flex w-full justify-center ${animationLoaded ? 'fade-in' : ''}`}>
        <a href="/" className="bg-white rounded-lg py-8 px-10 w-1/4 mr-4 text-center">Manage and review personal tasks</a>
        <div className="w-1/6"></div>
        <a href="/" className="bg-white rounded-lg py-8 px-10 w-1/4 text-center">Analytics</a>
      </div>
    </div>
  );
};

export default Page;
