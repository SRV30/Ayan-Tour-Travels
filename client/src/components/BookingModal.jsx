import { useState } from "react";
import { X, MapPin, Calendar, Phone, Car } from "lucide-react";

const BookingModal = ({ showModal, onClose }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (!from || !to || !date || !contact) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const message = `🚗 *New Booking Request*%0AFrom: ${from}%0ATo: ${to}%0ADate: ${date}%0AContact: ${contact}`;
      const whatsappURL = `https://wa.me/917070186631?text=${message}`;
      window.open(whatsappURL, "_blank");
      
      setFrom("");
      setTo("");
      setDate("");
      setContact("");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!showModal) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 transition-all duration-300 ${
        showModal ? 'bg-black bg-opacity-60 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden transform transition-all duration-500 ${
          showModal 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
        
        <div className="relative p-6 sm:p-8">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 shadow-lg">
              <Car className="text-white" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Booking</h2>
            <p className="text-gray-500 text-sm">Book your ride in seconds</p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 group-focus-within:text-green-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="From City"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                required
              />
            </div>

            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 group-focus-within:text-green-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="To City"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                required
              />
            </div>

            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 group-focus-within:text-green-600 transition-colors" size={18} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                required
              />
            </div>

            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 group-focus-within:text-green-600 transition-colors" size={18} />
              <input
                type="tel"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium border-2 border-transparent hover:border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Booking...
                  </div>
                ) : (
                  'Book Now'
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-20"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-15"></div>
      </div>
    </div>
  );
};

export default BookingModal;