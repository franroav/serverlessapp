db.createUser({
    user: "franroav",
    pwd: "root",
    roles: [
      {
        role: "readWrite",
        db: "nestjs-reign-service-app",
      },
      "readWriteAnyDatabase",
    ],
  });
  db.createCollection("users"); // MongoDB creates the database when you first store data in that database
  db.createCollection("articles");