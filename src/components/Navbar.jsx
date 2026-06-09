import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navItems
                .map((item) => {
                    const section = document.querySelector(item.href);

                    if (section) {
                        return {
                            id: item.href.replace("#", ""),
                            offset: section.offsetTop - 550,
                            height: section.offsetHeight,
                        };
                    }

                    return null;
                })
                .filter(Boolean);

            const currentPosition = window.scrollY;

            const active = sections.find(
                (section) =>
                    currentPosition >= section.offset &&
                    currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();

        const section = document.querySelector(href);

        if (section) {
            const top = section.offsetTop - 100;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }

        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${isOpen
                    ? "bg-[#050505] border-neutral-800"
                    : scrolled
                        ? "bg-[#050505]/70 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                        : "bg-transparent border-transparent"
                }`}
        >
            <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent hover:from-neutral-200 hover:to-white transition-all duration-300"
                        >
                            Sandi Aditya Ramdani
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.substring(1);

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className="group relative px-1 py-2 text-sm font-medium"
                                    >
                                        <span
                                            className={`relative z-10 transition-colors duration-300 ${isActive
                                                    ? "text-white font-semibold"
                                                    : "text-neutral-400 group-hover:text-white"
                                                }`}
                                        >
                                            {item.label}
                                        </span>

                                        <span
                                            className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-neutral-500 transform origin-left transition-transform duration-300 ${isActive
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                                }`}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-neutral-300 hover:text-white transition-transform duration-300 ease-in-out transform ${isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                                }`}
                            aria-label="Toggle navigation menu"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out bg-[#050505]/95 backdrop-blur-xl border-b border-neutral-800 ${isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden border-transparent"
                    }`}
            >
                <div className="px-4 py-6 space-y-4">
                    {navItems.map((item, index) => {
                        const isActive = activeSection === item.href.substring(1);

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ease ${isActive
                                        ? "text-white bg-white/10 border border-white/10"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                    opacity: isOpen ? 1 : 0,
                                }}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;