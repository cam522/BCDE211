export default function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <p className="eyebrow">Event Planner</p>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}