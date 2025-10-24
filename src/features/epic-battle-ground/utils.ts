import { generateSoloTrainingQuestions } from '../solo-training-ground/utils';

export function generateEpicBattleGroundQuestions(args: Parameters<typeof generateSoloTrainingQuestions>[0]) {
  return generateSoloTrainingQuestions(args as any);
}

export default generateEpicBattleGroundQuestions;
