"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getContactSendEnabled } from "@/lib/contact-settings";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const startedRef = useRef(false);
    const [isValid, setIsValid] = useState(false);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isCoarsePointer, setIsCoarsePointer] = useState(false);
    const [mapInteractive, setMapInteractive] = useState(false);
    const toastTimerRef = useRef<number | null>(null);

    const handleInput = () => {
        const valid = formRef.current?.checkValidity() ?? false;
        setIsValid(valid);
        if (status !== "idle" && status !== "sending") {
            setStatus("idle");
            setStatusMessage(null);
        }
    };

    const handleStart = () => {
        if (!startedRef.current) {
            startedRef.current = true;
            trackEvent("contact_form_start");
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = formRef.current;
        if (!form) return;
        const valid = form.checkValidity();
        setIsValid(valid);
        if (!valid || status === "sending") return;

        const formData = new FormData(form);
        const payload = {
            name: String(formData.get("fullname") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            message: String(formData.get("message") || "").trim(),
            company: String(formData.get("company") || "").trim(),
        };

        if (!getContactSendEnabled()) {
            trackEvent("contact_form_dry_run");
            setStatus("success");
            setStatusMessage("Email sending is disabled (dry run).");
            form.reset();
            setIsValid(false);
            return;
        }

        setStatus("sending");
        setStatusMessage(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || "Something went wrong. Please try again.");
            }

            trackEvent("contact_form_submit");
            setStatus("success");
            setStatusMessage("I'll get back to you soon.");
            form.reset();
            setIsValid(false);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong.";
            trackEvent("contact_form_error");
            setStatus("error");
            setStatusMessage(message);
        }
    };

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const media = window.matchMedia("(hover: none) and (pointer: coarse)");
        const updatePointer = () => {
            const coarse = media.matches;
            setIsCoarsePointer(coarse);
            setMapInteractive(!coarse);
        };
        updatePointer();
        media.addEventListener("change", updatePointer);
        return () => media.removeEventListener("change", updatePointer);
    }, []);

    useEffect(() => {
        if (status !== "success" && status !== "error") return;
        if (toastTimerRef.current) {
            window.clearTimeout(toastTimerRef.current);
        }
        toastTimerRef.current = window.setTimeout(() => {
            setStatus("idle");
            setStatusMessage(null);
        }, 4000);

        return () => {
            if (toastTimerRef.current) {
                window.clearTimeout(toastTimerRef.current);
            }
        };
    }, [status]);

    const mapIsInteractive = !isCoarsePointer || mapInteractive;

    return (
        <>
            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <section
                className="mapbox"
                data-mapbox
                data-map-interactive={mapIsInteractive ? "true" : "false"}
            >
                <figure>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
                        width="400"
                        height="300"
                        loading="lazy"
                        title="Location map"
                    ></iframe>
                </figure>
                {isCoarsePointer ? (
                    mapIsInteractive ? (
                        <button
                            type="button"
                            className="mapbox__toggle"
                            onClick={() => setMapInteractive(false)}
                            aria-label="Disable map interactions"
                        >
                            Disable map
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="mapbox__overlay"
                            onClick={() => setMapInteractive(true)}
                            aria-label="Enable map interactions"
                        >
                            Tap to enable map
                        </button>
                    )
                ) : null}
            </section>

            <section className="contact-form">
                <h3 className="h3 form-title">Contact Form</h3>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="form"
                    data-form
                    aria-busy={status === "sending"}
                >
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="fullname"
                            className="form-input"
                            placeholder="Full name"
                            required
                            data-form-input
                            onInput={handleInput}
                            onFocus={handleStart}
                            autoComplete="name"
                        />

                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email address"
                            required
                            pattern="^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)+$"
                            title="Enter a valid email address (example@domain.com)"
                            data-form-input
                            onInput={handleInput}
                            onFocus={handleStart}
                            autoComplete="email"
                        />
                    </div>

                    <input
                        type="text"
                        name="company"
                        className="form-input form-input--hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                    />

                    <textarea
                        name="message"
                        className="form-input"
                        placeholder="Your Message"
                        required
                        data-form-input
                        onInput={handleInput}
                        onFocus={handleStart}
                        autoComplete="off"
                    ></textarea>

                    <button
                        className="form-btn"
                        type="submit"
                        disabled={!isValid || status === "sending"}
                        data-form-btn
                    >
                        <Send aria-hidden="true" />
                        <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                    </button>

                </form>
            </section>

            {statusMessage && (status === "success" || status === "error") ? (
                <div className={`contact-toast contact-toast--${status}`} role="status" aria-live="polite">
                    <span className="contact-toast__title">
                        {status === "success" ? "Message sent" : "Message failed"}
                    </span>
                    <span className="contact-toast__message">{statusMessage}</span>
                </div>
            ) : null}
        </>
    );
}
