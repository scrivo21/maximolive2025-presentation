const imageModules = import.meta.glob('./assets/slide*.png', { eager: true, import: 'default' });

const imageImports = Object.entries(imageModules).reduce((acc, [path, src]) => {
  const match = path.match(/slide(\d+)\.png$/);
  if (match) {
    acc[Number(match[1])] = src;
  }
  return acc;
}, {});

const slides = [
  {
    section: 'Opening',
    title: 'Maximo Edge Intelligence',
    line: 'Intelligent Maximo Integration:<br />Edge AI That Works Where Your Assets Do',
    subtitle: 'Shane Scriven - Founder+Managing Director SAS-AM',
    hero: true,
  },
  {
    section: 'The Setup',
    title: 'Reframing Maximo',
    line: 'Your million-dollar Maximo system might be your most expensive filing cabinet.',
    visual: 'Overstuffed filing cabinet blended with a Maximo dashboard screenshot.',
  },
  {
    section: 'The Setup',
    title: 'Data Waste',
    line: 'Every sensor reading in your CMMS represents a missed opportunity.',
    visual: 'Stream of sensor data falling into a drain labelled “unused”.',
  },
  {
    section: 'The Setup',
    title: 'Collective Intelligence',
    line: 'What if your assets could learn from each other without sharing secrets?',
    visual: 'Connected network of trams exchanging light beams while data stays local.',
  },
  {
    section: 'The Problem',
    title: 'Siloed Failures',
    line: 'Bus 120 breaks down, but Bus 89 learned nothing from it.',
    visual: 'Broken bus isolated from others still running.',
  },
  {
    section: 'The Problem',
    title: 'Depot Silos',
    line: 'Your condition monitoring data sits in silos across sites.',
    visual: 'Multiple depots each guarding their own server racks.',
  },
  {
    section: 'The Problem',
    title: 'Latency Limits',
    line: 'Cloud analytics can\'t make split-second maintenance decisions.',
    visual: 'Cloud icon struggling to reach a flashing warning light.',
  },
  {
    section: 'The Problem',
    title: 'Privacy Lockdown',
    line: 'Privacy concerns keep your best asset data locked away.',
    visual: 'Padlock overlaid on maintenance telemetry lines.',
  },
  {
    section: 'The Solution',
    title: 'Edge Federated ML',
    line: 'Edge federated ML: Intelligence at the asset, learning across the fleet.',
    visual: 'Distributed nodes sharing model weights via arrows.',
  },
  {
    section: 'The Solution',
    title: 'Local Training',
    line: 'Train the model where the asset lives, share the learning everywhere.',
    visual: 'Tram with onboard processor broadcasting anonymised insights.',
  },
  {
    section: 'The Solution',
    title: 'Zero Leakage',
    line: 'Local decisions, global intelligence, zero data exposure.',
    visual: 'Shielded data packets with outward arrows.',
  },
  {
    section: 'The Solution',
    title: 'Pantograph Wisdom',
    line: 'Your pantograph learns from every other pantograph without leaving home.',
    visual: 'Pantographs linked in a neural network pattern.',
  },
  {
    section: 'The Solution',
    title: 'Real-Time Detection',
    line: 'Real-time anomaly detection where milliseconds matter.',
    visual: 'Oscilloscope trace highlighting an anomaly with a millisecond timer.',
  },
  {
    section: 'The Solution',
    title: 'Assets as Scientists',
    line: 'Edge computing makes every asset a data scientist.',
    visual: 'Assets wearing “data scientist” badges analysing charts.',
  },
  {
    section: 'Implementation',
    title: 'Pilot Focus',
    line: 'Start small: One asset type, one failure mode, one depot.',
    visual: 'Spotlight highlighting a single asset in a depot.',
  },
  {
    section: 'Implementation',
    title: 'Speaking Maximo',
    line: 'Edge devices speak Maximo\'s language: REST APIs, MQTT, and message queues.',
    visual: 'Protocol icons linking edge devices to Maximo logo.',
  },
  {
    section: 'Implementation',
    title: 'Workflow Friendly',
    line: 'Integration patterns that don\'t break your existing workflows.',
    visual: 'Puzzle pieces fitting seamlessly into a process diagram.',
  },
  {
    section: 'The Future',
    title: 'Self-Writing Schedules',
    line: 'Maintenance schedules that write themselves based on fleet wisdom.',
    visual: 'Calendar auto-populating maintenance tasks.',
  },
  {
    section: 'The Future',
    title: 'Intelligent Era',
    line: 'Welcome to the era of truly intelligent asset management.',
    visual: 'Smart city transit network glowing with connected intelligence.',
  },
  {
    section: 'Connect',
    title: 'Let\'s Connect',
    line: 'Ready to Transform Your Asset Management?',
    hero: true,
    cta: true,
  },
];

const slidesWithAssets = slides.map((slide, index) => {
  const slideNumber = index + 1;
  const asset = imageImports[slideNumber] ?? null;
  const imageAlt = slide.imageAlt ?? `Slide ${slideNumber} visual concept placeholder.`;

  if (slide.hero) {
    return {
      ...slide,
      image: slide.image ?? null,
      imageAlt: slide.imageAlt ?? imageAlt,
    };
  }

  return {
    ...slide,
    image: asset,
    imageAlt,
  };
});

export default slidesWithAssets;
