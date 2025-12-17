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
    { icon: <Code className="w-5 h-5" />, label: "Websites" },
    { icon: <Rocket className="w-5 h-5" />, label: "Software" },
    { icon: <Palette className="w-5 h-5" />, label: "Product Design" },
    { icon: <Sparkles className="w-5 h-5" />, label: "Ads & Media" },
    { icon: <Plus className="w-5 h-5" />, label: "Custom Work" },
  ];

  return (
    <section className="flex-1 text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Grow Your Business 
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                With Better Design
              </span>
            </h1>

            <div className="space-y-6">
              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
               We help brands stand out. From building powerful websites to designing engaging social media posts and premium packaging for your products, we handle the tech and design so you can focus on sales.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <span className="block font-bold text-white">Custom Web & Software</span>
                    <span className="text-blue-200 text-sm">Fast, modern websites built for your specific needs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <span className="block font-bold text-white">Product & Ad Design</span>
                    <span className="text-blue-200 text-sm">We redesign product images and social media posts to boost engagement.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <span className="block font-bold text-white">E-commerce Support</span>
                    <span className="text-blue-200 text-sm">Tools and designs that help you sell more online.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  {service.icon}
                  <span className="text-sm font-medium">{service.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
               <p className="inline-flex items-center gap-2 text-sm text-cyan-200 bg-cyan-950/50 px-6 py-3 rounded-full border border-cyan-500/30">
                 <ArrowLeft className="w-4 h-4 " /> 
                 Ready to start? Click <strong>Service</strong> in the menu to see more.
               </p>
            </div>
          </div>

          {/* Right Column - Stats & Social Proof */}
          <div className="relative">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-md border border-white/10 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-4xl font-bold text-cyan-300">10+</div>
                  <div className="text-xs uppercase tracking-wider text-blue-300 mt-2">Projects</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-4xl font-bold text-cyan-300">24/7</div>
                  <div className="text-xs uppercase tracking-wider text-blue-300 mt-2">Support</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-4xl font-bold text-cyan-300">98%</div>
                  <div className="text-xs uppercase tracking-wider text-blue-300 mt-2">Happy Clients</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-4xl font-bold text-cyan-300">48h</div>
                  <div className="text-xs uppercase tracking-wider text-blue-300 mt-2">Response</div>
                </div>
              </div>

              {/* Owner Info / Small Bio */}
              <div className="mt-8 p-6 rounded-2xl bg-blue-600/20 border border-blue-500/30">
                <p className="text-blue-100 italic text-sm leading-relaxed">
                  "At Devsign, we don't just build code; we build tools that help your business grow and look professional in a crowded market."
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg flex items-center justify-center font-bold text-white">MD</div>
                  <div>
                    <div className="font-bold text-white">Mohammed</div>
                    <div className="text-xs text-cyan-400">Founder of Devsign</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}