"use client";
import { useForm, ValidationError } from "@formspree/react";
import { Github, Linkedin, Mail } from "lucide-react"; 
import { FooterData } from "@/app/data";
import Mag from "../Magnetic_Button/Magnetic";

const EmailSection = () => {
  const [state, handleSubmit] = useForm("mgvadaka");

  const getIcon = (iconName) => {
    switch (iconName) {
      case "github":
        return <Github size={44} />;
      case "linkedin":
        return <Linkedin size={44} />;
      case "mail":
        return <Mail size={44} />;
      default:
        return null;
    }
  };

  const handleFooterClick = (item) => {
    if (item.icon === "mail") {
      window.location.href = `mailto:${item.link}`;
    } else {
      if (item.newTab) {
        window.open(item.link, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = item.link;
      }
    }
  };

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-black text-[40px] font-extrabold">
            Your message has been sent
          </p>
        </div>

        {/* Footer */}
        <footer className="bg-black py-8">
          <div className="flex justify-center items-center gap-8">
            {FooterData.map((item, index) => (
              <button
                key={index}
                onClick={() => handleFooterClick(item)}
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-800"
                aria-label={item.label}
              >
                {getIcon(item.icon)}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] flex flex-col">
      {/* Main Content */}
      <div id="contact" className="flex-1 flex">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-center px-10">
          <h1 className="text-[8vh] mt-1 font-extrabold text-black">
            Let&apos;s Connect!
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center px-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-3/4 max-w-2xl"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="firstName" className="text-black text-lg block mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  required
                  className="bg-white border border-black-500 placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
                  placeholder="John"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="text-black text-lg block mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  required
                  className="bg-white border border-black-500 placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-black text-lg block mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="bg-white border border-black-600 placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
                placeholder="youremail@company.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="message" className="text-black text-lg block mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="bg-white border border-black-500 placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
                placeholder="Let's talk about..."
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="bg-black hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>


      <div className="py-16">
            <div className="flex justify-center items-center gap-12">

                {FooterData.map((item, index) => (
                <Mag>
                <button
                    key={index}
                    onClick={() => handleFooterClick(item)}
                    className="flex items-center gap-3 text-black hover:text-red-500  px-6 py-3 "
                    aria-label={item.label}
                >
                    {getIcon(item.icon)} 
                </button>
                </Mag>
                ))}
            </div>
            </div>
    </div>
  );
};

export default EmailSection;
