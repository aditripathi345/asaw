/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustedByMarquee } from './components/TrustedByMarquee';
import { ServiceCategories } from './components/ServiceCategories';
import { FeeCalculator } from './components/FeeCalculator';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { OfficesSection } from './components/OfficesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { ConsultationModal } from './components/ConsultationModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { SuccessToast, ToastData } from './components/SuccessToast';
import { ServiceItem } from './types';
import { MessageSquare, PhoneCall, ArrowUp, Sparkles, ShieldCheck } from 'lucide-react';
import { ALL_SERVICES } from './data/servicesData';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);
  const [consultationTopic, setConsultationTopic] = useState('Company Registration');

  const handleOpenConsultationWithTopic = (topic: string) => {
    setConsultationTopic(topic);
    setIsConsultationOpen(true);
  };

  const handleBookFromCalculator = (serviceName: string) => {
    const matchedService = ALL_SERVICES.find(s => s.name.toLowerCase().includes(serviceName.toLowerCase()));
    if (matchedService) {
      setSelectedService(matchedService);
    } else {
      handleOpenConsultationWithTopic(serviceName);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Main Header */}
      <Header
        onSelectService={(svc) => setSelectedService(svc)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenConsultation={() => handleOpenConsultationWithTopic('General Legal & Tax Advisory')}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectService={(svc) => setSelectedService(svc)}
          onOpenConsultation={() => handleOpenConsultationWithTopic('Company Registration')}
          onShowToast={(toast) => setActiveToast(toast)}
        />

        {/* Scrolling 'Trusted By' Industry & Client Marquee */}
        <TrustedByMarquee />

        {/* 6 Core Pillars of Services Grid */}
        <ServiceCategories
          onSelectService={(svc) => setSelectedService(svc)}
        />

        {/* Interactive Incorporation & Stamp Duty Calculator */}
        <FeeCalculator
          onBookService={handleBookFromCalculator}
        />

        {/* 3-Step Simple Process */}
        <HowItWorks
          onOpenConsultation={() => handleOpenConsultationWithTopic('Company Registration Process')}
        />

        {/* Comparison Matrix & Value Differentiators */}
        <WhyChooseUs />

        {/* Customer Reviews & Ratings */}
        <Testimonials />

        {/* Corporate Headquarters & Contact - Gomti Nagar, Lucknow */}
        <OfficesSection />

        {/* FAQ Accordion */}
        <FaqSection
          onOpenConsultation={() => handleOpenConsultationWithTopic('General Query')}
        />
      </main>

      {/* Comprehensive Directory Footer */}
      <Footer
        onSelectService={(svc) => setSelectedService(svc)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenConsultation={() => handleOpenConsultationWithTopic('General Legal & Tax Advisory')}
      />

      {/* Floating Action Buttons (IndiaFilings signature floating support) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Floating AI Legal Advisor Button */}
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-600 hover:to-indigo-600 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer text-xs font-bold ring-2 ring-blue-400/40"
          title="Ask AI Legal Advisor"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Ask AI Legal Advisor</span>
        </button>

        {/* Floating WhatsApp Advisor button */}
        <a
          href="https://wa.me/919415994473?text=Hello%20ASAW%20Consultancy,%20I%20would%20like%20to%20register%20my%20business."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
          <span className="text-xs font-bold tracking-wide">
            Chat on WhatsApp
          </span>
        </a>

        {/* Floating Quick Call / Talk to CA button */}
        <a
          href="tel:+919415994473"
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer text-xs font-bold"
          title="Direct Phone Call with CA: +91 94159 94473"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Talk to CA (Free)</span>
        </a>
      </div>

      {/* Interactive Modals */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenConsultation={() => {
          if (selectedService) {
            handleOpenConsultationWithTopic(selectedService.name);
          } else {
            handleOpenConsultationWithTopic('General Legal');
          }
        }}
        onShowToast={(toast) => setActiveToast(toast)}
      />

      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultTopic={consultationTopic}
        onShowToast={(toast) => setActiveToast(toast)}
      />

      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpenConsultation={() => {
          setIsAiAssistantOpen(false);
          handleOpenConsultationWithTopic('AI Consultation Escalation');
        }}
      />

      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
        onSelectServiceForNewApp={() => {
          setIsClientPortalOpen(false);
          const pvtLtd = ALL_SERVICES.find(s => s.id === 'pvt-ltd') || ALL_SERVICES[0];
          setSelectedService(pvtLtd);
        }}
      />

      {/* Subtle Floating Success State Notification */}
      <SuccessToast
        toast={activeToast}
        onClose={() => setActiveToast(null)}
      />

    </div>
  );
}
