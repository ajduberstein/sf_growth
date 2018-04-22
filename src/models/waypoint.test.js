import { Waypoint } from './waypoint';

describe('waypoint', () => {
  describe('constructor', () => {
    it('should contain all class attributes unmodified', () => {
      const w = new Waypoint(1001, 0.0, 0.3, 1, 'divis and fell')
      console.log(w)
      expect(w.id).toBe(1001);
      expect(w.latitude).toBe(0.0);
      expect(w.longitude).toBe(0.3);
      expect(w.id).toBe(1);
      expect(w.name).toBe('divis and fell');
    })
  })
  describe('toString', () => {
    it('should produce an ordered string of object attributes', () => {
      const w = new Waypoint(1, 0.0, 0.3, 1, 'divis and fell')
      expect(w.toString()).toBe('(0.3 0 1)')
    })
  })
})
