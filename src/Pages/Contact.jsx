import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        AOS.init({
            once: false,
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        Swal.fire({
            title: "Mengirim Pesan...",
            html: "Harap tunggu selagi pesan Anda dikirim.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const formSubmitUrl = "https://formsubmit.co/sandyramdani65@gmail.com";

            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("message", formData.message);
            submitData.append("_subject", "Pesan Baru dari Website Portfolio Sandi");
            submitData.append("_captcha", "false");
            submitData.append("_template", "table");

            await axios.post(formSubmitUrl, submitData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            Swal.fire({
                title: "Berhasil!",
                text: "Pesan Anda telah berhasil terkirim.",
                icon: "success",
                confirmButtonColor: "#171717",
                confirmButtonText: "OK",
                timer: 2000,
                timerProgressBar: true,
            });

            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch (error) {
            if (error.request && error.request.status === 0) {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Pesan Anda telah berhasil terkirim.",
                    icon: "success",
                    confirmButtonColor: "#171717",
                    confirmButtonText: "OK",
                    timer: 2000,
                    timerProgressBar: true,
                });

                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                Swal.fire({
                    title: "Gagal!",
                    text: "Terjadi kesalahan. Silakan coba lagi nanti.",
                    icon: "error",
                    confirmButtonColor: "#171717",
                    confirmButtonText: "OK",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-[5%] sm:px-[5%] lg:px-[10%]">
            <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
                <h2
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500"
                >
                    Contact Me
                </h2>

                <p
                    data-aos="fade-up"
                    data-aos-duration="1100"
                    className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
                >
                    Have a project, collaboration, or IT-related discussion? Send me a message and I will get back to you.
                </p>
            </div>

            <div
                className="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0"
                id="Contact"
            >
                <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
                    <div className="bg-neutral-950/60 backdrop-blur-xl rounded-3xl border border-neutral-800 shadow-[0_0_40px_rgba(255,255,255,0.04)] p-5 py-10 sm:p-10 transform transition-all duration-500 hover:border-neutral-600 hover:shadow-[0_0_45px_rgba(255,255,255,0.07)]">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                                    Get In Touch
                                </h2>

                                <p className="text-neutral-400">
                                    Want to discuss a website, data, IoT, or IT support project? Feel free to contact me.
                                </p>
                            </div>

                            <Share2 className="w-10 h-10 text-neutral-300 opacity-50" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div
                                data-aos="fade-up"
                                data-aos-delay="100"
                                className="relative group"
                            >
                                <User className="absolute left-4 top-4 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full p-4 pl-12 bg-black/30 rounded-xl border border-neutral-800 placeholder-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all duration-300 hover:border-neutral-600 disabled:opacity-50"
                                    required
                                />
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-delay="200"
                                className="relative group"
                            >
                                <Mail className="absolute left-4 top-4 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full p-4 pl-12 bg-black/30 rounded-xl border border-neutral-800 placeholder-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all duration-300 hover:border-neutral-600 disabled:opacity-50"
                                    required
                                />
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="relative group"
                            >
                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />

                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full resize-none p-4 pl-12 bg-black/30 rounded-xl border border-neutral-800 placeholder-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-neutral-500 transition-all duration-300 hover:border-neutral-600 h-[9.9rem] disabled:opacity-50"
                                    required
                                />
                            </div>

                            <button
                                data-aos="fade-up"
                                data-aos-delay="400"
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <Send className="w-5 h-5" />
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>

                        <div className="mt-10 pt-6 border-t border-neutral-800 flex justify-center space-x-6">
                            <SocialLinks />
                        </div>
                    </div>

                    <div className="bg-neutral-950/60 backdrop-blur-xl rounded-3xl border border-neutral-800 p-3 py-3 md:p-10 md:py-8 shadow-[0_0_40px_rgba(255,255,255,0.04)] transform transition-all duration-500 hover:border-neutral-600 hover:shadow-[0_0_45px_rgba(255,255,255,0.07)]">
                        <Komentar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;