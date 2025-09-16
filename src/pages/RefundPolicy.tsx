import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileMinus, FileText } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <FileMinus className="w-12 h-12 mx-auto text-brand-yellow mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent">
              Refund & Cancellation Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: May 10, 2025
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                1. Introduction
              </h2>
              <p>
                At EllowDigital, we strive to ensure complete satisfaction with
                our services. This Refund and Cancellation Policy outlines the
                terms and conditions regarding refunds and cancellations for our
                digital services and products.
              </p>
              <p>
                By engaging our services, you acknowledge that you have read,
                understood, and agree to be bound by this policy. This policy
                may be updated from time to time, and it is your responsibility
                to review it periodically.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                2. Service Contracts
              </h2>
              <p>
                Our services are typically provided under custom service
                agreements tailored to each client's specific needs. The
                specific refund and cancellation terms for your project will be
                outlined in your service contract. In the absence of specific
                terms in your contract, this general policy applies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                3. Project Deposits
              </h2>
              <p>
                Most projects require an initial deposit before work begins.
                These deposits are generally non-refundable as they secure our
                resources for your project. However, exceptions may be
                considered under the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  If we fail to commence work within the agreed timeframe
                  (typically 30 days from deposit payment), you may request a
                  full refund of your deposit.
                </li>
                <li>
                  If unforeseen circumstances prevent us from delivering the
                  agreed services, a partial or full refund may be issued at our
                  discretion.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                4. Cancellation by Client
              </h2>
              <p>If you need to cancel a project after work has begun:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>
                    Early Stage Cancellation (within first 25% of project
                    timeline):
                  </strong>{" "}
                  You may be eligible for a partial refund of up to 50% of
                  payments made beyond the initial deposit.
                </li>
                <li>
                  <strong>
                    Mid-Stage Cancellation (25-75% of project timeline):
                  </strong>{" "}
                  Payments made are generally non-refundable, but you will
                  receive all work completed up to the point of cancellation.
                </li>
                <li>
                  <strong>
                    Late Stage Cancellation (beyond 75% of project timeline):
                  </strong>{" "}
                  No refunds will be provided, and final payments will still be
                  due according to the payment schedule.
                </li>
              </ul>
              <p>
                All cancellation requests must be submitted in writing to
                ellowdigitalindia@gmail.com. The effective date of cancellation
                will be the date we receive your written notice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                5. Project Milestones and Payments
              </h2>
              <p>
                For projects with milestone-based payments, each milestone
                payment is considered payment for work completed up to that
                point. Once a milestone is approved and payment is made, that
                payment is non-refundable.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                6. Subscription Services
              </h2>
              <p>
                For ongoing subscription services (e.g., maintenance plans, SEO
                services):
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Monthly subscriptions may be canceled with 30 days' written
                  notice.
                </li>
                <li>
                  Annual subscriptions may be canceled with 60 days' written
                  notice, with a prorated refund for unused months minus a 10%
                  early termination fee.
                </li>
                <li>
                  No refunds are provided for partially used monthly service
                  periods.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                7. Dissatisfaction with Services
              </h2>
              <p>If you are dissatisfied with our services:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Notify us in writing within 7 days of the delivery of a
                  milestone or final product.
                </li>
                <li>
                  Clearly state the specific issues or discrepancies from the
                  agreed scope of work.
                </li>
                <li>
                  Allow us 14 days to address and rectify the identified issues.
                </li>
              </ul>
              <p>
                If we cannot resolve the issues to meet the originally agreed
                specifications, you may be eligible for a partial refund or
                service credit, determined on a case-by-case basis.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                8. Cancellation by EllowDigital
              </h2>
              <p>
                We reserve the right to cancel or terminate services in the
                following situations:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Violation of our terms of service</li>
                <li>Unethical or illegal use of our services</li>
                <li>
                  Failure to provide necessary information or materials for
                  project completion
                </li>
                <li>Non-payment or repeated late payment</li>
                <li>Abusive behavior toward our team members</li>
              </ul>
              <p>
                In such cases, refunds will be determined based on the
                circumstances and stage of completion, at our sole discretion.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                9. Force Majeure
              </h2>
              <p>
                Neither party shall be liable for any failure or delay in
                performance due to circumstances beyond reasonable control,
                including but not limited to acts of God, natural disasters,
                pandemic, terrorism, war, civil unrest, or government actions.
                In such cases, we will work with you to determine an equitable
                resolution.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                10. Contact Information
              </h2>
              <p>
                For any questions or concerns regarding this policy, please
                contact us at:
              </p>
              <div className="mt-3">
                <p>
                  <strong>Email:</strong> ellowdigitalindia@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 89604 46756
                </p>
                <p>
                  <strong>Address:</strong> Lucknow, Uttar Pradesh, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
