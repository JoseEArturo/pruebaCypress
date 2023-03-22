const { defineConfig } = require("cypress");
const { addMatchImageSnapshotPlugin } = require("cypress-image-snapshot/plugin");
const webpack = require("@cypress/webpack-preprocessor")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const allureWriter = require("@shelex/cypress-allure-plugin/writer")
const { cloudPlugin } = require("cypress-cloud/plugin");
const values = {};

async function setupNodeEvents(on, config) {
  
  addMatchImageSnapshotPlugin(on, config);
  // implement node event listeners here
  config.env.variable = process.env.NODE_ENV ?? "NO HAY VARIABLE";

  on("task", {
    guardar(valor) {
      const key = Object.keys(valor)[0];
      values[key] = valor[key];
      return null;
    },
    obtener(key) {
      console.log("values", values);
      return values[key] ?? "no hay valor";
    },
  });

  await preprocessor.addCucumberPreprocessorPlugin(on,config)

  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.feature$/,
            use: [
              {
                loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                options: config,
              },
            ],
          },
        ],
      },
    },

  };

  on('file:preprocessor', webpack(options));
  //fs.mkdirSync('./allure-results');
  allureWriter(on, config);
  cloudPlugin(on, config);
  return config;
  
}

module.exports = defineConfig({
  projectId: '2fyqyf', 
  // reporter: "cypress-multi-reporters",
  /* reporterOptions: {
     configFile: "reporter-allure.json"
   },*/
  e2e: {
    compilerOptions: { allowJs: true, types: ["cypress"] },
    include: ["**/*.*"],
    baseUrl: "https://pokedexi.netlify.app",
    experimentalSessionAndOrigin: true,
    setupNodeEvents,
    retries: 2,
    //   retries: {
    //   //Configure retry attempts to for 'cypress run'
    //   //Default is 0
    //   runMode: 2,
    //   //Configure retry attempts to for 'cypress open'
    //   //Default is 0
    //   openMode: 0
    //  }
    specPattern: '**/*.feature',
    supportFile: false,
    env:{
      allureReuseAfterSpec: true,
     // allureResultsPath: "allure-results",
      credentials: {
        user: "username",
        password: "password"
      }
  }
  }
});
