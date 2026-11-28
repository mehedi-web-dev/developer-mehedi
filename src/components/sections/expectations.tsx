"use client";

import * as React from "react";
import { AccordionItem } from "@/components/ui/accordion-item";

export interface ExpectationsSectionProps {
  hideDesktopSlot?: boolean;
}

export function ExpectationsSection({ hideDesktopSlot = false }: ExpectationsSectionProps = {}) {
  const [openIndex, setOpenIndex] = React.useState<number>(0);

  const expectations = [
    {
      title: "Professional Web Development & Design",
      subtitle:
        "Bespoke websites and e-commerce stores engineered to perform, convert, and impress across all desktop, tablet, and mobile displays.",
      items: [
        "Unique, purposeful UI/UX designed for your brand",
        "Conversion-focused architecture and clear call-to-actions",
        "Lightning-fast load times and SEO-friendly code structure",
      ],
    },
    {
      title: "Transparent Pricing & Fixed Estimates",
      subtitle:
        "No unexpected invoices or hidden surprise fees. We agree on a comprehensive, fixed project scope and price before any work begins.",
      items: [
        "All-inclusive fixed project fee",
        "Itemized milestones and clear deliverables",
        "No recurring hidden platform lock-in fees",
      ],
    },
    {
      title: "Fast Turnaround Delivery Guarantee",
      subtitle:
        "Your new website or online store is guaranteed to go live within 7 to 10 business days once content and feedback are provided.",
      items: [
        "Live deployment within 7-10 working days",
        "Streamlined agile workflow with active updates",
        "Immediate online presence ready for customers",
      ],
    },
    {
      title: "Ongoing Support & Proactive Maintenance",
      subtitle:
        "Even after launch, I keep your web assets running in peak condition with continuous monitoring, backups, and security updates.",
      items: [
        "WordPress core, theme, and plugin security updates",
        "Daily automated off-site cloud backups and uptime checks",
        "Speed monitoring and database optimization",
        "Priority technical assistance for content and layout changes",
      ],
    },
  ];

  return (
    <section id="expectations" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column Content & Accordions */}
        <div className="lg:col-span-7">
          <span className="text-xs uppercase tracking-widest text-[#c6ff00] font-mono font-semibold block mb-2">
            Web Development &amp; Design
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            What can you expect from me?
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            My approach combines strategic insight with modern visual design to create web solutions that deliver measurable business growth.
          </p>

          <div className="bg-[#141517] rounded-3xl p-6 sm:p-8 border border-white/10 mb-6">
            {expectations.map((item, idx) => (
              <AccordionItem
                key={idx}
                number={`0${idx + 1}.`}
                title={item.title}
                subtitle={item.subtitle}
                items={item.items}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              />
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#141518] border border-white/5 text-xs text-zinc-400">
            <p className="font-semibold text-white mb-1">
              Guaranteed delivery within 7-10 days
            </p>
            <p>
              No endless delays or vague timelines — just a disciplined, well-crafted development process from first sketch to live launch.
            </p>
          </div>
        </div>

        {/* Right Column: On Desktop, Sticky 3D Card flips into this space! On Mobile, shows standard card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[340px] h-[476px] hidden lg:block" />
          <div className="lg:hidden w-full max-w-sm rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://framerusercontent.com/images/Nf63tXddU52SRtJJgRHqk7zzD2g.png"
              alt="Mehedi Workspace"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
