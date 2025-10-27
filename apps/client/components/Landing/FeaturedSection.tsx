import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArtistCard from "@/components/browse/ArtistCard";
import VenueCard from "@/components/browse/VenueCard";
const FeaturedSection = () => {
  return (
    <div className="w-full">
      <div className="mb-20 text-center">
        <h2 className="heading mb-2">Featured on GigBook</h2>
        <div className="from-primary via-primary mx-auto h-1 w-24 bg-gradient-to-r to-transparent"></div>
        <p className="subtext mx-auto mt-6">
          Discover talented artists and premier venues making waves in the industry
        </p>
      </div>

      {/* Featured Artists */}
      <div className="mb-16">
        <h3 className="subheading mb-8 flex items-center gap-3">
          <span className="bg-primary h-8 w-1 rounded-full"></span>
          Top Artists
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ArtistCard
            name="DJ Nexus"
            genres="Electronic · House · Techno"
            imageSrc="/images/image1.jpg"
          />
          <ArtistCard
            name="The Smooth Notes"
            genres="Jazz · Blues · Soul"
            imageSrc="/images/image2.jpg"
          />
          <ArtistCard
            name="Sarah Melody"
            genres="Acoustic · Pop · Indie"
            imageSrc="/images/image3.jpg"
          />
        </div>
      </div>

      {/* Featured Venues */}
      <div>
        <h3 className="subheading mb-8 flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-blue-500"></span>
          Premier Venues
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <VenueCard
            name="The Grand Hall"
            location="Downtown"
            capacity={500}
            imageSrc="/images/image4.jpg"
          />
          <VenueCard
            name="Skyline Rooftop"
            location="Midtown"
            capacity={200}
            imageSrc="/images/image5.jpg"
          />
          <VenueCard
            name="The Underground Club"
            location="East Side"
            capacity={350}
            imageSrc="/images/image6.jpg"
          />
        </div>
      </div>

      <div className="mt-12 text-center text-white">
        <Link href="/artists">
          <Button size="lg" variant="outline" className="hover:bg-primary mr-4">
            Browse All Artists
          </Button>
        </Link>
        <Link href="/venues">
          <Button size="lg" variant="outline" className="hover:bg-primary">
            Explore All Venues
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSection;
