import type { Attribute, Schema } from '@strapi/strapi';

export interface SommetSommet extends Schema.Component {
  collectionName: 'components_sommet_sommets';
  info: {
    description: '';
    displayName: 'Sommet';
  };
  attributes: {
    Latitude: Attribute.String;
    Longitude: Attribute.String;
    Sommet: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'sommet.sommet': SommetSommet;
    }
  }
}
