import { useEffect, useState } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { educationData } from "@/app/data";
export default function EducationTimeline() {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    educationData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 200);
    });
  }, []);

  return (
    <section className="min-h-screen bg-[#FCFCFC] ">
      <div className="w-screen min-h-screen gap-10 p-6 sm:p-6">
        {/* Header - Aligned like skills */}
        <div className="text-center mt-20 mb-20">
          <h1 className="text-[8vh] font-bold bg-clip-text text-black mb-4">
            Education
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
      </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block relative">
          {/* Horizontal Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-black transform -translate-y-1/2 z-0">
            <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-[#FCFCFC] to-transparent"></div>
            <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-[#FCFCFC] to-transparent"></div>
          </div>

          {/* Timeline Items - Horizontal */}
          <div className="flex items-center justify-between relative z-10 px-8">
            {educationData.map((item, index) => {
              const isVisible = visibleItems.includes(index);
              const isAbove = index % 2 === 0;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  {/* Card Above Timeline */}
                  {isAbove && (
                    <div
                      className={`mb-8 w-80 transform transition-all duration-700 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                            {item.icon}
                            {item.year}
                          </div>
                          {item.status === "ongoing" && (
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                              In Progress
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-black mb-3 text-lg leading-tight">
                          {item.institution}
                        </h3>
                        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{item.degree}</p>
                        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold inline-block border border-blue-200">
                          {item.score}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline Dot */}
                  <div
                    className={`w-5 h-5 bg-black rounded-full border-4 border-white shadow-xl z-20 relative ${
                      item.status === "ongoing" ? "ring-4 ring-blue-200 ring-opacity-50" : ""
                    }`}
                  ></div>

                  {/* Card Below Timeline */}
                  {!isAbove && (
                    <div
                      className={`mt-8 w-80 transform transition-all duration-700 ${
                        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                            {item.icon}
                            {item.year}
                          </div>
                          {item.status === "ongoing" && (
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                              In Progress
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-black mb-3 text-lg leading-tight">
                          {item.institution}
                        </h3>
                        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{item.degree}</p>
                        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold inline-block border border-blue-200">
                          {item.score}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden relative max-w-2xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-black">
            <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-[#FCFCFC] to-transparent"></div>
            <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-[#FCFCFC] to-transparent"></div>
          </div>

          {/* Timeline Items - Vertical */}
          <div className="space-y-6 overflow-y-auto max-h-[70vh] p-4 pr-8">
            {educationData.map((item, index) => {
              const isVisible = visibleItems.includes(index);

              return (
                <div key={index} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div
                    className={`w-5 h-5 bg-black rounded-full border-4 border-white shadow-xl mt-6 relative z-10 ${
                      item.status === "ongoing" ? "ring-4 ring-blue-200 ring-opacity-50" : ""
                    }`}
                  ></div>

                  {/* Content Card */}
                  <div
                    className={`ml-12 flex-1 transform transition-all duration-700 ${
                      isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-blue-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                          {item.icon}
                          {item.year}
                        </div>
                        {item.status === "ongoing" && (
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                            In Progress
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-black mb-3 text-lg leading-tight">
                        {item.institution}
                      </h3>
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">{item.degree}</p>
                      <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold inline-block border border-blue-200">
                        {item.score}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}