import React from "react";
import { BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="text-white py-12 font-poppins">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <div className="flex items-center mb-4 justify-center md:justify-start">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="ml-3 text-2xl font-bold">EduTrack</span>
          </div>
          <p className="text-gray-400">
            Empowering education through innovative technology.
          </p>
        </div>

        {/* Product */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                to="#features"
                className="hover:text-white transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4a0066")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                Features
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4a0066")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4a0066")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                Updates
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4a0066")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                Security
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4a0066")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4a0066")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-white transition-colors duration-200"
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4a0066")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social links*/}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a
              href="#"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: "#4a0066" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3d0052")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4a0066")}
            >
              <BsLinkedin />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: "#4a0066" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3d0052")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4a0066")}
            >
              <BsTwitterX />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{ backgroundColor: "#4a0066" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#3d0052")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4a0066")}
            >
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-12 text-gray-400 border-t border-gray-500 pt-8 text-sm">
        &copy; {new Date().getFullYear()} EduTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
