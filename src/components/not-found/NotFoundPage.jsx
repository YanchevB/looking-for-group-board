import './not-found.css';
import Button from '../shared/Button';

export default function NotFoundPage() {
    return (
        <main className="page-main">
            <div className="container not-found">
                <p className="not-found__code">404</p>
                <h1 className="not-found__title">This page doesn't exist</h1>
                <p className="not-found__text">
                    The page you're looking for was moved, closed, or never existed. Let's
                    get you back to finding a group.
                </p>
                <div className="btn-group btn-group--center">
                    <Button to='/'>Back to home</Button>

                    <Button to='/catalog' variant='secondary'>Browse sessions</Button>
                </div>
            </div>
        </main>
    );
}
