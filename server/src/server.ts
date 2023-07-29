import app from "./app";

app.listen(app.get("port"), async () => {
    console.log(`Server is running at http://localhost:${app.get("port")}`);
    console.log("Press CTRL-C to stop");
});