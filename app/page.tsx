import DeviceScrollyTelling from "@/components/DeviceScrollyTelling";

// Brand colors from actual site
const BRAND = {
  name: "Rondebosch Laser Hair Removal",
  colors: {
    primary: "#FFD5C2",
    secondary: "#000000",
  },
};

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Scrollytelling + All Sections */}
      <DeviceScrollyTelling />

      {/* Footer Section */}
      <footer className="py-12 px-6 text-center" style={{ backgroundColor: BRAND.colors.secondary }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="text-xs tracking-ultra-wide uppercase mb-6"
            style={{ color: BRAND.colors.primary }}
          >
            {BRAND.name}
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Your trusted destination for professional laser hair removal and skincare in Rondebosch.
            Glow with confidence.
          </p>
          <div className="flex justify-center gap-6 text-white/60 text-xs tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span className="text-white/20">|</span>
            <a href="https://laserhairremovalrondebosch.co.za/contact-us/" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="mt-8 text-white/30 text-xs">
            © 2026 {BRAND.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
