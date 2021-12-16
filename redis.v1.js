const express = require("express");
const app = express();

const { get, set, setnx, incrby, exists } = require("./model.redis");

app.get("/order", async (req, res) => {
  const time = new Date().getTime();
  console.log(`Time: `, time);

  // Gia su so luong ton kho hien tai con 10
  const slTonKho = 10;

  // Ten cua san pham
  const keyName = "iPhone13";

  // Gia su moi lan mau thi luong tieu thu hang ton kho la 1
  const slMua = 1;

  // So luong da ban ra, neu chua ban thi set = 0, nguoc lai thi update + 1 moi lan mua thanh cong
  const getKey = await exists(keyName);
  if (!getKey) {
    // set = 0
    await set(keyName, 0);
  }

  // Lay so luong ban ra
  let slBanra = await get(keyName);
  console.log("Truoc khi dat hang thanh cong, tong ban ra: ", slBanra);

  // Neu so luong ban ra (slBanra) + so luong mua (slMua) > ton kho (slTonKho) return failed;
  if (slBanra + slMua > slTonKho) {
    console.log("HET HANG!");
    return res.json({
      status: "error",
      message: "order fail!",
      time,
    });
  }

  // Neu mua thanh cong
  slBanra = await incrby(keyName, slMua); // Atom redis
  console.log("Sau khi dat hang thanh cong, tong ban ra: ", slBanra);
  if (slBanra > slTonKho) {
    await set("yeu cau khong hop le: ", slBanra - slTonKho);
  }

  return res.json({
    status: "success",
    message: "order success!",
    time,
  });
});

app.listen(3000, () => {
  console.log(`The server is running 3000`);
});
