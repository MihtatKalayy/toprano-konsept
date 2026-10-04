import { Link } from 'react-router'
import { site } from '../../content/site'

export function Footer() {
  const { brand, footer, conceptNotice } = site
  const year = new Date().getFullYear()

  return (
    <footer className="bg-antrasit-900 text-krem">
      <div className="border-b border-antrasit-700 bg-kiremit-800">
        <p className="mx-auto max-w-6xl px-4 py-3 text-center font-semibold sm:px-6">{conceptNotice}</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{brand.name}</p>
          <p className="mt-1 text-kiremit-300">{brand.tagline}</p>
          <p className="mt-4 max-w-prose text-krem-200">{brand.description}</p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-krem">{footer.linksHeading}</h2>
          <ul className="mt-3 space-y-1">
            {footer.links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className="inline-flex min-h-11 min-w-11 items-center text-krem-200 underline-offset-4 transition-colors hover:text-kiremit-300 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-krem">{footer.contactHeading}</h2>
          <address className="mt-3 space-y-2 not-italic text-krem-200">
            <p className="break-words">{footer.contact.email}</p>
            <p>{footer.contact.phone}</p>
            <p>{footer.contact.address}</p>
          </address>
          <p className="mt-3 text-sm text-kiremit-300">{footer.contactNote}</p>
        </div>
      </div>

      <div className="border-t border-antrasit-700">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-krem-200 sm:px-6">{footer.copyright(year)}</p>
      </div>
    </footer>
  )
}
