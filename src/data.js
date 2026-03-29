export const categoryOrder = [
  'cpu',
  'gpu',
  'motherboard',
  'ram',
  'storage',
  'cooling',
  'psu',
  'case',
  'monitor',
  'keyboard',
  'mouse',
  'headset',
];

export function createId(prefix = 'setup') {
  const fallback = Math.random().toString(36).slice(2, 10);
  const uuid = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${fallback}`;
  return `${prefix}-${uuid}`;
}

export function createGear() {
  return Object.fromEntries(categoryOrder.map((category) => [category, '']));
}

export function createEmptyProfile(defaultName = 'Untitled Setup') {
  return {
    id: createId(),
    name: defaultName,
    owner: '',
    tagline: '',
    notes: '',
    gear: createGear(),
  };
}

export function hydrateProfiles(profiles = []) {
  return profiles.map((profile) => {
    const legacyGear = profile.gear || {};

    return {
      id: profile.id || createId(),
      name: profile.name || '',
      owner: profile.owner || '',
      tagline: profile.tagline || '',
      notes: profile.notes || '',
      gear: {
        ...createGear(),
        ...legacyGear,
        motherboard: legacyGear.motherboard || legacyGear.board || '',
        headset: legacyGear.headset || legacyGear.headphones || '',
      },
    };
  });
}

export function createDemoProfiles(language = 'en') {
  const isSpanish = language === 'es';

  return hydrateProfiles([
    {
      id: createId('demo'),
      name: 'Latency Lab',
      owner: 'Nia Vega',
      tagline: isSpanish ? 'Rig competitivo afinado para FPS y baja latencia' : 'Competitive build tuned for FPS and low latency',
      notes: isSpanish
        ? 'Montado alrededor de un Ryzen 7 7800X3D con memoria rápida y una RTX 4080 SUPER para mantener FPS altos y tiempos estables.'
        : 'Built around a Ryzen 7 7800X3D with fast memory and an RTX 4080 SUPER to keep frame times stable in competitive play.',
      gear: {
        cpu: 'AMD Ryzen 7 7800X3D',
        gpu: 'NVIDIA GeForce RTX 4080 SUPER',
        motherboard: 'ASUS ROG Strix X670E-E',
        ram: '32GB DDR5-6000 CL30',
        storage: '2TB WD Black SN850X NVMe',
        cooling: 'Lian Li Galahad II Trinity 360',
        psu: 'Corsair RM1000x Shift',
        case: 'Lian Li O11 Vision Compact',
        monitor: 'ASUS ROG XG27AQMR 300Hz',
        keyboard: 'Wooting 80HE',
        mouse: 'Lamzu Atlantis Mini 4K',
        headset: 'Audeze Maxwell',
      },
    },
    {
      id: createId('demo'),
      name: 'Studio Focus',
      owner: 'Marco Ruiz',
      tagline: isSpanish ? 'PC híbrido para ranked, edición y streaming limpio' : 'Hybrid PC for ranked play, editing, and clean streaming',
      notes: isSpanish
        ? 'Busca equilibrio entre juego a alta tasa, tiempos de render sólidos y un perfil acústico razonable para jornadas largas.'
        : 'Balances high-refresh gaming, reliable render times, and a quieter acoustic profile for long sessions.',
      gear: {
        cpu: 'Intel Core i7-14700K',
        gpu: 'NVIDIA GeForce RTX 4070 Ti SUPER',
        motherboard: 'MSI MPG Z790 Carbon WiFi',
        ram: '64GB DDR5-6400',
        storage: '4TB Samsung 990 PRO NVMe',
        cooling: 'Arctic Liquid Freezer III 360',
        psu: 'Seasonic Vertex GX-1000',
        case: 'Fractal North XL',
        monitor: 'Dell Alienware AW2725DF 360Hz',
        keyboard: 'Keychron Q1 HE',
        mouse: 'Logitech G Pro X Superlight 2',
        headset: 'SteelSeries Arctis Nova Pro Wireless',
      },
    },
    {
      id: createId('demo'),
      name: 'Creator Stack',
      owner: 'Ari Chen',
      tagline: isSpanish ? 'Setup premium para directos, clips y cargas pesadas' : 'Premium stack for live sessions, clips, and heavy workloads',
      notes: isSpanish
        ? 'Pensado para quien quiere jugar, grabar y editar desde la misma máquina sin sacrificar estética ni margen térmico.'
        : 'For creators who want to game, record, and edit on the same machine without sacrificing thermals or presentation.',
      gear: {
        cpu: 'AMD Ryzen 9 9950X',
        gpu: 'NVIDIA GeForce RTX 4090',
        motherboard: 'Gigabyte X870E AORUS Master',
        ram: '96GB DDR5-6400',
        storage: '2TB Crucial T705 + 4TB SN850X',
        cooling: 'NZXT Kraken Elite 360 RGB',
        psu: 'be quiet! Dark Power 13 1000W',
        case: 'Hyte Y70 Touch Infinite',
        monitor: 'LG 32GS95UE',
        keyboard: 'Razer BlackWidow V4 75%',
        mouse: 'Razer Viper V3 Pro',
        headset: 'Beyerdynamic MMX 300 Pro',
      },
    },
  ]);
}
