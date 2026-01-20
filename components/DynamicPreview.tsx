"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";


// Type for preview data from Supabase
interface PreviewData {
    id: string;
    slug: string;
    business_name: string;
    tagline: string;
    website_url: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    services: string[];
    value_props: string[];
    cta_text: string;
    contact_info: {
        phone?: string;
        email?: string;
        address?: string;
    };
    logo_url?: string;
    industry?: string;
    vibe?: string;
    hero_phrases?: string[];
}

interface DynamicPreviewProps {
    data: PreviewData;
}

export default function DynamicPreview({ data }: DynamicPreviewProps) {
    const services = data.services || [];
    const valueProps = data.value_props || [];

    return (
        <main className="bg-black min-h-screen antialiased">
            {/* Hero Scrollytelling */}
            <HeroAnimation data={data} />

            {/* Section: Brand Statement */}
            <section className="bg-black py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
                            {data.tagline}
                        </h2>
                        <p className="text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                            Experience the convergence of technology and aesthetics.
                            {data.business_name} redefines the standard of care with precision-engineered treatments tailored to your unique biology.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Section: Services Grid */}
            <section className="bg-white py-32 px-6 text-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
                        <div className="md:col-span-2 lg:col-span-1">
                            <h3 className="text-5xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500">
                                CLINICAL<br />EXCELLENCE
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our portfolio of services represents the pinnacle of medical aesthetics,
                                curated for maximum efficacy and minimal downtime.
                            </p>
                        </div>

                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer border-t border-black/10 pt-8"
                            >
                                <div className="flex justify-between items-baseline mb-4">
                                    <h4 className="text-2xl font-medium group-hover:text-gray-600 transition-colors">
                                        {service}
                                    </h4>
                                    <span className="text-xs font-mono text-gray-400">0{index + 1}</span>
                                </div>
                                <p className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    Advanced protocol for targeted results.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section: Value Props / Stats */}
            <section className="bg-zinc-900 py-32 px-6 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {valueProps.map((prop, index) => (
                            <div key={index} className="relative p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                                <h4 className="text-xl font-medium mb-4">{prop}</h4>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-white to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="min-h-[80vh] flex items-center justify-center bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-12"
                    >
                        READY TO<br />TRANSFORM?
                    </motion.h2>

                    <motion.a
                        href={data.website_url} // Link to actual site
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-white text-black text-lg md:text-xl font-medium px-12 py-5 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        {data.cta_text || "BOOK CONSULTATION"}
                    </motion.a>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/40 text-sm font-mono uppercase tracking-widest">
                        {data.contact_info.phone && <p>{data.contact_info.phone}</p>}
                        {data.contact_info.email && <p>{data.contact_info.email}</p>}
                        {data.contact_info.address && <p>{data.contact_info.address}</p>}
                    </div>
                </div>
            </section>
        </main>
    );
}


function HeroAnimation({ data }: { data: PreviewData }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentProgress, setCurrentProgress] = useState(0);

    // Scroll handler - sync video time to scroll position
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            // Only process scroll if we're inside the viewport range of this component
            // but here the component is 500vh so it handles its own logic
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (!containerRef.current || !videoRef.current) {
                        ticking = false;
                        return;
                    }

                    const rect = containerRef.current.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const containerHeight = containerRef.current.offsetHeight;
                    const video = videoRef.current;

                    const scrollableDistance = containerHeight - windowHeight;
                    const scrolled = -rect.top;
                    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

                    setCurrentProgress(progress);

                    // Sync video time
                    if (video.duration && Number.isFinite(video.duration)) {
                        const targetTime = progress * video.duration;
                        if (Number.isFinite(targetTime)) {
                            video.currentTime = targetTime;
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Dynamic text overlays - uses complete hero_phrases from AI
    const heroPhrases = data.hero_phrases || [];

    const TEXT_OVERLAYS = [
        {
            id: "beat-a",
            startProgress: 0,
            endProgress: 0.25,
            text: heroPhrases[0] || data.tagline?.toUpperCase() || "INNOVATION PERFECTED",
            highlight: true,
        },
        {
            id: "beat-b",
            startProgress: 0.35,
            endProgress: 0.55,
            text: heroPhrases[1] || `${data.business_name?.toUpperCase()} PERFECTED`,
            highlight: true,
        },
        {
            id: "beat-c",
            startProgress: 0.65,
            endProgress: 0.85,
            text: heroPhrases[2] || "EXCELLENCE DELIVERED",
            highlight: true,
        },
    ];

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Video Scrollytelling */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/scrollytelling.mp4"
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        opacity: 1,
                        filter: 'brightness(1.1)'
                    }}
                />

                {/* Floating Nav */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4">
                    <div className="flex items-center justify-between bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mx-auto w-fit">
                        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Logo or Business Name */}
                        <div className="mx-4 flex items-center justify-center">
                            {data.logo_url ? (
                                <img
                                    src={data.logo_url}
                                    alt={data.business_name}
                                    className="h-6 max-w-[120px] object-contain brightness-0 invert"
                                />
                            ) : (
                                <span className="text-white text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                                    {data.business_name || "Home"}
                                </span>
                            )}
                        </div>

                        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Text Overlays */}
                {TEXT_OVERLAYS.map((overlay) => (
                    <TextOverlay
                        key={overlay.id}
                        overlay={overlay}
                        scrollProgress={currentProgress}
                    />
                ))}

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono tracking-[0.3em] uppercase pointer-events-none"
                    animate={{ opacity: currentProgress > 0.1 ? 0 : 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        SCROLL
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}


// Text Overlay Component
function TextOverlay({
    overlay,
    scrollProgress,
}: {
    overlay: any;
    scrollProgress: number;
}) {
    const isInRange = scrollProgress >= overlay.startProgress && scrollProgress <= overlay.endProgress;
    const rangeCenter = (overlay.startProgress + overlay.endProgress) / 2;
    const rangeHalf = (overlay.endProgress - overlay.startProgress) / 2;

    let opacity = 0;
    let translateY = 20;

    if (isInRange) {
        const distanceFromCenter = Math.abs(scrollProgress - rangeCenter);
        opacity = 1 - (distanceFromCenter / rangeHalf) * 0.5;
        opacity = Math.max(0, Math.min(1, opacity));
        translateY = 0;
    }

    return (
        <div
            className={`absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-all duration-300 ease-out`}
            style={{
                opacity,
                transform: `translateY(${translateY}px)`
            }}
        >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center leading-[0.9] tracking-tight px-4 drop-shadow-2xl">
                {overlay.text}
            </h2>
        </div>
    );
}
