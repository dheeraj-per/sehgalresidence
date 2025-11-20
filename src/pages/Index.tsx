import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import CommentableSection from "@/components/CommentableSection";
import SendWhatsAppButton from "@/components/SendWhatsAppButton";

const Index = () => {
  const handlePrint = () => {
    window.print();
  };

  const propertyUrl =
    "https://www.funda.nl/detail/koop/verkocht/amstelveen/huis-tjalk-7/43099917/";

  return (
    <div className="min-h-screen bg-background">
      {/* Action Buttons - Hidden when printing */}
      <div className="print:hidden fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:flex-row">
        <SendWhatsAppButton />
        <Button
          onClick={handlePrint}
          size="lg"
          className="gap-2"
          aria-label="Download PDF"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sr-only sm:hidden">Download PDF</span>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                <a
                  href={propertyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <img
                    src="/public/sehgal.png"
                    alt="Sehgal Residence thumbnail"
                    className="h-12 w-20 rounded object-cover shadow"
                    loading="lazy"
                  />
                  Sehgal Residence
                </a>
              </h1>
              <p className="text-muted-foreground">20.11.2025</p>
            </div>
            <div className="text-right">
              <img
                src={logo}
                alt="Purple Palette Design Studios"
                className="h-24 w-auto mb-3 ml-auto"
              />
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center justify-end gap-2">
                  <Phone className="w-3 h-3" />
                  <span>+31 633 461 503</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Mail className="w-3 h-3" />
                  <span>ar.apershad@gmail.com</span>
                </div>
                <div className="text-xs mt-2">VAT: NL005240200B61</div>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-primary pl-6 py-2">
            <h2 className="text-xl font-semibold text-foreground">Akriti Pershad</h2>
            <p className="text-muted-foreground">Architect</p>
          </div>
        </header>

        <Separator className="my-8" />

        {/* Scope of Work */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Scope of Work</h2>

          {/* Ground Floor */}
          <Card className="mb-6 p-6 border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-foreground mb-4">Ground Floor</h3>
            <div className="space-y-4 text-sm">
              <CommentableSection 
                sectionId="gf-living" 
                sectionTitle="Ground Floor - Living Room"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Living Room</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Orientation of Furniture</li>
                    <li>Selection of Lights, TV Unit, Furniture (If needed)</li>
                  </ul>
                </div>
              </CommentableSection>
              
              <CommentableSection 
                sectionId="gf-dining" 
                sectionTitle="Ground Floor - Dining Room and Kitchen"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Dining Room and Kitchen</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Selection of Lighting Fixtures and Artefacts</li>
                    <li>Selection of Dining Table if necessary</li>
                  </ul>
                </div>
              </CommentableSection>

              <CommentableSection 
                sectionId="gf-puja" 
                sectionTitle="Ground Floor - Puja Room"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Puja Room</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Complete Design with 3D and 2D drawings</li>
                  </ul>
                </div>
              </CommentableSection>

              <CommentableSection 
                sectionId="gf-garage" 
                sectionTitle="Ground Floor - Garage (Guest Room)"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">4. Garage (Converted to Guest Room)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Complete Design for Bedroom, Toilet and Sauna with 3D and 2D drawings</li>
                  </ul>
                </div>
              </CommentableSection>

              <CommentableSection 
                sectionId="gf-basement" 
                sectionTitle="Ground Floor - Basement (Music Room)"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">5. Basement (Converted into Music Room)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Complete Design with 2D drawings</li>
                    <li>Design of Room Leading to Basement</li>
                  </ul>
                </div>
              </CommentableSection>

              <CommentableSection 
                sectionId="gf-backyard" 
                sectionTitle="Ground Floor - Backyard"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">6. Backyard</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Jacuzzi with some covering overhead</li>
                    <li>Storage for bikes</li>
                    <li>Selection of Outdoor Furniture</li>
                  </ul>
                </div>
              </CommentableSection>
            </div>
          </Card>

          {/* First Floor */}
          <Card className="mb-6 p-6 border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-foreground mb-4">First Floor</h3>
            <div className="space-y-4 text-sm">
              <CommentableSection 
                sectionId="ff-bedroom12" 
                sectionTitle="First Floor - Bedroom 1 & 2"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Bedroom 1 & 2</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Orientation of Furniture</li>
                    <li>Selection of Study and Curtains (Wherever needed)</li>
                  </ul>
                </div>
              </CommentableSection>

              <CommentableSection 
                sectionId="ff-gym" 
                sectionTitle="First Floor - Bedroom 3 (Gym)"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Bedroom 3 (Converted to Gym)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Placement of Temporary Gym floor and equipment</li>
                  </ul>
                </div>
              </CommentableSection>

              <CommentableSection 
                sectionId="ff-lobby" 
                sectionTitle="First Floor - Lobby Area"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Lobby Area</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Design and Selection of Furniture and Artefacts</li>
                  </ul>
                </div>
              </CommentableSection>
            </div>
          </Card>

          {/* Second Floor */}
          <Card className="mb-6 p-6 border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-foreground mb-4">Second Floor</h3>
            <div className="space-y-4 text-sm">
              <CommentableSection 
                sectionId="sf-bedroom" 
                sectionTitle="Second Floor - Bedroom & Closet"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Bedroom & Closet</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Design with 3D and 2D drawings for Bedroom</li>
                    <li>Selection of Furniture, artefacts, curtains, etc.</li>
                    <li>Orientation and Selection of furniture for the Walk-in Closet</li>
                  </ul>
                </div>
              </CommentableSection>

              <CommentableSection 
                sectionId="sf-sitout" 
                sectionTitle="Second Floor - Sit Out Area"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Sit Out Area</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Selection of Furniture</li>
                    <li>Drawings to convert the area into a semi-closed space</li>
                  </ul>
                </div>
              </CommentableSection>
            </div>
          </Card>
        </section>

        {/* Design Fee */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Design Fee</h2>
          <Card className="p-6 bg-secondary/30">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-lg text-foreground">Total Design Fee</span>
              <span className="text-3xl font-bold text-primary">€1,800</span>
            </div>
            <p className="text-sm text-muted-foreground">ex. VAT</p>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              The invoice covers any additional design advice and selection of all artefacts, paints and any other articles. 
              It also covers the design of false ceilings as and where needed.
            </p>
          </Card>
        </section>

        {/* Terms of Payment */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Terms of Payment</h2>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Payment to be made in 3 installments:
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                <span className="font-semibold text-foreground">1st Installment</span>
                <span className="text-primary font-semibold">40% (€720)</span>
              </div>
              <p className="text-xs text-muted-foreground ml-3">To be paid before the work starts</p>

              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                <span className="font-semibold text-foreground">2nd Installment</span>
                <span className="text-primary font-semibold">30% (€540)</span>
              </div>
              <p className="text-xs text-muted-foreground ml-3">To be paid mid-way</p>

              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-md">
                <span className="font-semibold text-foreground">3rd Installment</span>
                <span className="text-primary font-semibold">30% (€540)</span>
              </div>
              <p className="text-xs text-muted-foreground ml-3">To be paid before submission of final drawings/requirements</p>
            </div>
          </Card>
        </section>

        {/* Exclusions & Validity */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Exclusions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The mentioned fee does not include any material or labour costs and commute required for material 
                selection if any.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Validity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quote valid for 7 days from the date of issue.
              </p>
            </Card>
          </div>
          <div className="mt-6 text-right">
            <Link to="/terms" className="text-sm font-semibold text-primary hover:underline">
              View General Terms and Conditions
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p className="mb-2">Purple Palette Design Studios</p>
          <p className="text-xs">ar.apershad@gmail.com | +31 633 461 503 | VAT: NL005240200B61</p>
        </footer>

      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 1cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
