import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, ImageIcon } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
    const handleLiveDemo = (e) => {
        if (!ProjectLink) {
            e.preventDefault();
            alert("Live demo link is not available");
        }
    };

    const handleDetails = (e) => {
        if (!id || !Title) {
            e.preventDefault();
            alert("Project details are not available");
        }
    };
aaa
    return (
        <div className="group relative w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-500 rounded-xl blur opacity-10 group-hover:opacity-25 transition duration-500" />

            <div className="relative overflow-hidden rounded-xl bg-neutral-950/70 backdrop-blur-lg border border-neutral-800 shadow-[0_0_35px_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_45px_rgba(255,255,255,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-neutral-500/[0.03] opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="relative p-5 z-10">
                    <div className="relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/70 aspect-[16/8]">
                        {Img ? (
                            <img
                                src={Img}
                                alt={Title || "Project image"}
                                className="w-full h-full object-cover transform group-hover:scale-105 grayscale-[15%] transition-transform duration-500"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-10 h-10 text-neutral-700" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    </div>

                    <div className="mt-4 space-y-3">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                            {Title || "Untitled Project"}
                        </h3>

                        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                            {Description || "No description available."}
                        </p>

                        <div className="pt-4 flex items-center justify-between gap-3">
                            {ProjectLink ? (
                                <a
                                    href={ProjectLink || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleLiveDemo}
                                    className="inline-flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors duration-200"
                                >
                                    <span className="text-sm font-medium">Live Demo</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            ) : (
                                <span className="text-neutral-600 text-sm">
                                    Demo Not Available
                                </span>
                            )}

                            {id && Title ? (
                                <Link
                                    to={`/project/${toSlug(Title)}`}
                                    onClick={handleDetails}
                                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20"
                                >
                                    <span className="text-sm font-semibold">Details</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <span className="text-neutral-600 text-sm">
                                    Details Not Available
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl transition-colors duration-300 -z-50" />
                </div>
            </div>
        </div>
    );
};

export default CardProject;
