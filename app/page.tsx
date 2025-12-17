import {
  Plus,
  Sparkles,
  Code,
  Palette,
  Rocket,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function Home() {
  const services = [
    { icon: <Code className="w-5 h-5" />, label: "Web Development" },
    { icon: <Palette className="w-5 h-5" />, label: "Design" },
    { icon: <Rocket className="w-5 h-5" />, label: "Landing Pages" },
    { icon: <Sparkles className="w-5 h-5" />, label: "Branding" },
    { icon: <Plus className="w-5 h-5" />, label: "And more" },
  ];

  return (
    <section className="flex-1 min-h-screen text-white bg-devsign overflow-hidden relative">
      {/* Background decorative elements */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}

          <div className="space-y-8">
            {/* Main Headline */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Building
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </h1>

            {/* Description */}

            <div className="space-y-4">
              <p className="text-xl text-blue-100 leading-relaxed">
                Devsign transforms ideas into powerful digital solutions. We
                specialize in creating high-performance websites, custom
                software, and stunning visual designs that drive business
                growth.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />

                  <span className="text-blue-100">
                    Full-stack web development & landing pages
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />

                  <span className="text-blue-100">
                    Custom software & UI/UX design
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />

                  <span className="text-blue-100">
                    Product design for e-commerce & advertising
                  </span>
                </div>
              </div>
            </div>

            {/* Service Tags */}

            <div className="flex flex-wrap gap-3 pt-2">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {service.icon}

                  <span className="text-sm font-medium">{service.label}</span>
                </div>
              ))}
            </div>

            {/* Trust Indicator */}

            <div className="pt-8">
              <p className="text-sm flex items-center justify-center gap-2 text-white p-3 rounded-full bg-cyan-800 backdrop-blur-sm border border-white/10 hover:bg-cyan-900 transition-colors">
                <ArrowLeft className="w-5 h-5" /> To explore everything we offer, click on<span className="font-semibold">services</span>in the menu
              </p>
            </div>
          </div>

          {/* Right Column - Visual/Stats */}

          <div className="relative">
            {/* Stats Card */}

            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-cyan-300">100+</div>

                  <div className="text-sm text-blue-200 mt-2">
                    Projects Delivered
                  </div>
                </div>

                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-cyan-300">24/7</div>

                  <div className="text-sm text-blue-200 mt-2">Support</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-cyan-300">99%</div>

                  <div className="text-sm text-blue-200 mt-2">
                    Client Satisfaction
                  </div>
                </div>

                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-cyan-300">48h</div>

                  <div className="text-sm text-blue-200 mt-2">Quick Start</div>
                </div>
              </div>

              {/* Testimonial */}

              <div className="mt-8 p-6 rounded-xl bg-blue-900/30 border-l-4 border-cyan-500">
                <p className="text-blue-100 italic">
                  "Devsign transformed our online presence with a stunning
                  e-commerce platform. Sales increased by 200% in the first
                  month."
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>

                  <div>
                    <div className="font-semibold text-white">SMohammed elghandori</div>

                    <div className="text-sm text-blue-300">
                     owner of website
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}

            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl"></div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
