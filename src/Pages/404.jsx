import React from "react";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFoundPage() {
    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neutral-500/10 rounded-full blur-[150px]" />

            <div className="relative text-center max-w-2xl bg-neutral-950/60 border border-neutral-800 rounded-3xl px-8 py-12 shadow-[0_0_45px_rgba(255,255,255,0.05)] backdrop-blur-xl">
                {/* 404 Number */}
                <div className="mb-8">
                    <h1 className="text-8xl md:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600 animate-pulse">
                        404
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-white to-neutral-500 mx-auto rounded-full" />
                </div>

                {/* Illustration */}
                <div className="mb-8 flex justify-center">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl" />
                        <Search className="relative w-12 h-12 md:w-14 md:h-14 text-neutral-200" />
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-base md:text-lg text-neutral-400 max-w-md mx-auto leading-relaxed">
                        The page you are looking for may have been moved, deleted, or does not exist.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-neutral-900 text-neutral-200 rounded-xl border border-neutral-800 hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.03)]"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                    >
                        <Home size={20} />
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}