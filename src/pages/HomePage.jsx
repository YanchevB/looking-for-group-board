//TODO: Change import once button component is created
import '../styles/button.css'

export default function HomePage() {
    return (
        <main className="page-main">
            <div className="container">
                {/* Hero section */}
                <section
                    className="section"
                    style={{
                        textAlign: "center",
                        paddingBlock: "var(--space-7) var(--space-6)"
                    }}
                >
                    <h1 style={{ maxWidth: "20ch", marginInline: "auto" }}>
                        Find people to play with, right now.
                    </h1>
                    <p
                        style={{
                            maxWidth: "48ch",
                            margin: "var(--space-4) auto var(--space-6)",
                            fontSize: "var(--fs-md)"
                        }}
                    >
                        LFG Board is where gamers host quick sessions and others jump in. Pick a
                        game, set your open slots, and get playing in minutes — no Discord
                        server required.
                    </p>
                    <div className="btn-group" style={{ justifyContent: "center" }}>
                        <a href="catalog.html" className="btn btn--primary btn--lg">
                            Browse sessions
                        </a>
                        <a href="register.html" className="btn btn--secondary btn--lg">
                            Create a free account
                        </a>
                    </div>
                </section>
                {/* How it works */}
                <section className="section">
                    <div
                        className="section__heading"
                        style={{ justifyContent: "center", textAlign: "center" }}
                    >
                        <h2 style={{ width: "100%" }}>How it works</h2>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--space-3)"
                        }}
                    >
                        <div className="surface" style={{ padding: "var(--space-5)" }}>
                            <h3
                                style={{ fontSize: "var(--fs-md)", marginBottom: "var(--space-2)" }}
                            >
                                1. Host a session
                            </h3>
                            <p>Pick your game, platform, and how many slots you have open.</p>
                        </div>
                        <div className="surface" style={{ padding: "var(--space-5)" }}>
                            <h3
                                style={{ fontSize: "var(--fs-md)", marginBottom: "var(--space-2)" }}
                            >
                                2. People join
                            </h3>
                            <p>Other players browse the catalog and hop into your lobby.</p>
                        </div>
                        <div className="surface" style={{ padding: "var(--space-5)" }}>
                            <h3
                                style={{ fontSize: "var(--fs-md)", marginBottom: "var(--space-2)" }}
                            >
                                3. Play together
                            </h3>
                            <p>
                                Close the session once you start playing so it drops off the board.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}