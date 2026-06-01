import { SectionHeading } from "@/components/section-heading";

export function AboutPreview() {
  return (
    <section className="py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SectionHeading
          eyebrow="About"
          title="ARYONIX is a premium technology studio, not a freelance portfolio."
          description="We help founders, businesses and creators turn digital presence into a serious operating asset."
        />
        <div className="panel rounded-2xl p-6">
          {["Mission", "Vision", "Values"].map((item, index) => (
            <div key={item} className="border-b border-line py-6 last:border-0">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary">
                {item}
              </p>
              <p className="mt-3 text-lg leading-7 text-text">
                {index === 0
                  ? "Build serious digital products that help businesses grow with confidence."
                  : index === 1
                    ? "Become the studio ambitious brands trust for premium web platforms."
                    : "Clarity, craft, speed, ownership and measurable quality."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
