const WhyChooseUs = () => {
  return (
    <div className="w-full">
      <div className="mb-20 text-center">
        <h2 className="heading">
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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 text-center subheading">Discover Talent</h3>
            <p className="subtext text-center">
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
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 text-center subheading">Easy Booking</h3>
            <p className="subtext text-center">
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
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm9 0c-.29 0-.62.02-.97.05 1.16.64 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 text-center subheading">Build Connections</h3>
            <p className="subtext text-center">
              Connect venues with artists to create memorable events and lasting partnerships.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default WhyChooseUs;