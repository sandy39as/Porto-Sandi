import { useEffect } from "react";
import {
    Linkedin,
    Github,
    Instagram,
    Youtube,
    ExternalLink,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const socialLinks = [
    {
        name: "LinkedIn",
        displayName: "Let's Connect",
        subText: "on LinkedIn",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/sandiadityaramdani/",
        isPrimary: true,
    },
    {
        name: "Instagram",
        displayName: "Instagram",
        subText: "@vsxvlw",
        icon: Instagram,
        url: "https://www.instagram.com/vsxvlw/?hl=id",
    },
    {
        name: "YouTube",
        displayName: "Youtube",
        subText: "@vsxvlw",
        icon: Youtube,
        url: "https://www.youtube.com/@vsxvlw",
    },
    {
        name: "GitHub",
        displayName: "Github",
        subText: "@sandy39as",
        icon: Github,
        url: "https://github.com/sandy39as",
    },
    {
        name: "TikTok",
        displayName: "Tiktok",
        subText: "@cinapremium",
        icon: ({ className = "", ...props }) => (
            <svg
                className={className}
                width="24px"
                height="24px"
                viewBox="0 0 45 45"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                {...props}
            >
                <title>Tiktok</title>
                <g
                    id="Icon/Social/tiktok-mono"
                    stroke="none"
                    strokeWidth="8"
                    fill="none"
                    fillRule="evenodd"
                >
                    <g id="Group-7" transform="translate(8.000000, 6.000000)">
                        <path
                            d="M29.5248245,9.44576327 C28.0821306,9.0460898 26.7616408,8.29376327 25.6826204,7.25637551 C25.5109469,7.09719184 25.3493143,6.92821224 25.1928245,6.75433469 C23.9066204,5.27833469 23.209151,3.38037551 23.2336408,1.42290612 L17.3560898,1.42290612 L17.3560898,23.7086204 C17.3560898,27.7935184 15.1520082,29.9535184 12.416498,29.9535184 C11.694049,29.9611102 10.9789469,29.8107429 10.3213959,29.5124571 C9.6636,29.2144163 9.07951837,28.7758041 8.60955918,28.2272327 C8.1398449,27.6789061 7.79551837,27.0340898 7.60180408,26.3385796 C7.4078449,25.6430694 7.36890612,24.9132735 7.48743673,24.2008653 C7.60596735,23.4884571 7.87902857,22.8105796 8.28751837,22.2154776 C8.69625306,21.6198857 9.23037551,21.1212735 9.85241633,20.7546612 C10.474702,20.3878041 11.1694776,20.1617633 11.8882531,20.0924571 C12.6070286,20.023151 13.3324163,20.1122939 14.0129878,20.3535184 L14.0129878,14.3584163 C13.4889061,14.2430694 12.9530694,14.1862531 12.416498,14.1894367 L12.3917633,14.1894367 C10.2542939,14.1943347 8.16604898,14.8325388 6.39127347,16.0234776 C4.61649796,17.2149061 3.23429388,18.9051918 2.41976327,20.8812735 C1.60523265,22.8578449 1.39486531,25.0310694 1.8151102,27.1269061 C2.2351102,29.2227429 3.2671102,31.1469061 4.78033469,32.6564571 C6.29380408,34.1660082 8.22066122,35.1933551 10.3174776,35.6082122 C12.4142939,36.0230694 14.5870286,35.8073143 16.561151,34.9878857 C18.5355184,34.1682122 20.2226204,32.7820898 21.409151,31.0041306 C22.5959265,29.2264163 23.2289878,27.136702 23.228498,24.9992327 L23.228498,12.8155592 C25.5036,14.392702 28.2244163,15.134498 31.1289061,15.1886204 L31.1289061,9.68551837 C30.5869469,9.66568163 30.049151,9.5851102 29.5248245,9.44576327"
                            fill="currentColor"
                        />
                    </g>
                </g>
            </svg>
        ),
        url: "https://tiktok.com/@cinapremium",
    },
];

const SocialCard = ({ link, delay = 0, primary = false }) => {
    const Icon = link.icon;

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center ${primary ? "justify-between" : "gap-3"
                } p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500`}
            data-aos="fade-up"
            data-aos-delay={delay}
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/[0.06] to-neutral-500/[0.03]" />

            <div className="relative flex items-center gap-4 min-w-0">
                <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-white/10 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:bg-white/15" />

                    <div className="relative p-2 rounded-lg">
                        <Icon className={`${primary ? "w-6 h-6" : "w-5 h-5"} text-neutral-300 group-hover:text-white transition-all duration-500 group-hover:scale-110`} />
                    </div>
                </div>

                <div className="flex flex-col min-w-0">
                    <span className={`${primary ? "text-lg" : "text-sm"} font-bold text-neutral-200 group-hover:text-white transition-colors duration-300 truncate`}>
                        {link.displayName}
                    </span>

                    <span className={`${primary ? "text-sm" : "text-xs"} text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 truncate`}>
                        {link.subText}
                    </span>
                </div>
            </div>

            <ExternalLink
                className={`relative ${primary ? "w-5 h-5" : "w-4 h-4 ml-auto"} text-neutral-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1`}
            />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
        </a>
    );
};

const SocialLinks = () => {
    const linkedIn = socialLinks.find((link) => link.isPrimary);
    const otherLinks = socialLinks.filter((link) => !link.isPrimary);
    const [instagram, youtube, github, tiktok] = otherLinks;

    useEffect(() => {
        AOS.init({
            offset: 10,
        });
    }, []);

    return (
        <div className="w-full bg-white/[0.03] border border-neutral-800 rounded-2xl p-6 py-8 backdrop-blur-xl shadow-[0_0_35px_rgba(255,255,255,0.04)]">
            <h3
                className="text-xl font-semibold text-white mb-6 flex items-center gap-2"
                data-aos="fade-down"
            >
                <span className="inline-block w-8 h-1 bg-white rounded-full" />
                Connect With Me
            </h3>

            <div className="flex flex-col gap-4">
                {linkedIn && <SocialCard link={linkedIn} delay={100} primary />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[instagram, youtube].map((link, index) => (
                        <SocialCard key={link.name} link={link} delay={200 + index * 100} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[github, tiktok].map((link, index) => (
                        <SocialCard key={link.name} link={link} delay={400 + index * 100} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialLinks;