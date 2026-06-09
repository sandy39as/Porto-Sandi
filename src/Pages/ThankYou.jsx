import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505]">
            <div className="text-center max-w-xl bg-neutral-950/60 border border-neutral-800 rounded-3xl px-8 py-12 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
                        <CheckCircle className="relative w-16 h-16 text-neutral-100" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                    Thank You!
                </h1>

                <p className="text-neutral-400 text-lg mb-8">
                    Your message has been received. I'll get back to you as soon as possible.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98]"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ThankYouPage;