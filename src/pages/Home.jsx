import React, { useEffect, useState } from "react";
import Layouts from "../layouts/Layouts";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import axios from "axios";

export default function Home() {
  const testimonials = [
    {
      text: "Absolutely the best dining experience! The steak was cooked to perfection, and the ambiance was delightful.",
      name: "Sophia Williams",
      role: "Food Critic",
    },
    {
      text: "A must-visit spot for food lovers! Their pasta dishes are divine, and the service was exceptional.",
      name: "James Anderson",
      role: "Chef & Food Blogger",
    },
    {
      text: "Incredible flavors and beautifully plated dishes. Every bite was a burst of taste and texture!",
      name: "Olivia Brown",
      role: "Restaurant Enthusiast",
    },
  ];

  const [hero, setHero] = useState(null);

  useEffect(() => {
    // Fetch the hero data from the API
    axios.get('http://localhost:8000/api/v1/settings/hero')
      .then(response => {
        setHero(response.data); // Store the response data in state
      })
      .catch(error => {
        console.error('Error fetching hero data:', error);
      });
  }, []);

  return (
    <Layouts>
      <div className="font-sans text-gray-900">
        {/* Hero Section */}
        <section
            className={`relative bg-cover bg-center bg-no-repeat text-white py-20 px-5 text-center`}
            style={{ backgroundImage: `url('http://localhost:8000/storage/${hero?.length > 0 ? hero[0]?.thumbnail : ''}')` }}
        >
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">
                    {hero?.length > 0 ? hero[0]?.name : ''}
                </h1>
                <p className="text-lg opacity-80">
                    {hero?.length > 0 ? hero[0]?.description : ''}
                </p>
                <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                    {hero?.length > 0 ? hero[0]?.button_text : ''}
                </button>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Dine With Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition">
                <div className="mb-4 text-orange-600">
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 555.519 555.519"
                  >
                    <g>
                      <g>
                        <path
                          d="M6.147,313.614c7.503-2.044,15.443-3.289,22.102-6.899c19.955-10.816,39.617-22.265,58.744-34.484
                                                c16.871-10.779,34.056-10.628,55.304-6.394c1.106,0.221,1.273,0.955,0.372,1.633c-1.245,0.934-2.281,1.709-3.093,2.317
                                                c-0.902,0.677-1.008,1.889-0.245,2.717c26.292,28.36,52.367,57.487,79.956,85.108c5.063,5.067,18.789,7.834,24.717,4.631
                                                c31.273-16.895,63.003-12.9,94.897-5.989c1.102,0.237,1.37,1.106,0.652,1.975c-19.099,23.085,2.224,49.267-3.284,74.191
                                                c-0.245,1.102,0.261,1.469,1.179,0.815c17.671-12.566,28.018-29.898,32.534-49.841c4.517-19.943,12.199-27.776,35.002-30.963
                                                c28.344-3.962,56.247-17.397,82.082-31.029c21.864-11.538,40.608-29.049,60.49-44.23c2.97-2.268,5.083-5.667,7.405-8.789
                                                c0.673-0.905,0.755-2.383,0.146-3.333c-0.131-0.208-0.266-0.412-0.399-0.62c-0.608-0.946-1.979-1.457-3.061-1.143
                                                c-7.193,2.109-14.41,4.228-21.877,6.414c-1.081,0.318-1.958-0.339-2.027-1.465c-0.099-1.641-0.221-2.962,0.135-4.142
                                                c9.465-31.444,6.687-36.193-24.501-48.262c-12.795-4.953-24.341-13.146-37.145-18.07c-16.287-6.267-33.02-11.901-50.041-15.582
                                                c-14.708-3.178-30.065-3.721-45.182-4.561c-17.638-0.983-32.693-5.769-45.268-19.54c-11.763-12.876-25.565-23.884-38.564-35.598
                                                c-0.836-0.755-2.109-0.686-2.855,0.163c-21.596,24.558-41.796,47.532-62.959,71.592c-0.742,0.845-0.526,1.934,0.486,2.428
                                                c4.235,2.072,8.054,3.937,12.371,6.046c1.012,0.494,1.248,1.604,0.612,2.534c-0.902,1.314-1.562,2.395-2.416,2.579
                                                c-52.893,11.297-105.533,22.485-153.763-15.7c-12.224-9.678-27.087-16.149-41.102-23.383c-5.871-3.031-12.554-4.496-23.064-7.927
                                                c-1.069-0.351-1.714,0.249-1.424,1.334c6.728,25.174,19.033,41.441,33.689,56.039c21.559,21.478,21.126,20.653-2.297,41.335
                                                c-15.696,13.859-29.311,30.069-43.762,45.34c-0.775,0.82-0.922,2.252-0.326,3.207c0.914,1.457,1.824,2.917,2.738,4.374
                                                C3.704,313.397,5.062,313.908,6.147,313.614z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Exquisite Flavors
                </h3>
                <p className="text-gray-600">
                  Indulge in our chef-crafted dishes made with the freshest
                  ingredients.
                </p>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition">
                <div className="mb-4 text-orange-600">
                  <svg
                    style={{
                      fill: "none",
                      stroke: "#000000",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }}
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path class="a" d="M17.76,4.5V41.94" />
                    <path class="a" d="M20.88,16.98V43.5" />
                    <path class="a" d="M24,8.4V34.92" />
                    <path class="a" d="M27.12,11.52V38.04" />
                    <path class="a" d="M30.24,8.4V34.92" />
                    <path class="a" d="M33.36,18.54v11.7" />
                    <path class="a" d="M14.64,12.3V36.48" />
                    <path class="a" d="M11.52,20.1v7.8" />
                    <path class="a" d="M36.48,20.1v7.8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Ambience & Comfort
                </h3>
                <p className="text-gray-600">
                  Experience a warm, elegant setting perfect for any occasion.
                </p>
              </div>
              <div className="p-6 border rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition">
                <div className="mb-4 text-orange-600">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4V5.23906C17.5964 6.12596 20.25 9.37719 20.25 13.2482C20.25 13.6625 19.9142 13.9982 19.5 13.9982H4.5C4.08579 13.9982 3.75 13.6625 3.75 13.2482C3.75 9.38757 6.41773 6.1499 10 5.24922V4ZM13.25 7.5C12.8358 7.5 12.5 7.83579 12.5 8.25C12.5 8.66421 12.8358 9 13.25 9C14.5032 9 15.3927 9.61836 16.1355 10.68C16.3729 11.0193 16.8406 11.102 17.18 10.8645C17.5193 10.6271 17.602 10.1594 17.3645 9.82004C16.4346 8.49093 15.136 7.5 13.25 7.5Z"
                      fill="#212121"
                    />
                    <path
                      d="M2 17C2 15.8954 2.89543 15 4 15H20C21.1046 15 22 15.8954 22 17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z"
                      fill="#212121"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Exceptional Service
                </h3>
                <p className="text-gray-600">
                  Our staff is dedicated to providing top-tier hospitality and
                  care.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-5 bg-gray-100" id="about-us">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-4">About Us</h2>
              <p className="text-gray-700">
                Perfect Restaurant is a place where culinary excellence meets
                cozy ambiance. Our chefs prepare the finest dishes using only
                the best ingredients.
              </p>
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition">
                Learn More
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/restaurant-2.jpg"
                alt="Chef in Kitchen"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-5 bg-gray-100" id="gallery">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-orange-600">
              Our Culinary Creations
            </h2>
            <p className="text-gray-600 mb-10">
              Experience the artistry of our kitchen through these mouthwatering
              delights.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/images/dish-1.jpg"
                  alt="Gourmet Dish"
                  className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/images/dish-2.jpg"
                  alt="Delicious Platter"
                  className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/images/dish-3.jpg"
                  alt="Fine Dining Experience"
                  className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-orange-50 py-20 px-5" id="testimonials">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl font-bold text-orange-700 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              What Our Guests Say
            </motion.h2>

            {/* Swiper Carousel with Autoplay */}
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide every 3 sec
              modules={[Autoplay]}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-orange-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <p className="text-lg italic text-gray-700">
                      "{testimonial.text}"
                    </p>
                    <p className="mt-4 text-orange-600 font-semibold">
                      - {testimonial.name}, {testimonial.role}
                    </p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="py-20 px-5 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-orange-600">
              Meet Our Chefs
            </h2>
            <p className="text-gray-600 mb-10">
              Our expert chefs bring years of experience and passion to create
              the finest culinary delights.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Chef 1 */}
              <div className="rounded-lg shadow-lg p-6 text-center">
                <img
                  src="/images/chef-1.jpg"
                  alt="Chef Clemist"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Clemist</h3>
                <p className="text-gray-500">Executive Chef Clemist</p>
                <p className="mt-2 text-gray-600">
                  Passionate about gourmet cuisine, Chef Clemist crafts dishes that
                  leave a lasting impression.
                </p>
              </div>

              {/* Chef 2 */}
              <div className="rounded-lg shadow-lg p-6 text-center">
                <img
                  src="/images/chef-2.jpg"
                  alt="Chef Jhou Ci"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Jhou Ci</h3>
                <p className="text-gray-500">Pastry Chef</p>
                <p className="mt-2 text-gray-600">
                  Jhou delectable pastries and desserts bring a perfect sweet
                  ending to any meal.
                </p>
              </div>

              {/* Chef 3 */}
              <div className="rounded-lg shadow-lg p-6 text-center">
                <img
                  src="/images/chef-3.jpg"
                  alt="Chef Michael Lhungguh"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Michael Lhungguh</h3>
                <p className="text-gray-500">Sous Chef</p>
                <p className="mt-2 text-gray-600">
                  Michael ensures that every dish is a masterpiece, combining
                  technique and artistry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 text-white py-6 text-center">
          <p>&copy; 2025 Restaurant Website. All Rights Reserved.</p>
        </footer>
      </div>
    </Layouts>
  );
}
