import React, { useState } from "react";
import {
    Modal,
    IconButton,
    Box,
    Backdrop,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { ImageIcon } from "lucide-react";
aaa
const Certificate = ({ ImgSertif }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (!ImgSertif) return;
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box component="div" sx={{ width: "100%" }}>
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backgroundColor: "rgba(10,10,10,0.7)",
                    boxShadow: "0 0 35px rgba(255,255,255,0.04)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: ImgSertif ? "pointer" : "default",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        borderColor: "rgba(255,255,255,0.22)",
                        boxShadow: "0 0 45px rgba(255,255,255,0.08)",
                        "& .overlay": {
                            opacity: 1,
                        },
                        "& .hover-content": {
                            transform: "translate(-50%, -50%)",
                            opacity: 1,
                        },
                        "& .certificate-image": {
                            filter: "contrast(1.08) brightness(0.95) grayscale(10%)",
                            transform: "scale(1.04)",
                        },
                    },
                }}
            >
                {ImgSertif ? (
                    <Box
                        sx={{
                            position: "relative",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
                                zIndex: 1,
                            },
                        }}
                    >
                        <img
                            className="certificate-image"
                            src={ImgSertif}
                            alt="Certificate"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                objectFit: "cover",
                                filter: "contrast(1.05) brightness(0.9) grayscale(8%)",
                                transition: "all 0.4s ease",
                                aspectRatio: "16/11.5",
                            }}
                            onClick={handleOpen}
                            loading="lazy"
                        />
                    </Box>
                ) : (
                    <div className="aspect-[16/11.5] flex items-center justify-center bg-neutral-950/70">
                        <ImageIcon className="w-10 h-10 text-neutral-700" />
                    </div>
                )}

                {ImgSertif && (
                    <Box
                        className="overlay"
                        sx={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0,
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            zIndex: 2,
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))",
                        }}
                        onClick={handleOpen}
                    >
                        <Box
                            className="hover-content"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -60%)",
                                opacity: 0,
                                transition: "all 0.4s ease",
                                textAlign: "center",
                                width: "100%",
                                color: "white",
                            }}
                        >
                            <FullscreenIcon
                                sx={{
                                    fontSize: 40,
                                    mb: 1,
                                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                                }}
                            />

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    textShadow: "0 2px 4px rgba(0,0,0,0.4)",
                                }}
                            >
                                View Certificate
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="certificate-modal"
                aria-describedby="certificate-full-view"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                    sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.92)",
                        backdropFilter: "blur(8px)",
                    },
                }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 0,
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "auto",
                        maxWidth: "92vw",
                        maxHeight: "90vh",
                        outline: "none",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.14)",
                        backgroundColor: "#050505",
                        boxShadow: "0 0 50px rgba(255,255,255,0.08)",
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.65)",
                            zIndex: 2,
                            padding: 1,
                            border: "1px solid rgba(255,255,255,0.12)",
                            "&:hover": {
                                bgcolor: "rgba(255,255,255,0.12)",
                                transform: "scale(1.08)",
                            },
                        }}
                        size="large"
                    >
                        <CloseIcon sx={{ fontSize: 24 }} />
                    </IconButton>

                    <img
                        src={ImgSertif}
                        alt="Certificate Full View"
                        style={{
                            display: "block",
                            maxWidth: "100%",
                            maxHeight: "90vh",
                            margin: "0 auto",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default Certificate;
