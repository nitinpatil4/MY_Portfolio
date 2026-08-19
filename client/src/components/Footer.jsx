const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a
            href="https://github.com/nitinpatil4"
           
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href= "https://www.linkedin.com/in/nitinpatil3449/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a href="mailto:np200456@gmail.com" aria-label="Email">
            Email
          </a>
        </div>
        <p>&copy; {year} Nitin Patil. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
