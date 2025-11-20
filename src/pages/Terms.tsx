import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="p-6">
    <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
    <div className="space-y-3 text-sm text-muted-foreground">{children}</div>
  </Card>
);

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div>
          <p className="text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              ← Back to Quotation
            </Link>
          </p>
          <h1 className="text-4xl font-bold text-foreground mt-4">
            General Terms and Conditions
          </h1>
          <p className="text-muted-foreground">
            Purple Palette Design Studios • Aalsmeer, Netherlands
          </p>
        </div>

        <Section title="Definitions">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Service Provider: Purple Palette Design Studios established in
              Aalsmeer.
            </li>
            <li>
              Customer: the person with whom Purple Palette Design Studios has
              entered into an agreement.
            </li>
            <li>Parties: Service Provider and Customer together.</li>
          </ol>
        </Section>

        <Section title="Applicability">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              These terms apply to all quotations, offers, activities, orders,
              agreements and deliveries of services by or on behalf of the
              Service Provider.
            </li>
            <li>
              Parties can only deviate from these conditions if explicitly agreed
              upon in writing.
            </li>
            <li>
              Parties explicitly exclude applicability of any agreements or terms
              and conditions between the Customer and third parties including
              builders or other suppliers.
            </li>
          </ol>
        </Section>

        <Section title="General Conditions of Service">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              The Customer confirms that they have obtained or will obtain all
              necessary permits from relevant authorities for the changes in the
              property.
            </li>
            <li>
              The Service Provider’s designs guide constructors; work on-site may
              differ due to unforeseen situations.
            </li>
            <li>
              Unforeseen amendments must be conveyed within two weeks of final
              delivery of designs.
            </li>
          </ol>
        </Section>

        <Section title="Offers and Quotations">
          <ol className="list-decimal list-inside space-y-2">
            <li>Offers and quotations are without engagement unless stated.</li>
            <li>
              Offers remain valid for one week from the date of issue unless
              accepted in writing within that time.
            </li>
            <li>
              Offers do not apply to future services and no rights can be derived
              from them.
            </li>
            <li>
              Once designs and specifications are approved, further changes may
              incur additional service or builder costs.
            </li>
          </ol>
        </Section>

        <Section title="Prices and Payment">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              All prices are in Euros, exclusive of VAT and other costs unless
              stated otherwise.
            </li>
            <li>
              Prices are calculated for the agreed scope; Service Provider may
              revise prices if the scope changes.
            </li>
            <li>All invoices are payable within seven days of issuance.</li>
            <li>
              Service Provider may withhold or terminate services for non-payment
              or delayed payment.
            </li>
            <li>
              If the Customer does not pay by the due date, they are legally in
              default without reminder.
            </li>
            <li>
              Customers in default bear extrajudicial collection costs incurred by
              the Service Provider.
            </li>
          </ol>
        </Section>

        <Section title="Services">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              This contract is for design and styling suggestions; Service
              Provider is not liable for construction-related faults.
            </li>
            <li>
              The Service Provider offers no assurances regarding third-party
              furnishing or decor items; disputes lie with the retailer.
            </li>
            <li>
              Agreed services are best-effort obligations, not obligations of
              result.
            </li>
            <li>
              Service Provider executes agreements to the best of its knowledge
              and workmanship standards.
            </li>
            <li>
              Execution takes place after mutual consultation and receipt of
              written agreement plus advance payment.
            </li>
          </ol>
        </Section>

        <Section title="Duty to Inform by the Customer">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Customer must provide all information, data and documents relevant
              to executing the agreement in time.
            </li>
            <li>
              Customer confirms that all relevant blueprints with gas, sewer and
              electricity lines have been provided.
            </li>
            <li>
              Customer guarantees the correctness, completeness and reliability of
              the supplied information.
            </li>
          </ol>
        </Section>

        <Section title="Intellectual Property">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Service Provider retains all intellectual property rights on all
              deliverables.
            </li>
            <li>
              Customer may not copy or make available the intellectual property
              without written permission.
            </li>
          </ol>
        </Section>

        <Section title="Complaints">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Customer must examine services promptly for shortcomings.
            </li>
            <li>
              Complaints must be reported promptly and within one month of
              delivery with detailed description.
            </li>
            <li>
              Customer must provide notice outlining shortcomings and allow 15
              days to resolve them.
            </li>
          </ol>
        </Section>

        <Section title="Service Provider Liability">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Liability is limited to direct losses resulting from willful default
              or gross negligence.
            </li>
            <li>
              Service Provider is not liable for indirect, special or
              consequential damages.
            </li>
            <li>
              Liability is capped at the fees actually invoiced and paid.
            </li>
            <li>
              Rights to seek compensation lapse within three months of service
              provision.
            </li>
          </ol>
        </Section>

        <Section title="Termination">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              If the Customer terminates for convenience after acceptance, fees
              for effort spent up to notice are payable.
            </li>
            <li>
              By accepting the agreement, the Customer waives the right to
              terminate due to preference or aesthetic concerns.
            </li>
            <li>
              Customer may terminate without fees if the Service Provider fails to
              deliver with good workmanship and does not address the complaint
              within 15 days after written notice.
            </li>
          </ol>
        </Section>

        <Section title="Others">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Service Provider may suspend services in case of force majeure.
            </li>
            <li>
              Customer cannot transfer rights without written consent of the
              Service Provider.
            </li>
            <li>Dutch law applies to all services.</li>
            <li>
              Parties submit to the jurisdiction of the Courts of Amsterdam for
              any dispute.
            </li>
          </ol>
        </Section>

        <Separator />
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Purple Palette Design Studios. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Terms;

