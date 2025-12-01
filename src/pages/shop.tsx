import type { NextPage } from "next";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";
import { useBoundStore } from "~/hooks/useBoundStore";
import { getShopItems, purchaseItem } from "~/services/shopService";
import type { ShopItemDTO } from "~/types/shop";

// SVG para icono de gema vacía (artículo no disponible)
const EmptyGemSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill="#E5E5E5" stroke="#FFF" strokeWidth="2">
          <path d="M4.12 6.36l6.475-3.908a4.387 4.387 0 0 1 4.534 0l6.475 3.907a4.387 4.387 0 0 1 2.12 3.757v9.666a4.387 4.387 0 0 1-2.12 3.756l-6.475 3.907a4.387 4.387 0 0 1-4.534 0L4.12 23.538A4.387 4.387 0 0 1 2 19.782v-9.666c0-1.538.804-2.962 2.12-3.757z" />
        </g>
      </g>
    </svg>
  );
};

// SVG para gema llena (usado en precio)
const FilledGemSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" {...props}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g fill="#1CB0F6">
          <path d="M4.12 6.36l6.475-3.908a4.387 4.387 0 0 1 4.534 0l6.475 3.907a4.387 4.387 0 0 1 2.12 3.757v9.666a4.387 4.387 0 0 1-2.12 3.756l-6.475 3.907a4.387 4.387 0 0 1-4.534 0L4.12 23.538A4.387 4.387 0 0 1 2 19.782v-9.666c0-1.538.804-2.962 2.12-3.757z" />
        </g>
      </g>
    </svg>
  );
};

// SVG simplificado para icono de DobleXP (rayo)
const DoubleXpSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="124" height="124" viewBox="0 0 124 124" {...props}>
      <g fill="#FFC800">
        <path d="M62 10 L80 60 L65 60 L75 114 L40 65 L55 65 Z" />
      </g>
      <text x="50%" y="55%" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#FF9600">2X</text>
    </svg>
  );
};

// SVG simplificado para icono de TripleXP (doble rayo)
const TripleXpSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="124" height="124" viewBox="0 0 124 124" {...props}>
      <g fill="#FF9600">
        <path d="M50 5 L65 50 L55 50 L62 100 L35 55 L45 55 Z" />
        <path d="M74 5 L89 50 L79 50 L86 100 L59 55 L69 55 Z" />
      </g>
      <text x="50%" y="55%" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#FFC800">3X</text>
    </svg>
  );
};

// SVG simplificado para avatar tester
const AvatarTesterSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="124" height="124" viewBox="0 0 124 124" {...props}>
      <circle cx="62" cy="45" r="20" fill="#58CC02" />
      <path d="M30 100 C 30 75, 45 65, 62 65 C 79 65, 94 75, 94 100 Z" fill="#58CC02" />
      <circle cx="55" cy="42" r="3" fill="#000" />
      <circle cx="69" cy="42" r="3" fill="#000" />
      <path d="M 52 52 Q 62 58, 72 52" stroke="#000" strokeWidth="2" fill="none" />
    </svg>
  );
};

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

    loadShopItems();
  }, [setShopItems, setLoading, setError]);

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
      setPurchaseMessage(`¡${item.name} comprado exitosamente!`);
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

  // Función para obtener el SVG correcto según itemId
  const getItemIcon = (itemId: string) => {
    switch (itemId) {
      case "double-xp":
        return <DoubleXpSvg className="shrink-0" />;
      case "triple-xp":
        return <TripleXpSvg className="shrink-0" />;
      case "avatar-tester":
        return <AvatarTesterSvg className="h-32 w-32 shrink-0 p-4" />;
      default:
        return <EmptyGemSvg className="shrink-0" />;
    }
  };

  const powerUps = shopItems.filter(
    (item) => item.itemId === "double-xp" || item.itemId === "triple-xp"
  );
  const customization = shopItems.filter(
    (item) => item.itemId === "avatar-tester"
  );

  if (loading) {
    return (
      <div>
        <TopBar />
        <LeftBar selectedTab="Tienda" />
        <div className="flex justify-center gap-4 pt-14 px-3 sm:px-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-5 xl:gap-7 xl:px-2">
          <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-[1000px] pb-20">
            <p className="py-7 text-center text-gray-600">Cargando tienda...</p>
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
        <div className="flex justify-center gap-4 pt-14 px-3 sm:px-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-5 xl:gap-7 xl:px-2">
          <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-[1000px] pb-20">
            <div className="py-7">
              <div className="rounded-xl bg-red-100 p-6 text-center">
                <p className="font-bold text-red-800">Error al cargar la tienda</p>
                <p className="text-red-600">{error}</p>
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
      <div className="flex justify-center gap-4 pt-14 px-3 sm:px-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-5 xl:gap-7 xl:px-2">
        <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-[1000px] pb-20">
          {purchaseMessage && (
            <div
              className={`mb-4 rounded-xl p-4 text-center font-bold ${purchaseMessage.includes("exitosamente")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}
            >
              {purchaseMessage}
            </div>
          )}

          {powerUps.length > 0 && (
            <div className="py-7">
              <h2 className="mb-5 text-2xl font-bold">Potenciadores</h2>
              {powerUps.map((item) => (
                <div
                  key={item.itemId}
                  className="flex border-t-2 border-gray-300 py-5"
                >
                  {getItemIcon(item.itemId)}
                  <section className="flex flex-col gap-3">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <button
                      className={`flex w-fit items-center gap-1 rounded-2xl border-2 ${purchasingItemId === item.itemId || lingots < item.cost
                        ? "cursor-not-allowed border-gray-300 bg-white px-4 py-2 text-sm font-bold uppercase text-gray-300"
                        : "border-b-4 border-green-600 bg-green-500 px-4 py-3 text-sm font-bold uppercase text-white hover:brightness-110"
                        }`}
                      onClick={() => handlePurchase(item)}
                      disabled={
                        purchasingItemId === item.itemId || lingots < item.cost
                      }
                    >
                      {purchasingItemId === item.itemId ? (
                        "Comprando..."
                      ) : lingots < item.cost ? (
                        <>
                          Obtener por: <EmptyGemSvg /> {item.cost}
                        </>
                      ) : (
                        <>
                          Obtener por: <FilledGemSvg /> {item.cost}
                        </>
                      )}
                    </button>
                  </section>
                </div>
              ))}
            </div>
          )}

          {customization.length > 0 && (
            <div className="py-7">
              <h2 className="mb-5 text-2xl font-bold">Personalización</h2>
              {customization.map((item) => (
                <div
                  key={item.itemId}
                  className="flex border-t-2 border-gray-300 py-5"
                >
                  {getItemIcon(item.itemId)}
                  <section className="flex flex-col gap-3">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <button
                      className={`flex w-fit items-center gap-1 rounded-2xl border-2 ${purchasingItemId === item.itemId || lingots < item.cost
                        ? "cursor-not-allowed border-gray-300 bg-white px-4 py-2 text-sm font-bold uppercase text-gray-300"
                        : "border-b-4 border-blue-600 bg-blue-500 px-4 py-3 text-sm font-bold uppercase text-white hover:brightness-110"
                        }`}
                      onClick={() => handlePurchase(item)}
                      disabled={
                        purchasingItemId === item.itemId || lingots < item.cost
                      }
                    >
                      {purchasingItemId === item.itemId ? (
                        "Comprando..."
                      ) : lingots < item.cost ? (
                        <>
                          Obtener por: <EmptyGemSvg /> {item.cost}
                        </>
                      ) : (
                        <>
                          Obtener por: <FilledGemSvg /> {item.cost}
                        </>
                      )}
                    </button>
                  </section>
                </div>
              ))}
            </div>
          )}
        </div>
        <RightBar />
      </div>
      <BottomBar selectedTab="Tienda" />
    </div>
  );
};

export default Shop;
