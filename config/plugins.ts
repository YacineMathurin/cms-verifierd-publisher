// export default () => ({});


// ./config/plugins.ts`
export default () => ({
    'preview-button': {
      config: {
        contentTypes: [
          {
            uid: "api::article.article",
            // draft: {
            //   url: 'http://localhost:3000/api/preview',
            //   query: {
            //     type: 'page',
            //   },
            //   openTarget: 'StrapiPreviewPage',
            // },
            published: {
              url: 'http://localhost:3000/',
              openTarget: 'StrapiPage',
            },
          },
        
        ],
      },
    },
  });

