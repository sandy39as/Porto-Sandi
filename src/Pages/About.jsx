import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
    <div className="text-center lg:mb-8 mb-2 px-[5%]">
        <div className="inline-block relative group">
            <h2
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500"
                data-aos="zoom-in-up"
                data-aos-duration="600"
            >
                About Me
            </h2>
        </div>

        <p
            className="mt-2 text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
            data-aos="zoom-in-up"
            data-aos-duration="800"
        >
            <Sparkles className="w-5 h-5 text-neutral-300" />
            Building practical digital solutions through web, data, and IoT
            <Sparkles className="w-5 h-5 text-neutral-300" />
        </p>
    </div>
));

const ProfileImage = memo(() => (
    <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
        <div
            className="relative group"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-neutral-300/20 to-neutral-600/20 rounded-full blur-2xl animate-spin-slower" />
                <div className="absolute inset-0 bg-gradient-to-l from-neutral-200/20 via-neutral-500/20 to-white/10 rounded-full blur-2xl animate-pulse-slow opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-neutral-400/20 to-neutral-700/20 rounded-full blur-2xl animate-float opacity-50" />
            </div>

            <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.12)] transform transition-all duration-700 group-hover:scale-105">
                    <div className="absolute inset-0 border-4 border-white/15 rounded-full z-20 transition-all duration-700 group-hover:border-white/35 group-hover:scale-105" />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-neutral-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

                    <img
                        src="/sandiaditya/Photo.jpg"
                        alt="Sandi Aditya Ramdani"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                        loading="lazy"
                    />

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
                        <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
                    </div>
                </div>
            </div>
        </div>
    </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
    <div data-aos={animation} data-aos-duration={1300} className="relative group">
        <div className="relative z-10 bg-neutral-950/60 backdrop-blur-lg rounded-2xl p-6 border border-neutral-800 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-neutral-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] h-full flex flex-col justify-between">
            <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300`}></div>

            <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-transform group-hover:rotate-6">
                    <Icon className="w-8 h-8 text-white" />
                </div>

                <span
                    className="text-4xl font-bold text-white"
                    data-aos="fade-up-left"
                    data-aos-duration="1500"
                    data-aos-anchor-placement="top-bottom"
                >
                    {value}
                </span>
            </div>

            <div>
                <p
                    className="text-sm uppercase tracking-wider text-neutral-300 mb-2"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-anchor-placement="top-bottom"
                >
                    {label}
                </p>

                <div className="flex items-center justify-between">
                    <p
                        className="text-xs text-neutral-500"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="top-bottom"
                    >
                        {description}
                    </p>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    </div>
));

const AboutPage = () => {
    const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
        const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

        const startDate = new Date("2021-11-06");
        const today = new Date();

        const experience = today.getFullYear() - startDate.getFullYear() -
            (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

        return {
            totalProjects: storedProjects.length,
            totalCertificates: storedCertificates.length,
            YearExperience: experience
        };
    }, []);

    useEffect(() => {
        const initAOS = () => {
            AOS.init({
                once: false,
            });
        };

        initAOS();

        let resizeTimer;

        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initAOS, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    const statsData = useMemo(() => [
        {
            icon: Code,
            color: "from-white to-neutral-500",
            value: totalProjects,
            label: "Total Projects",
            description: "Web, mobile, data, and IoT solutions",
            animation: "fade-right",
        },
        {
            icon: Award,
            color: "from-neutral-200 to-neutral-700",
            value: totalCertificates,
            label: "Certificates",
            description: "Validated learning and professional growth",
            animation: "fade-up",
        },
        {
            icon: Globe,
            color: "from-white to-neutral-500",
            value: YearExperience,
            label: "Years of Experience",
            description: "Continuous improvement in technology",
            animation: "fade-left",
        },
    ], [totalProjects, totalCertificates, YearExperience]);

    return (
        <div
            className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
            id="About"
            itemScope
            itemType="https://schema.org/Person"
        >
            <Header />

            <div className="w-full mx-auto pt-8 sm:pt-12 relative">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="space-y-6 text-center lg:text-left">
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
                            data-aos="fade-right"
                            data-aos-duration="1000"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                                Hello, I'm
                            </span>

                            <span
                                className="block mt-2 text-neutral-100"
                                data-aos="fade-right"
                                data-aos-duration="1300"
                                itemProp="name"
                            >
                                Sandi Aditya Ramdani
                            </span>
                        </h2>

                        <p
                            className="text-base sm:text-lg lg:text-xl text-neutral-400 leading-relaxed text-justify pb-4 sm:pb-0"
                            data-aos="fade-right"
                            data-aos-duration="1500"
                        >
                            I am an Information Systems graduate with a strong interest in web development,
                            data analysis, IT support, and IoT-based system development. I focus on building
                            practical digital solutions that help improve business operations, automate workflows,
                            and present information clearly through reliable applications and dashboards.
                        </p>

                        <div
                            className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-4 my-6 backdrop-blur-md shadow-[0_0_35px_rgba(255,255,255,0.04)] overflow-hidden"
                            data-aos="fade-up"
                            data-aos-duration="1700"
                        >
                            <div className="absolute top-2 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-neutral-400/10 rounded-full blur-lg"></div>

                            <div className="absolute top-3 left-4 text-neutral-200 opacity-30">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                </svg>
                            </div>

                            <blockquote className="text-neutral-300 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
                                "Technology is most valuable when it solves real problems and makes work easier."
                            </blockquote>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
                            <a
                                href="https://drive.google.com/drive/folders/1PP-gCzyTtn7e96pDU2hZTYO0E6yK3Z7c?usp=drive_link"
                                className="w-full lg:w-auto"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button
                                    data-aos="fade-up"
                                    data-aos-duration="800"
                                    className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-white text-black font-semibold transition-all duration-300 hover:scale-105 hover:bg-neutral-200 flex items-center justify-center lg:justify-start gap-2 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                                >
                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Download CV
                                </button>
                            </a>

                            <a href="#Portofolio" className="w-full lg:w-auto">
                                <button
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-white/20 text-neutral-300 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-white/10 hover:text-white"
                                >
                                    <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                                    View Projects
                                </button>
                            </a>
                        </div>
                    </div>

                    <ProfileImage />
                </div>

                <a href="#Portofolio">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
                        {statsData.map((stat) => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>
                </a>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes spin-slower {
                    to { transform: rotate(360deg); }
                }

                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }

                .animate-pulse-slow {
                    animation: pulse 3s infinite;
                }

                .animate-spin-slower {
                    animation: spin-slower 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default memo(AboutPage);