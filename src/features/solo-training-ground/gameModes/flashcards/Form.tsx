import { useMemo, useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';
import type { FlashcardsSettings, Operation } from '../../types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lightning } from '@phosphor-icons/react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function FlashcardsFormPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const op = (params.get('op') as Operation) || 'addition';

  const [settings, setSettings] = useState<FlashcardsSettings>({
    operation: op,
    numberOfQuestions: 10,
    numberOfDigits: 1,
    numberOfRows: 2,
    isZigzag: false,
    includeSubtraction: op === 'addition',
    persistNumberOfDigits: false,
    speed: 2500,
    audioMode: false,
    audioPace: 'normal',
    showQuestion: true,
  });

  const speedLabel = useMemo(() => {
    if (settings.speed <= 500) return 'Ultra Fast';
    if (settings.speed <= 1200) return 'Fast';
    if (settings.speed <= 2500) return 'Medium';
    if (settings.speed <= 4000) return 'Slow';
    return 'Very Slow';
  }, [settings.speed]);

  const startPractice = () => {
    // validation mirroring old prod
    if (settings.numberOfQuestions < 1 || settings.numberOfQuestions > 1000)
      return alert('Please enter between 1 and 1000 questions');
    if (settings.numberOfDigits < 1 || settings.numberOfDigits > 15)
      return alert('Please enter between 1 and 15 digits');
    if (settings.numberOfRows < 1 || settings.numberOfRows > 15)
      return alert('Please enter between 1 and 15 rows');
    if (settings.speed < 100 || settings.speed > 5000)
      return alert('Please set speed between 100 and 5000 ms');

    const q = new URLSearchParams();
    q.set('op', settings.operation);
    q.set('cfg', btoa(JSON.stringify(settings)));
    navigate(`/student/solo-training-ground/flashcards/practice?${q.toString()}`);
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Lightning size={28} className="text-gold" weight="fill" />
            <h1 className="text-2xl font-bold text-white">Flash Cards Settings</h1>
          </div>

          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 space-y-6 text-white">
            {/* Number of Questions */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Number of Questions</label>
              <input
                type="number"
                className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                value={settings.numberOfQuestions}
                onChange={(e) =>
                  setSettings((s: FlashcardsSettings) => ({ ...s, numberOfQuestions: clamp(parseInt(e.target.value || '0', 10), 1, 1000) }))
                }
              />
            </div>

            {/* Number of Digits */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Number of Digits</label>
              <input
                type="number"
                className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                value={settings.numberOfDigits}
                onChange={(e) =>
                  setSettings((s: FlashcardsSettings) => ({ ...s, numberOfDigits: clamp(parseInt(e.target.value || '0', 10), 1, 15) }))
                }
              />
            </div>

            {/* Number of Rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Number of Rows</label>
              <input
                type="number"
                className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                value={settings.numberOfRows}
                onChange={(e) =>
                  setSettings((s: FlashcardsSettings) => ({ ...s, numberOfRows: clamp(parseInt(e.target.value || '0', 10), 1, 15) }))
                }
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Zig-Zag Pattern</label>
              <input
                type="checkbox"
                className="md:col-span-2 h-5 w-5"
                checked={settings.isZigzag}
                onChange={(e) => setSettings((s: FlashcardsSettings) => ({ ...s, isZigzag: e.target.checked }))}
              />
            </div>

            {settings.operation === 'addition' && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Include Subtraction</label>
                <input
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.includeSubtraction}
                  onChange={(e) => setSettings((s: FlashcardsSettings) => ({ ...s, includeSubtraction: e.target.checked }))}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Same digits in answer as question</label>
              <input
                type="checkbox"
                className="md:col-span-2 h-5 w-5"
                checked={settings.persistNumberOfDigits}
                onChange={(e) => setSettings((s: FlashcardsSettings) => ({ ...s, persistNumberOfDigits: e.target.checked }))}
              />
            </div>

            {/* Speed */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Flash Card Speed</label>
              <div className="md:col-span-2 flex items-center gap-3">
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={settings.speed}
                  onChange={(e) => setSettings((s: FlashcardsSettings) => ({ ...s, speed: clamp(parseInt(e.target.value, 10), 100, 5000) }))}
                  className="w-full"
                />
                <div className="min-w-32 text-sm">
                  <span className="px-2 py-1 rounded bg-black border border-[#2a2a2d] mr-2">{settings.speed}</span>
                  ms ({speedLabel})
                </div>
              </div>
            </div>

            {/* Audio Mode */}
            <div className="border-t border-[#2a2a2d] pt-4 mt-2 space-y-3">
              <div className="flex items-center gap-2">
                <span role="img" aria-label="speaker">🔊</span>
                <div className="font-semibold">Audio Mode</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Enable</label>
                <input
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.audioMode}
                  onChange={(e) => setSettings((s: FlashcardsSettings) => ({ ...s, audioMode: e.target.checked, showQuestion: !e.target.checked }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Audio Pace</label>
                <select
                  className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                  disabled={!settings.audioMode}
                  value={settings.audioPace}
                  onChange={(e) => setSettings((s: FlashcardsSettings) => ({ ...s, audioPace: e.target.value as any }))}
                >
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Show Question Text</label>
                <input
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.showQuestion}
                  onChange={(e) => setSettings((s: FlashcardsSettings) => ({ ...s, showQuestion: e.target.checked }))}
                  disabled={settings.audioMode}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                className="w-full bg-[#facb25] text-black font-semibold py-3 rounded-lg hover:bg-[#e6b422]"
                onClick={startPractice}
              >
                Start Practice
              </button>
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
