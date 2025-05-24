import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api";
import { State, City } from "country-state-city";
import { useNavigate } from "react-router";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
  hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(34,197,94,0.3)" },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#15803d",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const AdminCityManager = () => {
  const INDIA_CODE = "IN";
  const defaultStateCode = "BR";

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [stateCities, setStateCities] = useState([]);

  const [form, setForm] = useState({
    city: "",
    district: "",
    state: defaultStateCode,
    country: INDIA_CODE,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setStates(State.getStatesOfCountry(INDIA_CODE));
  }, []);

  useEffect(() => {
    if (form.state) {
      const citiesOfState = City.getCitiesOfState(INDIA_CODE, form.state);
      setStateCities(citiesOfState);
      if (!citiesOfState.find((c) => c.name === form.city)) {
        setForm((prev) => ({ ...prev, city: "" }));
      }
    }
  }, [form.state, form.city]);

  const fetchCities = async () => {
    try {
      const { data } = await api.get("/cities");
      setCities(data.cities);
    } catch {
      toast.error("Failed to fetch cities");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const stateName =
        states.find((s) => s.isoCode === form.state)?.name || form.state;
      const payload = { ...form, state: stateName, country: "India" };

      if (editId) {
        await api.put(`/cities/${editId}`, payload);
        toast.success("City updated");
        setEditId(null);
      } else {
        await api.post("/cities", payload);
        toast.success("City created");
      }
      setForm({
        city: "",
        district: "",
        state: defaultStateCode,
        country: INDIA_CODE,
      });
      fetchCities();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (city) => {
    if (editId === city._id) {
      toast.info("Already editing this city");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const stateObj = states.find((s) => s.name === city.state);
    setEditId(city._id);
    setForm({
      city: city.city,
      district: city.district || "",
      state: stateObj ? stateObj.isoCode : defaultStateCode,
      country: INDIA_CODE,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this city?")) return;
    try {
      await api.delete(`/cities/${id}`);
      toast.success("City deleted");
      fetchCities();
    } catch {
      toast.error("Delete failed");
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10 bg-gradient-to-br from-white to-green-50 min-h-screen">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
      >
        Go to Dashboard
      </motion.button>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold text-green-800 mb-12 text-center tracking-wide drop-shadow-md select-none"
      >
        Manage Cities & Districts
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-4 gap-6 bg-white shadow-lg rounded-3xl p-8"
      >
        <motion.select
          name="state"
          value={form.state}
          onChange={handleChange}
          variants={itemVariants}
          whileFocus={{ scale: 1.02, borderColor: "#16a34a" }}
          className="appearance-none border-2 border-green-400 rounded-xl px-5 py-4 text-lg font-semibold text-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition shadow-sm"
          required
        >
          {states.map((s) => (
            <option key={s.isoCode} value={s.isoCode}>
              {s.name}
            </option>
          ))}
        </motion.select>

        <motion.select
          name="city"
          value={form.city}
          onChange={handleChange}
          variants={itemVariants}
          whileFocus={{ scale: 1.02, borderColor: "#16a34a" }}
          className="appearance-none border-2 border-green-400 rounded-xl px-5 py-4 text-lg font-semibold text-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition shadow-sm"
          required
        >
          <option value="" disabled>
            Select City
          </option>
          {stateCities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </motion.select>

        <motion.input
          type="text"
          name="country"
          value="India"
          disabled
          variants={itemVariants}
          className="border-2 border-green-300 rounded-xl px-5 py-4 text-lg font-semibold text-green-800 bg-green-100 cursor-not-allowed select-none"
        />

        <motion.button
          type="submit"
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-green-600 text-white font-extrabold text-lg rounded-2xl py-4 shadow-lg shadow-green-400/40 hover:shadow-green-600/70 transition-colors select-none"
        >
          {editId ? "Update City" : "Add City"}
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {cities.map((c) => (
          <motion.div
            key={c._id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white rounded-3xl shadow-2xl p-7 flex flex-col justify-between border-2 border-green-100 hover:border-green-500 transition cursor-pointer select-none"
          >
            <div>
              <h3 className="text-3xl font-extrabold text-green-700 tracking-tight mb-2">
                {c.city}
              </h3>
              {c.district && (
                <p className="text-green-800 font-semibold mb-1 text-lg">
                  District: {c.district}
                </p>
              )}
              <p className="text-green-700 font-semibold mb-1 text-lg">
                State: {c.state}
              </p>
              <p className="text-green-600 font-semibold text-lg">
                Country: {c.country}
              </p>
            </div>
            <div className="flex gap-5 mt-8">
              <motion.button
                onClick={() => handleEdit(c)}
                variants={buttonVariants}
                className="flex-1 py-3 bg-yellow-500 rounded-2xl text-white font-semibold shadow-md hover:shadow-yellow-600 transition"
              >
                Edit
              </motion.button>
              <motion.button
                onClick={() => handleDelete(c._id)}
                variants={buttonVariants}
                className="flex-1 py-3 bg-red-600 rounded-2xl text-white font-semibold shadow-md hover:shadow-red-700 transition"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminCityManager;
