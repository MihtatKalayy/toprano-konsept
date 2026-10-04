import { site } from '../../content/site'

const copy = site.pages.home.workshop

export function WorkshopSection() {
  return (
    <section aria-labelledby="atolye" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-prose">
        <h2 id="atolye" className="text-3xl font-semibold">
          {copy.heading}
        </h2>
        {copy.story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mt-4 text-lg leading-relaxed text-antrasit-900">
            {paragraph}
          </p>
        ))}
      </div>

      <h3 className="mt-12 text-2xl font-semibold">{copy.stepsHeading}</h3>
      <ol className="mt-6 grid gap-6 md:grid-cols-3">
        {copy.steps.map((step, index) => (
          <li key={step.id} className="overflow-hidden rounded-lg bg-notr ring-1 ring-krem-200">
            <img
              src={step.image.src}
              alt={step.image.alt}
              width={step.image.width}
              height={step.image.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-5">
              <h4 className="flex items-baseline gap-3 text-xl font-semibold">
                <span aria-hidden="true" className="font-display text-2xl text-kiremit-700">
                  {index + 1}
                </span>
                {step.title}
              </h4>
              <p className="mt-2 text-antrasit-700">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
