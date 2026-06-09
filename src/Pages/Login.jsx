import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

        console.log("USER ID:", data.user.id);
        console.log("PROFILE:", profile);
        console.log("PROFILE ERROR:", profileError);

        if (profileError) {
            alert("Profile error: " + profileError.message);
            await supabase.auth.signOut();
            setLoading(false);
            return;
        }

        if (profile?.role !== "admin") {
            alert("Access denied. Role: " + (profile?.role || "not found"));
            await supabase.auth.signOut();
            setLoading(false);
            return;
        }

        setLoading(false);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neutral-500/10 rounded-full blur-[150px]" />

            <div className="relative w-full max-w-md">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />

                    <div className="relative bg-neutral-950/70 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 space-y-7 shadow-[0_0_45px_rgba(255,255,255,0.04)]">
                        {/* Header */}
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                                <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                                <span className="text-neutral-300 text-xs font-medium">
                                    Admin Portal
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                                Welcome Back
                            </h1>

                            <p className="text-neutral-400 text-sm">
                                Sign in to manage your portfolio
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs text-neutral-500 uppercase tracking-wider">
                                    Email
                                </label>

                                <div className="flex items-center bg-black/30 border border-neutral-800 rounded-xl overflow-hidden focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-white/10 transition-all duration-300">
                                    <Mail className="w-4 h-4 text-neutral-500 ml-4 shrink-0" />

                                    <input
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-transparent px-3 py-3 text-neutral-100 placeholder-neutral-600 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs text-neutral-500 uppercase tracking-wider">
                                    Password
                                </label>

                                <div className="flex items-center bg-black/30 border border-neutral-800 rounded-xl overflow-hidden focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-white/10 transition-all duration-300">
                                    <Lock className="w-4 h-4 text-neutral-500 ml-4 shrink-0" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-transparent px-3 py-3 text-neutral-100 placeholder-neutral-600 text-sm outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="mr-4 shrink-0 text-neutral-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="relative group/btn w-full mt-1"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-500 rounded-xl opacity-30 blur group-hover/btn:opacity-60 transition duration-300" />

                                <div className="relative h-11 bg-white rounded-xl border border-white/10 flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 group-hover/btn:bg-neutral-200">
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span className="relative text-sm font-semibold text-black">
                                                Sign In
                                            </span>
                                            <LogIn className="relative w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}