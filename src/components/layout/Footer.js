import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isFooterFixed, setIsFooterFixed] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenderCount(renderCount + 1);
    }, 10000);

    return () => clearTimeout(timeout); // Clean up the timeout on component unmount
  }, [renderCount]);
  useEffect(() => {
    const handleResize = () => {
      if (document.body.scrollHeight > window.innerHeight) {
        setIsFooterFixed(false);
      } else {
        setIsFooterFixed(true);
      }
    };

    if (document.readyState === "complete") {
      handleResize();
    } else {
      window.addEventListener("load", handleResize);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [document.body.scrollHeight, window.innerHeight]);
  return (
    <div
      className="bg-dark text-center text-white"
      style={{
        position: isFooterFixed ? "fixed" : "relative",
        bottom: "0",
        left: "0",
        width: "100%",
      }}
    >
      <div className="container p-2" style={{ height: "50px" }}>
        <section className="mb-0">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.facebook.com/profile.php?id=100090279665989"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://twitter.com/Mohitsa42024567"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.instagram.com/mitzz07/"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/mohit-saini-9112a9213/"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/MohitSaini90"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
      </div>

      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", height: "50px" }}
      >
        <p>E-mail: mohitsainidna@gmail.com Ph No.: 6005862206</p>
      </div>
    </div>
  );
};

export default Footer;
