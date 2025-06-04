import { useEffect, useRef, useState } from "react";

const VERSION_URL = "/version.json";

export function useVersionChecker(intervalMs: number = 60000) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const currentVersion = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    // Função para buscar a versão
    const fetchVersion = async () => {
      try {
        const res = await fetch(VERSION_URL, { cache: "no-store" });
        const data = await res.json();
        if (!currentVersion.current) {
          currentVersion.current = data.version;
        } else if (data.version !== currentVersion.current) {
          if (isMounted) setUpdateAvailable(true);
        }
      } catch (e) {
        // Silencia erros de fetch
      }
    };
    fetchVersion();
    const interval = setInterval(fetchVersion, intervalMs);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [intervalMs]);

  return updateAvailable;
}
