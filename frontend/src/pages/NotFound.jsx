import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="not-found">
    <h1>Page Not Found</h1>
    <Link to="/dashboard">Back to dashboard</Link>
  </section>
);

export default NotFound;
