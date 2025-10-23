import Link from "next/link"
import { Button } from "@/components/ui/button"
const FeaturedSection = () => {
    return (
            <div className="w-full">
          <div className="mb-20 text-center">
            <h2 className="heading mb-2">
              Featured on GigBook
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary to-transparent mx-auto"></div>
            <p className="subtext mx-auto mt-6">
              Discover talented artists and premier venues making waves in the industry
            </p>
          </div>

          {/* Featured Artists */}
          <div className="mb-16">
            <h3 className="subheading mb-8 flex items-center gap-3">
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
                  <p className="subtext mb-4">Electronic · House · Techno</p>
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
                  <p className="subtext mb-4">Jazz · Blues · Soul</p>
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
                  <p className="subtext mb-4">Acoustic · Pop · Indie</p>
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
            <h3 className="subheading mb-8 flex items-center gap-3">
              <span className="h-8 w-1 bg-blue-500 rounded-full"></span>
              Premier Venues
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Venue 1 */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 hover:border-blue-500/30 transition-all duration-300 bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 relative overflow-hidden">
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">The Grand Hall</h4>
                  <p className="subtext mb-4">Downtown · Capacity: 500</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  <p className="subtext mb-4">Midtown · Capacity: 200</p>
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
                  <p className="subtext mb-4">East Side · Capacity: 350</p>
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
    )
}

export default FeaturedSection;