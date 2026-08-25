import {
  ColorId,
  MirrorId,
  MirrorPosition,
  MirrorResult,
  PatternSynthesis,
  Reading,
  StateColor,
} from '@/types/state8'
import { MIRROR_POSITION_LIST, STATE_COLOR_LIST, STATE_COLORS } from './constants'

/**
 * Shuffle array using Fisher-Yates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Generate position-specific mirror analysis for a given color
 */
export function generateMirrorAnalysis(
  position: MirrorPosition,
  color: StateColor
): {
  summary: string
  patternObservation: string
  reflectionQuestion: string
} {
  const analysisMatrix: Record<
    MirrorId,
    Record<
      ColorId,
      {
        summary: string
        patternObservation: string
        reflectionQuestion: string
      }
    >
  > = {
    core: {
      white: {
        summary: 'At the root, you are ready to let go of an expired premise.',
        patternObservation: 'The situation has completed its cycle. Holding on creates false friction.',
        reflectionQuestion: 'What becomes possible if you empty your expectations completely?',
      },
      purple: {
        summary: 'At the root, this is an invitation to deeper self-trust and inner seeing.',
        patternObservation: 'You already possess the answer; the hesitation is in accepting its clarity.',
        reflectionQuestion: 'If you stopped asking for external validation, what is already clear?',
      },
      blue: {
        summary: 'At the root, an unspoken truth is waiting to be acknowledged and named.',
        patternObservation: 'Silence or obscured communication is shaping the current reality.',
        reflectionQuestion: 'What conversation are you postponing?',
      },
      pink: {
        summary: 'At the root, your emotional appetite seeks genuine resonance and warmth.',
        patternObservation: 'The analytical mind is trying to solve what is essentially a matter of heart.',
        reflectionQuestion: 'What does your intuitive emotional compass truly want to feel?',
      },
      green: {
        summary: 'At the root, a structural adaptation is ready to unfold naturally.',
        patternObservation: 'The current model is too rigid. Flexibility is your highest leverage.',
        reflectionQuestion: 'Where can you adjust the posture rather than forcing the circumstance?',
      },
      yellow: {
        summary: 'At the root, this requires clear-eyed discrimination and firm boundary setting.',
        patternObservation: 'Ambiguity is diluting your energy. A disciplined decision is needed.',
        reflectionQuestion: 'Which trade-off have you been unwilling to make?',
      },
      orange: {
        summary: 'At the root, timing and energy incubation are the governing laws.',
        patternObservation: 'The fruit is still ripening. Rushing will damage the foundation.',
        reflectionQuestion: 'Can you hold steady while the background conditions align?',
      },
      red: {
        summary: 'At the root, the situation demands decisive, courageous momentum.',
        patternObservation: 'Excessive deliberation is becoming its own form of avoidance.',
        reflectionQuestion: 'What is the single irreversible step you must take today?',
      },
    },
    mind: {
      white: {
        summary: 'Your mind seeks simplicity and total decluttering.',
        patternObservation: 'You want to strip away noise and arrive at zero-based thinking.',
        reflectionQuestion: 'Which assumptions can you drop right now?',
      },
      purple: {
        summary: 'Your mind is observing from a higher meta-perspective.',
        patternObservation: 'You are noticing the recurring loops rather than being trapped inside them.',
        reflectionQuestion: 'What pattern are you observing across past situations?',
      },
      blue: {
        summary: 'Your mind is framing this around clarity, logic, and verbal expression.',
        patternObservation: 'You are looking for the exact vocabulary to describe what is occurring.',
        reflectionQuestion: 'How can you explain this in one simple sentence?',
      },
      pink: {
        summary: 'Your mind is heavily filtered through vulnerability and connection.',
        patternObservation: 'You are weighing how decisions affect relationships and safety.',
        reflectionQuestion: 'Are you over-accommodating to preserve harmony?',
      },
      green: {
        summary: 'Your mind is searching for alternatives, pivots, and iterations.',
        patternObservation: 'You are actively testing different angles to solve the problem.',
        reflectionQuestion: 'What is the most unconventional tweak available to you?',
      },
      yellow: {
        summary: 'Your mind is analyzing pros, cons, metrics, and probabilities.',
        patternObservation: 'Rational calculation is dominant, sometimes bordering on over-optimization.',
        reflectionQuestion: 'Are you using analysis as a defense against taking risk?',
      },
      orange: {
        summary: 'Your mind is calculating the right window of opportunity.',
        patternObservation: 'You are sensing that timing is everything right now.',
        reflectionQuestion: 'What sign indicates the exact moment to strike?',
      },
      red: {
        summary: 'Your mind is primed for immediate execution and impact.',
        patternObservation: 'You are impatient with delay and want tangible breakthroughs.',
        reflectionQuestion: 'Is your drive fueled by clarity or anxiety?',
      },
    },
    emotion: {
      white: {
        summary: 'An unspoken desire to rest, exhale, and drop the burden.',
        patternObservation: 'Fatigue from sustaining what no longer serves.',
        reflectionQuestion: 'How does your body feel when you imagine walking away?',
      },
      purple: {
        summary: 'A quiet, deep confidence beneath the surface agitation.',
        patternObservation: 'A calm knowing that remains untouched by chaotic surface ripples.',
        reflectionQuestion: 'Can you anchor into that silent stillness?',
      },
      blue: {
        summary: 'A pressure to be heard, understood, or vindicated.',
        patternObservation: 'Unexpressed thoughts are creating energetic tightness.',
        reflectionQuestion: 'What happens if you speak without anger or expectation?',
      },
      pink: {
        summary: 'A craving for validation, care, or deeper communion.',
        patternObservation: 'A sensitive nerve around belonging or appreciation.',
        reflectionQuestion: 'How can you provide this comfort to yourself first?',
      },
      green: {
        summary: 'An itch for novelty, evolution, and fresh air.',
        patternObservation: 'Stagnation feels suffocating; you want dynamic movement.',
        reflectionQuestion: 'What small experiment will revive your enthusiasm?',
      },
      yellow: {
        summary: 'Anxiety around making an irreversible error.',
        patternObservation: 'Fear of regret is slowing down your instinct.',
        reflectionQuestion: 'What is the worst that realistically happens if you are wrong?',
      },
      orange: {
        summary: 'Tension between urgency and the need to wait.',
        patternObservation: 'The restless energy of an athlete waiting for the starting whistle.',
        reflectionQuestion: 'Can you channel restless energy into quiet preparation?',
      },
      red: {
        summary: 'A fierce fire of passion, frustration, or determination.',
        patternObservation: 'Strong kinetic drive that must be channeled cleanly.',
        reflectionQuestion: 'Are you aiming your fire at the obstacle or at yourself?',
      },
    },
    action: {
      white: {
        summary: 'Pausing non-essential tasks and retreating from over-commitment.',
        patternObservation: 'Strategic withdrawal to conserve essential reserves.',
        reflectionQuestion: 'What activity can you delete from your calendar this week?',
      },
      purple: {
        summary: 'Stepping back to contemplate and research before acting.',
        patternObservation: 'Prioritizing reflective listening and diagnostic inquiry.',
        reflectionQuestion: 'What question should you be asking before making moves?',
      },
      blue: {
        summary: 'Engaging in discussions, drafting proposals, or speaking out.',
        patternObservation: 'Using communication channels to influence the landscape.',
        reflectionQuestion: 'Is your communication concise and focused on the real point?',
      },
      pink: {
        summary: 'Nurturing relationships, smoothing friction, and fostering trust.',
        patternObservation: 'Investing relational capital to build solid goodwill.',
        reflectionQuestion: 'Are you neglecting practical outcomes while tending relationships?',
      },
      green: {
        summary: 'Refining processes, testing micro-changes, and adapting on the fly.',
        patternObservation: 'Iterative agility without committing to a single rigid plan.',
        reflectionQuestion: 'Which tweak produced the highest return recently?',
      },
      yellow: {
        summary: 'Organizing, auditing, budgeting, and establishing criteria.',
        patternObservation: 'Putting systems in place to prevent future breakdowns.',
        reflectionQuestion: 'Are your systems serving the mission or creating bureaucracy?',
      },
      orange: {
        summary: 'Building capacity, gathering resources, and setting the trap.',
        patternObservation: 'Positioning yourself quietly for the upcoming inflection point.',
        reflectionQuestion: 'What essential capability is missing before the green light?',
      },
      red: {
        summary: 'Driving forward aggressively, making bold moves, and executing.',
        patternObservation: 'High velocity, pushing through boundaries and testing reality.',
        reflectionQuestion: 'Are you leaving behind unresolved details in your speed?',
      },
    },
    relation: {
      white: {
        summary: 'An existing tie or dynamic is naturally fading out.',
        patternObservation: 'Allowing space between yourself and others without animosity.',
        reflectionQuestion: 'Who needs to be released from your mental orbit?',
      },
      purple: {
        summary: 'A mirror relationship reflecting your own unacknowledged truths.',
        patternObservation: 'Others are showing you parts of your pattern you resist seeing.',
        reflectionQuestion: 'What does their behavior highlight about your own stance?',
      },
      blue: {
        summary: 'A dialogue gap or misunderstood contract between parties.',
        patternObservation: 'Assumptions were made without explicit verbal consensus.',
        reflectionQuestion: 'What needs to be spelled out explicitly in black and white?',
      },
      pink: {
        summary: 'An opportunity for mutual warmth, alliance, and mutual support.',
        patternObservation: 'Genuine camaraderie can dissolve the perceived difficulty.',
        reflectionQuestion: 'How can you lower your guard to allow collaborative flow?',
      },
      green: {
        summary: 'A relationship that is evolving into a different form.',
        patternObservation: 'Old roles no longer fit; a renegotiation is underway.',
        reflectionQuestion: 'What is the new healthy dynamic for this relationship?',
      },
      yellow: {
        summary: 'Professional boundaries and clear division of responsibilities.',
        patternObservation: 'Emotions must step aside for clean accountability.',
        reflectionQuestion: 'Where must you draw the line without being apologetic?',
      },
      orange: {
        summary: 'Waiting on another person’s decision or readiness.',
        patternObservation: 'The other party has their own timeline that cannot be coerced.',
        reflectionQuestion: 'Can you hold your center while they arrive at clarity?',
      },
      red: {
        summary: 'A direct confrontation or competitive dynamic pushing you forward.',
        patternObservation: 'Friction is sharpening your focus and forcing self-reliance.',
        reflectionQuestion: 'How can you respond with power rather than reaction?',
      },
    },
    reality: {
      white: {
        summary: 'The external slate is unusually clean; empty space awaits input.',
        patternObservation: 'A vacuum exists in the environment waiting for new creation.',
        reflectionQuestion: 'What will you fill this fresh space with?',
      },
      purple: {
        summary: 'The real world signals are subtle and require deep discernment.',
        patternObservation: 'Things are not what they seem on surface metrics alone.',
        reflectionQuestion: 'What subtle indicator is everyone else ignoring?',
      },
      blue: {
        summary: 'The external environment is noisy with conflicting messages.',
        patternObservation: 'Information overload obscures the core signal.',
        reflectionQuestion: 'Which sources of commentary should you tune out?',
      },
      pink: {
        summary: 'The atmosphere is receptive, warm, and inviting.',
        patternObservation: 'The ground is fertile for trust and creative goodwill.',
        reflectionQuestion: 'How can you leverage the goodwill in the environment?',
      },
      green: {
        summary: 'The external conditions are shifting rapidly and reward agility.',
        patternObservation: 'Fixed plans will break; fluid adjustments will thrive.',
        reflectionQuestion: 'How can your plan become 50% more adaptable?',
      },
      yellow: {
        summary: 'Rigid constraints around time, budget, or legal regulations.',
        patternObservation: 'You must play strictly within the hard limits of the field.',
        reflectionQuestion: 'How can limitation become your greatest creative catalyst?',
      },
      orange: {
        summary: 'The broader macro cycle is in a transition / hibernation phase.',
        patternObservation: 'Market conditions or external gears are still turning slowly.',
        reflectionQuestion: 'How can you turn slow macro timing to your strategic advantage?',
      },
      red: {
        summary: 'A time-sensitive window demanding immediate physical response.',
        patternObservation: 'Hesitation carries a heavier penalty than imperfect action.',
        reflectionQuestion: 'What happens if you move within the next 24 hours?',
      },
    },
    block: {
      white: {
        summary: 'Reluctance to let go of sunk cost or an obsolete identity.',
        patternObservation: 'Clinging to yesterday’s victory or past investment.',
        reflectionQuestion: 'What are you preserving that has already served its purpose?',
      },
      purple: {
        summary: 'Intellectualizing the problem to avoid real-world friction.',
        patternObservation: 'Endless introspection without grounding in reality.',
        reflectionQuestion: 'Where are you over-analyzing what simply needs to be lived?',
      },
      blue: {
        summary: 'Self-censorship or diplomatic silence masking disagreement.',
        patternObservation: 'Swallowing your truth to maintain superficial peace.',
        reflectionQuestion: 'What price are you paying for staying silent?',
      },
      pink: {
        summary: 'Seeking external validation or fearing emotional rejection.',
        patternObservation: 'Letting other people’s comfort dictate your boundaries.',
        reflectionQuestion: 'Whose approval are you still trying to win?',
      },
      green: {
        summary: 'Constantly pivoting without finishing the core initiative.',
        patternObservation: 'Novelty addiction disguised as strategic flexibility.',
        reflectionQuestion: 'Are you tweaking to improve, or tweaking to escape commitment?',
      },
      yellow: {
        summary: 'Paralysis by analysis and hyper-critical skepticism.',
        patternObservation: 'Demanding 100% certainty before taking a single step.',
        reflectionQuestion: 'Can you act with only 70% information?',
      },
      orange: {
        summary: 'Procrastination masquerading as "waiting for the right time".',
        patternObservation: 'Passive waiting that allows initiative to wither.',
        reflectionQuestion: 'Is it genuine timing, or is it fear of exposure?',
      },
      red: {
        summary: 'Forcing a locked door with brute force instead of turning the handle.',
        patternObservation: 'Aggressive pushing that generates counter-resistance.',
        reflectionQuestion: 'Where are you fighting reality rather than reading it?',
      },
    },
    key: {
      white: {
        summary: 'RELEASE: Clean the slate, forgive the debt, and restart from zero.',
        patternObservation: 'True mastery is knowing when to drop the entire game.',
        reflectionQuestion: 'If you walk away with zero baggage, where do you begin?',
      },
      purple: {
        summary: 'INSIGHT: Step out of the frame and observe the meta pattern.',
        patternObservation: 'Clarity dissolves problems that effort cannot brute-force.',
        reflectionQuestion: 'What does the silent observer within you instruct right now?',
      },
      blue: {
        summary: 'VOICE: Speak clearly, name the reality, and align terms.',
        patternObservation: 'One unambiguous conversation can unlock months of deadlock.',
        reflectionQuestion: 'What is the most direct, honest truth you can declare today?',
      },
      pink: {
        summary: 'JOY: Reconnect with genuine desire, warmth, and ease.',
        patternObservation: 'When you operate from enjoyment, friction dissolves effortlessly.',
        reflectionQuestion: 'How can this process become nourishing rather than draining?',
      },
      green: {
        summary: 'SHIFT: Realign the structure, adapt the method, do not push harder.',
        patternObservation: 'A 5-degree shift in trajectory reaches an entirely new horizon.',
        reflectionQuestion: 'What happens if you change the method instead of the goal?',
      },
      yellow: {
        summary: 'DISCERN: Make the hard trade-off, set the rule, cut the excess.',
        patternObservation: 'Decisive clarity creates instant momentum by removing doubt.',
        reflectionQuestion: 'What one clear standard will simplify every choice?',
      },
      orange: {
        summary: 'TIMING: Cultivate patience, build energy, strike when ripe.',
        patternObservation: 'Align with the natural wave rather than swimming against current.',
        reflectionQuestion: 'How will you know the exact instant the window opens?',
      },
      red: {
        summary: 'ACT: Commit completely, take the irreversible step, execute.',
        patternObservation: 'Action creates its own gravity and illuminates the next step.',
        reflectionQuestion: 'What bold action will permanently alter the status quo?',
      },
    },
  }

  const defaultAnalysis = {
    summary: `${color.name} in ${position.name}: Focus on ${color.state.toLowerCase()} within this domain.`,
    patternObservation: `${color.description}`,
    reflectionQuestion: color.question,
  }

  return analysisMatrix[position.id]?.[color.id] || defaultAnalysis
}

/**
 * Synthesizes the overall pattern from the revealed 8 mirrors
 */
export function synthesizePattern(
  mirrors: MirrorResult[],
  keyColor: StateColor
): PatternSynthesis {
  const blockResult = mirrors.find((m) => m.position.id === 'block')
  const coreResult = mirrors.find((m) => m.position.id === 'core')
  const actionResult = mirrors.find((m) => m.position.id === 'action')

  const blockColor = blockResult?.color || STATE_COLORS.red
  const coreColor = coreResult?.color || STATE_COLORS.purple
  const currentAction = actionResult?.color || STATE_COLORS.orange

  // Dynamic synthesis logic
  if (keyColor.id === 'green') {
    return {
      title: `${currentAction.state} → SHIFT`,
      archetype: 'The Structural Realignment',
      summary:
        'You may be pushing a situation that needs adjustment, not more pressure.',
      coreAdvice: 'Do not push harder. Change the structure.',
      deepReflection:
        'What would happen if you changed the method instead of the goal?',
      energeticDynamic: {
        tension: `Current posture (${currentAction.name}) is creating friction against (${blockColor.name} block).`,
        movement: `Pivoting to GREEN (${keyColor.state}) converts resistance into flow.`,
      },
    }
  }

  if (keyColor.id === 'orange') {
    return {
      title: `${currentAction.state} → TIMING`,
      archetype: 'The Strategic Incubation',
      summary:
        'The conditions are ripening in the background. Premature release will exhaust your momentum.',
      coreAdvice: 'Do not force the harvest. Protect the charge.',
      deepReflection:
        'What if waiting is not inaction, but the most aggressive strategy available?',
      energeticDynamic: {
        tension: `Urgency to resolve (${coreColor.name} core) collides with (${blockColor.name} delay).`,
        movement: `Allowing ORANGE (${keyColor.state}) grants timing leverage.`,
      },
    }
  }

  if (keyColor.id === 'red') {
    return {
      title: `${currentAction.state} → ACT`,
      archetype: 'The Decisive Breakthrough',
      summary:
        'All necessary information is already present. Additional thinking is avoidance in disguise.',
      coreAdvice: 'Close the loop. Execute the irreversible step.',
      deepReflection:
        'What decision are you waiting for permission to make?',
      energeticDynamic: {
        tension: `Over-processing in (${blockColor.name}) stalls the clear signal of (${coreColor.name}).`,
        movement: `Direct RED (${keyColor.state}) cuts through ambiguity.`,
      },
    }
  }

  if (keyColor.id === 'white') {
    return {
      title: `${currentAction.state} → RELEASE`,
      archetype: 'The Sacred Reset',
      summary:
        'You are carrying weight from a chapter that is already finished.',
      coreAdvice: 'Empty the vessel. Clear the slate before writing anew.',
      deepReflection:
        'What are you afraid will happen if you simply put this down?',
      energeticDynamic: {
        tension: `Maintaining old commitments (${blockColor.name}) dilutes your capacity.`,
        movement: `WHITE (${keyColor.state}) restores sovereign freedom.`,
      },
    }
  }

  if (keyColor.id === 'purple') {
    return {
      title: `${currentAction.state} → INSIGHT`,
      archetype: 'The Meta-Perspective',
      summary:
        'The answer is not found by reacting inside the game, but by seeing the rules of the board.',
      coreAdvice: 'Step outside the drama. Notice the deeper architecture.',
      deepReflection:
        'If you viewed this from 10 years in the future, what is obvious?',
      energeticDynamic: {
        tension: `Reactive friction (${blockColor.name}) clouds the baseline reality.`,
        movement: `PURPLE (${keyColor.state}) reclaims intuitive mastery.`,
      },
    }
  }

  if (keyColor.id === 'blue') {
    return {
      title: `${currentAction.state} → VOICE`,
      archetype: 'The Unfiltered Truth',
      summary:
        'The primary bottleneck is unexpressed reality. Direct speech clears what weeks of negotiation cannot.',
      coreAdvice: 'Name what is actually happening. Use precise truth.',
      deepReflection:
        'What is the one sentence you have been afraid to speak plainly?',
      energeticDynamic: {
        tension: `Unspoken dynamics in (${blockColor.name}) obstruct your (${coreColor.name}) intent.`,
        movement: `BLUE (${keyColor.state}) aligns consensus instantly.`,
      },
    }
  }

  if (keyColor.id === 'pink') {
    return {
      title: `${currentAction.state} → JOY`,
      archetype: 'The Soft Opening',
      summary:
        'Excessive rigidity has hardened the situation. Connection and genuine delight will dissolve the barrier.',
      coreAdvice: 'Soften the grip. Welcome ease and emotional truth.',
      deepReflection:
        'How can you bring warmth to the exact place you have built armor?',
      energeticDynamic: {
        tension: `Defensive posturing (${blockColor.name}) chokes organic growth.`,
        movement: `PINK (${keyColor.state}) restores vibrant resonance.`,
      },
    }
  }

  // Yellow default
  return {
    title: `${currentAction.state} → DISCERN`,
    archetype: 'The Razor Criteria',
    summary:
      'Emotional confusion requires intellectual clarity. Set the boundary and eliminate the non-essential.',
    coreAdvice: 'Apply strict criteria. Choose with relentless discipline.',
    deepReflection:
      'What one decision eliminates ten other downstream headaches?',
    energeticDynamic: {
      tension: `Ambiguous standards (${blockColor.name}) paralyze your direction.`,
      movement: `YELLOW (${keyColor.state}) establishes unwavering clarity.`,
    },
  }
}

/**
 * Creates a complete mock reading from question
 */
export function createMockReading(question: string): Reading {
  // Shuffle all 8 colors so each position gets a unique color
  const shuffledColors = shuffleArray(STATE_COLOR_LIST)

  const mirrors: MirrorResult[] = MIRROR_POSITION_LIST.map((pos, index) => {
    const color = shuffledColors[index]
    const analysis = generateMirrorAnalysis(pos, color)
    return {
      position: pos,
      color,
      isRevealed: false,
      analysis,
    }
  })

  const keyResult = mirrors.find((m) => m.position.id === 'key')
  const keyColor = keyResult?.color || shuffledColors[7]
  const pattern = synthesizePattern(mirrors, keyColor)

  return {
    id: `reading_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    question: question.trim() || 'What is the true pattern beneath my current path?',
    createdAt: new Date().toISOString(),
    mirrors,
    key: keyColor,
    pattern,
    isSaved: false,
  }
}
