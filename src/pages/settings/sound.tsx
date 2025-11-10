import type { NextPage } from "next";
import React, { useState } from "react";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { TopBar } from "~/components/TopBar";
import { SettingsRightNav } from "~/components/SettingsRightNav";
import { useBoundStore } from "~/hooks/useBoundStore";
import { updateUserSettings } from "~/services/userService";

const Sound: NextPage = () => {
  const soundEffects = useBoundStore((x) => x.soundEffects);
  const setSoundEffects = useBoundStore((x) => x.setSoundEffects);
  const [localSoundEffects, setLocalSoundEffects] = useState(soundEffects);

  const speakingExercises = useBoundStore((x) => x.speakingExercises);
  const setSpeakingExercises = useBoundStore((x) => x.setSpeakingExercises);
  const [localSpeakingExercises, setLocalSpeakingExercises] =
    useState(speakingExercises);

  const listeningExercises = useBoundStore((x) => x.listeningExercises);
  const setListeningExercises = useBoundStore((x) => x.setListeningExercises);
  const [localListeningExercises, setLocalListeningExercises] =
    useState(listeningExercises);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Feature 3: Actualizar configuraciones de sonido
  const handleSaveChanges = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const updated = await updateUserSettings({
        soundEffectsEnabled: localSoundEffects,
        speakingExercises: localSpeakingExercises,
        listeningExercises: localListeningExercises,
      });

      // Actualizar el store con la respuesta del servidor
      setSoundEffects(updated.soundEffectsEnabled);
      // Nota: speakingExercises y listeningExercises no vienen en la respuesta
      // actual del backend según el JSON, pero las guardamos localmente
      setSpeakingExercises(localSpeakingExercises);
      setListeningExercises(localListeningExercises);

      setSuccessMessage("¡Configuraciones de sonido actualizadas!");

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error updating sound settings:", err);
      setError(err instanceof Error ? err.message : "Error al guardar los cambios");
    } finally {
      setIsLoading(false);
    }
  };

  const soundOptions = [
    {
      title: "Sound effects",
      value: localSoundEffects,
      setValue: setLocalSoundEffects,
    },
    {
      title: "Speaking exercises",
      value: localSpeakingExercises,
      setValue: setLocalSpeakingExercises,
    },
    {
      title: "Listening exercises",
      value: localListeningExercises,
      setValue: setLocalListeningExercises,
    },
  ];

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab={null} />
      <BottomBar selectedTab={null} />
      <div className="mx-auto flex flex-col gap-5 px-4 py-20 sm:py-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="text-lg font-bold text-gray-800 sm:text-2xl">Sound</h1>
          <button
            className="rounded-2xl border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
            onClick={handleSaveChanges}
            disabled={
              (localSoundEffects === soundEffects &&
                localSpeakingExercises === speakingExercises &&
                localListeningExercises === listeningExercises) ||
              isLoading
            }
          >
            {isLoading ? "Guardando..." : "Save changes"}
          </button>
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="mx-auto w-full max-w-xl lg:max-w-4xl">
            <div className="rounded-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3">
              {error}
            </div>
          </div>
        )}
        {successMessage && (
          <div className="mx-auto w-full max-w-xl lg:max-w-4xl">
            <div className="rounded-lg bg-green-100 border border-green-400 text-green-700 px-4 py-3">
              {successMessage}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-12">
          <div className="flex w-full max-w-xl flex-col gap-8">
            {soundOptions.map(({ title, value, setValue }) => {
              return (
                <div
                  key={title}
                  className="flex justify-between sm:justify-center sm:gap-10 sm:pl-10"
                >
                  <div className="font-bold sm:w-1/2">{title}</div>
                  <label className="pr-5 sm:w-1/2 sm:pr-0">
                    <div
                      className={[
                        "relative h-6 w-12 cursor-pointer rounded-full transition-all duration-300",
                        value ? "bg-blue-400" : "bg-gray-200",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "absolute h-10 w-10 rounded-xl border-2 border-b-4 bg-white transition-all duration-300",
                          value ? "border-blue-400" : "border-gray-200",
                        ].join(" ")}
                        style={{
                          top: "calc(50% - 20px)",
                          left: value ? "calc(100% - 20px)" : "-20px",
                        }}
                      ></div>
                    </div>
                    <input
                      className="hidden"
                      type="checkbox"
                      checked={value}
                      onChange={() => setValue((x) => !x)}
                      disabled={isLoading}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <SettingsRightNav selectedTab="Sound" />
        </div>
      </div>
    </div>
  );
};

export default Sound;
