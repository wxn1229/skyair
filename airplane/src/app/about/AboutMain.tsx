import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { BookCheck, BriefcaseBusiness, Cloudy, TextSearch } from "lucide-react";

export default function AboutMain() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[80vw] h-[80vh]" radius="lg">
        <CardHeader className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center">
            <div className="font-bold text-4xl">關於我們</div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-10 px-8">
          <p className="mt-10">
            歡迎來到sky
            air，您值得信賴的機票訂購夥伴。我們的使命是為您提供無縫且愉快的訂票體驗，確保您從計劃旅程開始就感到輕鬆和舒適。
          </p>
          <p>
            在sky
            air，我們了解旅行不僅僅是到達目的地，而是整個過程的體驗。無論您是因為商務、休閒還是探險而旅行，我們都致力於讓您的每一步都變得更加便捷和愉快。
          </p>
          <p>
            我們的訂票系統讓您可以輕鬆地查詢和預訂全球範圍內的航班。我們的查詢系統提供最新的航班信息，幫助您找到最適合的航班選擇。此外，我們還提供詳細的行李注意事項，確保您在旅行中無後顧之憂。
          </p>
          <p>
            sky air
            的每一位成員都致力於提供最優質的客戶服務。我們相信，只有用心關注每一個細節，才能真正滿足您的需求。我們期待能成為您每一次旅行的首選夥伴，為您帶來無與倫比的旅行體驗。
          </p>
          <p>感謝您選擇sky air，讓我們一起開啟美好的旅行之旅！</p>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
