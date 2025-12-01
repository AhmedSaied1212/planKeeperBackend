import PlanCard from "./PlanCard";

export default function PlansGrid({ plans, onEditPlan, onDeletePlan }) {
  if (plans.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <p className="text-xl font-medium text-slate-600">No plans yet</p>
        <p className="text-slate-500 mt-2">
          Click the <span className="text-blue-500 font-bold">+</span> button to
          create your first plan
        </p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      {plans.map((plan) => (
        <PlanCard
          key={plan._id}
          plan={plan}
          onEdit={onEditPlan}
          onDelete={onDeletePlan}
        />
      ))}
    </div>
  );
}
