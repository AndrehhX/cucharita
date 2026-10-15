export function supportsSpeech(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, lang = 'es-GT'): void {
  if (!supportsSpeech()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

export function stopSpeak(): void {
  if (supportsSpeech()) window.speechSynthesis.cancel();
}
