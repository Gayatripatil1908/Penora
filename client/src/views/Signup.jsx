import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupUser = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/signup`,
      user
    );

    console.log(response.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19183B] via-[#708993] to-[#A1C2BD] relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#19183B] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#19183B]/50 via-[#708993]/30 to-[#A1C2BD]/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(231, 242, 239, 0.1) 0%, rgba(161, 194, 189, 0.05) 25%, transparent 50%)'
        }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-[#E7F2EF]/10 backdrop-blur-xl rounded-xl p-8 shadow-[0_8px_32px_0_rgba(25,24,59,0.37)] border border-[#E7F2EF]/20 relative z-10"
      >
        <div>
          <h1 className="text-center text-4xl font-extrabold text-[#E7F2EF] mb-8 tracking-tight drop-shadow-lg">
            Create Account
          </h1>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <input
                type="name"
                placeholder="Name"
                className="appearance-none relative block w-full px-4 py-3 border border-[#E7F2EF]/30 placeholder-[#E7F2EF]/70 text-[#E7F2EF] bg-[#19183B]/20 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50 focus:border-transparent transition duration-150 ease-in-out shadow-inner"
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="appearance-none relative block w-full px-4 py-3 border border-[#E7F2EF]/30 placeholder-[#E7F2EF]/70 text-[#E7F2EF] bg-[#19183B]/20 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50 focus:border-transparent transition duration-150 ease-in-out shadow-inner"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="appearance-none relative block w-full px-4 py-3 border border-[#E7F2EF]/30 placeholder-[#E7F2EF]/70 text-[#E7F2EF] bg-[#19183B]/20 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50 focus:border-transparent transition duration-150 ease-in-out shadow-inner"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-3 px-4 text-lg font-semibold rounded-lg text-[#E7F2EF] bg-gradient-to-r from-[#19183B]/80 to-[#708993]/80 hover:from-[#19183B] hover:to-[#708993] backdrop-blur-md border border-[#E7F2EF]/20 focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg shadow-md"
              type="button"
              onClick={signupUser}
            >
              Sign up
            </button>
          </div>

          <div className="text-center">
            <p className="text-[#E7F2EF]/90 text-lg">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-medium text-[#A1C2BD] hover:text-[#E7F2EF] transition-colors duration-150 border-b-2 border-[#A1C2BD]/30 hover:border-[#E7F2EF]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;