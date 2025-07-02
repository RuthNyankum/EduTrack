import React from 'react';
import { features } from '../constant/features';
import heroImg from '../assets/images/dashboard.png';

const Home = () => {
  return (
    <main className="bg-primaryPurple">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-white text-gray-900 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-32 grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight text-gray-900">
              Empowering <br />
              <span className="text-primaryPurple">Education</span> <br />
              Through Technology
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-700">
              Connect parents, teachers, and students in one comprehensive
              platform. Track progress, manage attendance, and enhance learning
              outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#features"
                className="border-2 border-primaryPurple text-primaryPurple px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all"
              >
                View Features
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-4 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl flex items-center justify-center">
              <img
                src={heroImg}
                alt="EduTrack Dashboard Preview"
                className="rounded-xl w-full h-full max-w-lg object-contain m-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Platform Features
          </h2>
          <p className="text-white max-w-2xl mx-auto mb-12 text-lg ">
            Everything you need to manage educational activities in one
            comprehensive platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* the features are in the constant folder so i mapped it here */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-purple-300/50 transition"
              >
                <div className="text-4xl mb-4 text-primaryPurple">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-10 text-white text-center" id="contact">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-4">Contact Us</h2>
          <p className="text-lg mb-6">
            We'd love to hear from you. Reach out via email and we'll get back
            to you shortly.
          </p>

          <div className="flex justify-center">
            <a
              href="mailto:support@edutrack.com"
              className="border-2 border-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-primaryPurple"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
