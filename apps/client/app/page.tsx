import Link from "next/link";
import { Button } from "@/components/ui/button";
import Grid from "@/components/Landing/ImageGrid";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
    <div className="bg-background flex flex-col mt-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
      {/* Hero Section */}
    <section className="w-full flex justify-center">
      <div className="">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div className="flex flex-col gap-8 relative">
            <div className="absolute inset-x-20 inset-y-20 opacity-60">
              <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 40 10 L 10 10 10 40" fill="none" stroke="currentColor" strokeWidth="2px" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />
              </svg>
            </div>
            <div className="space-y-4 relative z-10">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance leading-tight">
                  Connect Artists with <span className="text-primary">Perfect Venues</span>
                </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                We are the trusted partner for artists and venues, offering innovative solutions that turn your ideas
                into impactful realities.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5 pt-4 relative z-10">
              <Link href="/register?role=artist">
              <Button className="items-center justify-center transition-all duration-150 group-hover:-translate-x-2 group-hover:-translate-y-2 w-full lg:w-auto h-14 px-8 text-xl lg:h-16 lg:px-10 lg:text-xl bg-primary text-white">
              I am an Artist
              </Button>
              </Link>
              <Link href="/register?role=venue">
              <Button variant="outline" className="items-center justify-center transition-all duration-150 group-hover:-translate-x-2 group-hover:-translate-y-2 w-full lg:w-auto h-14 px-8 text-xl lg:h-16 lg:px-10 lg:text-xl">
              I am a Venue
              </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 lg:h-full min-h-96 mt-10">
            <div className="absolute inset-0  rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Grid pattern background */}
              <div className="absolute inset-0 opacity-25">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-24 w-full flex justify-center">
        <div className="w-full">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Why Choose GigBook?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary to-transparent mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 - Discover Talent */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 text-center">Discover Talent</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Browse through a diverse collection of talented artists, from DJs to live performers.
                </p>
              </div>
            </div>

            {/* Feature 2 - Easy Booking */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-blue-500/20 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 text-center">Easy Booking</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Send booking requests with just a few clicks and manage everything in one place.
                </p>
              </div>
            </div>

            {/* Feature 3 - Build Connections */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-purple-500/20 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm9 0c-.29 0-.62.02-.97.05 1.16.64 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 text-center">Build Connections</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Connect venues with artists to create memorable events and lasting partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="">
          <Grid />
      </section>

      {/* Featured Artists & Venues Section */}
      <section className="py-24 w-full bg-muted/30">
        <div className="w-full">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Featured on GigBook
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Discover talented artists and premier venues making waves in the industry
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary to-transparent mx-auto"></div>
          </div>

          {/* Featured Artists */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="h-8 w-1 bg-primary rounded-full"></span>
              Top Artists
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Artist 1 */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">DJ</span>
                      <span className="px-3 py-1 bg-white/90 text-foreground text-xs font-semibold rounded-full">Electronic</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">DJ Nexus</h4>
                  <p className="text-muted-foreground text-sm mb-4">Electronic · House · Techno</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="font-medium">4.9</span>
                    </div>
                    <span>·</span>
                    <span>150+ Events</span>
                  </div>
                </div>
              </div>

              {/* Artist 2 */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">Band</span>
                      <span className="px-3 py-1 bg-white/90 text-foreground text-xs font-semibold rounded-full">Jazz</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">The Smooth Notes</h4>
                  <p className="text-muted-foreground text-sm mb-4">Jazz · Blues · Soul</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="font-medium">4.8</span>
                    </div>
                    <span>·</span>
                    <span>95+ Events</span>
                  </div>
                </div>
              </div>

              {/* Artist 3 */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-orange-500/20 to-red-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">Solo</span>
                      <span className="px-3 py-1 bg-white/90 text-foreground text-xs font-semibold rounded-full">Acoustic</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">Sarah Melody</h4>
                  <p className="text-muted-foreground text-sm mb-4">Acoustic · Pop · Indie</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="font-medium">5.0</span>
                    </div>
                    <span>·</span>
                    <span>120+ Events</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Venues */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="h-8 w-1 bg-blue-500 rounded-full"></span>
              Premier Venues
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Venue 1 */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-blue-500/30 transition-all duration-300 bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full">Available</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">The Grand Hall</h4>
                  <p className="text-muted-foreground text-sm mb-4">Downtown · Capacity: 500</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="font-medium">4.9</span>
                    </div>
                    <span>·</span>
                    <span>200+ Events</span>
                  </div>
                </div>
              </div>

              {/* Venue 2 */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-blue-500/30 transition-all duration-300 bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-500/20 to-teal-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full">Available</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">Skyline Rooftop</h4>
                  <p className="text-muted-foreground text-sm mb-4">Midtown · Capacity: 200</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="font-medium">4.8</span>
                    </div>
                    <span>·</span>
                    <span>180+ Events</span>
                  </div>
                </div>
              </div>

              {/* Venue 3 */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-blue-500/30 transition-all duration-300 bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-rose-500/20 to-pink-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full">Available</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">The Underground Club</h4>
                  <p className="text-muted-foreground text-sm mb-4">East Side · Capacity: 350</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="font-medium">4.9</span>
                    </div>
                    <span>·</span>
                    <span>220+ Events</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/artists">
              <Button size="lg" variant="outline" className="mr-4">
                Browse All Artists
              </Button>
            </Link>
            <Link href="/venues">
              <Button size="lg" variant="outline">
                Explore All Venues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 w-full">
        <div className="w-full">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              What Our Users Say
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Artist */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-primary/20 transition-all duration-300 bg-card h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 flex-grow italic leading-relaxed">
                  "GigBook transformed my career! I've booked more gigs in the past 3 months than I did all last year. The platform is incredibly easy to use and the venues are professional."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Marcus Chen</h4>
                    <p className="text-sm text-muted-foreground">DJ & Producer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Venue */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-blue-500/20 transition-all duration-300 bg-card h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 flex-grow italic leading-relaxed">
                  "Finding quality artists used to take weeks. Now we discover and book amazing talent in days. Our events have never been better, and our guests love the entertainment."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Jessica Williams</h4>
                    <p className="text-sm text-muted-foreground">Venue Manager</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Artist */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-purple-500/20 transition-all duration-300 bg-card h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 flex-grow italic leading-relaxed">
                  "As a band, coordinating with venues was always chaotic. GigBook streamlined everything - from initial contact to payment. It's a game changer for working musicians."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Tom Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Band Leader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 w-full">
        <div className="w-full">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
            {/* For Artists */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-foreground">For Artists</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Create Your Profile</h4>
                    <p className="text-muted-foreground">Showcase your talent with photos, videos, and performance history.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Get Discovered</h4>
                    <p className="text-muted-foreground">Venues browse and reach out to artists that match their event needs.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Manage Bookings</h4>
                    <p className="text-muted-foreground">Accept requests, coordinate details, and grow your performance career.</p>
                  </div>
                </div>
              </div>

              <Link href="/register?role=artist" className="inline-block">
                <Button size="lg" className="mt-4">Join as Artist</Button>
              </Link>
            </div>

            {/* For Venues */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-foreground">For Venues</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">List Your Venue</h4>
                    <p className="text-muted-foreground">Add details about your space, capacity, and event types you host.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Browse Artists</h4>
                    <p className="text-muted-foreground">Search through talented performers and find the perfect match.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Book & Host</h4>
                    <p className="text-muted-foreground">Send booking requests and create unforgettable events together.</p>
                  </div>
                </div>
              </div>

              <Link href="/register?role=venue" className="inline-block">
                <Button size="lg" variant="outline" className="mt-4">Join as Venue</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
