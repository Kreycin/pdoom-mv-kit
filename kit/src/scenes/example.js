// example.js: the smallest possible scene file. It only shows the mechanics; its look is deliberately plain and is NOT a
// style to follow. Delete this file (and its <script> tag in studio.html) when you write your own scenes.
//
// A shot is a function fn(t, lt, dur): t = video time (s), lt = time since the shot started, dur = the shot's length.
// It must paint the WHOLE frame (background included) and be a pure function of t: no state carried between frames.
// shots([[startTime, fn], ...]) puts the functions on the timeline; each shot runs until the next one starts.
(() => {
  const DARK = '#23252B', SLATE = '#2E3440', GREY = '#8D9097';

  // the ball bounces on every beat for the whole song, so this placeholder also checks the beat grid by ear
  function ball(t, bg) {
    boilSeed('bg');                                                        // one boilSeed per separate element
    paint(rectPts(-20, -20, W + 40, H + 40), { wash: bg, ink: null });     // flat background, painted with the brush

    const r = 150, ground = 800, f = frac(bpOf(t));                        // f = 0..1 through the current beat
    const y = ground - r - 200 * 4 * f * (1 - f);                          // one bounce arc per beat (lands on the beat)
    const sq = 0.12 * pulse(t, 8);                                         // squash on landing (pulse = 1 on the beat)
    boilSeed('ball');
    paint(ellPts(960, y, r * (1 + sq), r * (1 - sq), 36, 2), { wash: GREY, ink: PAL.ink, sw: 1 });

    const open = pulse(t, 8);                                              // the mouth pops open on each landing
    boilSeed('mouth');
    paint(ellPts(960, y + r * .3, r * .22, 3 + r * .26 * open, 16), { wash: PAL.ink, ink: null });
  }

  const first = (t, lt, dur) => ball(t, DARK);                            // shot 1
  const second = (t, lt, dur) => ball(t, SLATE);                          // shot 2: same ball, another background

  shots([[0, first], [8, second]]);
})();
