import React, { useState, useEffect } from "react";
import axios from "axios";
import loginImage from "../assets/images/login1.png";
import { Link } from "react-router";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  // State to track mobile responsiveness dynamically
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Triggers mobile layout below 768px
    };

    // Run on mount and bind event
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/examinee/login`, data);

      if (res.data.message === "Login Successfully") {
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        window.location.href = "/userdash/";
      } else {
        alert("Invalid credentials. Please try again.");
        setData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh", // Changed from height to minHeight to prevent content cuts on small devices
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
      fontFamily: "Segoe UI, sans-serif",
      padding: isMobile ? "20px" : "0" // Prevents the card from hitting screen edges on mobile
    },
    card: {
      width: "100%",
      maxWidth: "900px", // Allows scaling down below 900px
      minHeight: isMobile ? "auto" : "520px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Key change for structural responsiveness
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      backgroundColor: "#fff"
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #570c78ff, #593a78, #8b44d2ff)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      padding: isMobile ? "40px 20px" : "30px" // Adjusted padding for mobile screens
    },
    subheading: {
      color: "#d4a3ffff",
      fontSize: isMobile ? "24px" : "30px", // Slightly smaller titles on mobile
      marginBottom: "5px",
      textAlign: "center"
    },
    welcomeText: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "600",
      marginBottom: "10px",
      zIndex: 1,
      color: "#9582bcff",
      textAlign: "center"
    },
    subText: {
      fontSize: "14px",
      opacity: 0.9,
      zIndex: 1,
      textAlign: "center",
      maxWidth: "340px"
    },
    rightPanel: {
      flex: 1,
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: isMobile ? "40px 20px" : "30px"
    },
    formBox: {
      width: "100%",
      maxWidth: "320px"
    },
    heading: {
      fontSize: isMobile ? "32px" : "40px",
      marginBottom: "2px",
      fontWeight: "600",
      display: "inline-block",
      borderBottom: "4px solid",
      color: "#4a0b65ff"
    },
    label: {
      fontSize: "15px",
      fontWeight: "500",
      marginBottom: "4px",
      display: "block" // Ensures labels sit perfectly on top of inputs
    },
    input: {
      width: "100%",
      padding: "12px 10px", // Touch targets slightly scaled up for mobile fingers
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      marginBottom: "15px",
      outline: "none",
      boxSizing: "border-box" // Critical rule to prevent input fields from overflowing the container
    },
    submitBtn: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "6px",
      background: "linear-gradient(to right, #3a0451ff, #7827c0ff)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "15px",
      marginTop: "5px"
    },
    checkbox: {
      marginTop: "8px",
      fontSize: "13px",
      display: "flex",
      alignItems: "flex-start",
      gap: "6px" // Keeps checkbox nicely aligned with text wrapper
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          {/* Only display the heavy image asset on desktop views */}
          {!isMobile && (
            <img
              src={loginImage}
              alt="Login Illustration"
              style={{ width: "340px", marginBottom: "20px", zIndex: 1 }}
            />
          )}

          <div style={styles.subheading}>Welcome to Examprep!</div>
          <div style={styles.welcomeText}>"Your Journey Starts Here"</div>
          <div style={styles.subText}>
            "Login to view your exams, results, and profile — all in one smart dashboard."
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} style={styles.formBox} method="POST">
            <div style={{ textAlign: "center" }}>
              <div className="border-b-2" style={styles.heading}>
                User Login
              </div>
            </div>
            <br />

            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={handleChange}
              value={data.email}
              style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              required
              onChange={handleChange}
              value={data.password}
              style={styles.input}
            />

            <button type="submit" style={styles.submitBtn}>
              Login
            </button>

            <div style={styles.checkbox}>
              <input type="checkbox" id="exampleCheck1" style={{ marginTop: "3px" }} />
              <label htmlFor="exampleCheck1">
                Don't have an account? <Link to="/register">Register here</Link>.
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;