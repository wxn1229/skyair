"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";

import { BookCheck, BriefcaseBusiness, Cloudy, TextSearch } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ServiceMain() {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex gap-9 ">
        <Card className="w-[30vw] h-[50vh]" radius="lg">
          <CardHeader className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center">
              <div className="font-bold text-4xl">網路購票</div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-10 ">
            <Link
              isBlock
              color="foreground"
              className="flex items-center gap-4 mt-11 cursor-pointer"
              onClick={() => {
                router.push("/book");
              }}
            >
              <BookCheck></BookCheck>
              <div className="text-3xl">我要訂票</div>
            </Link>
            <Link
              isBlock
              color="foreground"
              className="flex items-center gap-4 mt-11 cursor-pointer"
              onClick={() => {
                router.push("/search");
              }}
            >
              <TextSearch></TextSearch>
              <div className="text-3xl">查詢訂票紀錄</div>
            </Link>
          </CardBody>
          <Divider />
        </Card>
        <Card className="w-[30vw] h-[50vh]" radius="lg">
          <CardHeader className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center">
              <div className="font-bold text-4xl cursor-pointer">其 他</div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-10 ">
            <Link
              isBlock
              color="foreground"
              className="flex items-center gap-4 mt-11 cursor-pointer"
              href="/about"
            >
              <Cloudy></Cloudy>
              <div className="text-3xl">關於我們</div>
            </Link>
            <Link
              isBlock
              color="foreground"
              className="flex items-center gap-4 mt-11 cursor-pointer"
              href="/precaution"
            >
              <BriefcaseBusiness></BriefcaseBusiness>
              <div className="text-3xl">行李注意事項</div>
            </Link>
          </CardBody>
          <Divider />
        </Card>
      </div>
    </div>
  );
}
