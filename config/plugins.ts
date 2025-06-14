// export default () => ({});


// ./config/plugins.ts`
export default () => ({
    'preview-button': {
      config: {
        contentTypes: [
          {
            uid: "api::parcelle.parcelle",
           
            published: {
              url: 'http://localhost:3000/api/generate-pdf?id={id}&Lotissement={Lotissement}&Ilot={Ilot}&Parcelle={Parcelle}&Nom={Nom}&Prenom={Prenom}&Superficie=${Superficie}&createdAt={createdAt}&updatedAt={updatedAt}&publishedAt={publishedAt}&Agent_GPS={Agent_GPS}&Litige={Litige}',  
              openTarget: 'StrapiPage',
            },
          },
        
        ],
      },
    },
  });

