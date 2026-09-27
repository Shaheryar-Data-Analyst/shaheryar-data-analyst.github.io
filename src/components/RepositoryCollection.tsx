export interface RepositoryEntry {
  name: string;
  title: string;
  description: string;
  status: string;
  url: string | null;
  demoUrl?: string;
}

interface RepositoryCollectionProps {
  repositories: RepositoryEntry[];
  email: string;
  isArabic?: boolean;
}

const linkClassName =
  'inline-flex min-h-11 items-center gap-2 rounded-sm text-[10px] font-medium tracking-[0.18em] text-[#E8D7C5] transition-colors hover:text-[#D4AF37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]';

export const RepositoryCollection = ({ repositories, email, isArabic = false }: RepositoryCollectionProps) => (
  <section
    aria-labelledby="repository-collection-heading"
    className="relative mt-20 border-t border-[#8C6D4F]/30 pt-12 text-[#E8DFD8]"
    style={{ fontFamily: "'Montserrat', sans-serif" }}
  >
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <h3
        id="repository-collection-heading"
        className="text-4xl leading-none tracking-tight text-[#F7E7C4] sm:text-5xl"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {isArabic ? 'المزيد من مشاريعي على غيت هب' : 'MORE FROM MY GITHUB'}
      </h3>
      <a
        href="https://github.com/Shaheryar-Data-Analyst"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View all Shaheryar repositories on GitHub (opens in a new tab)"
        className={`${linkClassName} self-start sm:self-auto`}
      >
        {isArabic ? 'جميع المستودعات' : 'ALL REPOSITORIES'} <span aria-hidden="true">↗</span>
      </a>
    </div>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {repositories.map((repository) => (
        <article
          key={repository.name}
          className="flex min-w-0 flex-col rounded-xl border border-[#8C6D4F]/35 bg-[#0E0C0A] p-6 transition-colors hover:border-[#D4AF37]/65 sm:p-7"
        >
          <span className="mb-5 self-start rounded-sm border border-[#8C6D4F]/35 bg-[#16120E] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-[#D4AF37]">
            {repository.status}
          </span>
          <h4
            className="mb-2 text-3xl leading-none tracking-tight text-[#F5EEE7] sm:text-4xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {repository.title}
          </h4>
          <p className="mb-4 break-all font-mono text-[11px] leading-relaxed text-[#A8988B]">
            {repository.name}
          </p>
          <p className="mb-5 text-xs leading-[1.85] text-[#BDB0A4] sm:text-sm">
            {repository.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 border-t border-[#8C6D4F]/25 pt-3">
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(`Project enquiry: ${repository.title}`)}`}
              aria-label={`Request details about ${repository.title} by email`}
              className={linkClassName}
            >
              {isArabic ? 'اطلب التفاصيل' : 'REQUEST DETAILS'} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default RepositoryCollection;
