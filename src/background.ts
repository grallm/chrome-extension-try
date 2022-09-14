import { chunkedWrite } from './utils/ChromeSyncChunks.utils'

const stychContentDb = [{ id: '8/274', parent: '8/124', title: "L'écomobilité\n        \n            \n                \n               2 min\n            \n\n                        \n                \n                Dernier score 5/5" }, { id: '8/441', parent: '8/124', title: "L'écoconduite\n        \n            \n                \n               5 min" }, { id: '8/434', parent: '8/123', title: 'Équipements du conducteur\n        \n            \n                \n               7 min' }, { id: '8/436', parent: '8/123', title: 'Vérifications et entretien de la moto\n        \n            \n                \n               6 min' }, { id: '8/435', parent: '8/122', title: 'Équipements de la moto\n        \n            \n                \n               3 min' }, { id: '8/436', parent: '8/122', title: 'Vérifications et entretien de la moto\n        \n            \n                \n               6 min' }, { id: '8/278', parent: '8/121', title: 'Accident corporel\n        \n            \n                \n               6 min\n            \n\n                        \n                \n                Dernier score 5/5' }, { id: '8/400', parent: '8/119', title: 'La réglementation de la vitesse\n        \n            \n                \n               3 min\n            \n\n                        \n                \n                Dernier score 5/5' }, { id: '8/401', parent: '8/119', title: 'La signalisation de la vitesse\n        \n            \n                \n               1 min\n            \n\n                        \n                \n                Dernier score 5/5' }, { id: '8/438', parent: '8/119', title: 'Notions sur les différentes forces\n        \n            \n                \n               1 min' }, { id: '8/429', parent: '8/119', title: 'La circulation inter-files\n        \n            \n                \n               2 min' }, { id: '8/450', parent: '8/119', title: 'La trajectoire de sécurité\n        \n            \n                \n               2 min' }, { id: '8/451', parent: '8/119', title: "Circulation la nuit et en cas d'intempéries\n        \n            \n                \n               6 min" }, { id: '8/225', parent: '8/120', title: 'Le permis de conduire\n        \n            \n                \n               4 min\n            \n\n                        \n                \n                Dernier score 5/5' }, { id: '8/226', parent: '8/120', title: 'Le permis à points\n        \n            \n                \n               7 min\n            \n\n                        \n                \n                Dernier score 4/5' }, { id: '8/431', parent: '8/120', title: 'Documents obligatoires et utiles\n        \n            \n                \n               2 min' }, { id: '8/367', parent: '8/120', title: 'Tableau des sanctions\n        \n            \n                \n               1 min' }, { id: '8/427', parent: '8/118', title: "Les différents types d'usagers\n        \n            \n                \n               8 min" }, { id: '8/428', parent: '8/118', title: 'Code de la rue\n        \n            \n                \n               1 min' }, { id: '8/429', parent: '8/118', title: 'La circulation inter-files\n        \n            \n                \n               2 min' }, { id: '8/430', parent: '8/117', title: "L'état du conducteur\n        \n            \n                \n               3 min" }, { id: '8/432', parent: '8/117', title: 'Alcool et conduite\n        \n            \n                \n               5 min' }, { id: '8/433', parent: '8/117', title: 'Les distances à respecter\n        \n            \n                \n               5 min' }, { id: '8/221', parent: '8/116', title: 'La signalisation verticale\n        \n            \n                \n               5 min\n            \n\n                        \n                \n                Dernier score 4/5' }, { id: '8/422', parent: '8/116', title: 'La signalisation horizontale\n        \n            \n                \n               4 min' }, { id: '8/223', parent: '8/116', title: 'La signalisation temporaire\n        \n            \n                \n               2 min\n            \n\n                        \n                \n                Dernier score 5/5' }, { id: '8/369', parent: '8/116', title: 'Planche de panneaux\n        \n            \n                \n               1 min\n            \n\n                        \n                \n                Dernier score 5/5' }, { id: '8/423', parent: '8/116', title: 'Les règles de priorité\n        \n            \n                \n               6 min' }, { id: '8/424', parent: '8/116', title: 'Carrefours à sens giratoire et ronds points\n        \n            \n                \n               3 min' }, { id: '8/425', parent: '8/116', title: 'Les feux\n        \n            \n                \n               4 min' }, { id: '8/426', parent: '8/116', title: "L'arrêt et le stationnement en moto\n        \n            \n                \n               4 min" }, { id: '8/437', parent: '8/116', title: 'Placement sur la chaussée\n        \n            \n                \n               1 min' }, { id: '8/439', parent: '8/116', title: 'Les tunnels\n        \n            \n                \n               2 min' }, { id: '8/440', parent: '8/116', title: 'Passage à niveau\n        \n            \n                \n               1 min' }, { id: 'La forme, la couleur et les symboles des panneaux :', link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: 'La forme, la couleur et les symboles des panneaux :' }, { id: 'Les panneaux de danger :', link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: 'Les panneaux de danger :' }, { id: "Les panneaux d'interdiction :", link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: "Les panneaux d'interdiction :" }, { id: "Les panneaux d'obligation :", link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: "Les panneaux d'obligation :" }, { id: "Les panneaux d'indication :", link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: "Les panneaux d'indication :" }, { id: 'Les panneaux de localisation :', link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: 'Les panneaux de localisation :' }, { id: 'Les panneaux de direction :', link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: 'Les panneaux de direction :' }, { id: 'Les balises et bornes :', link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: 'Les balises et bornes :' }, { id: 'Derniers scores', link: 'https://www.stych.fr/elearning/fiche-cours/8/221', parent: '8/221', title: 'Derniers scores' }]

chrome.runtime.onInstalled.addListener(() => {
  chunkedWrite('stychContent', stychContentDb)

  console.log(`Added ${stychContentDb.length} Stych categories`)
})
