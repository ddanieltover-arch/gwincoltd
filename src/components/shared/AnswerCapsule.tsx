interface AnswerCapsuleProps {
  children: React.ReactNode;
}

/** GEO-optimized direct answer block for featured snippets and AI citation. */
export function AnswerCapsule({ children }: AnswerCapsuleProps) {
  return (
    <section
      id="answer"
      aria-label="Quick Answer"
      className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 md:p-8"
    >
      <p className="text-base leading-relaxed text-emerald-950">
        <strong className="font-semibold">Quick Answer: </strong>
        {children}
      </p>
    </section>
  );
}
