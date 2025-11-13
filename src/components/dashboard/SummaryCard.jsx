export default function SummaryCard({ title, value, icon, color }) {
  return (
    <div className={`card border-${color} shadow-sm`}>
      <div className="card-body text-center">
        <i className={`${icon} text-${color} fa-2x mb-2`}></i>
        <h6 className="fw-bold">{title}</h6>
        <h4 className={`text-${color}`}>
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h4>
      </div>
    </div>
  );
}
