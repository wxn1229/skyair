"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DateInput,
  Divider,
  Image,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Radio,
  RadioGroup,
  Slider,
} from "@nextui-org/react";
import {
  BookCheck,
  BriefcaseBusiness,
  Cloudy,
  Recycle,
  RefreshCcw,
  Search,
  TextSearch,
} from "lucide-react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Key, useCallback, useEffect, useState } from "react";
import { default as axios } from "@/utils/axios";
import { on } from "events";
type Flight = {
  flightId: string;
  departure: string;
  departureTime: string;
  destination: string;
  arrivalTime: string;
  flightDuration: number;
};

type FlightsData = {
  flights: Flight[];
};

export default function SearchMain() {
  const [bookId, setBookId] = useState("");

  const [deleteId, setDeleteId] = useState("");
  useEffect(() => {
    console.log("🚀 ~ BookMain ~ bookId:", bookId);
  }, [bookId]);

  const columns = [
    { name: "預定人姓名", uid: "name" },
    { name: "航班編號", uid: "flightId" },
    { name: "出發地", uid: "departure" },
    { name: "出發時間", uid: "departureTime" },
    { name: "目的地", uid: "destination" },
    { name: "抵達時間", uid: "arrivalTime" },
    { name: "飛行時長", uid: "flightDuration" },
    { name: "人數", uid: "personNumber" },
    { name: "艙別", uid: "cabinClass" },
    { name: "ACTIONS", uid: "book" },
  ];
  const [flights, setFlights] = useState<BookingResult[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();
  async function getData() {
    try {
      const data = await axios.post("/search", { idNumber: userId });

      setFlights(data.data.result);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  }
  type FormData = {
    idNumber: string;
    name: string;
    phone: string;
    gender: boolean;
    personNumber: number | number[];
    cabinClass: boolean;
  };
  const [formData, setFormData] = useState<FormData>({
    idNumber: "",
    name: "",
    phone: "",
    gender: false,
    personNumber: 0,
    cabinClass: false,
  });

  const [userGender, setUserGender] = useState("male");
  useEffect(() => {
    if (userGender === "male") {
      setFormData((s) => {
        return { ...s, gender: true };
      });
    } else {
      setFormData((s) => {
        return { ...s, gender: false };
      });
    }
  }, [userGender]);
  const [userClass, setUserClass] = useState("x");
  useEffect(() => {
    if (userGender === "x") {
      setFormData((s) => {
        return { ...s, gender: true };
      });
    } else {
      setFormData((s) => {
        return { ...s, gender: false };
      });
    }
  }, [userGender]);
  const [Time, setTime] = useState(parseDate("2024-04-04"));
  const [aCity, setACity] = useState("");

  const [dCity, setDCity] = useState("");

  useEffect(() => {
    console.log("🚀 ~ BookMain ~ aCity:", aCity);

    console.log("🚀 ~ BookMain ~ dCity:", dCity);
    console.log("🚀 ~ BookMain ~ Time:", Time);
  }, [Time, aCity, dCity]);
  type BookingResult = {
    name: string;
    flightId: string;
    departure: string;
    departureTime: string;
    destination: string;
    arrivalTime: string;
    flightDuration: number;
    personNumber: number;
    cabinClass: boolean;
  };

  async function deleteBookInfo() {
    try {
      const result = await axios.post("/deletePassengerInfo", {
        idNumber: userId,
        flightId: deleteId,
      });
    } catch (error) {
      console.log("🚀 ~ deleteBookInfo ~ error:", error);
    }
  }

  async function updateBookInfo() {
    try {
      const update = await axios.patch("/updatePassengerInfo", {
        idNumber: formData.idNumber,
        gender: formData.gender,
        name: formData.name,
        phone: formData.phone,
        cabinClass: formData.cabinClass,
        personNumber: formData.personNumber,
        flightId: bookId,
      });
      console.log("🚀 ~ updateBookInfo ~ update:", update);
    } catch (error) {
      console.log("🚀 ~ updateBookInfo ~ error:", error);
    }
  }

  useEffect(() => {
    async function getPassenger() {
      try {
        const data = await axios.post("/getPassengerInfo", {
          idNumber: userId,
          flightId: bookId,
        });
        console.log("🚀 ~ getPassenger ~ data:", data);
        if (data.data.flights) {
          setFormData(data.data.flights);
        }
      } catch (error) {
        console.log("🚀 ~ getPassenger ~ error:", error);
      }
    }
    getPassenger();
  }, [bookId]);

  const renderCell = useCallback((flight: BookingResult, columnKey: Key) => {
    const cellValue = flight[columnKey as keyof BookingResult];

    switch (columnKey) {
      case "book":
        return (
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setBookId(flight.flightId);
                onOpen();
              }}
              color="success"
            >
              修改
            </Button>
            <Button
              onClick={() => {
                setDeleteId(flight.flightId);
                onOpenModal2();
              }}
              color="danger"
            >
              刪除
            </Button>
          </div>
        );
      case "cabinClass":
        return <p>{cellValue ? "經濟艙" : "商務艙"}</p>;
      case "departureTime":
        return <p>{cellValue.toString().split("T")[0]}</p>;
      case "arrivalTime":
        return <p>{cellValue.toString().split("T")[0]}</p>;
      case "flightDuration":
        return <p>{cellValue.toString()} hr</p>;
      default:
        return cellValue;
    }
  }, []);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    console.log("🚀 ~ SearchMain ~ userId:", userId);

    console.log("🚀 ~ SearchMain ~ bookId:", bookId);
  }, [userId, bookId]);

  return (
    <div className="h-screen flex items-center justify-center ">
      <Card className="w-[80vw] h-[90vh]" radius="lg">
        <CardHeader className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center">
            <div className="font-bold text-4xl">訂票系統</div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-10 w-full">
          <div className="flex justify-center w-full">
            <div className="flex gap-5 w-full justify-center items-center">
              <Input
                label="請輸入身分證"
                type="text"
                variant="bordered"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              ></Input>

              <Button
                onClick={() => {
                  getData();
                }}
                startContent={<Search></Search>}
                color="primary"
              >
                搜尋
              </Button>
              <Button
                onClick={() => {
                  setUserId("");
                  setFlights([]);
                }}
                startContent={<RefreshCcw />}
                color="success"
              >
                重新整理
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={flights}>
                {(item) => (
                  <TableRow key={item.flightId}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
        <Divider />
      </Card>
      <Modal isOpen={isOpenModal2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                再次確認
              </ModalHeader>
              <ModalBody>
                <div>請問確定要刪除嗎</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    deleteBookInfo();
                    onClose();
                  }}
                >
                  確認
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                訂購人資訊
              </ModalHeader>
              <ModalBody>
                <div>身分證</div>
                <Input
                  type="text"
                  variant="bordered"
                  value={formData.idNumber}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      idNumber: e.target.value.trim(),
                    });
                  }}
                ></Input>
                <div>姓名</div>
                <Input
                  type="text"
                  variant="bordered"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value.trim() });
                  }}
                ></Input>

                <div>電話</div>
                <Input
                  type="text"
                  variant="bordered"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value.trim() });
                  }}
                ></Input>
                <div>性別</div>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue="male"
                  value={userGender}
                  onValueChange={setUserGender}
                >
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </RadioGroup>
                <Slider
                  step={1}
                  label="人數"
                  maxValue={10}
                  minValue={1}
                  defaultValue={1}
                  className="max-w-md"
                  value={formData.personNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, personNumber: e });
                  }}
                />
                <div>艙別</div>
                <RadioGroup
                  orientation="horizontal"
                  value={userClass}
                  onValueChange={setUserClass}
                >
                  <Radio value="x">經濟艙</Radio>
                  <Radio value="o">商務艙</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    updateBookInfo();
                    onClose();
                  }}
                >
                  確認
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

const CalendarIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
      fill="currentColor"
    />
    <path
      clipRule="evenodd"
      d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
