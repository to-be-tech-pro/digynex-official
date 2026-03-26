<template>
  <div class="min-h-screen bg-[#020817] text-slate-50 font-sans selection:bg-primary/30">
    
    <!-- Top Navigation -->
    <nav class="absolute top-0 w-full border-b border-white/5 bg-white/5 backdrop-blur-xl z-50">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 font-bold text-2xl tracking-tight text-white cursor-pointer">
          <div class="p-1.5 bg-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Layers class="w-6 h-6 text-white" />
          </div>
          DigyNex<span class="text-primary font-light">360</span>
        </div>
        
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" class="hover:text-white transition-colors">Features</a>
          <a href="#demo" class="hover:text-white transition-colors">Solutions</a>
          <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
        </div>
        
        <div class="flex items-center gap-4">
          <a href="mailto:contact@digynex.com" class="hidden sm:block text-sm font-bold text-slate-300 hover:text-white transition-colors">Contact Sales</a>
          <router-link to="/dashboard" class="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-200 rounded-lg text-sm font-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            Book Demo
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <!-- Glow effects -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm animate-[slideDown_0.5s_ease-out]">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Next-Gen Enterprise BI is Here
        </div>

        <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1] animate-[slideUp_0.6s_ease-out]">
          Turn Data into <br class="hidden md:block"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-accent">Decisions.</span>
        </h1>
        
        <p class="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium animate-[slideUp_0.7s_ease-out]">
          Stop guessing. The ultimate AI-powered Decision Intelligence System designed exclusively for scaling enterprises. Real-time forecasting, anomaly alerts, and profit mapping.
        </p>
        
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-[slideUp_0.8s_ease-out]">
          <router-link to="/dashboard" class="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-xl text-base font-black transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
            Explore Executive Dashboard <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </router-link>
          <button class="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-base font-bold transition-all backdrop-blur-sm">
            Watch Presentation
          </button>
        </div>

        <!-- Dashboard Video Thumbnail -->
        <div class="mt-20 relative mx-auto max-w-5xl group animate-[slideUp_1s_ease-out]">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative w-full aspect-video rounded-2xl bg-[#0f172a] border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col cursor-pointer group/video">
             
             <!-- Actual Demo Video with Poster (Commented out to pass build until YouTube link is ready) -->
             <!-- <video class="absolute inset-0 w-full h-full object-cover z-20 group-hover/video:scale-[1.02] transition-transform duration-1000 bg-[#0f172a]" controls preload="metadata" poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop">
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
             </video> -->
             <div class="absolute inset-0 bg-[#0f172a] flex items-center justify-center">
                <p class="text-slate-500 text-sm italic">Video Demo Coming Soon...</p>
             </div>

          </div>
        </div>
        
      </div>
    </main>

    <!-- Key Features Section (The Selling Machine) -->
    <section id="features" class="py-24 bg-[#050b1a] relative border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Enterprise Intelligence Engine</h2>
          <p class="text-slate-400 max-w-2xl mx-auto font-medium text-lg">Built to process millions of transactions and surface exactly what demands your attention today.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Feature 1 -->
          <div class="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group cursor-default">
            <div class="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain class="w-7 h-7 text-blue-400" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">AI Deep Insights</h3>
            <p class="text-slate-400 text-sm leading-relaxed font-medium">Auto-analyzes hidden transaction trends and summarizes them into actionable sentences for rapid executive review.</p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group cursor-default">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart class="w-7 h-7 text-accent" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Predictive Forecasting</h3>
            <p class="text-slate-400 text-sm leading-relaxed font-medium">Compare actual revenue against AI-generated target paths visually, ensuring you hit financial objectives before quarter-end.</p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group cursor-default">
            <div class="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle class="w-7 h-7 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Anomaly Alerts</h3>
            <p class="text-slate-400 text-sm leading-relaxed font-medium">Real-time alerts intercept sudden expense spikes or revenue segment drops instantly, turning defense into offense.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Footer Section (Legal & Contact) -->
    <footer class="pt-24 pb-12 bg-[#020817] border-t border-white/5 relative overflow-hidden">
      <!-- Glow effect for footer -->
      <div class="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-primary/10 blur-[80px] -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-6">
              <div class="p-1 bg-primary rounded shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <Layers class="w-4 h-4 text-white" />
              </div>
              DigyNex<span class="text-primary font-light">360</span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering scaling enterprises with data-driven decision intelligence. Official part of the DigyNex Global IT Ecosystem.
            </p>
            <div class="flex items-center gap-4 text-slate-400">
               <a href="https://facebook.com/digynex.se" target="_blank" class="hover:text-primary transition-colors"><i class="fa-brands fa-facebook-f text-lg"></i></a>
               <a href="https://www.linkedin.com/in/digynex-amila" target="_blank" class="hover:text-primary transition-colors"><i class="fa-brands fa-linkedin text-lg"></i></a>
               <a href="https://github.com/digynex" target="_blank" class="hover:text-primary transition-colors"><i class="fa-brands fa-github text-lg"></i></a>
            </div>
          </div>

          <div>
             <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
             <ul class="space-y-4 text-slate-400 text-sm">
               <li><a href="#features" class="hover:text-white transition-colors">Performance Engine</a></li>
               <li><a href="#demo" class="hover:text-white transition-colors">Decision Mapping</a></li>
               <li><a href="#pricing" class="hover:text-white transition-colors">Pricing Options</a></li>
               <li><router-link to="/dashboard" class="hover:text-white transition-colors">Live Dashboard</router-link></li>
             </ul>
          </div>

          <div>
             <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
             <ul class="space-y-4 text-slate-400 text-sm">
               <li><a href="https://digynex.se/about.html" class="hover:text-white transition-colors">About Us</a></li>
               <li><a href="https://digynex.se/contact.html" class="hover:text-white transition-colors">Contact Expert</a></li>
               <li><a href="https://digynex.se/portfolio/index.html" class="hover:text-white transition-colors">Success Stories</a></li>
             </ul>
          </div>

          <div>
             <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal & Privacy</h4>
             <ul class="space-y-4 text-slate-400 text-sm">
               <li><a href="https://digynex.se/terms.html" class="hover:text-white transition-colors">Terms of Service</a></li>
               <li><a href="https://digynex.se/privacy.html" class="hover:text-white transition-colors">Privacy Policy</a></li>
               <li><a href="https://digynex.se/cookies.html" class="hover:text-white transition-colors">Cookie Policy</a></li>
               <li><a href="https://digynex.se/refund.html" class="hover:text-white transition-colors">Refund Policy</a></li>
             </ul>
          </div>
        </div>

        <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-slate-500 text-xs">
            © 2026 DigyNex Systems 360 | Global Business Intelligence Ecosystem.
          </p>
          <div class="flex items-center gap-2 text-slate-600 text-[10px] uppercase tracking-widest">
            <span>Powered by DigyNex AI Agents</span>
            <span class="opacity-30">|</span>
            <span>Sweden HQ</span>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { Layers, ArrowRight, Brain, LineChart, AlertTriangle } from 'lucide-vue-next'
</script>

<style scoped>
@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
