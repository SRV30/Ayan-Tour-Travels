import React, { useEffect, useState } from "react";
import api from "../api";

const WhatsAppFloatingButton = () => {
  const [user, setUser] = useState({ mobile: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/admin/me");
        setUser({ mobile: data.user.mobile || "" });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, []);

  const message = encodeURIComponent(
    "Hi, I need some help regarding your services."
  );
  const phoneNumber = user?.mobile ? `91${user.mobile}` : "919999999999";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 group"
      title="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 fill-white group-hover:rotate-6 transition-transform duration-300"
        viewBox="0 0 32 32"
      >
        <path d="M16.001 2.998c-7.17 0-13 5.831-13 13 0 2.299.603 4.555 1.747 6.529L3 29l6.646-1.719c1.86.986 3.939 1.507 6.355 1.507 7.17 0 13-5.831 13-13s-5.83-13-13-13zm.001 23.5c-2.037 0-3.926-.526-5.608-1.517l-.4-.232-3.939 1.018 1.054-3.837-.261-.395c-1.086-1.646-1.662-3.554-1.662-5.538 0-5.601 4.398-10 9.999-10 5.602 0 10 4.399 10 10s-4.398 10.001-10.001 10.001zm5.489-7.419c-.3-.15-1.769-.869-2.043-.967-.273-.1-.473-.15-.673.15s-.773.967-.948 1.166c-.173.2-.348.225-.648.075-.3-.15-1.263-.463-2.405-1.475-.888-.789-1.488-1.762-1.662-2.062-.174-.3-.019-.463.131-.613.134-.134.3-.35.449-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.673-1.625-.923-2.225-.244-.586-.495-.5-.673-.5-.173 0-.374-.025-.575-.025-.2 0-.525.075-.8.375-.274.3-1.05 1.025-1.05 2.5s1.076 2.9 1.226 3.1c.15.2 2.113 3.225 5.113 4.523.714.308 1.27.492 1.704.629.716.229 1.367.197 1.882.12.575-.086 1.769-.723 2.021-1.422.249-.7.249-1.3.174-1.422-.074-.125-.273-.2-.573-.35z" />
      </svg>

      <span className="absolute bottom-full right-0 mb-2 text-sm text-green-800 bg-white px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppFloatingButton;
