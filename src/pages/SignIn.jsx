import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // it prevent the refreshing here ..
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setError(true);
        return;
      }
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
    // console.log(data);
  };
  // console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={
            loading ||
            formData.email === "" ||
            formData.password === ""
          }
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Not Registered Yet ?{" "}
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
    </div>
  );
}