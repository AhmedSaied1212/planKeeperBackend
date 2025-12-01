import { useState, useEffect } from "react";
import FloatingAddButton from "./components/FloatingAddButton";
import PlanModal from "./components/PlanModal";
import PlansGrid from "./components/PlansGrid";
import { apiClient } from "./services/api";

export default function App() {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plans on mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setError(null);
      const data = await apiClient.getPlans();
      setPlans(data);
    } catch (err) {
      setError("Failed to load plans. Please try again.");
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleCreatePlan = async (planData) => {
    try {
      setLoading(true);
      setError(null);
      const newPlan = await apiClient.createPlan(planData);
      setPlans([newPlan, ...plans]);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to create plan. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      setError(null);
      await apiClient.deletePlan(planId);
      setPlans(plans.filter((p) => p._id !== planId));
    } catch (err) {
      setError("Failed to delete plan. Please try again.");
      console.error(err);
    }
  };

  const handleEditPlan = (planId) => {
    // For now, just open modal. Full edit functionality can be added later
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-4">
            <h1
              className="text-4xl font-bold text-center text-black"
              style={{ fontFamily: "'Scheherazade', serif" }} 
            >
              وَأَن لَّيْسَ لِلْإِنسَـٰنِ إِلَّا مَا سَعَىٰ
              <span className="aya-number mx-2">٣٩</span>
              وَأَنَّ سَعْيَهُۥ سَوْفَ يُرَىٰ
              <span className="aya-number mx-2">٤٠</span>
              ثُمَّ يُجْزَىٰهُ ٱلْجَزَآءَ ٱلْأَوْفَىٰ
              <span className="aya-number mx-2">٤١</span>
            </h1>
            <div className="flex items-center gap-3">
                <a
                href="/adhkar-alsabah"
                className="btn-primary px-6 py-2 rounded-lg text-lg font-bold"
                style={{ direction: "rtl" }}
                >
              اذكار الصباح
                </a>
                <a
                href="/adhkar-alsalah"
                className="btn-primary px-6 py-2 rounded-lg text-lg font-bold"
                style={{ direction: "rtl" }}
                >
                اذكار بعد الصلاة
                </a>
                <a
                href="/quran"
                className="btn-primary px-6 py-2 rounded-lg text-lg font-bold"
                style={{ direction: "rtl" }}
                >
                    القران الكريم
                </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium shadow-sm">
            {error}
          </div>
        )}

        {initialLoading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-600 text-lg mt-4 font-medium">
              Loading your plans...
            </p>
          </div>
        ) : (
          <div>
            {plans.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 opacity-50">📝</div>
                <p className="text-slate-500 text-xl font-medium">
                  No plans yet
                </p>
                <p className="text-slate-400 mt-2">
                  Click the <span className="text-blue-500 font-bold">+</span>{" "}
                  button to create your first plan
                </p>
              </div>
            ) : (
              <PlansGrid
                plans={plans}
                onEditPlan={handleEditPlan}
                onDeletePlan={handleDeletePlan}
              />
            )}
          </div>
        )}
      </main>

      <FloatingAddButton onClick={() => setIsModalOpen(true)} />

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreatePlan}
        loading={loading}
      />
    </div>
  );
}
