import { useState, FC } from 'react';
import TravelPlanForm from '../components/TravelPlanForm';
import TravelPlanDisplay from '../components/TravelPlanDisplay';
import Button from '../components/Button';
import { ViajeState, ViajeStateInput } from '../types/travel';
import { createTravelPlan } from '../services/travelService';
import logoImage from '../assets/logos/logo-v2-sin-bordes.png';
import Navbar from '../components/Navbar';

interface AIPlanPageProps {
  onBack: () => void;
}

const AIPlanPage: FC<AIPlanPageProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [travelPlan, setTravelPlan] = useState<ViajeState | null>(null);

  const handleCreatePlan = async (data: ViajeStateInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const plan = await createTravelPlan(data);
      setTravelPlan(plan);
    } catch (err) {
      setError('Error al crear el plan de viaje. Por favor intente nuevamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-[1400px] mx-auto p-4 px-6 md:px-8 pt-20">
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Plan de viaje con IA</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Crear plan de viaje con IA</h2>
          <TravelPlanForm onSubmit={handleCreatePlan} isLoading={isLoading} />
          
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>
        
        {travelPlan && (
          <div className="mt-8">
            <TravelPlanDisplay plan={travelPlan} />
          </div>
        )}
      </div>
      
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p className="text-sm">© {new Date().getFullYear()} TravelSmart - Planificación inteligente de viajes</p>
      </footer>
    </div>
  );
};

export default AIPlanPage; 