import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileMinus } from "lucide-react";
import { motion } from "framer-motion";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FileMinus className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Refund & Cancellation Policy
            </h1>
            <p className="text-muted-foreground text-lg">Last updated: May 10, 2025</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <section className="mb-10 p-6 rounded-2xl bg-card/50 border border-border/50">
              <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">At EllowDigital, we strive to ensure complete satisfaction with our services. This policy outlines refund and cancellation terms.</p>
            </section>

            <section className="mb-10 p-6 rounded-2xl bg-card/50 border border-border/50">
              <h2 className="text-2xl font-bold text-primary mb-4">2. Project Deposits</h2>
              <p className="text-muted-foreground">Most projects require an initial deposit which is generally non-refundable as it secures our resources for your project.</p>
            </section>

            <section className="mb-10 p-6 rounded-2xl bg-card/50 border border-border/50">
              <h2 className="text-2xl font-bold text-primary mb-4">3. Contact Us</h2>
              <p className="text-muted-foreground"><strong>Email:</strong> ellowdigitalindia@gmail.com</p>
              <p className="text-muted-foreground"><strong>Phone:</strong> +91 89604 46756</p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
