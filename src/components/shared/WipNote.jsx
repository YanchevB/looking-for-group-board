import './feedback.css';

export default function WipNote({ children }) {
    return <p className="wip-note">🚧 Work in progress: {children}</p>;
}
