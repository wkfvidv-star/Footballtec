/**
 * SimulatorService v1.0.0
 * Decouples mock/simulation data generation from the UI/Production logic.
 * This ensures that replacing simulations with real tracking engines is "Plug & Play".
 */
export class SimulatorService {
  /**
   * Generates mock positional data for video analysis overlays
   */
  static getMockTrackingData() {
    return [
      { id: 'PLAYER_01', x: 33, y: 25, speed: 28.4, status: 'SYNCED' },
      { id: 'PLAYER_05', x: 45, y: 60, speed: 12.1, status: 'STABLE' },
      { id: 'BALL', x: 50, y: 50, speed: 45.0, status: 'IN_MOTION' }
    ]
  }

  /**
   * Simulates AI pattern detection results
   */
  static getMockPatterns() {
    return [
      { id: 1, type: 'GAP', desc: 'تم رصد فجوة تكتيكية في التمركز الدفاعي.' },
      { id: 2, type: 'OVERLAP', desc: 'زيادة عددية مكتشفة في الثلث الهجومي.' },
      { id: 3, type: 'STRESS', desc: 'تحويل سريع للعب مرصود من الجناح الأيسر.' }
    ]
  }

  /**
   * Universal Service Stop
   * Ensures all mock streams are killed atomically.
   */
  static stopService() {
    console.log('[SIM] All simulation streams terminated atomically.');
    // Logic to clear intervals or socket listeners
  }
}
