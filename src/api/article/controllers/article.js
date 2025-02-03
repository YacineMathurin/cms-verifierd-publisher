// src/api/article/controllers/article.js

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const os = require("os");

module.exports = {
  async generatePDF(ctx) {
    const { id } = ctx.params; // Get article ID from URL params

    try {
      // Find the article by ID
      const article = await strapi.services.article.findOne({ id });

      if (!article) {
        return ctx.notFound("Article not found");
      }

      const { title, content } = article;

      // Launch Puppeteer browser instance
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Define the HTML content for the PDF
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              h1 {
                text-align: center;
                font-size: 24px;
              }
              p {
                font-size: 16px;
              }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <p>${content}</p>
          </body>
        </html>
      `;

      // Set the content of the page
      await page.setContent(htmlContent);

      // Create a file path for the generated PDF
      const tempFilePath = path.join(os.tmpdir(), `${title}.pdf`);

      // Generate the PDF and save it
      await page.pdf({ path: tempFilePath, format: "A4" });

      // Close the browser instance
      await browser.close();

      // Move the file from temp directory to public folder for serving
      const destinationPath = path.join("public", "pdfs", `${title}.pdf`);
      fs.renameSync(tempFilePath, destinationPath);

      // Construct the URL for the PDF
      const pdfUrl = `http://localhost:1337/pdfs/${title}.pdf`;

      // Update the article with the generated PDF URL
      await strapi.services.article.update({ id }, { pdfUrl });

      // Return the updated article with the pdfUrl
      const updatedArticle = await strapi.services.article.findOne({ id });
      return ctx.send({
        message: "PDF generated successfully!",
        pdfUrl: updatedArticle.pdfUrl,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      return ctx.badRequest("Error generating PDF");
    }
  },
};
