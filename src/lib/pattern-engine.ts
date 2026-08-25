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

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

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
        summary: '在最深处，这个阶段的旧议题已经完成，你需要彻底归零。',
        patternObservation: '事情的原生动力已经自然竭尽，强行执守只会徒增内耗。',
        reflectionQuestion: '如果允许自己彻底放下所有前提假设，你真正的渴望是什么？',
      },
      purple: {
        summary: '在最深处，这是一次向内看清自我、重建信任的契机。',
        patternObservation: '外界的喧嚣掩盖了直觉。其实你内心深处早就有了确切的答案。',
        reflectionQuestion: '如果不去征求任何人的认可，你的内心直觉告诉你什么？',
      },
      blue: {
        summary: '在最深处，存在一份尚未被坦诚言说的真实需要被表达。',
        patternObservation: '沟通的断层或回避，正在悄悄塑造当下的所有拉扯。',
        reflectionQuestion: '有什么最真实的感受或事实，是你一直推迟说出口的？',
      },
      pink: {
        summary: '在最深处，你的内在渴望一份真实的温度、愉悦与接纳。',
        patternObservation: '理性的算计无法填补情感的空缺，你需要允许温暖流动。',
        reflectionQuestion: '这件事怎样才能让你感到由衷的滋养与喜悦？',
      },
      green: {
        summary: '在最深处，一种顺应变化的结构正在自然酝酿。',
        patternObservation: '原有的刚性轨道已不适用，唯有灵活应变才能打开生机。',
        reflectionQuestion: '在哪个环节稍微调整一下姿态，就能顺势化解当前的阻力？',
      },
      yellow: {
        summary: '在最深处，需要建立极其清晰的标准与理性边界。',
        patternObservation: '模糊与妥协正在稀释你的专注力，必须做出清晰取舍。',
        reflectionQuestion: '哪一个一直犹豫不决的权衡，现在必须果断做下决断？',
      },
      orange: {
        summary: '在最深处，事物的发展受制于时令与能量的自然积蓄。',
        patternObservation: '果实尚在成熟期，急于求成反而会破坏原有的根基。',
        reflectionQuestion: '你能否沉下心来，在后台默默把准备工作做到极致？',
      },
      red: {
        summary: '在最深处，需要雷厉风行、不拖泥带水的决断力。',
        patternObservation: '过度的分析已经演变为拖延，唯有坚决行动能打破僵局。',
        reflectionQuestion: '今天可以立刻踏出的第一步是什么？',
      },
    },
    mind: {
      white: {
        summary: '你的心念渴望极简，希望剔除所有不必要的复杂干扰。',
        patternObservation: '你正在尝试用减法思维来看待现状，剥离多余的杂音。',
        reflectionQuestion: '此刻脑海中有哪些假设是可以立即卸下的？',
      },
      purple: {
        summary: '你的心念处于抽离观察的状态，正在俯瞰全局的运转模式。',
        patternObservation: '你开始跳出当事人的狭隘视角，以宏观视角审视因果。',
        reflectionQuestion: '如果在十年后再回头看当下，你会如何评价现在的困惑？',
      },
      blue: {
        summary: '你的心念集中在逻辑梳理与信息的准确传达上。',
        patternObservation: '你试图寻找最精准的词句来定义当前的处境与诉求。',
        reflectionQuestion: '能否用极其简短的一句话，向对方讲清楚你的真正诉求？',
      },
      pink: {
        summary: '你的心念深受人际感受、安全感与彼此认同的影响。',
        patternObservation: '你在思考决策会给周围人的关系带来怎样的情绪涟漪。',
        reflectionQuestion: '你是否为了迎合他人的舒适，而过度委屈了自己的真实感受？',
      },
      green: {
        summary: '你的心念正在积极寻找替代方案与灵活的迭代切入点。',
        patternObservation: '你不会死守唯一路径，而是在多维度试验不同的可能性。',
        reflectionQuestion: '打破常规思考，当下最意想不到的解法可能是什么？',
      },
      yellow: {
        summary: '你的心念充斥着利弊权衡、数据评估与严谨的推演。',
        patternObservation: '理性主导了一切，但有时也会陷入过度计算的沉思。',
        reflectionQuestion: '你是否在用无休止的数据分析，来逃避直面未知的风险？',
      },
      orange: {
        summary: '你的心念敏锐地感知着时机窗口，权衡着出手的最佳节点。',
        patternObservation: '你深知节奏决定成败，正在等待最具优势的信号。',
        reflectionQuestion: '什么才是真正表明时机成熟的明确信号？',
      },
      red: {
        summary: '你的心念紧绷、充满冲劲，迫不及待想要看到实质性结果。',
        patternObservation: '你对任何迟缓感到焦躁，渴望快速推进、击穿障碍。',
        reflectionQuestion: '你的冲劲是来自清晰的方向，还是来自对停滞的焦虑？',
      },
    },
    emotion: {
      white: {
        summary: '一种想要彻底放松、深呼吸、放下包袱的轻松渴望。',
        patternObservation: '长期紧绷后的疲惫，潜意识中准备好告别过去。',
        reflectionQuestion: '想象自己完全放下这件事时，你的身心是否会感到轻盈？',
      },
      purple: {
        summary: '在表层波澜之下，有一种宁静深沉的笃定感。',
        patternObservation: '一种不被外界动荡所干扰的定力，深谙万物自有节律。',
        reflectionQuestion: '你能否让自己沉浸在这份不被惊扰的内在安宁中？',
      },
      blue: {
        summary: '内心渴望被真正听见、被公正理解与被认可。',
        patternObservation: '未被表达的想法在胸口积聚成一股无形的压抑感。',
        reflectionQuestion: '如果放下防御与怨气，你最想温柔说出的心里话是什么？',
      },
      pink: {
        summary: '对温暖、被关怀与心灵归属感的细腻渴望。',
        patternObservation: '情感层面的敏感度提高，格外在意彼此之间的支持与陪伴。',
        reflectionQuestion: '如何先给予自己这份无条件的关怀与接纳？',
      },
      green: {
        summary: '对新事物、新环境与新可能性的跃跃欲试。',
        patternObservation: '停滞会让你感到窒息，你渴望流动与充满生机的探索。',
        reflectionQuestion: '做一件什么样的小尝试，能立即重新点燃你的生活热情？',
      },
      yellow: {
        summary: '对犯错或做出不可逆选择的隐约担忧。',
        patternObservation: '对确定性的渴求，让情绪在做决定前容易出现摇摆。',
        reflectionQuestion: '如果最坏的情况发生，你其实完全有能力应对，对吗？',
      },
      orange: {
        summary: '在急迫感与不得不等待之间拉扯的微躁感。',
        patternObservation: '犹如起跑线上等待发令枪的运动员，满怀蓄势待发的张力。',
        reflectionQuestion: '能否将这份躁动转化为深度的内功修炼与准备？',
      },
      red: {
        summary: '一股强烈的决心、冲劲与按捺不住的意志力。',
        patternObservation: '旺盛的行动能量，需要找到一个精准的发力点。',
        reflectionQuestion: '你的发力点是在解决实质问题，还是在盲目释放焦虑？',
      },
    },
    action: {
      white: {
        summary: '主动暂停非必要事务，给自己的行动日程做断舍离。',
        patternObservation: '战术性收缩与休整，为核心蓄积宝贵的精力储备。',
        reflectionQuestion: '本周你可以从日程表里直接删除哪项消耗性的事项？',
      },
      purple: {
        summary: '放缓动作，先做深度的调查与复盘，而后再行布局。',
        patternObservation: '以观察和诊断为主，避免在盲目行动中消耗资源。',
        reflectionQuestion: '在动手之前，哪个底层问题必须先弄清楚？',
      },
      blue: {
        summary: '主动发起对话、沟通对齐、输出文案或提出倡议。',
        patternObservation: '通过信息的流通与坦诚的交流来重塑外部局面。',
        reflectionQuestion: '你的沟通是否直奔主题，没有任何多余的掩饰？',
      },
      pink: {
        summary: '倾注精力维护信任、照顾伙伴情绪、营造融洽氛围。',
        patternObservation: '以柔性连接为先导，为长期合作奠定坚实的情感底色。',
        reflectionQuestion: '在关注人情的同时，实际的项目目标是否保持推进？',
      },
      green: {
        summary: '小步快跑、快速迭代，不断根据反馈微调动作。',
        patternObservation: '保持高度的敏捷与适应性，绝不死板僵化。',
        reflectionQuestion: '最近哪一次小微调带来了最显著的正向效果？',
      },
      yellow: {
        summary: '梳理流程、建立规则、设立核对清单与量化标准。',
        patternObservation: '用机制和系统来替代随意性，防范潜在的漏洞。',
        reflectionQuestion: '你的系统是在赋能高效，还是陷入了繁琐的流程？',
      },
      orange: {
        summary: '打磨技能、积累弹药、做好一切前期铺垫。',
        patternObservation: '在后台把根扎深，等待拐点出现的一击即中。',
        reflectionQuestion: '在绿灯亮起之前，你还欠缺哪项关键的准备？',
      },
      red: {
        summary: '全面冲锋、果断破局，推进决定性的实质成果。',
        patternObservation: '以极高的执行速度压制不确定性，勇于承担推进责任。',
        reflectionQuestion: '高速推进的同时，是否忽略了关键细节的善后？',
      },
    },
    relation: {
      white: {
        summary: '某种旧有的协作关系或相处模式正在自然淡出。',
        patternObservation: '体面地放手，允许彼此走向各自新的生活轨迹。',
        reflectionQuestion: '谁的期望是你应当礼貌地从心里卸下的？',
      },
      purple: {
        summary: '对方如同一面镜子，映照出你自身未曾察觉的心念模式。',
        patternObservation: '人际中的摩擦其实是你与自我内在模式的对话。',
        reflectionQuestion: '对方的行为揭示了你自己身上哪种未被觉察的执念？',
      },
      blue: {
        summary: '双方存在信息不对称或未被明说的隐形契约。',
        patternObservation: '未经确认的主观猜忌，导致了协作上的隔阂。',
        reflectionQuestion: '有哪些关键共识需要白纸黑字地彻底说清楚？',
      },
      pink: {
        summary: '人际场域充满温情与默契，是彼此赋能的良性循环。',
        patternObservation: '真诚的善意与信任能够融化一切所谓的难题。',
        reflectionQuestion: '如何放下戒备，拥抱更加深入的互信与共创？',
      },
      green: {
        summary: '彼此的角色与分工正在经历重塑与动态演变。',
        patternObservation: '旧有的互动框架已不再合适，新的平衡正在建立。',
        reflectionQuestion: '对于这段关系，怎样才是当下更健康的新形态？',
      },
      yellow: {
        summary: '权责明确、公事公办的理性专业关系。',
        patternObservation: '清晰的边界让合作高效运转，避免情面纠缠。',
        reflectionQuestion: '在哪里需要坚决捍卫你的原则与边界，无须道歉？',
      },
      orange: {
        summary: '等待对方的确认、反馈或准备就绪。',
        patternObservation: '对方有其自身的节奏，强求往往适得其反。',
        reflectionQuestion: '在对方明确态度之前，你能否先保持自己的独立与定力？',
      },
      red: {
        summary: '直接的碰撞或竞争张力，倒逼你迅速成长与独立。',
        patternObservation: '外部的挑战正在锤炼你的意志，迫使你拿出真章。',
        reflectionQuestion: '如何以从容的力量去应对挑战，而不是陷入情绪对抗？',
      },
    },
    reality: {
      white: {
        summary: '外部环境呈现出罕见的空白期，正等待新的构建。',
        patternObservation: '旧有格局已经瓦解，留出了一片可以自由书写的白纸。',
        reflectionQuestion: '面对这片崭新的空间，你打算种下什么样的新种子？',
      },
      purple: {
        summary: '现实信号隐晦复杂，需要透过表象看清底层趋势。',
        patternObservation: '仅看表面数据容易被误导，必须洞察深层逻辑。',
        reflectionQuestion: '有哪些被大众普遍忽视的关键微弱信号？',
      },
      blue: {
        summary: '外部环境信息嘈杂，充斥着各种纷扰的言论与意见。',
        patternObservation: '信息过载掩盖了核心事实，需要主动降噪。',
        reflectionQuestion: '哪些外部评价与建议是你应当坚决屏蔽的？',
      },
      pink: {
        summary: '外部氛围温和友好，整体环境具备良好的包容度。',
        patternObservation: '土壤温润，极具人情味与创意孵化的空间。',
        reflectionQuestion: '如何善用环境中现存的善意与支持力量？',
      },
      green: {
        summary: '外部条件瞬息万变，高度犒赏随机应变者。',
        patternObservation: '固守陈规必受挫折，唯有灵活变通者能够乘风破浪。',
        reflectionQuestion: '如何让你的方案弹性提升一倍，随时能够灵活转向？',
      },
      yellow: {
        summary: '时间、预算或客观规则存在严苛的硬性限制。',
        patternObservation: '必须在坚硬的现实框架内跳舞，不可抱有侥幸。',
        reflectionQuestion: '如何将现有的客观限制，转化为激发创造力的杠杆？',
      },
      orange: {
        summary: '外部大环境正处于蓄势与过渡期，整体节奏较缓。',
        patternObservation: '大齿轮运转缓慢，强行逆势推进只会事倍功半。',
        reflectionQuestion: '如何顺应慢周期，把精力聚焦在打磨内核上？',
      },
      red: {
        summary: '窗口期极度紧迫，要求立刻做出实质性响应。',
        patternObservation: '犹豫不决将付出巨大代价，行动比完美更为迫切。',
        reflectionQuestion: '如果在未来24小时内立刻行动，最有效的一步是什么？',
      },
    },
    block: {
      white: {
        summary: '对沉没成本或旧有身份依依不舍，迟迟不肯放手。',
        patternObservation: '抱着昨天的经验或投入不放，阻碍了新周期的开启。',
        reflectionQuestion: '你还在紧抓什么早已失去生命力的事情？',
      },
      purple: {
        summary: '过度思辨与内耗，用空想代替了真实的实践。',
        patternObservation: '陷入无休止的思想循环，迟迟不敢触碰真实的现实世界。',
        reflectionQuestion: '哪件事你其实早已想得清清楚楚，只是不敢去体验？',
      },
      blue: {
        summary: '自我言语审查或息事宁人的沉默，回避了核心冲突。',
        patternObservation: '为了维持表面和平而吞下真实想法，导致误会加深。',
        reflectionQuestion: '为了维持短暂的表面和谐，你正在付出怎样的长远代价？',
      },
      pink: {
        summary: '过度渴望外界的认同与赞许，害怕被拒绝或冷落。',
        patternObservation: '将自我价值寄托在他人的反应上，丢失了内在的主导权。',
        reflectionQuestion: '你究竟还在试图获得谁的允许或夸奖？',
      },
      green: {
        summary: '频繁变换方向与目标，缺乏坚韧的深度扎根。',
        patternObservation: '用“探索新方向”作为逃避深度承诺与攻坚克难的借口。',
        reflectionQuestion: '你是在真正优化调整，还是在遇到困难时习惯性逃跑？',
      },
      yellow: {
        summary: '过度追求百分之百的确定性，陷入分析瘫痪。',
        patternObservation: '对微小风险过分敏感，导致决策速度极其迟缓。',
        reflectionQuestion: '即使只有70%的把握，你是否愿意勇敢启程？',
      },
      orange: {
        summary: '以“等待最佳时机”为幌子的被动拖延。',
        patternObservation: '消极等待让原本的大好势头在无声中消耗殆尽。',
        reflectionQuestion: '这真的是客观时机未到，还是你内心对失败的恐惧？',
      },
      red: {
        summary: '对已经锁死的门用蛮力硬撞，产生巨大的反作用力。',
        patternObservation: '固执地用硬碰硬的方式对抗现实，导致身心俱疲。',
        reflectionQuestion: '你在哪里是在与客观规律硬刚，而不是看清规律顺势而行？',
      },
    },
    key: {
      white: {
        summary: '释放（白）：彻底清空旧账，归零重置，一身轻松地重新出发。',
        patternObservation: '最高的智慧是知道何时体面地离场与放下。',
        reflectionQuestion: '如果卸下所有过去的心理包袱，你最想迈向何方？',
      },
      purple: {
        summary: '觉察（紫）：抽离当前剧情，从更高的维度洞察全局规律。',
        patternObservation: '看清模式本身，就能瞬间化解蛮力无法解决的难题。',
        reflectionQuestion: '你内心那个最清醒的旁观者，此刻给出的建议是什么？',
      },
      blue: {
        summary: '表达（蓝）：坦诚、精准、不带情绪地讲出客观事实与真实心声。',
        patternObservation: '一次毫无保留的真实对话，胜过数月的猜忌与周旋。',
        reflectionQuestion: '你今天可以勇敢讲出的最清晰直接的一句话是什么？',
      },
      pink: {
        summary: '愉悦（粉）：找回内心的热爱、温度与轻盈，用柔软化解僵局。',
        patternObservation: '当你能从过程中获得滋养时，外界的阻力会自然消解。',
        reflectionQuestion: '如何让当下的推进过程变得温暖且令人享受？',
      },
      green: {
        summary: '转化（绿）：调转方向与结构，改变方法而非强攻目标。',
        patternObservation: '方向微调5度，未来的航线就能抵达完全不同的风景。',
        reflectionQuestion: '如果改变的是做事的方法而不是目标本身，你会怎么做？',
      },
      yellow: {
        summary: '明辨（黄）：设立明确的取舍标准，砍掉冗余，理性聚焦。',
        patternObservation: '果断的边界能够消除所有犹疑，立即带来坚定的动能。',
        reflectionQuestion: '设立哪一条清晰的原则，能让你当下的选择变得极度简单？',
      },
      orange: {
        summary: '时机（橙）：耐住性子、深度蓄势，等待势能汇聚的最佳窗口。',
        patternObservation: '顺应自然的波浪，远胜于逆水拼命划桨。',
        reflectionQuestion: '当关键的时机窗口打开时，你将如何果断出手？',
      },
      red: {
        summary: '决断（红）：全心投入，走出关键的一步，用执行力定乾坤。',
        patternObservation: '唯有行动能创造真实的引力，照亮接下来的道路。',
        reflectionQuestion: '哪一项果敢的行动，能从根本上重塑眼下的局面？',
      },
    },
  }

  const defaultAnalysis = {
    summary: `${position.name}位置映照出【${color.name}·${color.state}】状态。`,
    patternObservation: color.description,
    reflectionQuestion: color.question,
  }

  return analysisMatrix[position.id]?.[color.id] || defaultAnalysis
}

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

  if (keyColor.id === 'green') {
    return {
      title: `${currentAction.state} → 转化`,
      archetype: '结构重组型',
      summary: '你可能正对一个需要灵活调转方向的事项，施加了过多的硬碰硬压力。',
      coreAdvice: '不要用力硬推，改换解决结构。',
      deepReflection: '如果改变的是达成的方法而不是最终目标，结果会怎样？',
      energeticDynamic: {
        tension: `当前的推进动作（${currentAction.name}）正遭遇（${blockColor.name}）层面的摩擦。`,
        movement: `转向【绿·转化】，将阻力顺势转化为流动的生机。`,
      },
    }
  }

  if (keyColor.id === 'orange') {
    return {
      title: `${currentAction.state} → 时机`,
      archetype: '战略蓄势型',
      summary: '外部客观条件仍在后台酝酿，急于求成反而会过早耗尽宝贵势能。',
      coreAdvice: '不要强行收割，静候果实成熟。',
      deepReflection: '如果等待不是被动懈怠，而是此刻最具杀伤力的策略呢？',
      energeticDynamic: {
        tension: `急于推进（${coreColor.name}）的冲动与（${blockColor.name}）的客观滞后产生冲突。`,
        movement: `启动【橙·时机】，用耐性换取未来的绝对主动权。`,
      },
    }
  }

  if (keyColor.id === 'red') {
    return {
      title: `${currentAction.state} → 决断`,
      archetype: '果敢破局型',
      summary: '所需的关键信息已全部就绪，继续犹豫只是变相的拖延。',
      coreAdvice: '闭合思考回路，迈出不可逆的关键一步。',
      deepReflection: '你究竟还在等待谁的允许，才肯真正做出这个决定？',
      energeticDynamic: {
        tension: `在（${blockColor.name}）上的过度思虑，正在稀释（${coreColor.name}）的清晰信号。`,
        movement: `启动【红·决断】，用坚定的执行斩断一切犹疑。`,
      },
    }
  }

  if (keyColor.id === 'white') {
    return {
      title: `${currentAction.state} → 释放`,
      archetype: '归零清空型',
      summary: '你正背负着已经走完生命周期的旧包袱与旧期待。',
      coreAdvice: '清空容器，先给内心留白，方能从容书写新篇。',
      deepReflection: '你究竟在害怕什么，以至于迟迟不肯彻底放手？',
      energeticDynamic: {
        tension: `固守陈旧的承诺（${blockColor.name}），严重透支了当下的心力。`,
        movement: `启动【白·释放】，卸下重负，重获内在自由。`,
      },
    }
  }

  if (keyColor.id === 'purple') {
    return {
      title: `${currentAction.state} → 觉察`,
      archetype: '高维洞察型',
      summary: '答案不在棋局内的盲目对抗，而在跳出棋盘、看清整张棋盘的规则。',
      coreAdvice: '抽离剧情旋涡，静观底层规律。',
      deepReflection: '如果以十年后的视角审视此刻，什么其实早就显而易见？',
      energeticDynamic: {
        tension: `应激式的对抗（${blockColor.name}）遮蔽了原初的真实意图。`,
        movement: `启动【紫·觉察】，找回直觉的定力与智慧。`,
      },
    }
  }

  if (keyColor.id === 'blue') {
    return {
      title: `${currentAction.state} → 表达`,
      archetype: '坦诚对齐型',
      summary: '当前最大的瓶颈在于未被言说的真实。一次清晰的对话胜过数周的周旋。',
      coreAdvice: '直面事实，用精准而平静的语言讲出真相。',
      deepReflection: '你一直推迟说出口的那句最真实的话是什么？',
      energeticDynamic: {
        tension: `未能言明的情绪（${blockColor.name}）阻碍了彼此的共识建立。`,
        movement: `启动【蓝·表达】，打通信息孤岛，迅速校准方向。`,
      },
    }
  }

  if (keyColor.id === 'pink') {
    return {
      title: `${currentAction.state} → 愉悦`,
      archetype: '温和滋养型',
      summary: '过度的紧绷与防备让局面陷入僵死，真诚的情感流动与喜悦能融化壁垒。',
      coreAdvice: '柔化防备，从感受与滋养中获取真正的动力。',
      deepReflection: '如何在你筑起高墙的地方，重新注入一份轻盈与温度？',
      energeticDynamic: {
        tension: `戒备式的防御（${blockColor.name}）扼杀了原本充满生机的连接。`,
        movement: `启动【粉·愉悦】，让心回到温润与享受的状态。`,
      },
    }
  }

  // Yellow default
  return {
    title: `${currentAction.state} → 明辨`,
    archetype: '精准理性型',
    summary: '混乱的局面急需理性的梳理。立下清晰的标准，剔除一切冗余干扰。',
    coreAdvice: '明确评估标准，做出坚决理性的取舍。',
    deepReflection: '做下哪一个决定，能够立即消除后续十几个不必要的麻烦？',
    energeticDynamic: {
      tension: `模糊的边界与标准（${blockColor.name}），让你的方向陷入摇摆。`,
      movement: `启动【黄·明辨】，以清晰的标准定夺一切。`,
    },
  }
}

export function createMockReading(question: string): Reading {
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
    question: question.trim() || '我当下的真实状态与破局方向是什么？',
    createdAt: new Date().toISOString(),
    mirrors,
    key: keyColor,
    pattern,
    isSaved: false,
  }
}
