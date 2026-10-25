import './home.css';
import useAuth from '../../hooks/useAuth';
import Button from '../shared/Button';

const STEPS = [
    {
        title: '1. Host a session',
        text: 'Pick your game, platform, and how many slots you have open.'
    },
    {
        title: '2. People join',
        text: 'Other players browse the catalog and hop into your lobby.'
    },
    {
        title: '3. Play together',
        text: "Close the session once you start playing to let others know you've already started."
    },
];

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <main className="page-main">
            <div className="container">
                <section className="section home-hero">
                    <h1 className="home-hero__title">
                        Find people to play with, right now.
                    </h1>
                    <p className="home-hero__text">
                        LFG Board is where gamers host quick sessions and others jump in. Pick a
                        game, set your open slots, and agree in the comments on where you want to meet, play and talk - simple and easy.
                    </p>
                    <div className="btn-group btn-group--center">
                        <Button to='/catalog' size='lg'>Browse sessions</Button>
                        {!isAuthenticated &&
                            <Button to='/register' variant='secondary' size='lg'>Create a free account</Button>
                        }
                    </div>
                </section>

                <section className="section">
                    <div className="section__heading home-steps__heading">
                        <h2>How it works</h2>
                    </div>
                    <div className="home-steps__list">
                        {STEPS.map(step =>
                            <div key={step.title} className="surface home-step">
                                <h3 className="home-step__title">{step.title}</h3>
                                <p>{step.text}</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
