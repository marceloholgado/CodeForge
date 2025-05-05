import express from "express";
import fs from "fs-extra";
import archiver from "archiver";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import generateProject from "./generateProject.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CodeForge Server is running!");
});

/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generates a C++ project based on the provided configuration and returns it as a .zip file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_name
 *               - lang
 *               - lib
 *               - build_system
 *               - resources
 *               - frameworks
 *               - target_os
 *             properties:
 *               project_name:
 *                 type: string
 *                 description: Name of the project
 *                 example: MyProject
 *               lang:
 *                 type: string
 *                 description: Programming language
 *                 example: C++
 *               lib:
 *                 type: string
 *                 description: External library to include
 *                 example: Boost
 *               build_system:
 *                 type: string
 *                 description: Compiler or build tool
 *                 example: g++
 *               resources:
 *                 type: string
 *                 description: Type of system resources used
 *                 example: Multithreading
 *               frameworks:
 *                 type: string
 *                 description: Testing framework to use
 *                 example: Catch2
 *               target_os:
 *                 type: string
 *                 description: Target operating system
 *                 example: windows
 *     responses:
 *       200:
 *         description: Successfully generated project returned as a ZIP file
 *         content:
 *           application/zip:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error during project generation
 */
app.post("/generate", async (req, res) => {
  const config = req.body;

  const projectPath = path.join(__dirname, "tmp", config.project_name);
  await generateProject(config, projectPath);

  const zipPath = path.join(__dirname, "tmp", `${config.project_name}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(projectPath, false);
  await archive.finalize();

  output.on("close", () => {
    res.download(zipPath, `${config.project_name}.zip`, async () => {
      await fs.remove(projectPath);
      await fs.remove(zipPath);
      console.log(projectPath);
    });
  });
});

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CodeForge API",
    version: "1.0.0",
    description: "API to generate C++ projects zipped",
  },
};

const options = {
  swaggerDefinition,
  apis: [__filename],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
