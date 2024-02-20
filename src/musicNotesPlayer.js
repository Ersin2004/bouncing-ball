import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

export default class MusicPlayer {
  constructor(midiURL) {
    this.synth = new Tone.Synth().toDestination();
    this.midiData = null;
    this.currentNote = 0;
    this.loadMidiFile(midiURL);
  }

  async loadMidiFile(midiURL) {
    const response = await fetch(midiURL);
    const arrayBuffer = await response.arrayBuffer();
    const midi = new Midi(arrayBuffer);
    this.midiData = midi;
  }

  playNote() {
    if (this.midiData && this.midiData.tracks[0].notes.length > 0) {
      const note = this.midiData.tracks[0].notes[this.currentNote % this.midiData.tracks[0].notes.length];
      this.synth.triggerAttackRelease(note.name, note.duration, Tone.now(), note.velocity);
      this.currentNote++;
    }
  }
}