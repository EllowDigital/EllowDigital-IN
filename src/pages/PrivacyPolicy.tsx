import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Shield className="w-12 h-12 mx-auto text-brand-yellow mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent">
              Privacy Policy
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
                Welcome to EllowDigital ("we," "our," or "us"). We are committed
                to protecting your privacy and providing you with a safe
                experience when using our services. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information
                when you visit our website and use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using
                our services, you acknowledge that you have read, understood,
                and agree to be bound by all the terms of this Privacy Policy.
                If you do not agree with our policies and practices, please do
                not use our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold mb-3">
                Personal Information
              </h3>
              <p>
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fill out forms on our website</li>
                <li>Create an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a quote or services</li>
                <li>Participate in surveys or promotions</li>
                <li>Contact us through our contact form, email, or phone</li>
              </ul>
              <p>
                This information may include your name, email address, phone
                number, company name, job title, and any other information you
                choose to provide.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                Automatically Collected Information
              </h3>
              <p>
                When you visit our website, we may automatically collect certain
                information about your device, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Referral source</li>
                <li>Length of visit</li>
                <li>Pages viewed</li>
                <li>Site navigation paths</li>
                <li>
                  Information about the timing, frequency, and pattern of your
                  service use
                </li>
              </ul>
              <p>
                We collect this information using cookies, web beacons, and
                similar technologies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                3. How We Use Your Information
              </h2>
              <p>
                We may use the information we collect for various purposes,
                including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>
                  Sending you technical notices, updates, security alerts, and
                  support messages
                </li>
                <li>
                  Communicating with you about products, services, offers,
                  promotions, and events
                </li>
                <li>
                  Monitoring and analyzing trends, usage, and activities in
                  connection with our services
                </li>
                <li>
                  Detecting, investigating, and preventing fraudulent
                  transactions and other illegal activities
                </li>
                <li>Personalizing your experience on our website</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                4. Cookies and Other Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to track
                activity on our website and store certain information. Cookies
                are files with a small amount of data that may include an
                anonymous unique identifier. Cookies are sent to your browser
                from a website and stored on your device.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                services.
              </p>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Essential cookies:</strong> Necessary for the
                  operation of our website
                </li>
                <li>
                  <strong>Analytical/performance cookies:</strong> Allow us to
                  recognize and count the number of visitors and see how
                  visitors move around our website
                </li>
                <li>
                  <strong>Functionality cookies:</strong> Enable us to
                  personalize content and remember your preferences
                </li>
                <li>
                  <strong>Targeting cookies:</strong> Record your visit to our
                  website, the pages you have visited, and the links you have
                  followed
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                5. Data Sharing and Disclosure
              </h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>With service providers:</strong> We may share your
                  information with third-party vendors, consultants, and other
                  service providers who need access to your information to
                  perform services on our behalf.
                </li>
                <li>
                  <strong>Business transfers:</strong> If we are involved in a
                  merger, acquisition, or sale of all or a portion of our
                  assets, your information may be transferred as part of that
                  transaction.
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose your
                  information if required to do so by law or in response to
                  valid requests by public authorities.
                </li>
                <li>
                  <strong>To protect rights:</strong> We may disclose your
                  information to protect the rights, property, or safety of
                  EllowDigital, our customers, or others.
                </li>
                <li>
                  <strong>With your consent:</strong> We may share your
                  information with your consent or at your direction.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                6. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect the
                security of your personal information. However, please note that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                7. Your Data Protection Rights
              </h2>
              <p>
                Depending on your location, you may have certain rights
                regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to access your personal information</li>
                <li>
                  The right to rectify inaccurate or incomplete information
                </li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the
                information provided in the "Contact Us" section.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                8. Children's Privacy
              </h2>
              <p>
                Our services are not intended for children under the age of 13.
                We do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and you are aware that
                your child has provided us with personal information, please
                contact us.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date at the top of
                this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                10. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
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

export default PrivacyPolicy;
