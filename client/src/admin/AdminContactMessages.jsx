import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import api from "../api";
import { useNavigate } from "react-router";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/contact");
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <section className="p-4 sm:p-8 bg-white min-h-screen">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
      >
        Go to Dashboard
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-10 text-center">
          Contact Messages
        </h2>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-green-600 text-lg"
          >
            Loading messages...
          </motion.div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-lg"
          >
            No messages found.
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="overflow-x-auto shadow-xl rounded-xl border border-green-200 bg-white"
          >
            <table className="min-w-full divide-y divide-green-100">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-800 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-50">
                {messages.map((msg, index) => (
                  <motion.tr
                    key={msg._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-green-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {msg.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {msg.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {msg.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-sm break-words">
                      {msg.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(msg.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AdminContactMessages;
