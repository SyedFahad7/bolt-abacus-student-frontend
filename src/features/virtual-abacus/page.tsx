import React from 'react';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/layout/MainContent';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { AbacusBoard } from './components/AbacusBoard';
import { Calculator, Lightbulb, Brain, Target } from '@phosphor-icons/react';

// virtual abacus page - interactive soroban for mental math practice
const VirtualAbacusPage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full space-y-6">
          {/* header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Calculator size={32} weight="fill" className="text-yellow-600" />
              Virtual Abacus
            </h1>
            <p className="text-white/60 text-sm md:text-base">
              Interactive soroban abacus for mental math practice and calculation training
            </p>
          </div>

          {/* main abacus board */}
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator size={20} className="text-yellow-600" />
              Interactive Soroban
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AbacusBoard />
          </CardContent>
        </Card>

          {/* instructions and features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb size={20} className="text-yellow-600" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Upper beads (Heaven):</span> Click to toggle. Each represents 5 units when touching the beam.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Lower beads (Earth):</span> Click to toggle individual beads. Each represents 1 unit when touching the beam.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Counting:</span> Only beads touching the horizontal beam are counted in the calculation.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Place values:</span> Each rod represents a different place value (ones, tens, hundreds, etc.). White dots mark thousands separators.
                  </div>
                </li>
              </ul>
            </CardContent>
            </Card>

            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain size={20} className="text-yellow-600" />
                  Soroban Basics
                </CardTitle>
              </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Structure:</span> Japanese soroban has 1 bead above the beam (value 5) and 4 beads below (value 1 each).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Reading:</span> Read from left to right, with leftmost rod representing the highest place value.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Reset position:</span> All beads away from the beam represents zero.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <div>
                    <span className="font-medium text-white">Practice tip:</span> Start with simple numbers and gradually increase complexity as you become comfortable.
                  </div>
                </li>
              </ul>
              </CardContent>
            </Card>
          </div>

          {/* benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
              <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center mb-3">
                  <Brain size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-white font-medium mb-2">Mental Math</h3>
                <p className="text-sm text-gray-400">
                  Develop visualization skills and mental calculation abilities
                </p>
              </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
              <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center mb-3">
                  <Target size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-white font-medium mb-2">Accuracy</h3>
                <p className="text-sm text-gray-400">
                  Improve calculation accuracy and speed with practice
                </p>
              </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
              <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center mb-3">
                  <Lightbulb size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-white font-medium mb-2">Understanding</h3>
                <p className="text-sm text-gray-400">
                  Build deep understanding of number composition and place value
                </p>
              </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default VirtualAbacusPage;
