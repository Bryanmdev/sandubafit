export const SHIPPING_RATES = {
  // Zona 1 - Local (R$ 4,00)
  "cohatrac i": 4, "cohatrac ii": 4, "cohatrac iii": 4, "cohatrac iv": 4, "cohatrac v": 4,
  "itapiraco": 4, "planalto anil": 4, "aurora": 4, "maiobinha": 4, "parque vitoria": 4,
  
  // Zona 2 - Proxima (R$ 7,00)
  "cohab": 7, "forquilha": 7, "anil": 7, "joao de deus": 7, "vila lobao": 7, "jardim das margaridas": 7,
  "cruzeiro do anil": 7, "maiobão": 7,
  
  // Zona 3 - Intermediaria (R$ 10,00)
  "turu": 10, "cohama": 10, "angelim": 10, "bequimao": 10, "ipase": 10, "maranhao novo": 10,
  "parque shalom": 10, "vinhais": 10,
  
  // Zona 4 - Afastada (R$ 15,00)
  "renascenca": 15, "calhau": 15, "ponta d'areia": 15, "olho d'agua": 15, "cohajap": 15,
  "litoranea": 15, "jardim eldorado": 15,
  
  // Zona 5 - Extremo (R$ 20,00)
  "centro": 20, "itaqui bacanga": 20, "cidade operaria": 20, "sao cristovao": 20, 
  "distrito industrial": 20, "ponta do farol": 20, "tiberi": 20
};

export const DEFAULT_SHIPPING = 12; // Valor padrao caso o bairro nao seja mapeado

export const normalizeString = (str) => {
  return str?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim() || "";
};
