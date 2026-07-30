import { ExternalLink, SkipLink } from "@theorvane/ui";

import { docGroups, docHref, findPage, neighbours, strings } from "../../lib/docs/manifest";
import { locales, type Locale } from "../../lib/docs/types";

const repositoryUrl = "https://github.com/Theorvane/openvideo";
const localeNames: Readonly<Record<Locale, string>> = { en: "English", ko: "한국어" };

function Sidebar({ locale, activeSlug }: { readonly locale: Locale; readonly activeSlug?: string | undefined }) {
	const text = strings(locale);
	return (
		<nav className="doc-sidebar" aria-label={text.sidebarLabel}>
			<a className="doc-sidebar__home" href={docHref(locale)} aria-current={activeSlug ? undefined : "page"}>
				{text.indexTitle}
			</a>
			{docGroups.map((group) => (
				<div key={group.id}>
					<strong>{text.groups[group.id]}</strong>
					{group.slugs.map((slug) => (
						<a key={slug} href={docHref(locale, slug)} aria-current={slug === activeSlug ? "page" : undefined}>
							{findPage(locale, slug)?.title}
						</a>
					))}
				</div>
			))}
		</nav>
	);
}

function LanguageSwitch({ locale, slug }: { readonly locale: Locale; readonly slug?: string | undefined }) {
	return (
		<div className="doc-language">
			<span>{strings(locale).languageLabel}</span>
			{locales.map((candidate) => (
				<a key={candidate} href={docHref(candidate, slug)} hrefLang={candidate} aria-current={candidate === locale ? "true" : undefined}>
					{localeNames[candidate]}
				</a>
			))}
		</div>
	);
}

function Pagination({ locale, slug }: { readonly locale: Locale; readonly slug: string }) {
	const text = strings(locale);
	const { previous, next } = neighbours(slug);
	if (!previous && !next) return null;
	return (
		<nav className="doc-pagination" aria-label={`${text.previous} / ${text.next}`}>
			{previous ? <a href={docHref(locale, previous)}><span>← {text.previous}</span>{findPage(locale, previous)?.title}</a> : <span />}
			{next ? <a className="doc-pagination__next" href={docHref(locale, next)}><span>{text.next} →</span>{findPage(locale, next)?.title}</a> : <span />}
		</nav>
	);
}

export function DocShell({ locale, slug, children }: { readonly locale: Locale; readonly slug?: string | undefined; readonly children: React.ReactNode }) {
	const text = strings(locale);
	return (
		<>
			<SkipLink />
			<header className="doc-header">
				<div className="shell doc-header__inner">
					<a className="wordmark" href="/">
						<img className="wordmark__mark" src="/logo.svg" alt="" width="24" height="24" />
						OPEN<span>VIDEO</span>
					</a>
					<div className="doc-header__links">
						<a href={docHref(locale)}>{text.sidebarLabel}</a>
						<a href="/">{text.backToSite}</a>
						<ExternalLink href={repositoryUrl}>GitHub ↗</ExternalLink>
					</div>
				</div>
			</header>

			{/* The root layout declares lang="en" for the whole site, so the translated subtree marks its own. */}
			<div className="shell doc-layout" lang={locale}>
				<Sidebar locale={locale} activeSlug={slug} />
				<main id="main-content" className="doc-main">
					<LanguageSwitch locale={locale} slug={slug} />
					{children}
					{slug ? <Pagination locale={locale} slug={slug} /> : null}
				</main>
			</div>

			<footer className="site-footer">
				<div className="shell footer-legal">
					<span>© 2026 Theorvane. OpenVideo is open source under the MIT License.</span>
					<span>Local by design.</span>
				</div>
			</footer>
		</>
	);
}
