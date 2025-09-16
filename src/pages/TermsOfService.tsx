import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, FileLock } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <FileLock className="w-12 h-12 mx-auto text-brand-yellow mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent">
              Terms of Service
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
                Welcome to EllowDigital. These Terms of Service ("Terms") govern
                your use of our website and services. By accessing or using our
                services, you agree to be bound by these Terms.
              </p>
              <p>
                Please read these Terms carefully. If you do not agree with all
                of these Terms, you are prohibited from using our website and
                services and must discontinue use immediately.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                2. Definitions
              </h2>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>"Company", "We", "Us", "Our"</strong> refers to
                  EllowDigital.
                </li>
                <li>
                  <strong>"Website"</strong> refers to EllowDigital's website,
                  accessible at ellowdigitals.me
                </li>
                <li>
                  <strong>"Service"</strong> refers to the services provided by
                  EllowDigital, including but not limited to web development,
                  mobile app development, UI/UX design, and SEO services.
                </li>
                <li>
                  <strong>"You", "Your"</strong> refers to the individual
                  accessing or using our Services, or the company, or other
                  legal entity on behalf of which such individual is accessing
                  or using the Services.
                </li>
                <li>
                  <strong>"Content"</strong> refers to text, images, photos,
                  audio, video, graphics, and all other forms of data or
                  communication.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                3. Use of Our Services
              </h2>
              <h3 className="text-xl font-semibold mb-3">3.1 Eligibility</h3>
              <p>
                By using our Services, you represent and warrant that you are at
                least 18 years of age and are legally capable of entering into a
                binding contract.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                3.2 Account Responsibility
              </h3>
              <p>
                If you create an account with us, you are responsible for
                maintaining the security of your account and for all activities
                that occur under your account. You agree to immediately notify
                us of any unauthorized use of your account or any other breach
                of security.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                3.3 Acceptable Use
              </h3>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Use our Services in any way that violates any applicable
                  national or international law or regulation
                </li>
                <li>
                  Use our Services for any illegal or unauthorized purpose
                </li>
                <li>
                  Violate or attempt to violate the security of our Services
                </li>
                <li>Interfere with the proper working of our Services</li>
                <li>
                  Attempt to bypass any measures designed to prevent or restrict
                  access to our Services
                </li>
                <li>
                  Use any robot, spider, crawler, scraper or other automated
                  means to access our Services
                </li>
                <li>
                  Decompile, reverse engineer, or disassemble any software or
                  other products or processes accessible through our Services
                </li>
                <li>
                  Insert any code or product or manipulate the content in any
                  way
                </li>
                <li>
                  Upload or transmit viruses or any other type of malicious code
                </li>
                <li>Collect or track personal information of others</li>
                <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>
                  Engage in any other conduct that restricts or inhibits
                  anyone's use or enjoyment of our Services
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                3.4 Service Changes and Availability
              </h3>
              <p>
                We reserve the right to modify, suspend, or discontinue our
                Services, whether temporarily or permanently, at any time, with
                or without notice to you. We will not be liable to you or to any
                third party for any such modification, suspension, or
                discontinuation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                4. Intellectual Property Rights
              </h2>
              <h3 className="text-xl font-semibold mb-3">
                4.1 Our Intellectual Property
              </h3>
              <p>
                Our Services and all content, features, and functionality
                thereof, including but not limited to all information, software,
                text, displays, images, video, and audio, and the design,
                selection, and arrangement thereof, are owned by us, our
                licensors, or other providers of such material and are protected
                by copyright, trademark, patent, trade secret, and other
                intellectual property or proprietary rights laws.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                4.2 Limited License
              </h3>
              <p>
                Subject to your compliance with these Terms, we grant you a
                limited, non-exclusive, non-transferable, and revocable license
                to access and use our Services for your personal, non-commercial
                use.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                4.3 Restrictions
              </h3>
              <p>You may not:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Reproduce, distribute, publicly display, or publicly perform
                  our Services or any part thereof
                </li>
                <li>
                  Modify or make derivative works based upon our Services or any
                  part thereof
                </li>
                <li>
                  Use our Services or any part thereof for any commercial
                  purpose without our prior written consent
                </li>
                <li>
                  Remove any copyright, trademark, or other proprietary notices
                  from our Services or any part thereof
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                5. User Content
              </h2>
              <h3 className="text-xl font-semibold mb-3">
                5.1 Content Ownership
              </h3>
              <p>
                You retain all rights to any content you submit, post, or
                display on or through our Services ("User Content"). By
                providing User Content to us, you grant us a worldwide,
                non-exclusive, royalty-free license to use, reproduce, modify,
                adapt, publish, translate, distribute, and display such content
                in connection with providing our Services to you.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                5.2 Content Responsibility
              </h3>
              <p>
                You are solely responsible for any User Content you provide and
                the consequences of posting or publishing it. You affirm,
                represent, and warrant that you own or have the necessary
                licenses, rights, consents, and permissions to publish any User
                Content you submit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                6. Payment Terms
              </h2>
              <p>
                For services that require payment, the following terms apply:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  All payments are due in advance unless otherwise specified in
                  the service agreement
                </li>
                <li>Prices are subject to change with notice</li>
                <li>
                  You agree to provide current, complete, and accurate purchase
                  and account information for all purchases made via our
                  Services
                </li>
                <li>
                  We reserve the right to refuse any order placed through our
                  Services
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                7. Disclaimers
              </h2>
              <h3 className="text-xl font-semibold mb-3">7.1 No Warranties</h3>
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT
                NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                7.2 Service Accuracy
              </h3>
              <p>
                WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR
                ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES
                OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                IN NO EVENT SHALL WE, OUR DIRECTORS, EMPLOYEES, PARTNERS,
                AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES,
                INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE,
                GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR
                  SERVICES
                </li>
                <li>
                  ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES
                </li>
                <li>ANY CONTENT OBTAINED FROM OUR SERVICES</li>
                <li>
                  UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS
                  OR CONTENT
                </li>
                <li>ANY OTHER MATTER RELATING TO OUR SERVICES</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                9. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold us harmless from and
                against any claims, liabilities, damages, judgments, awards,
                losses, costs, expenses or fees (including reasonable attorneys'
                fees) arising out of or relating to your violation of these
                Terms or your use of our Services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                10. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of India, without regard to its conflict of law
                provisions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                11. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. We will notify you
                of any changes by posting the new Terms on this page and
                updating the "Last updated" date at the top of these Terms.
              </p>
              <p>
                You are advised to review these Terms periodically for any
                changes. Changes to these Terms are effective when they are
                posted on this page.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                12. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
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

export default TermsOfService;
