export function computeMetrics(logs) {
  if (!logs || logs.length < 2) return null;

  const firstTime = logs[0].timestamp;
  const lastTime = logs[logs.length - 1].timestamp;
  const totalTimeInMin = (lastTime - firstTime) / (1000 * 60); // in minutes

  const totalChars = logs.length;
  const wordCount = totalChars / 5;
  const wpm = wordCount / totalTimeInMin;

  const backspaces = logs.filter((e) => e.key === 'Backspace').length;
  const backspaceRate = (backspaces / totalChars) * 100;

  const pauses = logs.filter((e) => e.pauseAfter && e.pauseAfter >= 2000);
  const pauseCount = pauses.length;
  const pausePercent = (pauseCount / logs.length) * 100;

  const driftScore = (pausePercent * 0.4 + backspaceRate * 0.4 + (wpm < 30 ? 20 : 0)) / 1.2;

  return {
    wpm: wpm.toFixed(2),
    pausePercent: pausePercent.toFixed(2),
    backspaceRate: backspaceRate.toFixed(2),
    driftScore: driftScore.toFixed(2),
  };
}
