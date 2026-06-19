const stats = [
  { label: "Avg. Home Price", value: "$425K" },
  { label: "Days on Market", value: "32" },
  { label: "Active Listings", value: "2,400+" },
  { label: "YoY Appreciation", value: "+3.8%" },
];

export function MarketSnapshot() {
  return (
    <section className="border-y border-border bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
          Northeast Atlanta Market Snapshot
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-light text-navy-900 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
