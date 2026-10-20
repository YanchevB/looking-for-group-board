import { Navigate, useParams } from 'react-router';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import EditSessionForm from './EditSessionForm';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';

export default function EditSessionPage() {
    const { id } = useParams();
    const { user } = useAuth();

    const { data, isLoading, error } = useFetch(`sessions?id=eq.${id}&select=*,session_players(count)`);

    if (isLoading) {
        return <main className="page-main"><Spinner /></main>;
    }

    if (error) {
        return <main className="page-main"><ErrorMessage text={error} /></main>;
    }

    const session = data[0];

    if (!session) {
        return <Navigate to="/404" replace />;
    }

    if (session.owner_id !== user.id) {
        return <Navigate to={`/details/${id}`} replace />;
    }

    return (
        <main className="page-main">
            <EditSessionForm session={session} />
        </main>
    );
}
