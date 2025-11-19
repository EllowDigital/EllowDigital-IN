import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cookie, FileText } from "lucide-react";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Cookie className="w-12 h-12 mx-auto text-brand-yellow mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-yellow to-brand-gold bg-clip-text text-transparent">
              Cookies Policy
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
                This Cookies Policy explains what cookies are and how
                EllowDigital ("we," "us," or "our") uses them on our website. We
                encourage you to read this policy to understand what cookies
                are, how we use them, and how you can control them.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                2. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and provide information to
                the owners of the site. Cookies enhance user experience by
                remembering your preferences and enabling certain site features.
              </p>
              <p>
                Cookies can be "persistent" or "session" cookies. Persistent
                cookies remain on your device when you go offline, while session
                cookies are deleted as soon as you close your web browser.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                3. How We Use Cookies
              </h2>
              <p>We use cookies for a variety of reasons, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Essential cookies:</strong> These are necessary for
                  the operation of our website and enable you to use its
                  features, such as accessing secure areas.
                </li>
                <li>
                  <strong>Functionality cookies:</strong> These allow our
                  website to remember choices you make and provide enhanced,
                  personalized features.
                </li>
                <li>
                  <strong>Analytical/performance cookies:</strong> These help us
                  understand how visitors interact with our website by
                  collecting and reporting information anonymously.
                </li>
                <li>
                  <strong>Targeting cookies:</strong> These record your visit to
                  our website, the pages you have visited, and the links you
                  have followed to make our advertising more relevant to your
                  interests.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                4. Types of Cookies We Use
              </h2>
              <h3 className="text-xl font-semibold mb-3">
                4.1 Strictly Necessary Cookies
              </h3>
              <p>
                These cookies are essential for you to browse our website and
                use its features, such as accessing secure areas of the site.
                The information collected by these cookies relate to the
                operation of our website, for example website scripting language
                and security tokens to maintain secure areas of our website.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                4.2 Performance Cookies
              </h3>
              <p>
                These cookies collect information about how you use our website,
                like which pages you visited and which links you clicked on.
                This information is aggregated and anonymized and does not
                identify you individually. We use this data to improve the
                functionality of our website.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                4.3 Functionality Cookies
              </h3>
              <p>
                These cookies allow our website to remember choices you make and
                provide enhanced features. They may also be used to provide
                services you have requested, such as watching a video or
                commenting on a blog.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                4.4 Targeting/Advertising Cookies
              </h3>
              <p>
                These cookies record your visit to our website, the pages you
                have visited, and the links you have followed. We use this
                information to make our website and the advertising displayed on
                it more relevant to your interests.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                5. Third-Party Cookies
              </h2>
              <p>
                In addition to our own cookies, we may also use various
                third-party cookies to report usage statistics, deliver
                advertisements, and track user behavior on our website. These
                cookies may include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Google Analytics:</strong> To analyze website traffic
                  and user behavior
                </li>
                <li>
                  <strong>Google AdSense:</strong> For serving personalized
                  advertisements
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> To track conversions and
                  serve targeted ads on Facebook
                </li>
                <li>
                  <strong>LinkedIn Insight Tag:</strong> For tracking
                  conversions and campaign metrics
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                6. Managing Cookies
              </h2>
              <p>
                Most web browsers allow some control of most cookies through the
                browser settings. To find out more about cookies, including how
                to see what cookies have been set and how to manage and delete
                them, visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  className="text-brand-yellow hover:underline"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>
              <p>
                You can choose to reject or block all or specific types of
                cookies by adjusting your browser settings. Please note that if
                you choose to reject cookies, you may not be able to use the
                full functionality of our website.
              </p>
              <h3 className="text-xl font-semibold mb-3 mt-6">
                How to manage cookies in popular browsers:
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Google Chrome:</strong> Settings {"->"} Privacy and
                  Security {"->"} Cookies and other site data
                </li>
                <li>
                  <strong>Microsoft Edge:</strong> Settings {"->"} Cookies and
                  Site Permissions {"->"} Manage and delete cookies and site
                  data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences {"->"} Privacy {"->"}{" "}
                  Cookies and website data
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong> Options {"->"} Privacy &
                  Security {"->"} Cookies and Site Data
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                7. Your Consent
              </h2>
              <p>
                By continuing to use our website, you consent to our use of
                cookies as described in this Cookies Policy. You can withdraw
                your consent at any time by deleting the cookies on your device
                or adjusting your browser settings.
              </p>
              <p>
                We provide a cookies banner on our website that allows you to
                accept or decline non-essential cookies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                8. Changes to Our Cookies Policy
              </h2>
              <p>
                We may update this Cookies Policy from time to time to reflect
                changes in technology, regulation, or our business practices.
                Any changes will be posted on this page with an updated revision
                date. We encourage you to check this page periodically to stay
                informed about our use of cookies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                9. Contact Us
              </h2>
              <p>
                If you have any questions about our use of cookies, please
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

export default CookiesPolicy;
