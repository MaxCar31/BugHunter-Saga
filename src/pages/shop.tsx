import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";

import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";
import { useBoundStore } from "~/hooks/useBoundStore";
import { getShopItems, purchaseItem } from "~/services/shopService";
import type { ShopItemDTO } from "~/types/shop";
import {
  GemSvg,
  BadgeTestMasterSvg,
  BadgeQualityInspectorSvg,
  BadgeTestingGuruSvg,
  BadgeUnstoppableTesterSvg,
  BadgeBugHunterSvg,
} from "~/components/icons/gamification";

/**
 * 🔍 Explicación:
 * Página de la tienda que muestra badges de BugHunter Saga:
 * - Badges: Insignias permanentes testing-themed (5 badges)
 * 
 * Flujo de compra:
 * 1. Usuario hace clic en "Comprar"
 * 2. Frontend valida fondos (lingots)
 * 3. Llama a purchaseItem(itemId)
 * 4. Backend valida compra única
 * 5. Frontend actualiza lingots y muestra mensaje de éxito
 * 
 * Todos los items son permanentes (NO consumibles) y compra única.
 */

// ============================================================================
// Componente Principal: Shop
// ============================================================================

const Shop: NextPage = () => {
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);
  const [purchasingItemId, setPurchasingItemId] = useState<string | null>(null);

  const { shopItems, loading, error, setShopItems, setLoading, setError } =
    useBoundStore((state) => ({
      shopItems: state.shopItems,
      loading: state.loading,
      error: state.error,
      setShopItems: state.setShopItems,
      setLoading: state.setLoading,
      setError: state.setError,
    }));

  const { lingots, setLingots } = useBoundStore((state) => ({
    lingots: state.lingots,
    setLingots: state.setLingots,
  }));

  useEffect(() => {
    const loadShopItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const items = await getShopItems();
        setShopItems(items);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Error al cargar la tienda";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    // Cargar items al montar el componente
    loadShopItems();
  }, [setShopItems, setLoading, setError]); // Incluir setters en dependencias

  const handlePurchase = async (item: ShopItemDTO) => {
    if (lingots < item.cost) {
      setPurchaseMessage(
        `No tienes suficientes Puntos QA. Necesitas ${item.cost} pero solo tienes ${lingots}.`
      );
      setTimeout(() => setPurchaseMessage(null), 4000);
      return;
    }

    setPurchasingItemId(item.itemId);
    setPurchaseMessage(null);

    try {
      const result = await purchaseItem(item.itemId);
      setLingots(result.totalLingots);

      // Mensaje especial para badges y títulos (compra única)
      if (item.itemId.startsWith("badge-")) {
        setPurchaseMessage(`¡${item.name} desbloqueado! Ahora se muestra en tu perfil.`);
      } else if (item.itemId.startsWith("title-")) {
        setPurchaseMessage(`¡${item.name} adquirido! Ahora se muestra en tu perfil.`);
      } else {
        setPurchaseMessage(`¡${item.name} comprado exitosamente!`);
      }

      // Recargar items de la tienda para que el item comprado desaparezca
      const updatedItems = await getShopItems();
      setShopItems(updatedItems);

      setTimeout(() => setPurchaseMessage(null), 3000);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Error al comprar el artículo";
      setPurchaseMessage(errorMsg);
      setTimeout(() => setPurchaseMessage(null), 4000);
    } finally {
      setPurchasingItemId(null);
    }
  };

  // Mapear itemId a componente SVG (tamaño reducido)
  const getItemIcon = (itemId: string) => {
    switch (itemId) {
      case "badge-test-master":
        return <BadgeTestMasterSvg className="h-20 w-20 shrink-0" />;
      case "badge-quality-inspector":
        return <BadgeQualityInspectorSvg className="h-20 w-20 shrink-0" />;
      case "badge-testing-guru":
        return <BadgeTestingGuruSvg className="h-20 w-20 shrink-0" />;
      case "badge-unstoppable-tester":
        return <BadgeUnstoppableTesterSvg className="h-20 w-20 shrink-0" />;
      case "badge-bug-hunter":
        return <BadgeBugHunterSvg className="h-20 w-20 shrink-0" />;
      default:
        return <GemSvg className="h-20 w-20 shrink-0" />;
    }
  };

  // Filtrar solo badges (todos los items de la tienda son badges ahora)
  const badges = useMemo(
    () => shopItems.filter((item) => item.itemId.startsWith("badge-")),
    [shopItems]
  );

  // Estados de carga y error
  if (loading) {
    return (
      <div>
        <TopBar />
        <LeftBar selectedTab="Tienda" />
        <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
          <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-[1000px] pb-20">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>
                <p className="text-lg text-gray-600">Cargando tienda...</p>
              </div>
            </div>
          </div>
          <RightBar />
        </div>
        <BottomBar selectedTab="Tienda" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <TopBar />
        <LeftBar selectedTab="Tienda" />
        <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
          <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-[1000px] pb-20">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="rounded-xl bg-red-100 p-8 text-center">
                <p className="text-xl font-bold text-red-800">Error al cargar la tienda</p>
                <p className="mt-2 text-red-600">{error}</p>
              </div>
            </div>
          </div>
          <RightBar />
        </div>
        <BottomBar selectedTab="Tienda" />
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab="Tienda" />

      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="w-full max-w-4xl xl:max-w-[1000px] pb-20 px-4 sm:px-6">

          {/* Mensaje de Compra (Éxito/Error) */}
          {purchaseMessage && (
            <div className={`mb-6 rounded-2xl p-4 text-center font-bold shadow-lg ${purchaseMessage.includes("exitosamente") || purchaseMessage.includes("desbloqueado") || purchaseMessage.includes("adquirido")
              ? "bg-green-100 text-green-800 border-2 border-green-300"
              : "bg-red-100 text-red-800 border-2 border-red-300"
              }`}>
              {purchaseMessage}
            </div>
          )}

          {/* ============================================ */}
          {/* HEADER DE TIENDA                              */}
          {/* ============================================ */}
          <div className="border-b-2 border-gray-200 mb-6 pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Badges</h1>
            <p className="text-sm text-gray-600 mt-2">Desbloquea insignias permanentes con tus Puntos QA</p>
          </div>

          {/* ============================================ */}
          {/* CONTENIDO DE BADGES (INSIGNIAS)              */}
          {/* ============================================ */}
          <div>
            <div className="space-y-4">
              {badges.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-xl font-bold">¡Ya compraste todas las insignias!</p>
                  <p className="text-sm mt-2">Visita tu perfil para verlas</p>
                </div>
              ) : (
                badges.map((item) => {
                  const isDisabled = purchasingItemId === item.itemId || lingots < item.cost;
                  return (
                    <div
                      key={item.itemId}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all bg-white ${isDisabled
                        ? "border-gray-200 opacity-50 cursor-not-allowed"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
                        }`}
                    >
                      <div className={`flex-shrink-0 ${isDisabled ? "grayscale" : ""}`}>
                        {getItemIcon(item.itemId)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold uppercase transition-all whitespace-nowrap ${isDisabled
                            ? "cursor-not-allowed border-2 border-gray-400 bg-gray-100 text-gray-400"
                            : "border-2 border-blue-600 bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-md"
                            }`}
                          onClick={() => handlePurchase(item)}
                          disabled={isDisabled}
                        >
                          {purchasingItemId === item.itemId ? (
                            <span className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                              Comprando...
                            </span>
                          ) : lingots < item.cost ? (
                            <><GemSvg className="h-5 w-5 opacity-50" /> {item.cost}</>
                          ) : (
                            <><GemSvg className="h-5 w-5" /> Desbloquear</>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
        <RightBar />
      </div>

      <BottomBar selectedTab="Tienda" />
    </div>
  );
};

export default Shop;