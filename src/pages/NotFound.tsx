import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Clock className="h-24 w-24 text-gray-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">404</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">Time Not Found</h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
          It seems you've wandered into a timeless void. The page you're looking for doesn't exist or has disappeared into another dimension.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;