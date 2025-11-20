import React, { useEffect, useState } from 'react';
import { useBoundStore } from '~/hooks/useBoundStore';

interface UnitProgress {
  unitId: number;
  unitTitle: string;
  currentXp: number;
  totalXpNeeded: number;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
}

interface UnitProgressCardProps {
  unitId: number;
  className?: string;
}

const UnitProgressCard = ({ unitId, className = "" }: UnitProgressCardProps) => {
  const [unitProgress, setUnitProgress] = useState<UnitProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnitProgress = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('bh_token');
        
        if (!token) {
          setError('No se encontró token de autenticación');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/progress/unit/${unitId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: UnitProgress = await response.json();
        setUnitProgress(data);
      } catch (err) {
        console.error('Error fetching unit progress:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchUnitProgress();
  }, [unitId]);

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl border-2 border-gray-200 p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !unitProgress) {
    return (
      <div className={`bg-white rounded-2xl border-2 border-red-200 p-4 ${className}`}>
        <div className="text-red-600 text-sm">
          Error: {error || 'No se pudo cargar el progreso'}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border-2 border-gray-200 p-4 shadow-sm ${className}`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800 text-sm">{unitProgress.unitTitle}</h3>
            <p className="text-xs text-gray-600">Progreso del Nivel</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">
              {unitProgress.currentXp}
            </div>
            <div className="text-xs text-gray-500">
              / {unitProgress.totalXpNeeded} XP
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(unitProgress.progressPercentage, 100)}%` }}
            >
              <div className="h-full rounded-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>{Math.round(unitProgress.progressPercentage)}% completado</span>
            <span>{unitProgress.completedLessons}/{unitProgress.totalLessons} lecciones</span>
          </div>
        </div>

        {/* XP Details */}
        <div className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✦</span>
            </div>
            <span className="text-gray-700">
              Próximo nivel: {unitProgress.totalXpNeeded - unitProgress.currentXp} XP
            </span>
          </div>
          
          {unitProgress.progressPercentage >= 100 && (
            <div className="flex items-center space-x-1 text-green-600">
              <span>🎉</span>
              <span className="font-medium">¡Completado!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitProgressCard;