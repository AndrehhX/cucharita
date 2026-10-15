import { Download, Sparkles, X, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { AppUpdateInfo } from '../hooks/useAppUpdate';
import { Btn } from './ui';

export default function UpdateModal({
  updateInfo,
  onDismiss,
}: {
  updateInfo: AppUpdateInfo | null;
  onDismiss: () => void;
}) {
  if (!updateInfo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-sm bg-white rounded-[2rem] p-6 shadow-2xl border border-black/5 text-center overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="update-title"
        >
          <span className="blob w-40 h-40 bg-coral-soft/50 -top-12 -left-12 rotate-12" />
          <span className="blob w-40 h-40 bg-miel-soft -bottom-12 -right-12 -rotate-12" />

          <button
            aria-label="Cerrar aviso de actualización"
            onClick={onDismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-crema grid place-items-center text-carbon-soft hover:bg-black/5"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative w-16 h-16 mx-auto rounded-2xl bg-coral-soft text-coral grid place-items-center shadow-soft">
            <ArrowUpCircle className="w-8 h-8" />
            <Sparkles className="w-4 h-4 text-miel absolute -top-1 -right-1 fill-miel" />
          </div>

          <h3 id="update-title" className="font-display font-extrabold text-2xl mt-4 text-carbon">
            ¡Nueva actualización!
          </h3>
          <p className="text-xs font-extrabold text-coral-deep mt-0.5">
            Versión v{updateInfo.latestVersion} disponible
          </p>

          <div className="mt-3 p-3 bg-crema rounded-2xl text-[12px] font-bold text-carbon-soft text-left border border-black/[0.03]">
            <p className="font-extrabold text-carbon mb-1">Novedades:</p>
            <p className="line-clamp-3 whitespace-pre-line">{updateInfo.releaseNotes}</p>
          </div>

          <div className="mt-5 space-y-2">
            <a
              href={updateInfo.apkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-coral text-white font-extrabold text-sm py-3.5 px-6 rounded-full shadow-pop active:scale-95 transition"
            >
              <Download className="w-4 h-4" /> Descargar APK actualizada
            </a>
            <Btn variant="outline" onClick={onDismiss} className="w-full !py-2.5 text-xs text-carbon-soft">
              Recordármelo más tarde
            </Btn>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
