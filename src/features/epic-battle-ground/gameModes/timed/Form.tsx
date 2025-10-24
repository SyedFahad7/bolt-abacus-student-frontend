import { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Alarm } from '@phosphor-icons/react';

interface TimedSettings {
  operation: 'addition' | 'multiplication' | 'division';
  timeLimit: number; // minutes
  numberOfDigitsLeft: number;
  numberOfDigitsRight: number;
  numberOfRows: number;
  isZigzag: boolean;
  includeSubtraction: boolean;
  persistNumberOfDigits: boolean;
  includeDecimals: boolean;
  audioMode: boolean;
  audioPace: 'slow' | 'normal' | 'fast' | 'ultra';
  showQuestion: boolean;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function EBGTimedForm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const op = (params.get('op') as TimedSettings['operation']) || 'addition';

  const [settings, setSettings] = useState<TimedSettings>({
    operation: op,
    timeLimit: 1,
    numberOfDigitsLeft: 1,
    numberOfDigitsRight: 1,
    numberOfRows: 2,
    isZigzag: false,
    includeSubtraction: op === 'addition',
    persistNumberOfDigits: false,
    includeDecimals: false,
    audioMode: false,
    audioPace: 'normal',
    showQuestion: true,
  });

  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);

  const createRoom = () => {
    if (settings.timeLimit < 1 || settings.timeLimit > 200) return alert('Please enter time between 1 and 200 minutes');
    if (settings.numberOfDigitsLeft < 1 || settings.numberOfDigitsLeft > 15) return alert('Please enter 1 to 15 digits');
    if (op === 'multiplication' && (settings.numberOfDigitsRight < 1 || settings.numberOfDigitsRight > 15)) return alert('Please enter 1 to 15 digits');
    if (op === 'division') {
      if (settings.numberOfDigitsRight < 1 || settings.numberOfDigitsRight > 5) return alert('Please enter 1 to 5 digits for denominator');
      if (settings.numberOfDigitsRight > settings.numberOfDigitsLeft) return alert('Numerator digits must be >= denominator digits');
    }
    if (op === 'addition' && (settings.numberOfRows < 1 || settings.numberOfRows > 15)) return alert('Please enter 1 to 15 rows');
    if (numberOfPlayers < 2 || numberOfPlayers > 4) return alert('Number of players must be between 2 and 4');

    const q = new URLSearchParams();
    q.set('op', settings.operation);
    q.set('mode', 'timed');
    q.set('players', String(numberOfPlayers));
    q.set('cfg', btoa(JSON.stringify(settings)));
    const roomId = Math.floor(100000 + Math.random() * 900000).toString();
    navigate(`/student/epic-battle-ground/room/${roomId}?${q.toString()}`);
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Alarm size={28} className="text-gold" weight="fill" />
            <h1 className="text-2xl font-bold text-white">Time Attack Settings</h1>
          </div>

          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 space-y-6 text-white">
            {/* Time Limit */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Time Limit (minutes)</label>
              <input
                title="timeLimit"
                type="number"
                className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                value={settings.timeLimit}
                onChange={(e) => setSettings((s) => ({ ...s, timeLimit: clamp(parseInt(e.target.value || '0', 10), 1, 200) }))}
              />
            </div>

            {/* Number of Digits Left */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Number of Digits</label>
              <input
                title="numberOfDigitsLeft"
                type="number"
                className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                value={settings.numberOfDigitsLeft}
                onChange={(e) => setSettings((s) => ({ ...s, numberOfDigitsLeft: clamp(parseInt(e.target.value || '0', 10), 1, 15) }))}
              />
            </div>

            {/* Number of Digits Right */}
            {(op === 'multiplication' || op === 'division') && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Number of Digits Right</label>
                <input
                  title="numberOfDigitsRight"
                  type="number"
                  className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                  value={settings.numberOfDigitsRight}
                  onChange={(e) => setSettings((s) => ({ ...s, numberOfDigitsRight: clamp(parseInt(e.target.value || '0', 10), 1, op === 'division' ? 5 : 15) }))}
                />
              </div>
            )}

            {/* Number of Rows (Addition only) */}
            {op === 'addition' && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Number of Rows</label>
                <input
                  title="numberOfRows"
                  type="number"
                  className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                  value={settings.numberOfRows}
                  onChange={(e) => setSettings((s) => ({ ...s, numberOfRows: clamp(parseInt(e.target.value || '0', 10), 1, 15) }))}
                />
              </div>
            )}

            {/* Toggles & Audio */}
            <div className="border-t border-[#2a2a2d] pt-4 mt-2 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Zig-Zag Pattern</label>
                <input title="isZigzag" type="checkbox" className="md:col-span-2 h-5 w-5" checked={settings.isZigzag} onChange={(e) => setSettings((s) => ({ ...s, isZigzag: e.target.checked }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Include Subtraction</label>
                <input title="includeSubtraction" type="checkbox" className="md:col-span-2 h-5 w-5" checked={settings.includeSubtraction} onChange={(e) => setSettings((s) => ({ ...s, includeSubtraction: e.target.checked }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Same digits in answer as question</label>
                <input title="persistNumberOfDigits" type="checkbox" className="md:col-span-2 h-5 w-5" checked={settings.persistNumberOfDigits} onChange={(e) => setSettings((s) => ({ ...s, persistNumberOfDigits: e.target.checked }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Include Decimal</label>
                <input title="includeDecimals" type="checkbox" className="md:col-span-2 h-5 w-5" checked={settings.includeDecimals} onChange={(e) => setSettings((s) => ({ ...s, includeDecimals: e.target.checked }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Audio Mode</label>
                <input title="audioMode" type="checkbox" className="md:col-span-2 h-5 w-5" checked={settings.audioMode} onChange={(e) => setSettings((s) => ({ ...s, audioMode: e.target.checked, showQuestion: !e.target.checked }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Audio Pace</label>
                <select title="audioPace" className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2" disabled={!settings.audioMode} value={settings.audioPace} onChange={(e) => setSettings((s) => ({ ...s, audioPace: e.target.value as any }))}>
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Show Question Text</label>
                <input title="showQuestion" type="checkbox" className="md:col-span-2 h-5 w-5" checked={settings.showQuestion} onChange={(e) => setSettings((s) => ({ ...s, showQuestion: e.target.checked }))} disabled={settings.audioMode} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Number of Players</label>
              <input type="number" min={2} max={4} className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(clamp(parseInt(e.target.value || '0', 10), 2, 4))} />
            </div>

            <div className="pt-2">
              <button className="w-full bg-[#facb25] text-black font-semibold py-3 rounded-lg hover:bg-[#e6b422]" onClick={createRoom}>Create Room</button>
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
