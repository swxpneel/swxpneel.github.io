"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { education, experience, profile, skills } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

type SectionKey = "education" | "experience";

const sections: Array<{
    key: SectionKey;
    title: string;
    items: typeof education;
}> = [
    { key: "education", title: "Education", items: education },
    { key: "experience", title: "Leadership & Activities", items: experience },
];

function Timeline({
    sectionKey,
    title,
    items,
    open,
    onToggle,
}: {
    sectionKey: SectionKey;
    title: string;
    items: typeof education;
    open: boolean;
    onToggle: (key: SectionKey) => void;
}) {
    const panelId = `${sectionKey}-panel`;

    return (
        <section className="timeline" id={sectionKey}>
            <div className="title-wrapper">
                <button
                    type="button"
                    className="timeline-toggle"
                    onClick={() => onToggle(sectionKey)}
                    aria-expanded={open}
                    aria-controls={panelId}
                >
                    <div className="icon-box">
                        <BookOpen aria-hidden="true" />
                    </div>
                    <h3 className="h3">{title}</h3>
                    <ChevronDown
                        className={`timeline-chevron${open ? " is-open" : ""}`}
                        size={18}
                        aria-hidden="true"
                    />
                </button>
            </div>

            <div className={`timeline-panel${open ? "" : " is-collapsed"}`} id={panelId}>
                <ol className="timeline-list">
                    {items.map((it) => (
                        <li className="timeline-item" key={it.title + it.org}>
                            <h4 className="h4 timeline-item-title">{it.title}</h4>
                            <span>{it.range}</span>
                            {Array.isArray(it.details) ? (
                                <>
                                    <p className="timeline-text timeline-org">{it.org}</p>
                                    <ul className="timeline-bullets">
                                        {it.details.map((detail, index) => (
                                            <li key={`${detail}-${index}`}>{detail}</li>
                                        ))}
                                    </ul>
                                    {it.coursework?.length ? (
                                        <p className="timeline-text coursework-inline">
                                            <strong className="coursework-label">Relevant coursework:</strong>{" "}
                                            <span className="coursework-courses">
                                                {it.coursework.join(" | ")}
                                            </span>
                                        </p>
                                    ) : null}
                                </>
                            ) : (
                                <p className="timeline-text">{`${it.org} - ${it.details}`}</p>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default function Resume() {
    const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
        education: true,
        experience: true,
    });

    useEffect(() => {
            const applyHash = () => {
                const hash = window.location.hash.replace("#", "");
                if (hash === "education" || hash === "experience") {
                    setOpenSections((prev) => ({ ...prev, [hash]: true }));
                    const el = document.getElementById(hash);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
            };

            applyHash();
        window.addEventListener("hashchange", applyHash);
        return () => window.removeEventListener("hashchange", applyHash);
    }, []);

    const toggleSection = (key: SectionKey) => {
        setOpenSections((prev) => {
            const nextOpen = !prev[key];
            trackEvent("timeline_toggle", { section: key, open: nextOpen });
            const next = { ...prev, [key]: nextOpen };
            if (next[key]) {
                const url = new URL(window.location.href);
                url.hash = key;
                window.history.replaceState(null, "", url.toString());
            }
            return next;
        });
    };

    return (
        <>
            <header>
                <h2 className="h2 article-title">Resume</h2>
            </header>

            <a
                className="resume-btn resume-btn--spaced"
                href={profile.resumeUrl}
                download
                onClick={() => trackEvent("resume_download")}
            >
                Download Resume
            </a>

            {sections.map((section) => (
                <Timeline
                    key={section.key}
                    sectionKey={section.key}
                    title={section.title}
                    items={section.items}
                    open={openSections[section.key]}
                    onToggle={toggleSection}
                />
            ))}

            <section className="skill">
                <h3 className="h3 skills-title">My skills</h3>
                <ul className="skills-list content-card">
                    {skills.map((s) => (
                        <li key={s.name} className="skills-item">
                            <div className="skills-logo">
                                <Image src={s.logo} alt={`${s.name} logo`} width={36} height={36} />
                            </div>
                            <span className="skills-name">{s.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
