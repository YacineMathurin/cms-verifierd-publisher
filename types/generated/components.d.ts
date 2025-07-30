import type { Attribute, Schema } from '@strapi/strapi';

export interface AntecedantFamilliauxAntecedantFamilliaux
  extends Schema.Component {
  collectionName: 'components_antecedant_familliaux_antecedant_familliauxes';
  info: {
    displayName: 'AntecedantFamilliaux';
  };
  attributes: {
    Ligne: Attribute.Component<
      'ligne-antecedant-familliaux.ligne-antecedant-familliaux',
      true
    >;
  };
}

export interface AntecedantMedicauxAntecedantMedicaux extends Schema.Component {
  collectionName: 'components_antecedant_medicaux_antecedant_medicauxes';
  info: {
    displayName: 'AntecedantMedicaux';
  };
  attributes: {
    LigneAntecedantMedicaux: Attribute.Component<
      'ligne-antecedant-medicaux.ligne-antecedant-medicaux',
      true
    >;
  };
}

export interface LigneAntecedantFamilliauxLigneAntecedantFamilliaux
  extends Schema.Component {
  collectionName: 'components_ligne_antecedant_familliaux_ligne_antecedant_familliauxes';
  info: {
    displayName: 'LigneAntecedantFamilliaux';
  };
  attributes: {
    Note: Attribute.Text;
    Parent: Attribute.String;
  };
}

export interface LigneAntecedantMedicauxLigneAntecedantMedicaux
  extends Schema.Component {
  collectionName: 'components_ligne_antecedant_medicaux_ligne_antecedant_medicauxes';
  info: {
    displayName: 'LigneAntecedantMedicaux';
  };
  attributes: {
    Date: Attribute.Date;
    Note: Attribute.Text;
    Type: Attribute.String;
  };
}

export interface LigneTraitementLigneTraitement extends Schema.Component {
  collectionName: 'components_ligne_traitement_ligne_traitements';
  info: {
    description: '';
    displayName: 'LigneTraitement';
  };
  attributes: {
    DateDebut: Attribute.Date;
    DateFin: Attribute.Integer;
    Dose: Attribute.Integer;
    Frequence: Attribute.Integer;
    Note: Attribute.Text;
    Produit: Attribute.String;
  };
}

export interface LigneVaccinationsLigneVaccinations extends Schema.Component {
  collectionName: 'components_ligne_vaccinations_ligne_vaccinations';
  info: {
    displayName: 'LigneVaccinations';
  };
  attributes: {
    Titre: Attribute.String;
  };
}

export interface TraitementTraitement extends Schema.Component {
  collectionName: 'components_traitement_traitements';
  info: {
    displayName: 'Traitement';
  };
  attributes: {
    LigneTraitement: Attribute.Component<
      'ligne-traitement.ligne-traitement',
      true
    >;
  };
}

export interface VaccinationsVaccinations extends Schema.Component {
  collectionName: 'components_vaccinations_vaccinations';
  info: {
    description: '';
    displayName: 'Vaccinations';
  };
  attributes: {
    LigneConsultation: Attribute.Component<
      'ligne-antecedant-medicaux.ligne-antecedant-medicaux',
      true
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'antecedant-familliaux.antecedant-familliaux': AntecedantFamilliauxAntecedantFamilliaux;
      'antecedant-medicaux.antecedant-medicaux': AntecedantMedicauxAntecedantMedicaux;
      'ligne-antecedant-familliaux.ligne-antecedant-familliaux': LigneAntecedantFamilliauxLigneAntecedantFamilliaux;
      'ligne-antecedant-medicaux.ligne-antecedant-medicaux': LigneAntecedantMedicauxLigneAntecedantMedicaux;
      'ligne-traitement.ligne-traitement': LigneTraitementLigneTraitement;
      'ligne-vaccinations.ligne-vaccinations': LigneVaccinationsLigneVaccinations;
      'traitement.traitement': TraitementTraitement;
      'vaccinations.vaccinations': VaccinationsVaccinations;
    }
  }
}
