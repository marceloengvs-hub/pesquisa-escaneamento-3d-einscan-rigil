export interface AnatomicalPhoto {
  id: string;
  view: string;
  caption: string;
  description: string;
  angleTag: string;
  aspectRatio: string;
  fallbackColor: string;
  fileName: string;
  url: string;
}

export interface ScanningParameters {
  mode: string;
  workingDistance: string;
  resolution: string;
  alignmentMethod: string;
  pointsAcquired: string;
  meshTriangles: string;
  processingTime: string;
  lightSource: string;
  laserLinesOrPattern: string;
  framesInTotal?: string;
  pointsInTotal?: string;
  markersInTotal?: string;
  frameRate?: string;
}

export interface SpecimenData {
  id: string;
  title: string;
  scientificName: string;
  category: string;
  organSystem: string;
  summary: string;
  importance: string;
  anatomicalLandmarks: string[];
  parameters: ScanningParameters;
  photos: AnatomicalPhoto[];
  videoUrl: string;
  videoFileName: string;
  gifUrl?: string;
  gifFileName?: string;
  resultDetails: {
    format: string;
    fileSizeEstimate: string;
    slicerPlate: string;
    meshIntegrity: string;
    inspectionVerdict: string;
    keyChallengesSolved: string[];
  };
  sampleTag: string;
}

export const EQUIPMENT_ASSETS = {
  softwareSplash: {
    fileName: "Tela_Software_v.1.3.2-7.png",
    url: "/Tela_Software_v.1.3.2-7.png",
    caption: "Interface oficial do software EXScan Pro v1.3.2-7 com sistema de calibração óptica e rastreamento pronto"
  },
  scannerSpecs: {
    fileName: "Especificações_Scanner_Rigil.png",
    url: "/Especificações_Scanner_Rigil.png",
    caption: "Ficha técnica oficial de engenharia do Scanner 3D EinScan Rigil (SHINING 3D)"
  }
};

export const SPECIMENS: SpecimenData[] = [
  {
    id: "fragmento-temporal",
    title: "Fragmento Ósseo Craniano (Osso Temporal)",
    scientificName: "Os temporale · Pars petrosa, mastoidea et squamosa",
    category: "Neurocrânio / Caixa Craniana",
    organSystem: "Sistema Esquelético Craniofacial",
    sampleTag: "Amostra 01 (Peça 01)",
    videoUrl: "/Peca_01.mp4",
    videoFileName: "Peça_01.mp4",
    gifUrl: "/Peca_01.gif",
    gifFileName: "Peça_01.gif",
    summary: "Fragmento craniano de alta complexidade microanatômica, compreendendo a porção petrosa (rochedo), processo mastóideo, meato acústico externo e raiz do arco zigomático. Apresenta superfícies endocranianas onduladas e trabéculas ósseas abertas.",
    importance: "Espécime chave para a antropologia física, acústica anatômica e cirurgia da base do crânio. Sua geometria desafiadora testa os limites da resolução óptica do EinScan Rigil em cavidades acústicas e microporosidades.",
    anatomicalLandmarks: [
      "Porus acusticus externus (Orifício do meato acústico externo)",
      "Processo mastóideo com relevos de inserção muscular (esternocleidomastóideo)",
      "Incisura mastóidea (ranhura digástrica)",
      "Porção petrosa (superfície endocraniana com sulco do seio sigmóide)",
      "Eminência articular e raiz transversa do processo zigomático",
      "Trabéculas ósseas internas expostas nas áreas de fratura post-mortem"
    ],
    parameters: {
      mode: "Laser HD (Micro-detalhe)",
      workingDistance: "210 mm (Faixa ideal: 170 ~ 550 mm)",
      resolution: "0,05 mm (Resolução máxima do modo HD)",
      alignmentMethod: "Híbrido (Multi-ângulo / Fusão de nuvens)",
      pointsAcquired: "5.560.872 pontos",
      meshTriangles: "940.000 triângulos",
      processingTime: "8 min 30 seg",
      lightSource: "Laser Azul de Alta Resolução",
      laserLinesOrPattern: "Linhas laser ultradensas paralelas e cruzadas",
      framesInTotal: "22.729",
      pointsInTotal: "5.560.872",
      markersInTotal: "30",
      frameRate: "0"
    },
    photos: [
      {
        id: "temp-p01",
        view: "Vista Endocraniana / Face Interna",
        caption: "Superfície endocraniana interna e relevos vasculares (Foto Real do Espécime Peça_01)",
        description: "Morfologia óssea interna em contato com a fossa craniana posterior e relevos suturais.",
        angleTag: "Endocraniana",
        aspectRatio: "4:3",
        fallbackColor: "from-stone-900 to-slate-900",
        fileName: "Peça_01.jpg",
        url: "/Peça_01.jpg"
      },
      {
        id: "temp-p001",
        view: "Vista Endocraniana Petrosa / Poro Acústico",
        caption: "Porção petrosa (rochedo) e sulco vascular meníngeo (Foto Real do Espécime Peça_001)",
        description: "Detalhe do poro acústico interno e arquitetura petrosa densa para proteção auditiva.",
        angleTag: "Petrosa",
        aspectRatio: "4:3",
        fallbackColor: "from-stone-900 to-slate-900",
        fileName: "Peça_001.jpg",
        url: "/Peça_001.jpg"
      },
      {
        id: "temp-p0001",
        view: "Vista Inferior / Base e Fossa Mandibular",
        caption: "Face inferior com incisura mastóidea e fossa mandibular (Foto Real do Espécime Peça_0001)",
        description: "Relevos anatômicos da base do crânio com transição para o processo mastóideo.",
        angleTag: "Inferior",
        aspectRatio: "4:3",
        fallbackColor: "from-stone-900 to-slate-900",
        fileName: "Peça_0001.jpg",
        url: "/Peça_0001.jpg"
      },
      {
        id: "temp-p00001",
        view: "Vista Superior / Porção Escamosa",
        caption: "Superfície externa da escama temporal e borda sutural (Foto Real do Espécime Peça_00001)",
        description: "Lâmina óssea delgada com traços de suturas cranianas e curvatura lateral da calvária.",
        angleTag: "Superior",
        aspectRatio: "4:3",
        fallbackColor: "from-stone-900 to-slate-900",
        fileName: "Peça_00001.jpg",
        url: "/Peça_00001.jpg"
      },
      {
        id: "temp-p000001",
        view: "Vista Lateral / Exocraniana",
        caption: "Meato acústico externo, processo mastóideo e relevos musculares (Foto Real do Espécime Peça_000001)",
        description: "Detalhe da abertura do conduto auditivo externo e textura cortical rugosa do processo mastóideo.",
        angleTag: "Lateral",
        aspectRatio: "4:3",
        fallbackColor: "from-stone-900 to-slate-900",
        fileName: "Peça_000001.jpg",
        url: "/Peça_000001.jpg"
      }
    ],
    resultDetails: {
      format: "STL Watertight com malha adaptativa",
      fileSizeEstimate: "48.2 MB",
      slicerPlate: "Creality Smooth PEI Plate",
      meshIntegrity: "Malha manifold de altíssima definição topológica",
      inspectionVerdict: "Reconstrução 3D fidedigna do canal acústico sem artefatos de ruído reflexivo.",
      keyChallengesSolved: [
        "Superação de oclusão de feixe laser no meato auditivo por varredura multiangular",
        "Captação precisa das rugosidades mastóideas sem suavização excessiva de detalhe",
        "Geração de arquivo estanque para impressão 3D em resina bio-compatível"
      ]
    }
  },
  {
    id: "atlas-c1",
    title: "Vértebra Cervical C1 (Atlas)",
    scientificName: "Atlas · Vertebra cervicalis I",
    category: "Esqueleto Axial / Coluna Vertebral",
    organSystem: "Sistema Osteoarticular",
    sampleTag: "Amostra 02 (Peça 02)",
    videoUrl: "/Peca_02.mp4",
    videoFileName: "Peça_02.mp4",
    gifUrl: "/Peca_02.gif",
    gifFileName: "Peça_02.gif",
    summary: "Primeira vértebra cervical humana responsável por sustentar a base craniana. Destaca-se morfologicamente pela ausência de corpo vertebral verdadeiro e de processo espinhoso, constituindo um anel ósseo com massas laterais robustas e facetas articulares para os côndilos occipitais.",
    importance: "Fundamental para o estudo de antropologia forense e biomecânica craniovertebral. A preservação digital permite mensurar as dimensões do canal vertebral e o ângulo das facetas articulares sem contato físico abrasivo.",
    anatomicalLandmarks: [
      "Fácies articulares superiores (côncavas e ovais, para articulação com os côndilos do osso occipital)",
      "Fácies articulares inferiores (circulares e planas, para articulação com o áxis)",
      "Arco anterior com tubérculo anterior e fóvea dentis (superfície de contato para o dente do áxis)",
      "Arco posterior com tubérculo posterior e sulco para artéria vertebral",
      "Forame vertebral amplo (circunferência para passagem do bulbo/medula)",
      "Forames transversários nas massas laterais"
    ],
    parameters: {
      mode: "Laser HD (Luz Azul)",
      workingDistance: "240 mm (Faixa ideal: 170 ~ 550 mm)",
      resolution: "0,05 mm",
      alignmentMethod: "Características Geométricas (Sem marcadores físicos)",
      pointsAcquired: "2.140.500 pontos",
      meshTriangles: "482.300 triângulos",
      processingTime: "4 min 12 seg",
      lightSource: "Laser Azul de Alta Densidade",
      laserLinesOrPattern: "Linhas laser cruzadas de alta precisão",
      framesInTotal: "11.840",
      pointsInTotal: "2.140.500",
      markersInTotal: "0",
      frameRate: "0"
    },
    photos: [
      {
        id: "c1-p02",
        view: "Vista Superior (Cranial)",
        caption: "Facetas articulares superiores côncavas e arco anterior (Foto Real do Espécime Peça_02)",
        description: "Exibe a concavidade das massas laterais que recebem os côndilos occipitais e o canal medular sem deformação.",
        angleTag: "Cranial",
        aspectRatio: "4:3",
        fallbackColor: "from-amber-950/40 to-slate-900",
        fileName: "Peça_02.jpg",
        url: "/Peça_02.jpg"
      },
      {
        id: "c1-p002",
        view: "Vista Inferior (Caudal)",
        caption: "Facetas articulares inferiores planas e tubérculo posterior (Foto Real do Espécime Peça_002)",
        description: "Superfície de apoio que se articula suavemente com as facetas superiores do Áxis (C2).",
        angleTag: "Caudal",
        aspectRatio: "4:3",
        fallbackColor: "from-amber-900/30 to-slate-900",
        fileName: "Peça_002.jpg",
        url: "/Peça_002.jpg"
      }
    ],
    resultDetails: {
      format: "STL Watertight (Estanque)",
      fileSizeEstimate: "24.6 MB",
      slicerPlate: "Creality Smooth PEI Plate",
      meshIntegrity: "100% fechada, 0 vértices isolados, normais corrigidas",
      inspectionVerdict: "Geometria perfeita do anel ósseo com preservação dos sulcos arteriais finos.",
      keyChallengesSolved: [
        "Digitalização de cavidade central profunda (forame) sem perda de alinhamento",
        "Preservação da curvatura delicada do sulco da artéria vertebral",
        "Ausência de necessidade de adesivos marcadores em espécime ósseo frágil"
      ]
    }
  },
  {
    id: "axis-c2",
    title: "Vértebra Cervical C2 (Áxis)",
    scientificName: "Axis · Vertebra cervicalis II",
    category: "Esqueleto Axial / Coluna Vertebral",
    organSystem: "Sistema Osteoarticular",
    sampleTag: "Amostra 03 (Peça 03)",
    videoUrl: "/Peca_03.mp4",
    videoFileName: "Peça_03.mp4",
    gifUrl: "/Peca_03.gif",
    gifFileName: "Peça_03.gif",
    summary: "Segunda vértebra cervical que atua como pivô mecânico fundamental para a rotação cefálica. Seu marco diagnóstico proeminente é o dente do áxis (processo odontóide), que ascende perpendicularmente a partir do corpo vertebral.",
    importance: "Ponto nevrálgico da coluna vertebral. O modelo digital tridimensional viabiliza a análise volumétrica e angulação do processo odontóide para simulações biomecânicas de trauma e pesquisas anatômicas comparadas.",
    anatomicalLandmarks: [
      "Processo Odontóide (Dente do Áxis) com ápice e faceta articular anterior",
      "Facetas articulares superiores convexas (orientadas para apoio do atlas)",
      "Corpo vertebral compacto anterior",
      "Processo espinhoso volumoso e bífido",
      "Forame vertebral circular e lâminas vertebrais espessadas",
      "Processos transversos com forames vasculares"
    ],
    parameters: {
      mode: "Laser HD (Luz Azul)",
      workingDistance: "250 mm (Faixa ideal: 170 ~ 550 mm)",
      resolution: "0,05 mm",
      alignmentMethod: "Características Geométricas & Híbrido",
      pointsAcquired: "2.764.427 pontos",
      meshTriangles: "612.000 triângulos",
      processingTime: "5 min 45 seg",
      lightSource: "Laser Azul Multilinhas",
      laserLinesOrPattern: "Linhas laser de alta densidade focal",
      framesInTotal: "13.947",
      pointsInTotal: "2.764.427",
      markersInTotal: "35",
      frameRate: "0"
    },
    photos: [
      {
        id: "c2-p03",
        view: "Vista Superior / Póstero-superior",
        caption: "Dente do áxis (processo odontóide) e facetas articulares superiores convexas (Foto Real do Espécime Peça_03)",
        description: "Exibe a projeção do processo odontóide e a orientação convexa das superfícies articulares para o Atlas.",
        angleTag: "Superior",
        aspectRatio: "4:3",
        fallbackColor: "from-amber-950/40 to-slate-900",
        fileName: "Peça_03.jpg",
        url: "/Peça_03.jpg"
      },
      {
        id: "c2-p003",
        view: "Vista Anterior (Frontal)",
        caption: "Corpo vertebral e dente do áxis com faceta articular anterior (Foto Real do Espécime Peça_003)",
        description: "Evidencia o corpo vertebral compacto e a faceta articular anterior que contacta o arco anterior do Atlas.",
        angleTag: "Anterior",
        aspectRatio: "4:3",
        fallbackColor: "from-amber-900/30 to-slate-900",
        fileName: "Peça_003.jpg",
        url: "/Peça_003.jpg"
      }
    ],
    resultDetails: {
      format: "STL Watertight (Estanque)",
      fileSizeEstimate: "31.2 MB",
      slicerPlate: "Creality Smooth PEI Plate",
      meshIntegrity: "Malha sólida contínua sem manifold invertido",
      inspectionVerdict: "Alta fidelidade topológica do processo odontóide e facetas de deslizamento.",
      keyChallengesSolved: [
        "Captura do estreitamento (colo) entre o processo odontóide e o corpo vertebral",
        "Equilíbrio de iluminação entre a face anterior rugosa e a faceta lisa articular",
        "Reconstrução de faces opostas sem desalinhamento milimétrico"
      ]
    }
  }
];

export const TECHNICAL_SPECIFICATIONS = [
  {
    category: "Especificações Ópticas & Modos de Varredura",
    items: [
      { name: "Modo de Trabalho", value: "Conexão sem fio independente | PC sem fio | PC com fio", highlight: true },
      { name: "Modo de Varredura", value: "Laser HD | IR Rápido", highlight: true },
      { name: "Fonte de Luz", value: "Laser azul | IR VCSEL", highlight: true },
      { name: "Resolução", value: "Modo Laser HD: 0,05 ~ 10 mm | Modo IR Rápido: 0,2 ~ 10 mm", highlight: true },
      { name: "Velocidade de Digitalização", value: "Modo Laser HD: até 4.800.000 pontos/s | Modo IR: 16.000.000 pontos/s", highlight: true },
      { name: "Distância de Trabalho", value: "Modo Laser HD: 170 ~ 550 mm | Modo IR Rápido: 160 ~ 1500 mm", highlight: false },
      { name: "Modo de Alinhamento", value: "Marcadores Globais / Marcadores / Características / Textura / Híbrido", highlight: true },
      { name: "Fabricante & Modelo", value: "SHINING 3D • EinScan Rigil", highlight: false }
    ]
  },
  {
    category: "Software & Processamento",
    items: [
      { name: "Software Oficial de Aquisição", value: "EXScan Pro / EXScan Rigil", highlight: true },
      { name: "Versão Homologada na Pesquisa", value: "1.3.2-7", highlight: true },
      { name: "Algoritmos de Alinhamento", value: "Geometria Anatômica, Marcadores e Modo Híbrido", highlight: false },
      { name: "Geração de Malhas", value: "Watertight (Sólido Fechado) & Unwatertight", highlight: false },
      { name: "Formatos de Saída Gerados", value: "STL, OBJ, PLY, ASC, 3MF", highlight: false },
      { name: "Inspeção e Validação de Malha", value: "Creality Print 7.0 (Placa Creality Smooth PEI)", highlight: true }
    ]
  },
  {
    category: "Hardware & Preservação",
    items: [
      { name: "Conectividade de Dados", value: "Conexão sem fio independente / Wi-Fi 6 / USB 3.0", highlight: false },
      { name: "Tratamento de Superfície", value: "100% Preservada (Sem spray antirreflexo ou adesivos)", highlight: true },
      { name: "Precisão Óptica", value: "Até 0,02 mm no modo Laser HD", highlight: true }
    ]
  }
];

export const METHODOLOGY_STEPS = [
  {
    stepNumber: "01",
    phase: "Preparação & Triagem",
    title: "Triagem e Acondicionamento dos Espécimes Anatômicos",
    duration: "10-15 min / espécime",
    description: "Inspeção tátil e óptica das superfícies ósseas para identificar fragilidades estruturais, suturas e forames delicados. Limpeza superficial a seco sem agentes químicos abrasivos para manter o contraste natural do tecido ósseo sem desmineralização.",
    keyActions: [
      "Verificação de umidade e estabilidade física do material ósseo seco",
      "Posicionamento sobre base antirreflexo neutra com suportes anatômicos em silicone",
      "Inspeção dimensional preliminar com paquímetro digital para controle métrico de calibração",
      "Marcação de pontos de ancoragem anatômica não invasivos (quando aplicável)"
    ],
    rigilSetting: "Modo Geometria Pura (Sem adesivagem de marcadores físicos no osso)",
    outputDoc: "Ficha de inventário de entrada com histórico e medidas básicas"
  },
  {
    stepNumber: "02",
    phase: "Calibração Óptica",
    title: "Calibração de Precisão e Conexão no EXScan Pro v1.3.2-7",
    duration: "5 min",
    description: "Calibração rigorosa do conjunto estéreo óptico e feixe laser do scanner EinScan Rigil utilizando a placa de calibração cerâmica fornecida pelo fabricante. Ajuste fino de distância focal e sensibilidade fotométrica aos tons de cinza do osso.",
    keyActions: [
      "Aquecimento prévio do projetor laser e sensores ópticos durante 3 minutos",
      "Execução do protocolo automático de 9 posições angulares na placa cerâmica certificada",
      "Compensação automática de balanço de branco e índice de refração do osso",
      "Validação da precisão volumétrica residual (< 0,025 mm aceitável)"
    ],
    rigilSetting: "Exposição manual ajustada para 82% com supressão de ruído de luz ambiente",
    outputDoc: "Relatório de calibração óptica com timestamp e desvio médio quadrático (RMS)"
  },
  {
    stepNumber: "03",
    phase: "Varredura Laser HD",
    title: "Digitalização Tridimensional por Laser Azul Multilinhas",
    duration: "4-8 min / espécime",
    description: "Operação manual do EinScan Rigil mantendo a distância focal ótima recomendada (240 a 280 mm). Varredura em trajetórias elípticas e helicoidais para alcançar cavidades internas (forames vertebrais, canais vasculares e meato auditivo).",
    keyActions: [
      "Varredura hemisférica primária em 360° da face superior/anterior",
      "Pausa para inversão suave do espécime sobre o berço estofado",
      "Varredura complementar da face oposta com sobreposição mínima de 35% de área",
      "Inspeção em tempo real no monitor de captura para checagem de zonas de sombra"
    ],
    rigilSetting: "Laser HD (11 linhas cruzadas), Resolução padronizada de 0,05 mm, 60 FPS",
    outputDoc: "Nuvem de pontos bruta (.asc / .ply) com mais de 2 a 5 milhões de coordenadas"
  },
  {
    stepNumber: "04",
    phase: "Processamento & Fusão",
    title: "Alinhamento, Filtragem e Criação de Malha Estanque (Watertight)",
    duration: "6-12 min / espécime",
    description: "Tratamento matemático da nuvem de pontos no software EXScan Pro v1.3.2-7. Fusão de múltiplas tomadas através do algoritmo ICP (Iterative Closest Point), remoção de pontos dispersos e fechamento de topologia estanque para impressão 3D.",
    keyActions: [
      "Alinhamento semiautomático baseado em marcos anatômicos comuns de alta curvatura",
      "Filtragem estatística de ruído e remoção de artefatos de reflexão periférica",
      "Geração de malha triangular adaptativa (triângulos menores em forames e cristas)",
      "Fechamento automático de cavidades com curvatura preservada (Watertight STL)",
      "Validação da orientação dos vetores normais para consistência volumétrica interna"
    ],
    rigilSetting: "Nível de detalhe 'Alto', Otimização de malha inteligente, Normal recalculada",
    outputDoc: "Arquivo digital definitivo nos formatos STL, OBJ e PLY com metadados de escala 1:1"
  },
  {
    stepNumber: "05",
    phase: "Controle & Inspeção 3D",
    title: "Validação Geométrica e Inspeção no Slicer Creality Print 7.0",
    duration: "10 min",
    description: "Importação do modelo STL no software de validação e fatiamento Creality Print 7.0 sobre o leito virtual Creality Smooth PEI Plate. Análise de espessuras de parede, checagem de integridade e erros não-manifold, simulação de fatiamento para manufatura aditiva e gravação de vídeo de rotação 360° (MP4).",
    keyActions: [
      "Verificação de estanqueidade no Creality Print 7.0: 0 aberturas livres, 0 normais invertidas",
      "Confronto dimensional do modelo digital com as medições de controle analógicas",
      "Geração de simulação de camadas de impressão com altura de 0,12 mm",
      "Exportação do vídeo técnico em rotação (Peça_01.mp4, Peça_02.mp4, Peça_03.mp4)"
    ],
    rigilSetting: "Ambiente Creality Print 7.0 (Smooth PEI Plate), visualização de malha verde e renderização 360°",
    outputDoc: "G-Code de impressão, arquivo MP4 de demonstração visual e relatório comparativo"
  }
];
