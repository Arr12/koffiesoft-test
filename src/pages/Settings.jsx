import React, { useState } from "react";
import LayoutAdmins from "../layouts/LayoutAdmins";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState("");
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroButton: "",
    features: [{ title: "", description: "" }],
    aboutTitle: "",
    aboutDescription: "",
    aboutImage: null,
    dishes: [],
    testimonials: [{ name: "", text: "", role: "" }],
    chefs: [{ name: "", description: "", image: null }],
  });

  const [features, setFeatures] = useState(data.features || []);

  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][key] = value;
    setFeatures(updatedFeatures);
    setData({ ...data, features: updatedFeatures });
  };

  const addFeature = () => {
    setFeatures([...features, { title: "", description: "", icon: "" }]);
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    setData({ ...data, features: updatedFeatures });
  };

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedSection = [...prev[section]];
      updatedSection[index][name] = value;
      return { ...prev, [section]: updatedSection };
    });
  };

  const handleFileChange = (e, section, index = null) => {
    const file = e.target.files[0];
    setFormData((prev) => {
      if (index !== null) {
        const updatedSection = [...prev[section]];
        updatedSection[index].image = file;
        return { ...prev, [section]: updatedSection };
      }
      return { ...prev, [section]: file };
    });
  };

  const addSectionItem = (section, item) => {
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const [creations, setCreations] = useState([
    {
      id: 1,
      name: "Nasi Goreng",
      description: "Indonesian fried rice with spices.",
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addCreation = () => {
    if (newName.trim() && newDescription.trim()) {
      setCreations([
        ...creations,
        { id: Date.now(), name: newName, description: newDescription },
      ]);
      setNewName("");
      setNewDescription("");
    }
  };

  const removeCreation = (id) => {
    setCreations(creations.filter((creation) => creation.id !== id));
  };

  const [chefs, setChefs] = useState([
    { id: 1, name: "Chef John Doe", specialty: "French Cuisine" },
  ]);
  const [newNameChefs, setNewNameChefs] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");

  const addChef = () => {
    if (newNameChefs.trim() && newSpecialty.trim()) {
      setChefs([
        ...chefs,
        { id: Date.now(), name: newNameChefs, specialty: newSpecialty },
      ]);
      setNewNameChefs("");
      setNewSpecialty("");
    }
  };

  const removeChef = (id) => {
    setChefs(chefs.filter((chef) => chef.id !== id));
  };

  return (
    <LayoutAdmins>
      <div>
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-6 bg-gray-200 py-4">
          <button
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "hero" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("hero")}
          >
            Hero Section
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "features" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Features Section
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "about" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About Us
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "creations" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("creations")}
          >
            Culinary Creations
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "testimonials" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("testimonials")}
          >
            Testimonials
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold ${
              activeTab === "chefs" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("chefs")}
          >
            Meet Our Chefs
          </button>
        </div>

        {/* Hero Section */}
        {activeTab === "hero" && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
            <input
              type="text"
              placeholder="Title"
              name="heroTitle"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, heroTitle: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Subtitle"
              name="heroSubtitle"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, heroSubtitle: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Button Text"
              name="heroButton"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, heroButton: e.target.value })
              }
            />
          </div>
        )}

        {/* Features Section */}
        {activeTab === "features" && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Feature Section</h2>
            {features.map((feature, index) => (
              <div key={index} className="mb-4 p-2 border rounded-lg">
                <input
                  type="text"
                  placeholder="Feature Title"
                  value={feature.title}
                  onChange={(e) =>
                    handleFeatureChange(index, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Feature Description"
                  value={feature.description}
                  onChange={(e) =>
                    handleFeatureChange(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Feature Icon URL or Image URL"
                  value={feature.icon}
                  onChange={(e) =>
                    handleFeatureChange(index, "icon", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={() => removeFeature(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove Feature
                </button>
              </div>
            ))}
            <button
              onClick={addFeature}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Feature
            </button>
          </div>
        )}

        {/* About Us Section */}
        {activeTab === "about" && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About Section</h2>
            <input
              type="text"
              placeholder="Title"
              name="aboutTitle"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, aboutTitle: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              name="aboutDescription"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, aboutDescription: e.target.value })
              }
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "aboutImage")}
            />
          </div>
        )}

        {/* Culinary Creations Section */}
        {activeTab === "creations" && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Culinary Creations</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Dish Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={addCreation}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Creation
              </button>
            </div>

            <ul>
              {creations.map((creation) => (
                <li key={creation.id} className="p-3 border rounded-lg mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{creation.name}</h3>
                      <p className="text-gray-600">{creation.description}</p>
                    </div>
                    <button
                      onClick={() => removeCreation(creation.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Testimonials Section */}
        {activeTab === "testimonials" && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
            {formData.testimonials.map((testimonial, index) => (
              <div key={index} className="mb-2 border p-2 rounded">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="w-full p-2 border rounded mb-2"
                  onChange={(e) => handleChange(e, index, "testimonials")}
                />
                <input
                  type="text"
                  placeholder="Role"
                  name="role"
                  className="w-full p-2 border rounded mb-2"
                  onChange={(e) => handleChange(e, index, "testimonials")}
                />
                <textarea
                  placeholder="Testimonial"
                  name="text"
                  className="w-full p-2 border rounded"
                  onChange={(e) => handleChange(e, index, "testimonials")}
                />
              </div>
            ))}
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() =>
                addSectionItem("testimonials", { name: "", text: "", role: "" })
              }
            >
              Add Testimonial
            </button>
          </div>
        )}

        {/* Meet Our Chefs Section */}
        {activeTab === "chefs" && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Meet Our Chefs</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Chef Name"
                value={newNameChefs}
                onChange={(e) => setNewNameChefs(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Specialty"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={addChef}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Chef
              </button>
            </div>

            <ul>
              {chefs.map((chef) => (
                <li key={chef.id} className="p-3 border rounded-lg mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{chef.name}</h3>
                      <p className="text-gray-600">{chef.specialty}</p>
                    </div>
                    <button
                      onClick={() => removeChef(chef.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded w-full mt-4"
        >
          Submit
        </button>
      </div>
    </LayoutAdmins>
  );
};

export default SettingsPage;
