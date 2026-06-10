import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Award, Upload, Trash2, ImageIcon, Plus } from "lucide-react";

const Card = ({ children, className = "" }) => (
    <div className={`relative group ${className}`}>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-400 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />

        <div className="relative bg-neutral-950/70 backdrop-blur-xl border border-white/10 rounded-2xl h-full">
            {children}
        </div>
    </div>
);

const SkeletonCard = () => (
    <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-400 rounded-2xl blur opacity-10" />

        <div className="relative bg-neutral-950/70 border border-white/10 rounded-2xl overflow-hidden">
            <div className="w-full aspect-[16/11.5] bg-neutral-900/70 animate-pulse" />
        </div>
    </div>
);

const CertCard = ({ cert, onDelete }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-400 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />

            <div className="relative bg-neutral-950/70 border border-white/10 rounded-2xl overflow-hidden">
                {!imgLoaded && (
                    <div className="w-full aspect-[16/11.5] bg-neutral-900/70 animate-pulse" />
                )}

                {cert.img ? (
                    <img
                        src={cert.img}
                        alt="Certificate"
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full aspect-[16/11.5] object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? "block" : "hidden"
                            }`}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full aspect-[16/11.5] flex items-center justify-center bg-neutral-900/70">
                        <ImageIcon className="w-10 h-10 text-neutral-700" />
                    </div>
                )}

                {(imgLoaded || !cert.img) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <button
                            onClick={() => onDelete(cert.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs w-full justify-center hover:bg-red-500/30 transition-colors"
                        >
                            <Trash2 className="w-3 h-3" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Certificates() {
    const [certs, setCerts] = useState([]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchCerts = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("certificates")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch certificates error:", error);
            alert(error.message);
        }

        setCerts(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchCerts();
    }, []);

    const handleFile = (f) => {
        if (!f) return;

        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const uploadImage = async () => {
        if (!file) return;

        setUploading(true);

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `cert-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("certificate-images")
                .upload(fileName, file);

            if (uploadError) {
                console.error("Upload certificate error:", uploadError);
                alert(uploadError.message);
                return;
            }

            const { data } = supabase.storage
                .from("certificate-images")
                .getPublicUrl(fileName);

            const { error: insertError } = await supabase
                .from("certificates")
                .insert({
                    img: data.publicUrl,
                });

            if (insertError) {
                console.error("Insert certificate error:", insertError);
                alert(insertError.message);
                return;
            }

            setFile(null);
            setPreview(null);
            await fetchCerts();
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload certificate.");
        } finally {
            setUploading(false);
        }
    };

    const deleteCert = async (id) => {
        if (!confirm("Delete this certificate?")) return;

        const { error } = await supabase
            .from("certificates")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Delete certificate error:", error);
            alert(error.message);
            return;
        }

        fetchCerts();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-400 rounded-xl blur opacity-40" />

                    <div className="relative w-9 h-9 bg-[#050505] rounded-xl border border-white/10 flex items-center justify-center">
                        <Award className="w-4 h-4 text-neutral-300" />
                    </div>
                </div>

                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                        Certificates
                    </h1>

                    <p className="text-neutral-500 text-xs">
                        {loading ? "Loading..." : `${certs.length} certificates total`}
                    </p>
                </div>
            </div>

            <Card>
                <div className="p-5 sm:p-6 space-y-4">
                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Plus className="w-4 h-4 text-neutral-300" />
                        Upload Certificate
                    </h2>

                    <label
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            handleFile(e.dataTransfer.files[0]);
                        }}
                        className={`flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${dragOver
                                ? "border-white/40 bg-white/10"
                                : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]"
                            }`}
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="preview"
                                className="max-h-40 object-contain rounded-lg p-2"
                            />
                        ) : (
                            <div className="text-center space-y-2 p-6">
                                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                                    <ImageIcon className="w-5 h-5 text-neutral-300" />
                                </div>

                                <p className="text-sm text-neutral-300">
                                    Drag & drop or click to upload
                                </p>

                                <p className="text-xs text-neutral-600">
                                    PNG, JPG, WEBP supported
                                </p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFile(e.target.files[0])}
                            className="hidden"
                        />
                    </label>

                    {file && (
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <p className="text-xs text-neutral-400 truncate flex-1">
                                {file.name}
                            </p>

                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => {
                                        setFile(null);
                                        setPreview(null);
                                    }}
                                    className="px-3 py-1.5 rounded-xl border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-600 text-xs transition-colors"
                                >
                                    Clear
                                </button>

                                <button
                                    onClick={uploadImage}
                                    disabled={uploading}
                                    className="relative group/u"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-neutral-500 rounded-xl opacity-30 blur group-hover/u:opacity-60 transition duration-300" />

                                    <div className="relative flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-xl border border-white/10 hover:bg-neutral-200 transition-colors">
                                        {uploading ? (
                                            <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <Upload className="w-3.5 h-3.5 text-black" />
                                        )}

                                        <span className="text-xs font-semibold">
                                            {uploading ? "Uploading..." : "Upload"}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : certs.length === 0 ? (
                <Card>
                    <div className="p-16 text-center">
                        <Award className="w-10 h-10 text-neutral-700 mx-auto mb-3" />

                        <p className="text-neutral-500 text-sm">
                            No certificates yet.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {certs.map((cert) => (
                        <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />
                    ))}
                </div>
            )}
        </div>
    );
}