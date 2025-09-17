<div id="contact" className="flex flex-col md:flex-row flex-1 w-full">
  {/* Left Side */}
  <div className="flex-1 flex items-center justify-center px-4 md:px-10 mb-10 md:mb-0">
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
