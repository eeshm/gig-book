import Image from "next/image";
const TestimonialSection = () => {
  return (
    <div className="w-full">
      <div className="mb-20 text-center">
        <h2 className="heading mb-6">What Our Users Say</h2>
        <div className="from-primary via-primary mx-auto h-1 w-24 bg-gradient-to-r to-transparent"></div>
      </div>

      <div className="grid gap-8 px-2 md:grid-cols-3 md:px-0">
        {/* Testimonial 1 - Artist */}
        <div className="group relative">
          <div className="border-border/40 relative rounded-md border p-8">
            <p className="subtext mb-6 flex-grow italic">
              &rdquo;GigBook transformed my career! I&apos;ve booked more gigs in the past 3 months
              than I did all last year. The platform is incredibly easy to use and the venues are
              professional.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/images/image3.jpg"
                width={48}
                height={48}
                alt="Marcus Chen"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="text-foreground font-semibold">Marcus Chen</h4>
                <p className="subtext">DJ & Producer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial 2 - Venue */}
        <div className="group relative">
          <div className="border-border/40 relative rounded-md border p-8">
            <p className="subtext mb-6 flex-grow italic">
              &rdquo;Finding quality artists used to take weeks. Now we discover and book amazing
              talent in days. Our events have never been better, and our guests love the
              entertainment.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/images/image1.jpg"
                width={48}
                height={48}
                alt="Jessica Williams"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="text-foreground font-semibold">Jessica Williams</h4>
                <p className="subtext">Venue Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial 3 - Artist */}
        <div className="group relative">
          <div className="border-border/40 relative rounded-md border p-8">
            <p className="subtext mb-6 flex-grow italic">
              &rdquo;As a band, coordinating with venues was always chaotic. GigBook streamlined
              everything - from initial contact to payment. It&apos;s a game changer for working
              musicians.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/images/image2.jpg"
                width={48}
                height={48}
                alt="Tom Rodriguez"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="text-foreground font-semibold">Tom Rodriguez</h4>
                <p className="subtext">Band Leader</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
