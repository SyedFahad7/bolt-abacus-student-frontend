import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';
import { Snail } from 'lucide-react';

interface UntimedSettings {
  operation: 'addition' | 'multiplication' | 'division';
  numberOfQuestions: number;
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

const UntimedForm: FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const operation = params.get('op') as 'addition' | 'multiplication' | 'division';

  const [settings, setSettings] = useState<UntimedSettings>({
    operation,
    numberOfQuestions: 10,
    numberOfDigitsLeft: 1,
    numberOfDigitsRight: 1,
    numberOfRows: 2,
    isZigzag: false,
    includeSubtraction: operation === 'addition',
    persistNumberOfDigits: false,
    includeDecimals: false,
    audioMode: false,
    audioPace: 'normal',
    showQuestion: true,
  });

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  const startPractice = () => {
    // Validations
    if (settings.numberOfQuestions < 1 || settings.numberOfQuestions > 1000) {
      alert('Number of questions must be between 1 and 1000');
      return;
    }

    if (settings.numberOfDigitsLeft < 1 || settings.numberOfDigitsLeft > 15) {
      alert('Number of digits must be between 1 and 15');
      return;
    }

    if (operation === 'multiplication' && (settings.numberOfDigitsRight < 1 || settings.numberOfDigitsRight > 15)) {
      alert('Number of digits must be between 1 and 15');
      return;
    }

    if (operation === 'division') {
      if (settings.numberOfDigitsRight < 1 || settings.numberOfDigitsRight > 5) {
        alert('Denominator digits must be between 1 and 5');
        return;
      }
      if (settings.numberOfDigitsRight > settings.numberOfDigitsLeft) {
        alert('Numerator digits should be greater than or equal to denominator digits');
        return;
      }
    }

    if (operation === 'addition' && (settings.numberOfRows < 1 || settings.numberOfRows > 15)) {
      alert('Number of rows must be between 1 and 15');
      return;
    }

    const encodedSettings = btoa(JSON.stringify(settings));
    navigate(`/student/solo-training-ground/untimed/practice?settings=${encodedSettings}`);
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Snail size={28} className="text-gold" />
            <h1 className="text-2xl font-bold text-white">No Rush Mastery Settings</h1>
          </div>

          {/* Settings Form */}
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 space-y-6 text-white">
            {/* Number of Questions */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">Number of Questions</label>
              <input
                title="numberOfQuestions"
                type="number"
                className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                value={settings.numberOfQuestions}
                onChange={(e) =>
                  setSettings({ ...settings, numberOfQuestions: clamp(parseInt(e.target.value) || 1, 1, 1000) })
                }
              />
            </div>

            {/* Number of Digits Left */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <label className="opacity-90">
                {operation === 'division'
                  ? 'Number of Digits on Numerator'
                  : operation === 'multiplication'
                    ? 'Number of Digits on First Operand'
                    : 'Number of Digits'}
              </label>
              <input
                title="numberOfDigitsLeft"
                type="number"
                className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                value={settings.numberOfDigitsLeft}
                onChange={(e) =>
                  setSettings({ ...settings, numberOfDigitsLeft: clamp(parseInt(e.target.value) || 1, 1, 15) })
                }
              />
            </div>

            {/* Number of Digits Right (Multiplication & Division) */}
            {(operation === 'multiplication' || operation === 'division') && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">
                  {operation === 'multiplication'
                    ? 'Number of Digits in Second Operand'
                    : 'Number of Digits on Denominator'}
                </label>
                <input
                  title="numberOfDigitsRight"
                  type="number"
                  className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                  value={settings.numberOfDigitsRight}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      numberOfDigitsRight: clamp(parseInt(e.target.value) || 1, 1, operation === 'division' ? 5 : 15),
                    })
                  }
                />
              </div>
            )}

            {/* Number of Rows (Addition only) */}
            {operation === 'addition' && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Number of Rows</label>
                <input
                  title="numberOfRows"
                  type="number"
                  className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                  value={settings.numberOfRows}
                  onChange={(e) =>
                    setSettings({ ...settings, numberOfRows: clamp(parseInt(e.target.value) || 2, 1, 15) })
                  }
                />
              </div>
            )}

            {/* Toggles */}
            {operation === 'addition' && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Zig-Zag Pattern</label>
                <input
                  title="isZigzag"
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.isZigzag}
                  onChange={(e) => setSettings({ ...settings, isZigzag: e.target.checked })}
                />
              </div>
            )}

            {operation === 'addition' && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Include Subtraction</label>
                <input
                  title="includeSubtraction"
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.includeSubtraction}
                  onChange={(e) => setSettings({ ...settings, includeSubtraction: e.target.checked })}
                />
              </div>
            )}

            {operation === 'addition' && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Same digits in answer as question</label>
                <input
                  title="persistNumberOfDigits"
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.persistNumberOfDigits}
                  onChange={(e) => setSettings({ ...settings, persistNumberOfDigits: e.target.checked })}
                />
              </div>
            )}

            {operation === 'division' && (
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Include Decimal</label>
                <input
                  title="includeDecimals"
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.includeDecimals}
                  onChange={(e) => setSettings({ ...settings, includeDecimals: e.target.checked })}
                />
              </div>
            )}

            {/* Audio Mode */}
            <div className="border-t border-[#2a2a2d] pt-4 mt-2 space-y-3">
              <div className="flex items-center gap-2">
                <span role="img" aria-label="speaker">🔊</span>
                <div className="font-semibold">Audio Mode</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Enable</label>
                <input
                  title="audioMode"
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.audioMode}
                  onChange={(e) => setSettings({ ...settings, audioMode: e.target.checked, showQuestion: !e.target.checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
                <label className="opacity-90">Audio Pace</label>
                <select
                  title="audioPace"
                  className="md:col-span-2 bg-black border border-[#2a2a2d] rounded-lg px-3 py-2"
                  disabled={!settings.audioMode}
                  value={settings.audioPace}
                  onChange={(e) => setSettings({ ...settings, audioPace: e.target.value as any })}
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
                  title="showQuestion"
                  type="checkbox"
                  className="md:col-span-2 h-5 w-5"
                  checked={settings.showQuestion}
                  onChange={(e) => setSettings({ ...settings, showQuestion: e.target.checked })}
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
};

export default UntimedForm;
