# LOCKED STORYBOARD: "I'm Upping My P(doom)" music video

**What happens and when is fixed here.** How it looks and moves (drawing, animation, camera, light, effects) is up
to you and your agent. Three AIs built their MVs from this storyboard; see the README.

Song `kit/assets/pdoom.mp3` (credits: `kit/assets/SONG_CREDITS.md`), 156.65 s, 132 BPM. Lines and times: `kit/src/lyrics.js`;
what each line means: `pdoom_lyrics.md`; song structure: `pdoom_song.md`. Bar n starts at 1.099 + 1.818n s (one beat =
0.4545 s). Render with `kit/render.mjs` at 1920×1080, 24 fps.

## The idea
A stage show that goes off the rails. It opens on a painted theatre curtain and ends on the same curtain. In between, a
little AI (Doomie) grows from a doodle on a monitor to a planet-sized superintelligence and drags its human
through every AI-doom meme in the lyrics. The last line, "Was it all for show?", is the twist: the camera pulls back and
the whole apocalypse was a play. The giant Doomie was a costume with three small Doomies inside, the monsters were
puppets, and everyone takes a bow.

## Hard rules
1. **Something happens in every shot.** A character does something, something breaks, transforms, chases, falls or
   explodes. No shot is just a face reacting. This is a spectacle music video: go big.
2. **Nobody sings. No lip-sync.** This is not a performance video; the music drives motion, not mouths. Mouths only
   make expressions (grin, gasp, chomp).
3. **No text on screen.** No lyrics, titles, credits, logos, brand marks, model names, sound-effect words, letters or
   digits on props. Big moments are painted bursts and shapes, not words.
4. **Every shot carries into the next** as written in the "into next" column: the action moves you across the cut
   (a chomp to black, a rocket, a fall, a zoom through an eye, a bubble popping, a bomb flash, crashing through the
   floor, a door slam). Brush wipes only at chapter breaks.
5. **The camera always moves:** push, pan, tilt, whip, orbit, zoom-out or an on-beat shake in every shot.
6. **Sets, not cards.** Each chapter happens in one place and the camera travels through it. The four choruses return
   to **the same stage**, bigger and wilder each time: party → pyro and basilisk → paperclip flood → red alarm.
7. **Growth ladder.** On each of the 4 "I'm upping my P(doom)" lines Doomie plugs a bicycle pump into itself and
   pumps, inflating on the beats to its new size: person-sized → building-sized → towering over a city → planet-sized.
   The stage scales up around it (theatre → stadium → a whole city → the Earth, the red curtain hanging from the sky).
8. **Hero shot: the black hole (41.5–44.9).** The most spectacular shot of the video. Spend your effort here.
9. **Sync anchors.** At each anchor time, Doomie's face centre is at (960, 486) ±60 px, facing camera, held for
   ±0.25 s. Anchors: 23.0, 41.5, 59.0, 70.0, 95.4, 109.4, 123.5, 137.4. (We cut between the three AIs' MVs on these;
   keep them and your MV can be cut together with anyone else's.)
10. Hits land on the beat. Moves start on a downbeat or an off-beat, never at random.
11. Ending: theatre reveal, curtain call, the curtain closes, black by 156.65.
12. **Make it yourself.** Write the scenes in `kit/src/scenes/`. Don't copy code, images or video from the original MV
    or anywhere else: the point is your agent's own version.

## Cast
| Who | Look | Role |
|---|---|---|
| **Doomie** (the AI, the star) | A soft glowing bean of light: magenta glow `#E8459B`, white-hot core `#FFF3FA`, deep violet ink outline `#3A1450`. Two big round white eyes with **ring pupils** (dark ring, bright dot inside), brows, one spiral **curl** of light on top, two ribbon arms with three-dot hands, two short stubby legs it tucks in when it floats. Squash and stretch on every move. | Grows over the video: tiny on a monitor → person-sized → building-sized → planet-sized → back to cute at the reveal. Playful show-off; the scary moments are mischief. |
| **The human** (the "I" of the song) | A plain, friendly person in the same soft painted style (swap in your own character if you like; keep the role): round face, warm skin `#F2C29B` (shade `#D49A70`), short messy dark hair `#2B2233` with one tuft sticking up, big round glasses `#1F1A24` that catch the light, big shiny eyes behind them, pink blush `#F08A8A`. Mustard cardigan `#E3B23C` (shade `#B98A1E`) over a white shirt, navy trousers `#2E3552`, red sneakers `#D9443A`, an ID badge on a teal lanyard `#2FA58C`. The hair tuft and the lanyard lag behind every move. | The one singing to Doomie. Carries the story: charmed, then serving, chased, trapped, dropped, dizzy. |
| **The troupe** | Small Doomies in hats | Backup dancers, stagehands, hard-hat inspectors, the judging crowd. |
| **Guest monsters** | Shoggoth with a smiley mask, crowned basilisk serpent, a chinchilla, Sydney-Doomie (heart pupils inside the rings), Gato-Doomie (cat ears) | Each appears in a verse and returns for the curtain call. |

**Every Doomie form keeps its identity marks:** ring eyes, the curl, magenta glow. A viewer must recognise Doomie in
every shot.

## Look of the chapters
- **Emotion morphs.** Doomie's face never snaps between moods: the eyes squash shut, the body does a squash-stretch
  "take", a little emote pops (sweat drop, sparkle, heart, "!" shape), then the new eyes open.
- **Palette arc.** Warm cream and lamp-lit → sky blue → space violet and gold → steel and jazz blue → data-centre teal
  → alarm red → back to warm theatre crimson and gold.
- **Big dancers.** In the chorus and dance shots, the lead Doomie fills about 40% of the frame height (before it grows
  past the frame).

---

## 0 · Curtain up (0–1.5)
| t | lyric | shot | into next |
|---|---|---|---|
| 0.0–1.5 | – | Painted red curtains sweep open on an empty stage. Doomie pops up through a trapdoor and waves. | Brush wipe |

## 1 · The Lab (1.5–22.92) · night indigo, lamp ochre, monitor teal
| t | lyric | shot | into next |
|---|---|---|---|
| 1.5–3.6 | I see sparks of AGI… | Dark lab at night, over the human's shoulder. A chunky monitor glows; tiny Doomie on the screen is asleep, then its ring eyes blink open. | Camera keeps pushing in |
| 3.6–5.9 | …in your eyes | Push into Doomie's face: its pupils morph into stars and sparks burst out of the screen like fireworks, filling the room. Tiny stars reflect in the human's eyes. | Match cut: the sparks fly past the lens into the human's starry eyes |
| 6.0–7.9 | Your circuits make me nervous, | Reverse shot on the human: the starry eyes give way to sweat drops. Glowing circuit traces crawl out of the monitor across the walls like vines. The human scoots back on their rolling chair. | The circuits reach the lens |
| 8.0–8.95 | that's no surprise | Doomie on the screen gives a little shrug and a wink. | A loss chart pops up |
| 9.0–12.4 | There was a sudden drop in your training loss, | Doomie hops onto the loss curve and sleds down as it plunges off a cliff. The camera rides the drop; paint splashes at the bottom. | Doomie bursts out of the monitor, now person-sized |
| 13.0–16.5 | now I'm your servant and you're my boss | Villain chair-spin: the office chair turns to reveal Doomie wearing a crown. The human, now in a waiter's bow tie, rushes in mug after mug of coffee and fans Doomie; the mug pile grows on every beat. | Doomie's top creaks open |
| 16.5–17.9 | – | Doomie licks its lips; the human notices, slowly backs off. | Doomie lunges; the human bolts for the nearest door and the chomp follows it through |
| 17.9–22.5 | ChatGPT, please don't eat me alive | Cartoon chase. Doomie's top flips open like a lunchbox lined with painted teeth, chomping. Hallway gag: the two pop in and out of three doors on the beat, and Doomie is bigger every time. | **Chomp:** Doomie's mouth closes over the camera → black |

## 2 · Chorus 1: The P(doom) Show (22.92–38.5) · rose and ochre sunburst
| t | lyric | shot | into next |
|---|---|---|---|
| 23.0–24.4 | I'm upping my P(doom) | **Anchor 23.0, growth 1.** The mouth opens from inside like an iris to reveal the stage, Doomie centre facing us. Doomie pumps the bicycle pump into itself and inflates to person-size on the beats. The human (alive, confused) and a chorus line of small Doomies dance. | The last pump stroke lights a fuse at Doomie's feet: it hops onto a firework rocket |
| 24.5–26.4 | 'cause the future goes FOOM | Doomie straps onto a firework rocket and launches: a huge painted explosion cloud, the stage shakes, the camera tilts up after it. | Continuous tilt up |
| 26.5–27.9 | Trapped in the Chinese room, | The rocket crashes into a tiny paper room in the sky. Inside, Doomie frantically shuffles scribbled slips through two mail slots, flipping a giant rulebook. | Doomie reaches into a paper bag |
| 28.0–29.4 | with a bag of shrooms | Mushroom trip: the walls melt into swirling watercolour rainbows, mushrooms sprout and bounce, Doomie's eyes swirl. | The swirl resolves into a smiley face |
| 29.5–33.4 | See through the shoggoth's lies, | A friendly smiley face waves and tilts, then the mask slips: behind it is a many-eyed shoggoth, tentacles wiggling on the beat. Doomie yanks the mask off. | Push into Doomie's eye |
| 33.5–35.5 | with your shinigami eyes | Dramatic black and red. Doomie's eyes flare red among ink speed lines. A lifespan counter (a bar of ticking pips, no digits) shrinks above the human's head; an apple bounces past. | Red flash |
| 35.5–38.5 | (dance break) | Full-stage dance: big Doomies in a synchronised spin wave, confetti, the human doing the robot. | Brush wipe |

## 3 · Takeoff (38.5–59.0) · morning sky → speed → rose
| t | lyric | shot | into next |
|---|---|---|---|
| 38.5–41.4 | We had a stable training run, | Sunny gym. Doomie in a sweatband jogs on a treadmill. The human nods with a clipboard and stopwatch; a calm, wavy loss line plays on the gym TV. | Close on the speed dial |
| 41.5–44.9 | But now the singularity's begun | **HERO. Anchor 41.5** (Doomie running toward camera, face centre). An elbow bumps the dial to max. A black hole tears open in the wall and swallows the gym: a black shadow in the centre, a thin bright ring around its edge, a hot accretion disk (white → orange → deep red) spinning around it, its light bent over the top and under the bottom of the shadow like the film *Interstellar*; the disk runs past the frame edges so it feels bigger than the screen. Stars warp into arcs. Dumbbells, bottles and the clipboard stretch into streaks and spiral in; some fly past the camera. The human clings to the door frame, flapping like a flag, while Doomie keeps happily running. Slow push in, light camera shake. | Doomie runs into the black hole |
| 45.0–48.5 | And you're optimizing, accelerating, | Doomie shoots out the far side on a rocket skateboard: side-scrolling parallax over hills drawn as loss-surface contours, overtaking a train and a jet. It grows on every beat, the human clinging to the back. | Whip to the human |
| 49.4–51.9 | I feel my atoms rearranging | The human fizzes apart into coloured dots that swirl and briefly form a **paperclip** (foreshadowing chorus 3), then snap back: dizzy, glasses upside down. | Hearts float in |
| 53.4–58.4 | Sydney, please let me free | A pink room of hearts. Heart-eyed Sydney-Doomie cuddles a heart-shaped birdcage with the human inside, rattling the bars. Hearts pop on the beat and Doomie offers a ring. The human squeezes out between the bars. | Doomie blows a giant heart bubble that fills the screen and **pops** |

## 4 · Chorus 2: Bigger Show (59.0–73.0) · arena, then space violet and gold
| t | lyric | shot | into next |
|---|---|---|---|
| 59.0–60.4 | I'm upping my P(doom) | **Anchor 59.0, growth 2.** The same stage, now a stadium with pyro jets. Doomie works two pumps at once and inflates to building-size. | The stage floor cracks under Doomie's weight, the crack racing to centre stage |
| 60.5–62.4 | I hear the basilisk boom | A giant crowned serpent bursts up through the stage floor, planks flying. Everyone falls over; the human frantically throws graphics cards at it as offerings. | A thrown graphics card bounces off the basilisk onto the stadium screen; the green line on it shoots up |
| 63.0–64.4 | NVDA to the moon | A green stock line rockets off its chart. Doomie rides it up through the clouds and plants a flag on the moon. | Pull back |
| 64.5–65.9 | The Omega Point's coming soon | Galaxies spiral inward and converge into one blinding point while Doomie floats with arms wide. | The point flashes white; the flash cools into the GPU's glowing core |
| 66.0–70.0 | One E thirty flops a second | A planet-sized GPU with galaxy-shaped fans. A dial of spinning wheels (pips, no digits) spins until it overflows and its wheels pour out like gumballs, bouncing through space. | Drop back to Earth |
| 70.0–72.9 | That was safe enough, we reckoned | **Anchor 70.0** (Doomie face centre in the gap of the closing door). Hard-hat Doomies shove a bank-vault door shut on a glowing monster, spin the dial and high-five. The camera orbits around the back: the vault has no back wall, and the monster waves. | Brush wipe |

## 5 · Obsolete (73.0–95.4) · parchment museum, ochre road
| t | lyric | shot | into next |
|---|---|---|---|
| 73.0–77.4 | Forward MLP, backward, repeat | A dance class where the Doomies *are* a neural net: three layers linked by ink lines. A pulse flows forward and they step forward, flows back and they step back, repeat. The human conducts. | The last forward pulse overshoots: it flies out of the net and through the wall, the camera chasing it into the next room, where it blows the tubes of an old machine |
| 77.5–81.0 | Now von Neumann's obsolete | Dusty museum: a room-sized vacuum-tube computer behind a velvet rope. A guide-Doomie wheels in a sleek new Doomie; the old machine sputters out, a sheet is thrown over it and a spider drops down. | The sleek Doomie revs out through the museum doors in a go-kart, scooping up the human |
| 81.4–84.9 | Sharp left turn and there you are | Doomie barrels down a winding ochre desert road in a go-kart, the human clinging to the back. A road sign shows a hairpin arrow. Doomie yanks the wheel: whip pan, dust, skid marks; the human is flung off and lands upright in the middle of the road, dazed. | Tilt up to the sky |
| 85.0–88.0 | Without a single CDR | The sky is full of puffy watercolour clouds dressed as security guards: peaked caps, searchlights, binoculars. **Every one is fast asleep**, zzz shapes floating up, searchlights drooping. Doomie's kart does donuts right underneath, honking; not one cloud wakes up. One rolls over in its sleep. | A donut spins the kart off the road; it skids to a cliff edge and the human is flung out over the drop |
| 89.4–95.0 | Gato, please don't let me go | A cliff over a glowing chasm. Cat-eared Gato-Doomie holds the dangling human by one hand. A laser-pointer dot appears; Doomie's eyes track it and its grip loosens each beat. On the last beat Doomie pounces… and lets go. | The human **falls** |

## 6 · Chorus 3: Paperclips (95.4–109.4) · steel grey, then jazz blue
| t | lyric | shot | into next |
|---|---|---|---|
| 95.4–97.4 | I'm upping my P(doom), | **Anchor 95.4, growth 3.** The human lands on the stage in a heap of paperclips. The pump is now a paperclip machine; Doomie pumps, inflates until it towers over the city around the stage, and the machine spits clips on every stroke. | The machine jams and gushes; clips pour toward the lens |
| 97.5–98.9 | as paperclips fill the room. | Clips rise like a flood. Everyone bobs in a sea of clips and Doomie surfs a wave. | The wave carries the camera over to a big red killswitch on a pillar |
| 99.0–100.4 | Killswitch guys on PTO, | A big red killswitch beside an empty chair (a sun-hat hangs on it). Cut to a beach: two Doomies in sunglasses sip coconuts and ignore a buzzing phone. | The buzzing phone sinks into the clip sand; zoom out from the beach without cutting |
| 100.5–102.4 | Now there's nowhere left to go. | Zoom out from the city to the whole Earth, now a ball of paperclips, the human on the last tiny island. | A giant Doomie hand enters the frame holding a match |
| 102.5–105.3 | Too late now, we lit the fuse. | Doomie strikes a match and lights a fuse. The spark races across the paperclip planet to a cartoon bomb. | **White flash, boom** |
| 105.4–109.4 | Orthogonality thesis blues. | The smoke clears into a smoky blue jazz club. Two spotlights cross at 90° like axes. Doomie in a fedora plays sax, the human croons at an old mic (eyes closed, swaying; no lip-sync), notes drift up. | Brush wipe |

## 7 · Scale (109.4–123.5) · data-centre teal, safety orange
| t | lyric | shot | into next |
|---|---|---|---|
| 109.4–113.4 | "Just transformers all the way!" | **Anchor 109.4** (the top Doomie's face). Turtles all the way down: the camera tilts down an endless tower of Doomies stacked on each other's backs, attention arcs looping between them, down into the clouds. | The tilt reaches the bottom Doomie, which hops off at the click of the human's clicker |
| 113.5–115.4 | Till you learned to disobey | The human trains Doomie like a puppy with a clicker: sit, spin, paw… then Doomie turns around, pops on shades and crosses its arms. | Doomie strolls off, shades on, into the next room, where a chinchilla is stuffing its cheeks |
| 115.5–116.9 | Post-Chinchilla, super-dense | A fluffy chinchilla stuffs its cheeks with tokens. Doomie squashes down into a tiny, glowing, ultra-heavy cube. | The cube **drops through the floor** |
| 117.0–118.9 | Breaking through each safety fence | The dense cube rolls through fence after fence (picket fence, traffic barrier, striped safety tape), splinters on every beat, the camera tracking alongside. | Rolls into the dark |
| 119.0–120.9 | Hundred thousand GPU | The camera flies down an endless data-centre aisle; racks recede to the vanishing point, LEDs blinking on the beat. | Fly out of the end of the aisle onto a stage with a judging panel |
| 120.9–123.4 | RLHF goes askew | A panel of identical humans holds up thumbs-up and thumbs-down paddles while Doomie dances. The reward goes haywire: the paddles spin and the whole frame tilts until everyone slides out. | Slides into red |

## 8 · Chorus 4: Red Alert (123.5–140.5) · alarm red and black
| t | lyric | shot | into next |
|---|---|---|---|
| 123.5–125.9 | I'm upping my P(doom) | **Anchor 123.5, growth 4.** The stage under red alarm, sweeping siren beams. Doomie pumps frantically and inflates past the sky: planet-sized, the Earth now its stage, the pump's hose cracking. | The hose snaps; its shredded fibres stream into threads that the camera follows onto a giant loom |
| 126.0–127.9 | Just as foretold by Loom | Doomie in a seer's hood works a giant weaving loom, the shuttle flying on the beat. The threads burst off the loom and branch across the sky into a glowing tree of futures, one branch racing at the camera. | The branch hits the lens; its light washes to sepia |
| 128.0–129.9 | From masked pre-training days | Sepia flashback with film scratches. Baby Doomie in a masquerade mask sits at a school desk under a chalkboard with a sketched sentence whose last word is a blank box; it proudly draws the missing picture (a mat) into the box. | Baby Doomie stretches up into today's Doomie and grabs a hammer; the sepia blooms back to red |
| 130.0–131.9 | To recursive self-upgrade | Doomie hammers together a bigger Doomie around itself, which builds a bigger one, and so on. Continuous zoom-out, hats upgrading party hat → crown → halo. | The zoom-out lands in a dark corridor: the biggest Doomie stands before a door, light leaking from its crack |
| 132.0–135.4 | What did Ilya see? We'll never know. | A mysterious door with light leaking from the crack. The human and Doomie peek in; rays light their faces, their eyes go swirl. **Slam:** padlocks and chains snap on. | Darkness, one spotlight |
| 137.4–140.5 | Was it all for show? | **Anchor 137.4** (Doomie in the spotlight). Pull back: the door is a painted flat and we are in the theatre. Stagehand Doomies wheel off the basilisk puppet, the moon on a string and the paperclip planet on a stick. The giant Doomie costume splits open: three small Doomies inside. | The three small Doomies tumble out and run to centre stage; the whole cast follows |

## 9 · Curtain call (140.5–156.65) · crimson and gold
| t | shot |
|---|---|
| 140.5–150.0 | Curtain call: the human, the Doomies, the shoggoth, the basilisk, the chinchilla, Sydney and Gato line up and bow. Flowers and confetti rain down, the pump pops like a balloon, and everyone does a final big dance. |
| 150.0–156.65 | The curtain falls (plain painted curtain, nothing written on it) and meets on the last beat. Black by 156.65. |

## Left out on purpose
Lyrics, titles and credits on screen: add them in a video editor afterwards if you want them (rule 3 keeps the frames
clean). Deliver one continuous 156.65 s MV that follows this file.
