const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-[#050505] px-[5%] sm:px-[5%] lg:px-[10%]">
            <div className="mx-auto text-center">
                <hr className="my-3 border-neutral-800 opacity-80 sm:mx-auto lg:my-6" />

                <span className="block text-sm pb-6 text-neutral-500 text-center">
                    © {currentYear}{" "}
                    <a
                        href="https://www.linkedin.com/in/sandiadityaramdani/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-300 hover:text-white hover:underline transition-colors"
                    >
                        Sandi Aditya Ramdani
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;