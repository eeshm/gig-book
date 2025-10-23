
const TestimonialSection = () => {
    return (        <div className="w-full">
          <div className="mb-20 text-center">
            <h2 className="heading mb-6">
              What Our Users Say
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Artist */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-primary/20 transition-all duration-300 bg-card h-full flex flex-col">

                <p className="subtext mb-6 flex-grow italic">
                  "GigBook transformed my career! I've booked more gigs in the past 3 months than I did all last year. The platform is incredibly easy to use and the venues are professional."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Marcus Chen</h4>
                    <p className="subtext">DJ & Producer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Venue */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-blue-500/20 transition-all duration-300 bg-card h-full flex flex-col">
                <p className="subtext mb-6 flex-grow italic">
                  "Finding quality artists used to take weeks. Now we discover and book amazing talent in days. Our events have never been better, and our guests love the entertainment."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Jessica Williams</h4>
                    <p className="subtext">Venue Manager</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Artist */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl border border-border/40 hover:border-purple-500/20 transition-all duration-300 bg-card h-full flex flex-col">
                <p className="subtext mb-6 flex-grow italic">
                  "As a band, coordinating with venues was always chaotic. GigBook streamlined everything - from initial contact to payment. It's a game changer for working musicians."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Tom Rodriguez</h4>
                    <p className="subtext">Band Leader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default TestimonialSection;