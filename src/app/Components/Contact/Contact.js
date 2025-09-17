"use client";
import { useForm, ValidationError } from "@formspree/react";
import { Github, Linkedin, Mail } from "lucide-react"; 
import { FooterData } from "@/app/data";
import Mag from "../Magnetic_Button/Magnetic";

const EmailSection = () => {
  const [state, handleSubmit] = useForm("mgvadaka");

  // Function to return icons
  const getIcon = (iconName, className = "w-8 h-8") => {
    if (iconName === "github") return <Github className={className} />;
    if (iconName === "linkedin") return <Linkedin className={className} />;
    if (iconName === "mail") return <Mail className={className} />;
    return null;
  };

  // Handle footer icon clicks
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

  // Success state
  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-black text-[6vh] md:text-[8vh] font-extrabold text-center">
            Your message has been sent
          </p>
        </div>

        {/* Footer */}
        <footer className="py-18">
          {/* Footer Icons */}
          <div className="">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {FooterData.map((item, index) => {
                let hoverClass = "";
                if (item.icon === "github") hoverClass = "hover:bg-black hover:text-white";
                if (item.icon === "linkedin") hoverClass = "hover:bg-blue-600 hover:text-white";
                if (item.icon === "mail") hoverClass = "hover:bg-red-600 hover:text-white";

                return (
                  <Mag key={index}>
                  <button
                    key={index}
                    onClick={() => handleFooterClick(item)}
                    className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full  text-black transition-all duration-200 ${hoverClass}`}
                    aria-label={item.label}
                  >
                    {getIcon(item.icon, "w-8 h-8 md:w-10 md:h-10")}
                  </button>
                  </Mag>
                );
              })}
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Default state
  return (
    <div className="min-h-screen bg-[#FCFCFC] flex flex-col w-full">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-10 py-10 md:py-0">
          <h1 className="text-[6vh] md:text-[8vh] font-extrabold text-black text-center">
            Let&apos;s Connect!
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-lg"
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
                  className="bg-white border border-black placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
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
                  className="bg-white border border-black placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
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
                className="bg-white border border-black placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
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
                className="bg-white border border-black placeholder-gray-500 text-black text-sm rounded-lg w-full p-4"
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

      {/* Footer Icons */}
      <div className="py-16">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {FooterData.map((item, index) => {
            let hoverClass = "";
            if (item.icon === "github") hoverClass = "hover:bg-black hover:text-white";
            if (item.icon === "linkedin") hoverClass = "hover:bg-blue-600 hover:text-white";
            if (item.icon === "mail") hoverClass = "hover:bg-red-600 hover:text-white";

            return (
              <Mag key = {index}>
              <button
                key={index}
                onClick={() => handleFooterClick(item)}
                className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full  text-black transition-all duration-200 ${hoverClass}`}
                aria-label={item.label}
              >
                {getIcon(item.icon, "w-8 h-8 md:w-10 md:h-10")}
              </button>
              </Mag>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmailSection;