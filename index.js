const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser"); //ทำการเรียก bodyparser เพื่อรับ body from method POST
const cors = require("@koa/cors"); // ทำการเรียน core เพื่อกำหนดสิทธิ
const router = require("./routes/routes"); //ทำการเรียกไฟล์ที่เรา router มาใส่ตัวแปร

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(3000);