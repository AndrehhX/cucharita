import { useEffect, useState } from 'react';
import { APP_VERSION, GITHUB_RELEASES_API, APK_DOWNLOAD_URL } from '../config/version';

export interface AppUpdateInfo {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseNotes?: string;
  apkUrl: string;
}

function isNewerVersion(latest: string, current: string): boolean {
  const cleanL = latest.replace(/^v/i, '').trim();
  const cleanC = current.replace(/^v/i, '').trim();
  const partsL = cleanL.split('.').map((n) => parseInt(n, 10) || 0);
  const partsC = cleanC.split('.').map((n) => parseInt(n, 10) || 0);

  for (let i = 0; i < Math.max(partsL.length, partsC.length); i++) {
    const l = partsL[i] || 0;
    const c = partsC[i] || 0;
    if (l > c) return true;
    if (l < c) return false;
  }
  return false;
}

export function useAppUpdate() {
  const [updateInfo, setUpdateInfo] = useState<AppUpdateInfo | null>(null);
  const [checking, setChecking] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const checkForUpdates = async () => {
    setChecking(true);
    try {
      const res = await fetch(GITHUB_RELEASES_API, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (!res.ok) return;

      const data = await res.json();
      const tagName = data.tag_name || data.name || '';
      if (!tagName) return;

      if (isNewerVersion(tagName, APP_VERSION)) {
        // Buscar el APK en los assets
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const apkAsset = Array.isArray(data.assets) ? data.assets.find((a: any) => a.name?.endsWith('.apk')) : null;
        const apkUrl = apkAsset?.browser_download_url || APK_DOWNLOAD_URL;

        setUpdateInfo({
          hasUpdate: true,
          currentVersion: APP_VERSION,
          latestVersion: tagName.replace(/^v/i, ''),
          releaseNotes: data.body || '¡Hay mejoras y nuevas recetas disponibles!',
          apkUrl,
        });
      }
    } catch {
      // offline o sin internet silencioso
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    // Comprobar al iniciar
    checkForUpdates();
  }, []);

  return {
    updateInfo: dismissed ? null : updateInfo,
    checking,
    dismiss: () => setDismissed(true),
    checkForUpdates,
  };
}
