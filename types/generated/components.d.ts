import type { Attribute, Schema } from '@strapi/strapi';

export interface AntecedantFamilliauxAntecedantFamilliaux
  extends Schema.Component {
  collectionName: 'components_antecedant_familliaux';
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
  collectionName: 'components_antecedant_medicaux';
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

export interface HospitalisationHospitalisation extends Schema.Component {
  collectionName: 'components_hospitalisation_hospitalisations';
  info: {
    description: '';
    displayName: 'Hospitalisation';
  };
  attributes: {
    DateEntre: Attribute.Date;
    DateSortie: Attribute.Date;
    Hopital: Attribute.String;
    Jour: Attribute.Component<'jour.jour', true>;
  };
}

export interface HospitalisationsHospitalisations extends Schema.Component {
  collectionName: 'components_hospitalisations_hospitalisations';
  info: {
    description: '';
    displayName: 'Hospitalisations';
    icon: 'folder';
  };
  attributes: {};
}

export interface JourJour extends Schema.Component {
  collectionName: 'components_jour_jours';
  info: {
    description: '';
    displayName: 'Jour';
  };
  attributes: {
    Date: Attribute.Date;
    Ligne: Attribute.Component<
      'ligne-hospitalisation.ligne-hospitalisation',
      true
    >;
  };
}

export interface LigneAntecedantFamilliauxLigneAntecedantFamilliaux
  extends Schema.Component {
  collectionName: 'components_ligne_antecedant_familliaux';
  info: {
    displayName: 'LigneAntecedantFamilliaux';
  };
  attributes: {
    editedAt: Attribute.DateTime;
    editedBy: Attribute.Text;
    Note: Attribute.Text;
    Parent: Attribute.String;
    version: Attribute.Integer & Attribute.DefaultTo<1>;
  };
}

export interface LigneAntecedantMedicauxLigneAntecedantMedicaux
  extends Schema.Component {
  collectionName: 'components_ligne_antecedant_medicaux';
  info: {
    displayName: 'LigneAntecedantMedicaux';
  };
  attributes: {
    Date: Attribute.Date;
    editedAt: Attribute.DateTime;
    editedBy: Attribute.Relation<
      'ligne-antecedant-medicaux.ligne-antecedant-medicaux',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    Note: Attribute.Text;
    Type: Attribute.String;
    version: Attribute.Integer & Attribute.DefaultTo<1>;
  };
}

export interface LigneHospitalisationLigneHospitalisation
  extends Schema.Component {
  collectionName: 'components_ligne_hospitalisation_ligne_hospitalisations';
  info: {
    description: '';
    displayName: 'Soin';
  };
  attributes: {
    Agent: Attribute.String;
    Heure: Attribute.Time;
    Type: Attribute.String;
  };
}

export interface LigneTraitementLigneTraitement extends Schema.Component {
  collectionName: 'components_ligne_traitement';
  info: {
    description: '';
    displayName: 'LigneTraitement';
  };
  attributes: {
    DateDebut: Attribute.Date;
    DateFin: Attribute.Integer;
    Dose: Attribute.Integer;
    editedAt: Attribute.DateTime;
    editedBy: Attribute.Relation<
      'ligne-traitement.ligne-traitement',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    Frequence: Attribute.Integer;
    Note: Attribute.Text;
    Produit: Attribute.String;
    version: Attribute.Integer & Attribute.DefaultTo<1>;
  };
}

export interface LigneVaccinationsLigneVaccinations extends Schema.Component {
  collectionName: 'components_ligne_vaccinations';
  info: {
    displayName: 'LigneVaccinations';
  };
  attributes: {
    editedAt: Attribute.DateTime;
    editedBy: Attribute.Relation<
      'ligne-vaccinations.ligne-vaccinations',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    Titre: Attribute.String;
    version: Attribute.Integer & Attribute.DefaultTo<1>;
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
      'hospitalisation.hospitalisation': HospitalisationHospitalisation;
      'hospitalisations.hospitalisations': HospitalisationsHospitalisations;
      'jour.jour': JourJour;
      'ligne-antecedant-familliaux.ligne-antecedant-familliaux': LigneAntecedantFamilliauxLigneAntecedantFamilliaux;
      'ligne-antecedant-medicaux.ligne-antecedant-medicaux': LigneAntecedantMedicauxLigneAntecedantMedicaux;
      'ligne-hospitalisation.ligne-hospitalisation': LigneHospitalisationLigneHospitalisation;
      'ligne-traitement.ligne-traitement': LigneTraitementLigneTraitement;
      'ligne-vaccinations.ligne-vaccinations': LigneVaccinationsLigneVaccinations;
      'traitement.traitement': TraitementTraitement;
      'vaccinations.vaccinations': VaccinationsVaccinations;
    }
  }
}
