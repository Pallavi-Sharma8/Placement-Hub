import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const ContactButtons: React.FC = () => {
  const whatsappNumber = '+918059408454'; // Replace with actual number
  const phoneNumber = '+918059408454'; // Replace with actual number
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi AssistHR! I am interested in the job opportunities. Can you help me?');
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    // <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl p-8 shadow-2xl">
    //   <h3 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
    //     Ready to Apply? Let's Connect!
    //   </h3>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
        >
          <MessageCircle size={24} />
          <span className="text-sm sm:text-base"> WhatsApp</span>
        </button>
        
        <button
          onClick={handleCallClick}
          className="flex items-center justify-center gap-3 bg-red-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500"
        >
          <Phone size={24} />
          <span className="text-sm sm:text-base"> Call Now</span>
        </button>
      </div>
      
    //   <p className="text-gray-400 text-center mt-6 text-sm">
    //     📞 Call: {phoneNumber} | Our placement experts are ready to guide your career journey
    //   </p>
    // </div>
  );
};

export default ContactButtons;