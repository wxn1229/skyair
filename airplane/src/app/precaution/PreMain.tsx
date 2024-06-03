import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { BookCheck, BriefcaseBusiness, Cloudy, TextSearch } from "lucide-react";

export default function PreMain() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[80vw] h-[80vh]" radius="lg">
        <CardHeader className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center">
            <div className="font-bold text-4xl">出國搭飛機的注意事項</div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-10 px-8">
          <h2>1. 行前準備</h2>
          <ul>
            <li>
              <strong>護照和簽證：</strong>
              確保您的護照在有效期內，並檢查是否需要簽證才能進入目的地國家。
            </li>
            <li>
              <strong>機票和行程：</strong>
              打印出機票確認單和行程表，並備份在電子設備上。
            </li>
            <li>
              <strong>疫苗和健康證明：</strong>
              根據目的地國家的要求，接種必要的疫苗並攜帶相關健康證明。
            </li>
          </ul>

          <h2>2. 行李準備</h2>
          <ul>
            <li>
              <strong>行李限額：</strong>
              檢查航空公司的行李限額，包括托運和隨身行李的重量和尺寸限制。
            </li>
            <li>
              <strong>行李標籤：</strong>
              在每個行李箱上貼上標籤，寫明您的姓名、電話和地址。
            </li>
            <li>
              <strong>重要物品：</strong>
              貴重物品、護照、現金、電子設備等應隨身攜帶，不要放在托運行李中。
            </li>
          </ul>

          <h2>3. 安檢與登機</h2>
          <ul>
            <li>
              <strong>提前到達機場：</strong>
              建議國際航班提前至少三小時到達機場，以便有充足的時間完成安檢和登機手續。
            </li>
            <li>
              <strong>安檢程序：</strong>
              了解機場安檢流程，準備好取下電子設備和液體物品，並脫掉外套、鞋子等。
            </li>
          </ul>

          <h2>4. 飛行途中</h2>
          <ul>
            <li>
              <strong>保持舒適：</strong>
              穿著舒適的衣物，並攜帶枕頭、毯子和耳塞等物品，以提高飛行中的舒適度。
            </li>
            <li>
              <strong>保持健康：</strong>
              長途飛行中多喝水，適時活動身體，避免久坐造成的不適。
            </li>
            <li>
              <strong>娛樂設施：</strong>
              攜帶書籍、平板電腦等娛樂設備，以打發飛行時間。
            </li>
          </ul>

          <h2>5. 到達目的地</h2>
          <ul>
            <li>
              <strong>入境手續：</strong>
              下飛機後，根據指示前往入境檢查處，準備好護照、簽證和入境卡等資料。
            </li>
            <li>
              <strong>行李提取：</strong>
              前往行李提取區，根據航班號找到自己的行李轉盤，檢查行李是否完好無損。
            </li>
            <li>
              <strong>交通安排：</strong>
              提前安排好從機場到住宿地點的交通工具，可以選擇出租車、機場巴士或接機服務等。
            </li>
          </ul>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
