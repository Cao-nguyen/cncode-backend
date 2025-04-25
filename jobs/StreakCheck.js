const cron = require("node-cron");
const User = require("../models/UserModel");
const Coin = require("../models/CoinsModel");

const startResetStreakJob = () => {
  cron.schedule(
    "0 7 * * *",
    async () => {
      console.log("🔍 Đang kiểm tra người dùng không có coin...");

      try {
        const allUsers = await User.find();
        for (const user of allUsers) {
          const hasCoin = await Coin.findOne({ authorId: user._id });
          if (!hasCoin) {
            await User.findByIdAndUpdate(user._id, { streak: 0 });
            console.log(`🔄 Đã reset streak cho user: ${user._id}`);
          }
        }

        await Coin.deleteMany({});
        console.log("🗑️ Đã xóa toàn bộ dữ liệu trong Coin.");

        console.log("✅ Đã hoàn tất kiểm tra.");
      } catch (err) {
        console.error("❌ Lỗi khi chạy cron job:", err);
      }
    },
    { timezone: "Asia/Ho_Chi_Minh" }
  );
};

module.exports = startResetStreakJob;
