import swaggerAutogen from "swagger-autogen"; //

const doc = {
  //
  info: {
    //
    version: "v0.0.1", //
    title: "Dokumentasi API Fullstack Web", //
    description: "Dokumentasi API Fullstack Web", //
  },
  servers: [
    //
    {
      url: "http://localhost:3000/api", //
      description: "Local Server", //
    },
  ],
  components: {
    //
    securitySchemes: {
      //
      bearerAuth: {
        //
        type: "http", //
        scheme: "bearer", //
      },
    },
    schemas: {
      //
      LoginRequest: {
        //
        identifier: "user", //
        password: "user1234", //
      },
      RegisterRequest: {
        //
        fullname: "member2025", //
        username: "member2025", // Ganti jadi username jika itu yang kamu gunakan
        email: "member2025@yopmail.com", //
        password: "Member2025!", //
      },
    },
  },
};

const outputFile = "./swagger_output.json"; //
const endpointsFiles = ["../routes/api.ts"]; //

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc); //
