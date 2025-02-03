// export default () => ({});


// ./config/plugins.ts`
export default () => ({
    'preview-button': {
      config: {
        contentTypes: [
          {
            uid: "api::article.article",
           
            published: {
              url: 'http://localhost:3000/generate-pdf?title={titre}&content={description}',  
              openTarget: 'StrapiPage',
            },
          },
        
        ],
      },
    },
  });

